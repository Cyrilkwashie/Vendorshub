export type OrderStatus = "pending" | "processing" | "fulfilled";
export type PlanType = "starter" | "growth" | "pro";
export type StoreTemplate = "small-shop" | "category-shop" | "single-product";

// ── Store (vendor profile) ────────────────────────────────────────────────────

export interface StoreProfile {
  name: string;
  slug: string;
  description: string;
  whatsapp: string;
  country: string;
  city: string;
  plan: PlanType;
  email: string;
  createdAt: string;
  template?: StoreTemplate;
  bannerImage?: string;
  headline?: string;
}

// ── Product ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  priceGhs: number;
  inventory: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

// ── Order ─────────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceGhs: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalGhs: number;
  status: OrderStatus;
  note?: string;
  createdAt: string;
}

// ── Customer ──────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  orders: number;
  lifetimeValueGhs: number;
  lastOrderAt: string;
}

// ── Legacy / admin types ──────────────────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  plan: PlanType;
  revenueGhs: number;
  orders: number;
  flagged: boolean;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface Storefront {
  slug: string;
  vendorId: string;
  name: string;
  headline: string;
  description: string;
  whatsappNumber: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
}