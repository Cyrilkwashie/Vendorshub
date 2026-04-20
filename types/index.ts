export type OrderStatus = "pending" | "processing" | "fulfilled";

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  plan: "starter" | "growth" | "scale";
  revenueGhs: number;
  orders: number;
  flagged: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  priceGhs: number;
  inventory: number;
  vendorId: string;
  storeSlug: string;
  category: string;
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  totalGhs: number;
  status: OrderStatus;
  createdAt: string;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  lifetimeValueGhs: number;
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