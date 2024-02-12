// Pricing, delivery, and business constants

export const DEFAULT_SERVICE_FEE_APPLE = 10000; // ₦10,000
export const DEFAULT_SERVICE_FEE_NON_APPLE = 5000; // ₦5,000
export const DEFAULT_MINIMUM_PICKUP_FEE = 3000; // ₦3,000 (same LGA)
export const DEFAULT_PICKUP_LOCAL_FEE = 2000; // ₦2,000 (flat for Local)
export const DEFAULT_OVERSTAY_FEE_PER_DAY = 300; // ₦300 per day after 3 days
export const DEFAULT_OVERSTAY_GRACE_DAYS = 3;

export type DeliveryMethod = "pickup-comfort" | "physical" | "pickup-local";

export interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "pickup-comfort",
    name: "Pickup Comfort",
    description: "Our agent picks up your device from your location with premium handling",
    icon: "Truck",
  },
  {
    id: "physical",
    name: "Physical (At Repair Station)",
    description: "Bring your device to our repair station directly",
    icon: "MapPin",
  },
  {
    id: "pickup-local",
    name: "Pickup Local",
    description: "Budget-friendly pickup from your local area",
    icon: "Package",
  },
];

// Order status flow
export type OrderStatus =
  | "order-placed"
  | "delivery-started"
  | "item-picked-up"
  | "service-started"
  | "service-completed"
  | "awaiting-repair-payment"
  | "repair-payment-completed"
  | "repair-started"
  | "repair-completed"
  | "ready-for-return"
  | "return-in-progress"
  | "completed"
  | "cancelled";

export interface OrderStatusInfo {
  id: OrderStatus;
  label: string;
  description: string;
  step: number;
}

export const ORDER_STATUS_FLOW: OrderStatusInfo[] = [
  { id: "order-placed", label: "Order Placed", description: "Your repair order has been placed successfully", step: 1 },
  { id: "delivery-started", label: "Delivery Started", description: "Our pickup agent is on the way to collect your device", step: 2 },
  { id: "item-picked-up", label: "Item Picked Up", description: "Your device has been picked up and is being transported", step: 3 },
  { id: "service-started", label: "Service Started", description: "Our technicians have started diagnosing your device", step: 4 },
  { id: "service-completed", label: "Issues Diagnosed", description: "Diagnosis complete — we've identified the issues and repair cost", step: 5 },
  { id: "awaiting-repair-payment", label: "Repair Fee (Pay Now)", description: "Please pay the repair fee to proceed with the fix", step: 6 },
  { id: "repair-payment-completed", label: "Payment Completed", description: "Payment received — repair will begin shortly", step: 7 },
  { id: "repair-started", label: "Repair Started", description: "Repair work is in progress", step: 8 },
  { id: "repair-completed", label: "Repair Completed", description: "Your device has been repaired and is ready", step: 9 },
  { id: "ready-for-return", label: "Ready for Return/Pickup", description: "Your device is ready for return delivery or pickup", step: 10 },
  { id: "return-in-progress", label: "Return In Progress", description: "Your device is being delivered back to you", step: 11 },
  { id: "completed", label: "Completed", description: "Order completed. Thank you!", step: 12 },
];

// Physical-only status flow (skips pickup/delivery steps)
export const PHYSICAL_STATUS_FLOW: OrderStatus[] = [
  "order-placed",
  "service-started",
  "service-completed",
  "awaiting-repair-payment",
  "repair-payment-completed",
  "repair-started",
  "repair-completed",
  "completed",
];

// Store mode device conditions
export type DeviceCondition = "uk-used" | "naija-used" | "brand-new" | "open-box";

export const DEVICE_CONDITIONS: { id: DeviceCondition; label: string; description: string }[] = [
  { id: "brand-new", label: "Brand New", description: "Factory sealed, never opened" },
  { id: "open-box", label: "Open Box", description: "Opened but unused or barely used" },
  { id: "uk-used", label: "UK Used", description: "Pre-owned from abroad, excellent condition" },
  { id: "naija-used", label: "9ja Used", description: "Locally pre-owned device" },
];

// Default business info
export const DEFAULT_BUSINESS_INFO = {
  name: "iFixit",
  tagline: "Professional Apple Device Repair",
  address: "11 Shaba Ojo Street, Igando Lagos",
  lga: "Ojo",
  state: "Lagos",
  phone: "+2347044556735",
  whatsapp: "https://wa.me/hskahsjhsysjksksjs",
  pickupAgentPhone: "08144552678",
  pickupAgentWhatsapp: "https://wa.me/jsoalnesjjsjaknss",
  email: "support@ifixit.ng",
  workingHours: "Mon - Sat: 9:00 AM - 6:00 PM",
};

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

// Store order status flows
import type { StoreOrderStatus } from "../types";

export interface StoreOrderStatusInfo {
  id: StoreOrderStatus;
  label: string;
  description: string;
}

export const STORE_ORDER_STATUSES: StoreOrderStatusInfo[] = [
  { id: "item-purchased", label: "Item Purchased", description: "Payment confirmed, order placed" },
  { id: "delivery-started", label: "Delivery Started", description: "Your order is on the way" },
  { id: "delivered", label: "Delivered", description: "Your order has been delivered" },
  { id: "waiting-for-pickup", label: "Waiting for Pickup", description: "Your order is ready for pickup at the station" },
  { id: "item-picked-up", label: "Item Picked Up", description: "You have picked up your order" },
  { id: "purchase-completed", label: "Purchase Completed", description: "Order completed. Thank you!" },
  { id: "cancelled", label: "Cancelled", description: "Order has been cancelled" },
];

// Delivery (comfort) flow: item-purchased → delivery-started → delivered → purchase-completed
export const STORE_DELIVERY_FLOW: StoreOrderStatus[] = [
  "item-purchased",
  "delivery-started",
  "delivered",
  "purchase-completed",
];

// Pick at station flow: item-purchased → waiting-for-pickup → item-picked-up → purchase-completed
export const STORE_PICKUP_FLOW: StoreOrderStatus[] = [
  "item-purchased",
  "waiting-for-pickup",
  "item-picked-up",
  "purchase-completed",
];
