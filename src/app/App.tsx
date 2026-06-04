import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { doc, collection, query, where, onSnapshot, addDoc, updateDoc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { RepairBooking } from "./components/RepairBooking";
import { ServiceRequest, SERVICE_DEFS } from "./components/ServiceRequest";
import { AuthModal } from "./components/AuthModal";
import { OrderTracker } from "./components/OrderTracker";
import { AdminDashboard } from "./components/AdminDashboard";
import { StorePage } from "./components/StorePage";
import { StorePurchases } from "./components/StorePurchases";
import { sendOrderConfirmation } from "../utils/emailService";
import { PAYSTACK_PUBLIC_KEY } from "../config/paystack";
import { formatPrice } from "../data/constants";
import type { RepairOrder, SiteSettings, StoreProduct, UserProfile, StoreCheckoutData, StoreOrder } from "../types";

type View = "home" | "booking" | "tracking" | "admin" | "store" | "store-purchases";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [storeOrders, setStoreOrders] = useState<StoreOrder[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<string | undefined>();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Auth listener — block unverified email users
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u && !u.emailVerified) {
        // Google users are always verified; email/password users must verify first
        const isGoogleUser = u.providerData.some((p) => p.providerId === "google.com");
        const isAdminBypass = u.email === "admin@hairsparadise.com";
        if (!isGoogleUser && !isAdminBypass) {
          signOut(auth);
          return;
        }
      }
      setUser(u);
      if (!u) { setUserProfile(null); setOrders([]); }
    });
  }, []);

  // User profile listener
  useEffect(() => {
    if (!user) return;
    return onSnapshot(doc(db, "ifixit_users", user.uid), (snap) => {
      if (snap.exists()) setUserProfile({ id: snap.id, ...snap.data() } as UserProfile);
    });
  }, [user]);

  // Settings listener — create defaults if missing
  useEffect(() => {
    const settingsRef = doc(db, "ifixit_settings", "main");
    return onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) {
        setSettings({ id: snap.id, ...snap.data() } as SiteSettings);
      } else if (user?.email) {
        // First time setup: create default settings with current user as admin
        setDoc(settingsRef, {
          businessName: "PCFIXTECH",
          address: "5846 ACCENT DRIVE, Indianapolis, IN, 46221, USA",
          phone: "+13179268452",
          whatsapp: "https://wa.me/13179268452",
          email: user.email,
          adminEmails: [user.email],
          enableNonApple: true,
          enableStore: false,
          enablePickupComfort: true,
          enablePhysical: true,
          enablePickupLocal: true,
          overstayEnabled: true,
          overstayGraceDays: 3,
          overstayFeePerDay: 300,
          createdAt: serverTimestamp(),
        });
      }
    });
  }, [user]);

  // Dynamic favicon from settings
  useEffect(() => {
    if (settings?.faviconUrl) {
      const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (link) {
        link.type = "image/png";
        link.href = settings.faviconUrl;
      }
    }
  }, [settings?.faviconUrl]);

  // User's orders listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "ifixit_orders"), where("userId", "==", user.uid));
    return onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as RepairOrder)).sort((a, b) => {
        const ta = typeof a.createdAt === "string" ? new Date(a.createdAt).getTime() : a.createdAt?.toMillis?.() || 0;
        const tb = typeof b.createdAt === "string" ? new Date(b.createdAt).getTime() : b.createdAt?.toMillis?.() || 0;
        return tb - ta;
      }));
    });
  }, [user]);

  // Products listener
  useEffect(() => {
    return onSnapshot(collection(db, "ifixit_products"), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() } as StoreProduct)));
    });
  }, []);

  // Store orders listener (user's purchase history)
  useEffect(() => {
    if (!user) { setStoreOrders([]); return; }
    const q = query(collection(db, "ifixit_store_orders"), where("userId", "==", user.uid));
    return onSnapshot(q, (snap) => {
      setStoreOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as StoreOrder)).sort((a, b) => {
        const ta = typeof a.createdAt === "string" ? new Date(a.createdAt).getTime() : a.createdAt?.toMillis?.() || 0;
        const tb = typeof b.createdAt === "string" ? new Date(b.createdAt).getTime() : b.createdAt?.toMillis?.() || 0;
        return tb - ta;
      }));
    });
  }, [user]);

  const requireAuth = useCallback((action: () => void) => {
    if (user) { action(); } else { setPendingAction(() => action); setShowAuth(true); }
  }, [user]);

  const handleBookRepair = (category?: string) => {
    requireAuth(() => { setBookingCategory(category); setView("booking"); });
  };

  const handleRequestService = (serviceId: string) => {
    requireAuth(() => setActiveServiceId(serviceId));
  };

  const handleSubmitServiceRequest = async (data: any) => {
    if (!user) throw new Error("Please sign in to submit a request.");
    await addDoc(collection(db, "ifixit_service_requests"), {
      serviceId: data.serviceId,
      serviceTitle: data.serviceTitle,
      fields: data.fields,
      details: data.details,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      userId: user.uid,
      status: "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const handleTrackOrder = () => {
    requireAuth(() => setView("tracking"));
  };

  const loadPaystackScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).PaystackPop) { resolve(); return; }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Paystack"));
      document.head.appendChild(script);
    });
  };

  const handleSubmitOrder = async (rawData: any) => {
    if (!user) return;

    // Map fields from RepairBooking to RepairOrder shape
    const customerName = rawData.customerName || rawData.fullName || user.displayName || "";
    const customerEmail = rawData.customerEmail || rawData.email || user.email || "";
    const customerPhone = rawData.customerPhone || rawData.phone || "";

    const totalAmount = rawData.totalInitialPayment || 0;
    if (totalAmount <= 0) {
      alert("Invalid payment amount. Please review your order.");
      return;
    }

    try {
      await loadPaystackScript();
    } catch {
      alert("Failed to load payment gateway. Please check your internet connection.");
      return;
    }

    const amount = Math.round(totalAmount * 100); // kobo

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customerEmail,
      amount,
      currency: "NGN",
      metadata: { custom_fields: [{ display_name: "Device", variable_name: "device", value: rawData.deviceModel }] },
      callback: function (response: any) {
        const order = {
          deviceCategory: rawData.deviceCategory,
          isApple: rawData.isApple,
          deviceModel: rawData.deviceModel,
          deviceBrand: rawData.deviceBrand || null,
          selectedIssues: rawData.selectedIssues,
          additionalNotes: rawData.additionalNotes || "",
          deliveryMethod: rawData.deliveryMethod,
          state: rawData.state,
          lga: rawData.lga,
          address: rawData.address || "",
          serviceFee: rawData.serviceFee,
          pickupFee: rawData.pickupFee,
          totalInitialPayment: rawData.totalInitialPayment,
          customerName,
          customerEmail,
          customerPhone,
          userId: user.uid,
          status: "order-placed" as const,
          statusHistory: [{ status: "order-placed" as const, timestamp: new Date().toISOString(), note: "Order placed and payment confirmed" }],
          paymentReference: response.reference,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        addDoc(collection(db, "ifixit_orders"), order).then((docRef) => {
          if (customerEmail) {
            sendOrderConfirmation(customerEmail, docRef.id, rawData.deviceModel, rawData.totalInitialPayment);
          }
          setView("tracking");
        });
      },
      onClose: function () {},
    });
    handler.openIframe();
  };

  const handlePayRepairFee = async (order: RepairOrder) => {
    await loadPaystackScript();
    const amount = (order.repairFee || order.estimatedRepairCost || 0) * 100;

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: order.customerEmail || user?.email,
      amount,
      currency: "NGN",
      metadata: { custom_fields: [{ display_name: "Order", variable_name: "order_id", value: order.id }] },
      callback: function (response: any) {
        updateDoc(doc(db, "ifixit_orders", order.id), {
          status: "repair-started",
          repairPaymentReference: response.reference,
          statusHistory: [...order.statusHistory, { status: "repair-started" as const, timestamp: new Date().toISOString(), note: "Repair fee paid" }],
          updatedAt: serverTimestamp(),
        });
      },
      onClose: function () {},
    });
    handler.openIframe();
  };

  const handleStoreCheckout = async (data: StoreCheckoutData) => {
    requireAuth(async () => {
      if (data.total <= 0) {
        alert("Invalid payment amount.");
        return;
      }
      await loadPaystackScript();
      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: Math.round(data.total * 100),
        currency: "NGN",
        metadata: {
          custom_fields: [
            { display_name: "Order Type", variable_name: "type", value: "store" },
            { display_name: "Items", variable_name: "items", value: data.items.map(i => i.product.name).join(", ") },
          ],
        },
        callback: function (response: any) {
          addDoc(collection(db, "ifixit_store_orders"), {
            userId: user.uid,
            customerName: data.customerName,
            customerEmail: user.email,
            customerPhone: data.customerPhone,
            items: data.items.map(i => ({
              productId: i.product.id,
              productName: i.product.name,
              variantId: i.variant.id,
              condition: i.variant.condition,
              ram: i.variant.ram || null,
              storage: i.variant.storage || null,
              color: i.variant.color || null,
              price: i.variant.price,
              quantity: i.quantity,
            })),
            deliveryMethod: data.deliveryMethod,
            state: data.state || null,
            lga: data.lga || null,
            address: data.address || null,
            subtotal: data.subtotal,
            deliveryFee: data.deliveryFee,
            total: data.total,
            paymentReference: response.reference,
            status: "item-purchased",
            statusHistory: [{ status: "item-purchased", timestamp: new Date().toISOString(), note: "Payment confirmed" }],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }).then(() => {
            setView("store-purchases");
          });
        },
        onClose: function () {},
      });
      handler.openIframe();
    });
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    if (pendingAction) { pendingAction(); setPendingAction(null); }
  };

  const isAdmin = userProfile?.role === "admin" || userProfile?.isAdmin === true || (settings?.adminEmails || []).includes(user?.email || "");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        user={user}
        isAdmin={isAdmin}
        storeEnabled={settings?.enableStore ?? false}
        logoUrl={settings?.logoUrl}
        currentView={view}
        onBookRepair={() => handleBookRepair()}
        onTrackOrder={handleTrackOrder}
        onLogin={() => setShowAuth(true)}
        onLogout={() => signOut(auth)}
        onAdminClick={() => setView("admin")}
        onStoreClick={() => setView("store")}
        onPurchasesClick={() => requireAuth(() => setView("store-purchases"))}
        onHomeClick={() => setView("home")}
      />

      {view === "home" && (
        <>
          <Hero onBookRepair={() => handleBookRepair()} onLearnMore={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} enableVideo={settings?.enableHeroVideo ?? false} logoUrl={settings?.logoUrl} />
          <Services onBookRepair={() => handleBookRepair()} onRequestService={handleRequestService} showAppleRepair={settings?.enableAppleRepair !== false} />
          <HowItWorks />
          <Features />
          <Contact settings={settings || undefined} />
          <Footer settings={settings || undefined} onBookRepair={() => handleBookRepair()} logoUrl={settings?.logoUrl} />
        </>
      )}

      {view === "booking" && (
        <RepairBooking
          isOpen={true}
          onClose={() => setView("home")}
          user={user}
          onLogin={() => setShowAuth(true)}
          settings={settings}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {view === "tracking" && (
        <OrderTracker
          orders={orders}
          settings={settings}
          onBack={() => setView("home")}
          onPayRepairFee={handlePayRepairFee}
        />
      )}

      {view === "admin" && isAdmin && (
        <AdminDashboard onBack={() => setView("home")} />
      )}

      {view === "store" && (
        <StorePage
          products={products}
          settings={settings}
          user={user}
          onBack={() => setView("home")}
          onCheckout={handleStoreCheckout}
        />
      )}

      {view === "store-purchases" && (
        <StorePurchases
          orders={storeOrders}
          settings={settings}
          onBack={() => setView("home")}
        />
      )}

      {showAuth && (
        <AuthModal isOpen={true} onClose={() => { setShowAuth(false); setPendingAction(null); }} onSuccess={handleAuthSuccess} />
      )}

      {activeServiceId && SERVICE_DEFS[activeServiceId] && (
        <ServiceRequest
          service={SERVICE_DEFS[activeServiceId]}
          user={user}
          onClose={() => setActiveServiceId(null)}
          onLogin={() => setShowAuth(true)}
          onSubmit={handleSubmitServiceRequest}
        />
      )}
    </div>
  );
}
