import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShoppingCart, Filter, Plus, Minus, Trash2, MapPin, Truck, Package, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DEVICE_CONDITIONS, formatPrice, DEFAULT_MINIMUM_PICKUP_FEE } from "../../data/constants";
import { getStates, getLGAsForState } from "../../data/nigerianStatesLGAs";
import type { StoreProduct, StoreProductVariant, SiteSettings, CartItem, StoreCheckoutData, StoreDeliveryMethod } from "../../types";
import type { DeviceCondition } from "../../data/constants";

export const DEFAULT_SHOWCASE: StoreProduct[] = [
  {
    id: "default-1",
    name: "iPhone 14",
    description: "Stunning design with advanced camera system. Available in multiple colors and storage options.",
    category: "iPhone",
    imageUrl: "/store/iphone-14.jpg",
    variants: [
      { id: "d1v1", condition: "uk-used", storage: "128GB", color: "Blue", price: 350000, stock: 3 },
      { id: "d1v2", condition: "uk-used", storage: "256GB", color: "Blue", price: 420000, stock: 2 },
      { id: "d1v3", condition: "brand-new", storage: "128GB", color: "Midnight", price: 520000, stock: 2 },
      { id: "d1v4", condition: "naija-used", storage: "128GB", color: "Blue", price: 280000, stock: 4 },
    ],
  },
  {
    id: "default-2",
    name: "iPhone 14 Pro",
    description: "Pro camera system with 48MP. Dynamic Island. Always-On display. A16 Bionic chip.",
    category: "iPhone",
    imageUrl: "/store/iphone-14-pro.jpg",
    variants: [
      { id: "d2v1", condition: "uk-used", storage: "128GB", color: "Deep Purple", price: 520000, stock: 2 },
      { id: "d2v2", condition: "uk-used", storage: "256GB", color: "Deep Purple", price: 600000, stock: 1 },
      { id: "d2v3", condition: "brand-new", storage: "256GB", color: "Space Black", price: 780000, stock: 1 },
      { id: "d2v4", condition: "open-box", storage: "128GB", color: "Gold", price: 580000, stock: 1 },
    ],
  },
  {
    id: "default-3",
    name: "MacBook Pro 14\u2033",
    description: "Supercharged by M2 Pro or M2 Max. Up to 22 hours of battery life. Stunning Liquid Retina XDR display.",
    category: "MacBook",
    imageUrl: "/store/macbook-pro.png",
    variants: [
      { id: "d3v1", condition: "uk-used", ram: "16GB", storage: "512GB", color: "Space Gray", price: 850000, stock: 1 },
      { id: "d3v2", condition: "uk-used", ram: "16GB", storage: "1TB", color: "Silver", price: 1050000, stock: 1 },
      { id: "d3v3", condition: "brand-new", ram: "16GB", storage: "512GB", color: "Space Gray", price: 1250000, stock: 1 },
    ],
  },
  {
    id: "default-4",
    name: "Apple Watch Ultra",
    description: "The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.",
    category: "Apple Watch",
    imageUrl: "/store/apple-watch-ultra.jpg",
    variants: [
      { id: "d4v1", condition: "uk-used", color: "Orange Alpine Loop", price: 380000, stock: 2 },
      { id: "d4v2", condition: "brand-new", color: "Green Alpine Loop", price: 550000, stock: 1 },
    ],
  },
  {
    id: "default-5",
    name: "MacBook Air M2",
    description: "Impossibly thin. Incredibly powerful. Strikingly beautiful. M2 chip with up to 18 hours of battery.",
    category: "MacBook",
    imageUrl: "/store/macbook-air.png",
    variants: [
      { id: "d5v1", condition: "uk-used", ram: "8GB", storage: "256GB", color: "Midnight", price: 550000, stock: 2 },
      { id: "d5v2", condition: "uk-used", ram: "16GB", storage: "512GB", color: "Starlight", price: 750000, stock: 1 },
      { id: "d5v3", condition: "brand-new", ram: "8GB", storage: "256GB", color: "Midnight", price: 850000, stock: 2 },
      { id: "d5v4", condition: "naija-used", ram: "8GB", storage: "256GB", color: "Silver", price: 420000, stock: 3 },
    ],
  },
  {
    id: "default-6",
    name: "iPhone 15",
    description: "Dynamic Island. 48MP camera. USB-C. A16 Bionic chip. All in a durable color-infused glass design.",
    category: "iPhone",
    imageUrl: "/store/iphone-14.jpg",
    variants: [
      { id: "d6v1", condition: "brand-new", storage: "128GB", color: "Blue", price: 680000, stock: 3 },
      { id: "d6v2", condition: "brand-new", storage: "256GB", color: "Pink", price: 780000, stock: 2 },
      { id: "d6v3", condition: "uk-used", storage: "128GB", color: "Black", price: 480000, stock: 2 },
      { id: "d6v4", condition: "open-box", storage: "128GB", color: "Green", price: 620000, stock: 1 },
    ],
  },
  {
    id: "default-7",
    name: "iPad Pro 12.9\u2033",
    description: "The ultimate iPad experience. M2 chip, Liquid Retina XDR display, Thunderbolt connectivity.",
    category: "iPad",
    imageUrl: "/store/ipad-pro.svg",
    variants: [
      { id: "d7v1", condition: "uk-used", ram: "8GB", storage: "128GB", color: "Space Gray", price: 620000, stock: 2 },
      { id: "d7v2", condition: "uk-used", ram: "8GB", storage: "256GB", color: "Silver", price: 720000, stock: 1 },
      { id: "d7v3", condition: "brand-new", ram: "8GB", storage: "128GB", color: "Space Gray", price: 920000, stock: 1 },
      { id: "d7v4", condition: "naija-used", ram: "8GB", storage: "128GB", color: "Space Gray", price: 450000, stock: 2 },
    ],
  },
  {
    id: "default-8",
    name: "AirPods Pro (2nd Gen)",
    description: "Adaptive Audio. Personalized Spatial Audio. Up to 2x more Active Noise Cancellation. USB-C charging.",
    category: "AirPods",
    imageUrl: "/store/airpods-pro.svg",
    variants: [
      { id: "d8v1", condition: "brand-new", color: "White", price: 180000, stock: 5 },
      { id: "d8v2", condition: "uk-used", color: "White", price: 110000, stock: 3 },
      { id: "d8v3", condition: "naija-used", color: "White", price: 75000, stock: 4 },
    ],
  },
  {
    id: "default-9",
    name: "Apple Watch SE (2nd Gen)",
    description: "All the essentials. Light on price. S8 chip. Crash detection. Swimproof design.",
    category: "Apple Watch",
    imageUrl: "/store/apple-watch-ultra.jpg",
    variants: [
      { id: "d9v1", condition: "brand-new", color: "Midnight Sport Band", price: 190000, stock: 3 },
      { id: "d9v2", condition: "uk-used", color: "Starlight Sport Band", price: 120000, stock: 2 },
      { id: "d9v3", condition: "naija-used", color: "Midnight Sport Band", price: 85000, stock: 2 },
    ],
  },
  {
    id: "default-10",
    name: "iPad Air M1",
    description: "Powerful. Colorful. Wonderful. M1 chip, 10.9\u2033 Liquid Retina display, 5G capable.",
    category: "iPad",
    imageUrl: "/store/ipad-air.svg",
    variants: [
      { id: "d10v1", condition: "uk-used", ram: "8GB", storage: "64GB", color: "Blue", price: 350000, stock: 2 },
      { id: "d10v2", condition: "brand-new", ram: "8GB", storage: "256GB", color: "Purple", price: 580000, stock: 1 },
      { id: "d10v3", condition: "naija-used", ram: "8GB", storage: "64GB", color: "Space Gray", price: 260000, stock: 3 },
    ],
  },
];

type StoreView = "browse" | "detail" | "cart" | "checkout";

interface StorePageProps {
  products: StoreProduct[];
  settings: SiteSettings | null;
  user: any;
  onBack: () => void;
  onCheckout: (data: StoreCheckoutData) => void;
}

export function StorePage({ products, settings, user, onBack, onCheckout }: StorePageProps) {
  const displayProducts = products.length > 0 ? products : DEFAULT_SHOWCASE;
  const isShowcase = products.length === 0;

  // Filters
  const [conditionFilter, setConditionFilter] = useState<DeviceCondition | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Navigation
  const [storeView, setStoreView] = useState<StoreView>("browse");
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<StoreProductVariant | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Checkout delivery
  const [deliveryMethod, setDeliveryMethod] = useState<StoreDeliveryMethod>("pickup-station");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryLGA, setDeliveryLGA] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState(user?.displayName || "");
  const [customerPhone, setCustomerPhone] = useState("");

  const categories = [...new Set(displayProducts.map(p => p.category))];

  const filtered = displayProducts.filter(p => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (conditionFilter !== "all") {
      return p.variants?.some(v => v.condition === conditionFilter && v.stock > 0);
    }
    return true;
  });

  const getAvailableVariants = (product: StoreProduct) => {
    if (!product.variants) return [];
    if (conditionFilter !== "all") return product.variants.filter(v => v.condition === conditionFilter && v.stock > 0);
    return product.variants.filter(v => v.stock > 0);
  };

  const getLowestPrice = (product: StoreProduct) => {
    const available = getAvailableVariants(product);
    if (available.length === 0) return null;
    return Math.min(...available.map(v => v.price));
  };

  // Cart helpers
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  const addToCart = (product: StoreProduct, variant: StoreProductVariant) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.variant.id === variant.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.variant.id === variant.id
            ? { ...i, quantity: Math.min(i.quantity + 1, variant.stock) }
            : i
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.product.id === productId && i.variant.id === variantId) {
            const newQty = i.quantity + delta;
            if (newQty <= 0) return null;
            return { ...i, quantity: Math.min(newQty, i.variant.stock) };
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.variant.id === variantId)));
  };

  // Delivery fee calculation
  const deliveryFee = useMemo(() => {
    if (deliveryMethod === "pickup-station") return 0;
    if (!deliveryLGA) return 0;
    const lgaPricing = settings?.lgaPickupPricing || {};
    return lgaPricing[deliveryLGA] || settings?.minimumPickupFee || settings?.minPickupFee || DEFAULT_MINIMUM_PICKUP_FEE;
  }, [deliveryMethod, deliveryLGA, settings]);

  const cartTotal = cartSubtotal + deliveryFee;

  const states = getStates();
  const lgas = deliveryState ? getLGAsForState(deliveryState) : [];

  const canCheckout =
    cart.length > 0 &&
    customerName.trim() &&
    customerPhone.trim() &&
    (deliveryMethod === "pickup-station" || (deliveryState && deliveryLGA && deliveryAddress.trim()));

  const handleCheckout = () => {
    if (!canCheckout) return;
    onCheckout({
      items: cart,
      deliveryMethod,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      state: deliveryState || undefined,
      lga: deliveryLGA || undefined,
      address: deliveryAddress.trim() || undefined,
      deliveryFee,
      subtotal: cartSubtotal,
      total: cartTotal,
    });
  };

  // ─── Product Detail View ───
  if (storeView === "detail" && selectedProduct) {
    const variants = getAvailableVariants(selectedProduct);
    return (
      <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => { setStoreView("browse"); setSelectedProduct(null); setSelectedVariant(null); }}>
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Button>
            <CartButton count={cartCount} onClick={() => setStoreView("cart")} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {selectedProduct.imageUrl ? (
              <div className="bg-background dark:bg-secondary/30 rounded-2xl p-8 flex items-center justify-center">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="max-h-80 object-contain" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-8 flex items-center justify-center">
                <Package className="w-24 h-24 text-primary/30" />
              </div>
            )}
            <div>
              <Badge variant="secondary">{selectedProduct.category}</Badge>
              <h1 className="text-2xl font-bold mt-2">{selectedProduct.name}</h1>
              <p className="text-muted-foreground mt-2">{selectedProduct.description}</p>

              {selectedVariant && (
                <p className="text-3xl font-bold text-primary mt-4">{formatPrice(selectedVariant.price)}</p>
              )}

              <Separator className="my-6" />

              <h3 className="font-medium mb-3">Select Variant</h3>
              <div className="space-y-2">
                {variants.map(v => {
                  const condName = DEVICE_CONDITIONS.find(c => c.id === v.condition)?.label || v.condition;
                  const label = [condName, v.ram, v.storage, v.color].filter(Boolean).join(" · ");
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{label}</span>
                        <div className="text-right">
                          <span className="font-semibold">{formatPrice(v.price)}</span>
                          <span className="text-xs text-muted-foreground ml-2">({v.stock} left)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {variants.length === 0 && <p className="text-muted-foreground">No variants available for current filter.</p>}

              {selectedVariant && (
                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={() => {
                    addToCart(selectedProduct, selectedVariant);
                    setSelectedVariant(null);
                  }}
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart — {formatPrice(selectedVariant.price)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Cart View ───
  if (storeView === "cart") {
    return (
      <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Button variant="ghost" onClick={() => setStoreView("browse")} className="mb-6">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Button>

          <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount} item{cartCount !== 1 ? "s" : ""})</h1>

          {cart.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-4">Browse our store to add devices.</p>
                <Button onClick={() => setStoreView("browse")}>Browse Store</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map(item => {
                  const condName = DEVICE_CONDITIONS.find(c => c.id === item.variant.condition)?.label || item.variant.condition;
                  const variantLabel = [condName, item.variant.ram, item.variant.storage, item.variant.color].filter(Boolean).join(" · ");
                  return (
                    <Card key={`${item.product.id}-${item.variant.id}`}>
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          {item.product.imageUrl && (
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-contain rounded-lg bg-background dark:bg-secondary/30 p-1" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{item.product.name}</h3>
                            <p className="text-xs text-muted-foreground">{variantLabel}</p>
                            <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.variant.price)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.variant.id, -1)}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.variant.id, 1)}>
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(item.product.id, item.variant.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card>
                <CardContent className="py-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <Separator className="my-3" />
                  <Button className="w-full" size="lg" onClick={() => setStoreView("checkout")}>
                    Proceed to Checkout <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── Checkout View ───
  if (storeView === "checkout") {
    return (
      <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <Button variant="ghost" onClick={() => setStoreView("cart")} className="mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Button>

          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <h2 className="font-semibold mb-3">Order Summary</h2>
              {cart.map(item => {
                const condName = DEVICE_CONDITIONS.find(c => c.id === item.variant.condition)?.label || item.variant.condition;
                const variantLabel = [condName, item.variant.storage, item.variant.color].filter(Boolean).join(" · ");
                return (
                  <div key={`${item.product.id}-${item.variant.id}`} className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">{item.product.name} ({variantLabel}) × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.variant.price * item.quantity)}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mb-6">
            <CardContent className="py-4 space-y-4">
              <h2 className="font-semibold">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your full name" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="08012345678" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Method */}
          <Card className="mb-6">
            <CardContent className="py-4 space-y-4">
              <h2 className="font-semibold">Delivery Method</h2>

              <div className="grid sm:grid-cols-2 gap-3">
                <div
                  onClick={() => { setDeliveryMethod("pickup-station"); setDeliveryState(""); setDeliveryLGA(""); setDeliveryAddress(""); }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "pickup-station" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${deliveryMethod === "pickup-station" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Pick at Station</p>
                      <p className="text-xs text-green-600 font-medium">FREE</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Pick up your device(s) at our repair station</p>
                </div>

                <div
                  onClick={() => setDeliveryMethod("delivery-comfort")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === "delivery-comfort" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${deliveryMethod === "delivery-comfort" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Comfort Delivery</p>
                      <p className="text-xs text-muted-foreground font-medium">Fee based on location</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">We deliver to your doorstep anywhere in Nigeria</p>
                </div>
              </div>

              {/* Delivery address fields */}
              <AnimatePresence>
                {deliveryMethod === "delivery-comfort" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-2">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label>State</Label>
                          <Select value={deliveryState} onValueChange={v => { setDeliveryState(v); setDeliveryLGA(""); }}>
                            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                            <SelectContent>
                              {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>LGA</Label>
                          <Select value={deliveryLGA} onValueChange={setDeliveryLGA} disabled={!deliveryState}>
                            <SelectTrigger><SelectValue placeholder="Select LGA" /></SelectTrigger>
                            <SelectContent>
                              {lgas.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Delivery Address</Label>
                        <Textarea value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} placeholder="Enter your full delivery address" rows={2} />
                      </div>
                      {deliveryLGA && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-sm">Delivery fee to <strong>{deliveryLGA}, {deliveryState}</strong>: <strong className="text-primary">{formatPrice(deliveryFee)}</strong></span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <h2 className="font-semibold mb-3">Payment Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" disabled={!canCheckout} onClick={handleCheckout}>
            Pay {formatPrice(cartTotal)} <ChevronRight className="w-4 h-4" />
          </Button>

          {!canCheckout && cart.length > 0 && (
            <p className="text-xs text-muted-foreground text-center mt-2">Please fill in all required fields to proceed.</p>
          )}
        </div>
      </div>
    );
  }

  // ─── Browse View (default) ───
  return (
    <div className="min-h-screen bg-secondary/20 dark:bg-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
          <CartButton count={cartCount} onClick={() => setStoreView("cart")} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Device Store</h1>
          </div>
          <div className="flex gap-2">
            <Select value={conditionFilter} onValueChange={v => setConditionFilter(v as any)}>
              <SelectTrigger className="w-40"><Filter className="w-4 h-4 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {DEVICE_CONDITIONS.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {categories.length > 1 && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No products available</p>
              <p className="text-sm text-muted-foreground">Check back later for new arrivals.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => {
              const lowestPrice = getLowestPrice(product);
              const variantCount = getAvailableVariants(product).length;
              const conditionsInProduct = [...new Set(product.variants.map(v => v.condition))];
              return (
                <motion.div key={product.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Card className="cursor-pointer overflow-hidden h-full" onClick={() => { setSelectedProduct(product); setStoreView("detail"); }}>
                    {product.imageUrl ? (
                      <div className="h-48 bg-background dark:bg-secondary/30 flex items-center justify-center p-4">
                        <img src={product.imageUrl} alt={product.name} className="max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 flex items-center justify-center">
                        <Package className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-1 flex-wrap mb-2">
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        {conditionsInProduct.map(c => {
                          const cond = DEVICE_CONDITIONS.find(d => d.id === c);
                          return (
                            <Badge
                              key={c}
                              variant={c === "brand-new" ? "default" : "outline"}
                              className={`text-[10px] ${c === "brand-new" ? "bg-green-600 hover:bg-green-700" : ""}`}
                            >
                              {cond?.label || c}
                            </Badge>
                          );
                        })}
                      </div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        {lowestPrice ? (
                          <span className="text-lg font-bold text-primary">From {formatPrice(lowestPrice)}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Out of stock</span>
                        )}
                        <span className="text-xs text-muted-foreground">{variantCount} variant{variantCount !== 1 ? "s" : ""}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Cart Button Component ───
function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" className="relative" onClick={onClick}>
      <ShoppingCart className="w-4 h-4" />
      <span className="ml-1">Cart</span>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Button>
  );
}
