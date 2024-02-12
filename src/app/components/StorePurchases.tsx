import { useState } from "react";
import { ArrowLeft, CheckCircle, Circle, Clock, Phone, Truck, MapPin, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  formatPrice,
  STORE_ORDER_STATUSES,
  STORE_DELIVERY_FLOW,
  STORE_PICKUP_FLOW,
} from "../../data/constants";
import type { StoreOrder, StoreOrderStatus, SiteSettings } from "../../types";

function formatFirestoreDate(val: any): string {
  if (!val) return "";
  if (val?.toDate) return val.toDate().toLocaleDateString("en-NG", { dateStyle: "medium" });
  if (val?.seconds) return new Date(val.seconds * 1000).toLocaleDateString("en-NG", { dateStyle: "medium" });
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d.toLocaleDateString("en-NG", { dateStyle: "medium" });
  return "";
}

interface StorePurchasesProps {
  orders: StoreOrder[];
  settings: SiteSettings | null;
  onBack: () => void;
}

export function StorePurchases({ orders, settings, onBack }: StorePurchasesProps) {
  const [selected, setSelected] = useState<StoreOrder | null>(null);

  const getStatusFlow = (order: StoreOrder): StoreOrderStatus[] => {
    return order.deliveryMethod === "delivery-comfort" ? STORE_DELIVERY_FLOW : STORE_PICKUP_FLOW;
  };

  const getStatusLabel = (status: StoreOrderStatus) => {
    return STORE_ORDER_STATUSES.find(s => s.id === status)?.label || status;
  };

  const getStatusBadge = (status: StoreOrderStatus): { variant: "default" | "secondary" | "destructive" | "outline"; className: string } => {
    if (status === "purchase-completed") return { variant: "secondary", className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800" };
    if (status === "cancelled") return { variant: "destructive", className: "" };
    return { variant: "secondary", className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800" };
  };

  // Selected order detail
  if (selected) {
    const flow = getStatusFlow(selected);
    const currentIdx = flow.indexOf(selected.status);

    return (
      <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Button variant="ghost" onClick={() => setSelected(null)} className="mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Purchases
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Purchase #{selected.id.slice(-8).toUpperCase()}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{formatFirestoreDate(selected.createdAt)}</p>
                </div>
                <Badge {...getStatusBadge(selected.status)}>
                  {getStatusLabel(selected.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status progress */}
              <div className="space-y-3">
                {flow.map((status, i) => {
                  const reached = i <= currentIdx;
                  const isCurrent = status === selected.status;
                  return (
                    <div key={status} className={`flex items-center gap-3 ${reached ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {reached ? (
                        <CheckCircle className={`w-5 h-5 shrink-0 ${isCurrent ? "text-primary" : "text-green-600"}`} />
                      ) : (
                        <Circle className="w-5 h-5 shrink-0" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${isCurrent ? "text-primary" : ""}`}>{getStatusLabel(status)}</p>
                        {isCurrent && (
                          <p className="text-xs text-muted-foreground">
                            {STORE_ORDER_STATUSES.find(s => s.id === status)?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Order items */}
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-2">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {[item.condition, item.storage, item.color].filter(Boolean).join(" · ")} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Delivery info */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Delivery Method: </span>
                  <span className="font-medium">
                    {selected.deliveryMethod === "delivery-comfort" ? "Comfort Delivery" : "Pick at Station"}
                  </span>
                </div>
                {selected.state && (
                  <div>
                    <span className="text-muted-foreground">Location: </span>
                    <span className="font-medium">{selected.lga}, {selected.state}</span>
                  </div>
                )}
                {selected.address && (
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Address: </span>
                    <span className="font-medium">{selected.address}</span>
                  </div>
                )}
              </div>

              {/* Delivery contact (shown when delivery has started) */}
              {selected.deliveryMethod === "delivery-comfort" && selected.deliveryContact && (
                <>
                  <Separator />
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <h3 className="font-medium text-sm">Delivery Contact</h3>
                    </div>
                    <p className="text-sm"><Phone className="w-3 h-3 inline mr-1" /> {selected.deliveryContact}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Payment summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(selected.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{selected.deliveryFee === 0 ? "FREE" : formatPrice(selected.deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span className="text-primary">{formatPrice(selected.total)}</span>
                </div>
              </div>

              {/* Status history */}
              {selected.statusHistory && selected.statusHistory.length > 0 && (
                <>
                  <Separator />
                  <h3 className="font-medium">Status History</h3>
                  <div className="space-y-2">
                    {selected.statusHistory.map((h, i) => (
                      <div key={i} className="text-sm flex gap-2 items-center">
                        <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">{new Date(h.timestamp).toLocaleString("en-NG")}</span>
                        <Badge variant="outline" className="text-xs">{getStatusLabel(h.status)}</Badge>
                        {h.note && <span className="text-muted-foreground">— {h.note}</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Orders list
  return (
    <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>

        <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No purchases yet</p>
              <p className="text-sm text-muted-foreground">Your store orders will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map(order => {
              const badge = getStatusBadge(order.status);
              const itemNames = order.items.map(i => i.productName).join(", ");
              return (
                <Card key={order.id} className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelected(order)}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(-8).toUpperCase()}</span>
                      <Badge {...badge}>{getStatusLabel(order.status)}</Badge>
                    </div>
                    <p className="font-medium text-sm truncate">{itemNames}</p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">{formatFirestoreDate(order.createdAt)}</span>
                      <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {order.deliveryMethod === "delivery-comfort" ? (
                        <Badge variant="outline" className="text-[10px]"><Truck className="w-3 h-3 mr-1" /> Delivery</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]"><MapPin className="w-3 h-3 mr-1" /> Station Pickup</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
