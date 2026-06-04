import { useState, useEffect } from "react";
import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { ArrowLeft, Settings, Package, ShoppingBag, Users, Save, Plus, Trash2, Edit, Upload, ImageIcon, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ORDER_STATUS_FLOW, PHYSICAL_STATUS_FLOW, formatPrice, DEVICE_CONDITIONS, STORE_ORDER_STATUSES, STORE_DELIVERY_FLOW, STORE_PICKUP_FLOW } from "../../data/constants";
import { DEVICE_ISSUES } from "../../data/devices";
import { sendStatusUpdate, sendDiagnosisReport } from "../../utils/emailService";
import type { RepairOrder, SiteSettings, StoreProduct, StoreProductVariant, StoreOrder, StoreOrderStatus } from "../../types";
import type { OrderStatus } from "../../data/constants";
import { DEFAULT_SHOWCASE } from "./StorePage";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [storeOrders, setStoreOrders] = useState<StoreOrder[]>([]);
  const [saving, setSaving] = useState(false);

  // Load data
  useEffect(() => {
    const unsubOrders = onSnapshot(query(collection(db, "ifixit_orders"), orderBy("createdAt", "desc")), snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as RepairOrder)));
    });
    const unsubSettings = onSnapshot(doc(db, "ifixit_settings", "main"), snap => {
      if (snap.exists()) setSettings({ id: snap.id, ...snap.data() } as SiteSettings);
    });
    const unsubProducts = onSnapshot(collection(db, "ifixit_products"), snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as StoreProduct)));
    });
    const unsubStoreOrders = onSnapshot(query(collection(db, "ifixit_store_orders"), orderBy("createdAt", "desc")), snap => {
      setStoreOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as StoreOrder)));
    });
    return () => { unsubOrders(); unsubSettings(); unsubProducts(); unsubStoreOrders(); };
  }, []);

  return (
    <div className="min-h-screen bg-secondary/20 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders"><Package className="w-4 h-4 mr-1" /> Orders</TabsTrigger>
            <TabsTrigger value="store-orders"><ShoppingBag className="w-4 h-4 mr-1" /> Store Orders</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1" /> Settings</TabsTrigger>
            <TabsTrigger value="store"><ShoppingBag className="w-4 h-4 mr-1" /> Store</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab orders={orders} settings={settings} />
          </TabsContent>
          <TabsContent value="store-orders">
            <StoreOrdersTab storeOrders={storeOrders} />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab settings={settings} saving={saving} setSaving={setSaving} />
          </TabsContent>
          <TabsContent value="store">
            <StoreTab products={products} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ===================== ORDERS TAB ===================== */

function OrdersTab({ orders, settings }: { orders: RepairOrder[]; settings: SiteSettings | null }) {
  const [selected, setSelected] = useState<RepairOrder | null>(null);
  const [diagnosisNotes, setDiagnosisNotes] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [statusNote, setStatusNote] = useState("");

  const updateOrderStatus = async (order: RepairOrder, newStatus: OrderStatus) => {
    const historyEntry = { status: newStatus, timestamp: new Date().toISOString(), note: statusNote || undefined };
    const update: any = {
      status: newStatus,
      statusHistory: [...order.statusHistory, historyEntry],
      updatedAt: serverTimestamp(),
    };
    if (newStatus === "service-completed" && diagnosisNotes) {
      update.diagnosisNotes = diagnosisNotes;
      update.estimatedRepairCost = Number(repairCost) || 0;
    }
    if (newStatus === "awaiting-repair-payment" && repairCost) {
      update.repairFee = Number(repairCost) || 0;
    }
    await updateDoc(doc(db, "ifixit_orders", order.id), update);

    // Send email notification
    const statusInfo = ORDER_STATUS_FLOW.find(s => s.id === newStatus);
    if (order.customerEmail && statusInfo) {
      if (newStatus === "service-completed" && diagnosisNotes) {
        sendDiagnosisReport(order.customerEmail, order.id, diagnosisNotes, Number(repairCost) || 0);
      } else {
        sendStatusUpdate(order.customerEmail, order.id, statusInfo.label, statusNote || undefined);
      }
    }

    setStatusNote("");
    setSelected({ ...order, ...update, statusHistory: update.statusHistory });
  };

  const getNextStatuses = (order: RepairOrder): OrderStatus[] => {
    const flow = order.deliveryMethod === "physical" ? PHYSICAL_STATUS_FLOW : ORDER_STATUS_FLOW.map(s => s.id);
    const currentIdx = flow.indexOf(order.status);
    if (currentIdx === -1 || currentIdx >= flow.length - 1) return [];
    // Allow advancing to next status or skipping to cancelled
    const next = [flow[currentIdx + 1]];
    if (!next.includes("cancelled")) next.push("cancelled" as OrderStatus);
    return next as OrderStatus[];
  };

  if (selected) {
    const nextStatuses = getNextStatuses(selected);
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelected(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Order #{selected.id.slice(-8).toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Customer:</span> {selected.customerName}</div>
              <div><span className="text-muted-foreground">Phone:</span> {selected.customerPhone}</div>
              <div><span className="text-muted-foreground">Email:</span> {selected.customerEmail}</div>
              <div><span className="text-muted-foreground">Device:</span> {selected.deviceModel}</div>
              <div><span className="text-muted-foreground">Category:</span> {selected.deviceCategory}</div>
              <div><span className="text-muted-foreground">Delivery:</span> {selected.deliveryMethod}</div>
              {selected.state && <div><span className="text-muted-foreground">Location:</span> {selected.state}, {selected.lga}</div>}
              <div><span className="text-muted-foreground">Status:</span> <Badge>{ORDER_STATUS_FLOW.find(s => s.id === selected.status)?.label}</Badge></div>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Issues:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selected.selectedIssues.map(id => {
                  const issue = DEVICE_ISSUES.find(i => i.id === id);
                  return <Badge key={id} variant="secondary">{issue?.name || id}</Badge>;
                })}
              </div>
              {selected.additionalNotes && <p className="text-sm mt-2 text-muted-foreground">{selected.additionalNotes}</p>}
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>Service Fee: {formatPrice(selected.serviceFee)}</div>
              <div>Pickup Fee: {formatPrice(selected.pickupFee)}</div>
              <div>Total Paid: {formatPrice(selected.totalInitialPayment)}</div>
            </div>

            <Separator />

            {/* Diagnosis Section */}
            {["picked-up", "received", "diagnosing"].includes(selected.status) && (
              <div className="space-y-3">
                <h4 className="font-medium">Diagnosis</h4>
                <Textarea placeholder="Diagnosis notes..." value={diagnosisNotes} onChange={e => setDiagnosisNotes(e.target.value)} />
                <Input type="number" placeholder="Estimated repair cost (₦)" value={repairCost} onChange={e => setRepairCost(e.target.value)} />
              </div>
            )}

            {/* Update Status */}
            {nextStatuses.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Update Status</h4>
                <Input placeholder="Status note (optional)" value={statusNote} onChange={e => setStatusNote(e.target.value)} />
                <div className="flex gap-2 flex-wrap">
                  {nextStatuses.map(s => {
                    const info = ORDER_STATUS_FLOW.find(st => st.id === s);
                    return (
                      <Button
                        key={s}
                        variant={s === "cancelled" ? "destructive" : "default"}
                        size="sm"
                        onClick={() => updateOrderStatus(selected, s)}
                      >
                        {info?.label || s}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Status History */}
            <Separator />
            <h4 className="font-medium">Status History</h4>
            <div className="space-y-2">
              {selected.statusHistory.map((h, i) => (
                <div key={i} className="text-sm flex gap-2">
                  <span className="text-muted-foreground">{new Date(h.timestamp).toLocaleString("en-NG")}</span>
                  <Badge variant="outline">{ORDER_STATUS_FLOW.find(s => s.id === h.status)?.label}</Badge>
                  {h.note && <span className="text-muted-foreground">— {h.note}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Orders ({orders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => { setSelected(order); setDiagnosisNotes(order.diagnosisNotes || ""); setRepairCost(String(order.estimatedRepairCost || "")); }}>
                  <TableCell className="font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.deviceModel}</TableCell>
                  <TableCell><Badge variant="secondary">{ORDER_STATUS_FLOW.find(s => s.id === order.status)?.label}</Badge></TableCell>
                  <TableCell className="text-xs">{new Date(order.createdAt).toLocaleDateString("en-NG")}</TableCell>
                  <TableCell>{formatPrice(order.totalInitialPayment)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

/* ===================== SETTINGS TAB ===================== */

function SettingsTab({ settings, saving, setSaving }: { settings: SiteSettings | null; saving: boolean; setSaving: (v: boolean) => void }) {
  const [form, setForm] = useState<Partial<SiteSettings>>({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleBrandingUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "logoUrl" | "faviconUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const setUploading = field === "logoUrl" ? setUploadingLogo : setUploadingFavicon;
    setUploading(true);
    try {
      const fileRef = ref(storage, `ifixit_branding/${field}_${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      update(field, url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { id, ...data } = form as any;
      await setDoc(doc(db, "ifixit_settings", "main"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Info */}
      <Card>
        <CardHeader><CardTitle>Business Info</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div><Label>Business Name</Label><Input value={form.businessName || ""} onChange={e => update("businessName", e.target.value)} /></div>
          <div><Label>Address</Label><Input value={form.address || ""} onChange={e => update("address", e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={form.phone || ""} onChange={e => update("phone", e.target.value)} /></div>
          <div><Label>WhatsApp Link</Label><Input value={form.whatsapp || ""} onChange={e => update("whatsapp", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={form.email || ""} onChange={e => update("email", e.target.value)} /></div>
          <div><Label>Pickup Agent Phone</Label><Input value={form.pickupAgentPhone || ""} onChange={e => update("pickupAgentPhone", e.target.value)} /></div>
          <div><Label>Pickup Agent WhatsApp</Label><Input value={form.pickupAgentWhatsapp || ""} onChange={e => update("pickupAgentWhatsapp", e.target.value)} /></div>
          <div><Label>Station LGA</Label><Input value={form.stationLGA || ""} onChange={e => update("stationLGA", e.target.value)} /></div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader><CardTitle>Branding</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          {/* Logo */}
          <div className="space-y-3">
            <Label>Logo (shown in header & footer)</Label>
            <div className="flex items-center gap-4">
              {form.logoUrl ? (
                <img src={form.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-lg border bg-muted" />
              ) : (
                <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleBrandingUpload(e, "logoUrl")} />
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors">
                    <Upload className="w-4 h-4" /> {uploadingLogo ? "Uploading..." : "Upload Logo"}
                  </span>
                </label>
                {form.logoUrl && (
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => update("logoUrl", "")}>
                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Favicon */}
          <div className="space-y-3">
            <Label>Favicon (browser tab icon)</Label>
            <div className="flex items-center gap-4">
              {form.faviconUrl ? (
                <img src={form.faviconUrl} alt="Favicon" className="w-16 h-16 object-contain rounded-lg border bg-muted" />
              ) : (
                <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleBrandingUpload(e, "faviconUrl")} />
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors">
                    <Upload className="w-4 h-4" /> {uploadingFavicon ? "Uploading..." : "Upload Favicon"}
                  </span>
                </label>
                {form.faviconUrl && (
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => update("faviconUrl", "")}>
                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader><CardTitle>Feature Toggles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Apple Device Repair card</Label>
            <Switch checked={form.enableAppleRepair ?? true} onCheckedChange={v => update("enableAppleRepair", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Non-Apple Devices</Label>
            <Switch checked={form.enableNonApple ?? true} onCheckedChange={v => update("enableNonApple", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Store Mode</Label>
            <Switch checked={form.enableStore ?? false} onCheckedChange={v => update("enableStore", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Hero Video Background</Label>
            <Switch checked={form.enableHeroVideo ?? false} onCheckedChange={v => update("enableHeroVideo", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Pickup Comfort</Label>
            <Switch checked={form.enablePickupComfort ?? true} onCheckedChange={v => update("enablePickupComfort", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Physical Drop-off</Label>
            <Switch checked={form.enablePhysical ?? true} onCheckedChange={v => update("enablePhysical", v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Pickup Local</Label>
            <Switch checked={form.enablePickupLocal ?? true} onCheckedChange={v => update("enablePickupLocal", v)} />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div><Label>Apple Service Fee (₦)</Label><Input type="number" value={form.appleServiceFee ?? 10000} onChange={e => update("appleServiceFee", Number(e.target.value))} /></div>
          <div><Label>Non-Apple Service Fee (₦)</Label><Input type="number" value={form.nonAppleServiceFee ?? 5000} onChange={e => update("nonAppleServiceFee", Number(e.target.value))} /></div>
          <div><Label>Min Pickup Fee (₦)</Label><Input type="number" value={form.minPickupFee ?? 3000} onChange={e => update("minPickupFee", Number(e.target.value))} /></div>
          <div><Label>Local Pickup Fee (₦)</Label><Input type="number" value={form.localPickupFee ?? 2000} onChange={e => update("localPickupFee", Number(e.target.value))} /></div>
        </CardContent>
      </Card>

      {/* Overstay Settings */}
      <Card>
        <CardHeader><CardTitle>Overstay Fee Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Overstay Fee (Physical)</Label>
            <Switch checked={form.overstayEnabled ?? true} onCheckedChange={v => update("overstayEnabled", v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Grace Period (days)</Label><Input type="number" value={form.overstayGraceDays ?? 3} onChange={e => update("overstayGraceDays", Number(e.target.value))} /></div>
            <div><Label>Fee Per Day (₦)</Label><Input type="number" value={form.overstayFeePerDay ?? 300} onChange={e => update("overstayFeePerDay", Number(e.target.value))} /></div>
          </div>
        </CardContent>
      </Card>

      {/* LGA-Specific Pricing */}
      <Card>
        <CardHeader><CardTitle>LGA-Specific Pickup Pricing</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Override pickup fees for specific LGAs. Leave empty to use default.</p>
          <LGAPricingEditor lgaPricing={form.lgaPickupPricing || {}} onChange={v => update("lgaPickupPricing", v)} />
        </CardContent>
      </Card>

      {/* Admin Emails */}
      <Card>
        <CardHeader><CardTitle>Admin Emails</CardTitle></CardHeader>
        <CardContent>
          <Label>Comma-separated admin emails</Label>
          <Input value={(form.adminEmails || []).join(", ")} onChange={e => update("adminEmails", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </CardContent>
      </Card>

      <Button onClick={saveSettings} disabled={saving} className="w-full">
        <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}

function LGAPricingEditor({ lgaPricing, onChange }: { lgaPricing: Record<string, number>; onChange: (v: Record<string, number>) => void }) {
  const [newLga, setNewLga] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const addLga = () => {
    if (newLga && newPrice) {
      onChange({ ...lgaPricing, [newLga]: Number(newPrice) });
      setNewLga(""); setNewPrice("");
    }
  };

  const removeLga = (lga: string) => {
    const updated = { ...lgaPricing };
    delete updated[lga];
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {Object.entries(lgaPricing).map(([lga, price]) => (
        <div key={lga} className="flex items-center gap-2">
          <span className="text-sm flex-1">{lga}</span>
          <span className="text-sm font-medium">{formatPrice(price)}</span>
          <Button variant="ghost" size="sm" onClick={() => removeLga(lga)}><Trash2 className="w-3 h-3" /></Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input placeholder="LGA name" value={newLga} onChange={e => setNewLga(e.target.value)} className="flex-1" />
        <Input type="number" placeholder="Fee (₦)" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-32" />
        <Button variant="outline" size="sm" onClick={addLga}><Plus className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

/* ===================== STORE TAB ===================== */

function StoreTab({ products }: { products: StoreProduct[] }) {
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [form, setForm] = useState({ name: "", description: "", category: "", imageUrl: "", variants: [] as StoreProductVariant[] });
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const seedDefaults = async () => {
    setSeeding(true);
    try {
      for (const product of DEFAULT_SHOWCASE) {
        const { id, ...data } = product;
        await setDoc(doc(collection(db, "ifixit_products")), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      }
    } finally {
      setSeeding(false);
    }
  };

  const resetForm = () => setForm({ name: "", description: "", category: "", imageUrl: "", variants: [] });

  const startEdit = (p: StoreProduct) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, category: p.category, imageUrl: p.imageUrl || "", variants: p.variants || [] });
  };

  const startNew = () => {
    setEditing({ id: "" } as StoreProduct);
    resetForm();
  };

  const saveProduct = async () => {
    const data = { ...form, updatedAt: serverTimestamp() };
    if (editing?.id) {
      await updateDoc(doc(db, "ifixit_products", editing.id), data);
    } else {
      await setDoc(doc(collection(db, "ifixit_products")), { ...data, createdAt: serverTimestamp() });
    }
    setEditing(null);
    resetForm();
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "ifixit_products", id));
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { id: crypto.randomUUID(), label: "", condition: "uk-used" as const, ram: "", storage: "", color: "", price: 0, stock: 0 }],
    }));
  };

  const updateVariant = (index: number, key: string, value: any) => {
    const updated = [...form.variants];
    (updated[index] as any)[key] = value;
    setForm(prev => ({ ...prev, variants: updated }));
  };

  const removeVariant = (index: number) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileRef = ref(storage, `ifixit_products/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setForm(prev => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
    setUploading(false);
  };

  if (editing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{editing.id ? "Edit Product" : "New Product"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} /></div>
            <div className="col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div className="col-span-2">
              <Label>Product Image</Label>
              <div className="mt-2 flex items-center gap-4">
                {form.imageUrl ? (
                  <div className="relative w-24 h-24 rounded-lg border overflow-hidden bg-secondary/30">
                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                    <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))} className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 hover:bg-destructive hover:text-white transition">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Image"}
                    </div>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Variants</h4>
            <Button variant="outline" size="sm" onClick={addVariant}><Plus className="w-4 h-4" /> Add Variant</Button>
          </div>

          {form.variants.map((v, i) => (
            <Card key={v.id || i} className="bg-secondary/30">
              <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Condition</Label>
                    <Select value={v.condition} onValueChange={val => updateVariant(i, "condition", val)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {DEVICE_CONDITIONS.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>RAM</Label><Input value={v.ram || ""} onChange={e => updateVariant(i, "ram", e.target.value)} placeholder="e.g. 16GB" /></div>
                  <div><Label>Storage</Label><Input value={v.storage || ""} onChange={e => updateVariant(i, "storage", e.target.value)} placeholder="e.g. 256GB" /></div>
                  <div><Label>Color</Label><Input value={v.color || ""} onChange={e => updateVariant(i, "color", e.target.value)} /></div>
                  <div><Label>Price (₦)</Label><Input type="number" value={v.price} onChange={e => updateVariant(i, "price", Number(e.target.value))} /></div>
                  <div><Label>Stock</Label><Input type="number" value={v.stock} onChange={e => updateVariant(i, "stock", Number(e.target.value))} /></div>
                </div>
                <Button variant="ghost" size="sm" className="mt-2 text-red-600" onClick={() => removeVariant(i)}>
                  <Trash2 className="w-3 h-3" /> Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-2">
            <Button onClick={saveProduct}><Save className="w-4 h-4" /> Save</Button>
            <Button variant="outline" onClick={() => { setEditing(null); resetForm(); }}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Store Products ({products.length})</CardTitle>
        <div className="flex gap-2">
          {products.length === 0 && (
            <Button size="sm" variant="outline" onClick={seedDefaults} disabled={seeding}>
              <Download className="w-4 h-4" /> {seeding ? "Loading..." : "Load Default Products"}
            </Button>
          )}
          <Button size="sm" onClick={startNew}><Plus className="w-4 h-4" /> Add Product</Button>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No products yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.variants?.length || 0}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(p)}><Edit className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => deleteProduct(p.id)}><Trash2 className="w-3 h-3" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

/* ===================== STORE ORDERS TAB ===================== */

function StoreOrdersTab({ storeOrders }: { storeOrders: StoreOrder[] }) {
  const [selected, setSelected] = useState<StoreOrder | null>(null);
  const [statusNote, setStatusNote] = useState("");
  const [deliveryContact, setDeliveryContact] = useState("");

  const getStatusLabel = (status: StoreOrderStatus) =>
    STORE_ORDER_STATUSES.find(s => s.id === status)?.label || status;

  const getNextStatuses = (order: StoreOrder): StoreOrderStatus[] => {
    const flow = order.deliveryMethod === "delivery-comfort" ? STORE_DELIVERY_FLOW : STORE_PICKUP_FLOW;
    const currentIdx = flow.indexOf(order.status);
    if (currentIdx === -1 || currentIdx >= flow.length - 1) return [];
    const next: StoreOrderStatus[] = [flow[currentIdx + 1]];
    if (!next.includes("cancelled")) next.push("cancelled");
    return next;
  };

  const updateStoreOrderStatus = async (order: StoreOrder, newStatus: StoreOrderStatus) => {
    const historyEntry = { status: newStatus, timestamp: new Date().toISOString(), note: statusNote || undefined };
    const update: any = {
      status: newStatus,
      statusHistory: [...order.statusHistory, historyEntry],
      updatedAt: serverTimestamp(),
    };
    if (newStatus === "delivery-started" && deliveryContact) {
      update.deliveryContact = deliveryContact;
    }
    await updateDoc(doc(db, "ifixit_store_orders", order.id), update);
    setStatusNote("");
    setDeliveryContact("");
    setSelected({ ...order, ...update, statusHistory: update.statusHistory });
  };

  if (selected) {
    const nextStatuses = getNextStatuses(selected);
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelected(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Store Orders
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Store Order #{selected.id.slice(-8).toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Customer:</span> {selected.customerName}</div>
              <div><span className="text-muted-foreground">Phone:</span> {selected.customerPhone}</div>
              <div><span className="text-muted-foreground">Email:</span> {selected.customerEmail}</div>
              <div><span className="text-muted-foreground">Delivery:</span> {selected.deliveryMethod === "delivery-comfort" ? "Comfort Delivery" : "Station Pickup"}</div>
              {selected.state && <div><span className="text-muted-foreground">Location:</span> {selected.lga}, {selected.state}</div>}
              {selected.address && <div className="col-span-2"><span className="text-muted-foreground">Address:</span> {selected.address}</div>}
              <div><span className="text-muted-foreground">Status:</span> <Badge>{getStatusLabel(selected.status)}</Badge></div>
              {selected.deliveryContact && <div><span className="text-muted-foreground">Delivery Contact:</span> {selected.deliveryContact}</div>}
            </div>

            <Separator />

            <h4 className="font-medium">Items</h4>
            <div className="space-y-2">
              {selected.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                  <div>
                    <span className="font-medium">{item.productName}</span>
                    <span className="text-muted-foreground ml-2">{[item.condition, item.storage, item.color].filter(Boolean).join(" · ")} × {item.quantity}</span>
                  </div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>Subtotal: {formatPrice(selected.subtotal)}</div>
              <div>Delivery: {selected.deliveryFee === 0 ? "FREE" : formatPrice(selected.deliveryFee)}</div>
              <div className="font-bold">Total: {formatPrice(selected.total)}</div>
            </div>

            <Separator />

            {/* Status Update */}
            {nextStatuses.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Update Status</h4>
                <Input placeholder="Status note (optional)" value={statusNote} onChange={e => setStatusNote(e.target.value)} />
                {selected.deliveryMethod === "delivery-comfort" && selected.status === "item-purchased" && (
                  <Input placeholder="Delivery contact phone" value={deliveryContact} onChange={e => setDeliveryContact(e.target.value)} />
                )}
                <div className="flex gap-2 flex-wrap">
                  {nextStatuses.map(s => (
                    <Button
                      key={s}
                      variant={s === "cancelled" ? "destructive" : "default"}
                      size="sm"
                      onClick={() => updateStoreOrderStatus(selected, s)}
                    >
                      {getStatusLabel(s)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Separator />
            <h4 className="font-medium">Status History</h4>
            <div className="space-y-2">
              {selected.statusHistory.map((h, i) => (
                <div key={i} className="text-sm flex gap-2">
                  <span className="text-muted-foreground">{new Date(h.timestamp).toLocaleString("en-NG")}</span>
                  <Badge variant="outline">{getStatusLabel(h.status)}</Badge>
                  {h.note && <span className="text-muted-foreground">— {h.note}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Orders ({storeOrders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {storeOrders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No store orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeOrders.map(order => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => setSelected(order)}>
                  <TableCell className="font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="text-xs">{order.items.map(i => i.productName).join(", ")}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{order.deliveryMethod === "delivery-comfort" ? "Delivery" : "Pickup"}</Badge></TableCell>
                  <TableCell><Badge variant="secondary">{getStatusLabel(order.status)}</Badge></TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
