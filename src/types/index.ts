// Firestore data types for the application

import { DeviceCondition, DeliveryMethod, OrderStatus } from "../data/constants";
import { DeviceCategory } from "../data/devices";

export type { DeviceCategory };

export interface RepairOrder {
  id: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;

  // Device info
  deviceCategory: DeviceCategory;
  isApple: boolean;
  deviceModel: string;
  deviceBrand?: string;
  selectedIssues: string[];
  additionalNotes?: string;

  // Delivery info
  deliveryMethod: DeliveryMethod;
  state: string;
  lga: string;
  address?: string;

  // Pricing
  serviceFee: number;
  pickupFee: number;
  totalInitialPayment: number;
  repairFee?: number;
  overstayFees?: number;

  // Status
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];

  // Diagnosis
  diagnosisNotes?: string;
  estimatedRepairCost?: number;

  // Timestamps
  createdAt: any;
  updatedAt: any;
  pickedUpAt?: string;
  completedAt?: string;

  // Payment refs
  paymentReference?: string;
  repairPaymentReference?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  brand?: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  variants: StoreProductVariant[];
  inStock?: boolean;
  createdAt?: any;
}

export interface StoreProductVariant {
  id: string;
  label?: string;
  condition: DeviceCondition;
  ram?: string;
  storage?: string;
  color?: string;
  price: number;
  stock: number;
}

export interface SiteSettings {
  id?: string;
  // Business
  businessName?: string;
  storeName?: string;
  tagline?: string;
  address?: string;
  lga?: string;
  stationLGA?: string;
  state?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  workingHours?: string;
  pickupAgentPhone?: string;
  pickupAgentWhatsapp?: string;

  // Branding
  logoUrl?: string;
  faviconUrl?: string;

  // Feature toggles
  enableNonApple?: boolean;
  nonAppleEnabled?: boolean;
  enableStore?: boolean;
  storeEnabled?: boolean;
  emailEnabled?: boolean;
  enableHeroVideo?: boolean;

  // Delivery toggles
  enablePickupComfort?: boolean;
  pickupComfortEnabled?: boolean;
  enablePhysical?: boolean;
  physicalEnabled?: boolean;
  enablePickupLocal?: boolean;
  pickupLocalEnabled?: boolean;

  // Pricing
  appleServiceFee?: number;
  serviceFeeApple?: number;
  nonAppleServiceFee?: number;
  serviceFeeNonApple?: number;
  minPickupFee?: number;
  minimumPickupFee?: number;
  localPickupFee?: number;
  pickupLocalFee?: number;

  // Overstay
  overstayEnabled?: boolean;
  overstayFeePerDay?: number;
  overstayGraceDays?: number;

  // LGA-specific pickup pricing
  lgaPickupPricing?: Record<string, number>;

  // Admin
  adminEmail?: string;
  adminEmails?: string[];
}

export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  address?: string;
  state?: string;
  lga?: string;
  role?: string;
  isAdmin?: boolean;
  createdAt: any;
}

// Store cart types
export interface CartItem {
  product: StoreProduct;
  variant: StoreProductVariant;
  quantity: number;
}

export type StoreDeliveryMethod = "pickup-station" | "delivery-comfort";

export interface StoreCheckoutData {
  items: CartItem[];
  deliveryMethod: StoreDeliveryMethod;
  customerName: string;
  customerPhone: string;
  state?: string;
  lga?: string;
  address?: string;
  deliveryFee: number;
  subtotal: number;
  total: number;
}

// Store order
export type StoreOrderStatus =
  | "item-purchased"
  | "delivery-started"
  | "delivered"
  | "purchase-completed"
  | "waiting-for-pickup"
  | "item-picked-up"
  | "cancelled";

export interface StoreOrder {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productName: string;
    variantId: string;
    condition: string;
    ram?: string | null;
    storage?: string | null;
    color?: string | null;
    price: number;
    quantity: number;
  }[];
  deliveryMethod: StoreDeliveryMethod;
  state?: string | null;
  lga?: string | null;
  address?: string | null;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentReference: string;
  status: StoreOrderStatus;
  statusHistory: { status: StoreOrderStatus; timestamp: string; note?: string }[];
  deliveryContact?: string;
  createdAt: any;
  updatedAt?: any;
}
