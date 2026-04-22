/**
 * lib/store.ts — localStorage persistence layer for VendorsHub vendor data.
 * All keys are prefixed `vh_` to avoid collisions.
 * When a real backend is ready, swap out these functions.
 */

import type { Customer, Order, OrderStatus, Product, StoreProfile } from "@/types";

// ── Keys ──────────────────────────────────────────────────────────────────────

const KEYS = {
  store: "vh_store",
  products: "vh_products",
  orders: "vh_orders",
  customers: "vh_customers",
  seeded: "vh_seeded",
} as const;

// ── Generic helpers ───────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ── Store profile ─────────────────────────────────────────────────────────────

export function getStoreProfile(): StoreProfile {
  return read<StoreProfile>(KEYS.store, {
    name: "My VendorsHub Store",
    slug: "my-store",
    description: "",
    whatsapp: "",
    country: "GH",
    city: "Accra",
    plan: "growth",
    email: "",
    createdAt: new Date().toISOString(),
  });
}

export function saveStoreProfile(profile: StoreProfile): void {
  write(KEYS.store, profile);
}

// ── Products ──────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return read<Product[]>(KEYS.products, []);
}

export function saveProducts(products: Product[]): void {
  write(KEYS.products, products);
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveProducts([...products, newProduct]);
  return newProduct;
}

export function updateProduct(id: string, patch: Partial<Product>): void {
  const products = getProducts();
  saveProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
}

export function deleteProduct(id: string): void {
  saveProducts(getProducts().filter((p) => p.id !== id));
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function getOrders(): Order[] {
  return read<Order[]>(KEYS.orders, []);
}

export function saveOrders(orders: Order[]): void {
  write(KEYS.orders, orders);
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders();
  saveOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
}

// ── Customers ─────────────────────────────────────────────────────────────────

export function getCustomers(): Customer[] {
  return read<Customer[]>(KEYS.customers, []);
}

export function saveCustomers(customers: Customer[]): void {
  write(KEYS.customers, customers);
}

// ── Revenue helpers ───────────────────────────────────────────────────────────

/** Returns GHS revenue grouped by the last `days` days (label: "Mon", "Tue", etc.) */
export function getDailyRevenue(days = 7): { label: string; value: number }[] {
  const orders = getOrders().filter((o) => o.status !== "pending");
  const result: { label: string; value: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString("en-GH", { weekday: "short" });
    const dayStr = date.toISOString().slice(0, 10);
    const value = orders
      .filter((o) => o.createdAt.slice(0, 10) === dayStr)
      .reduce((sum, o) => sum + o.totalGhs, 0);
    result.push({ label, value });
  }
  return result;
}

/** Returns GHS revenue grouped by the last `months` months */
export function getMonthlyRevenue(months = 6): { label: string; value: number }[] {
  const orders = getOrders().filter((o) => o.status !== "pending");
  const result: { label: string; value: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const label = date.toLocaleDateString("en-GH", { month: "short" });
    const yearMonth = date.toISOString().slice(0, 7);
    const value = orders
      .filter((o) => o.createdAt.slice(0, 7) === yearMonth)
      .reduce((sum, o) => sum + o.totalGhs, 0);
    result.push({ label, value });
  }
  return result;
}

// ── Seed ─────────────────────────────────────────────────────────────────────

export function isSeeded(): boolean {
  return read<boolean>(KEYS.seeded, false);
}

export function seedStore(): void {
  if (isSeeded()) return;

  // Store profile
  const profile: StoreProfile = {
    name: "Adwoa's Jewels & Accessories",
    slug: "adwoas-jewels",
    description: "Premium handcrafted African jewellery, delivered straight to your door.",
    whatsapp: "+233244001234",
    country: "GH",
    city: "Accra",
    plan: "growth",
    email: "adwoa@vendorshub.store",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
  saveStoreProfile(profile);

  // Products
  const products: Product[] = [
    { id: "prod_1", name: "Gold Bangle Set", description: "Set of 3 handcrafted gold-plated bangles", priceGhs: 180, inventory: 24, category: "Jewellery", createdAt: daysAgo(60) },
    { id: "prod_2", name: "Kente Earrings", description: "Authentic kente-print drop earrings", priceGhs: 75, inventory: 40, category: "Jewellery", createdAt: daysAgo(55) },
    { id: "prod_3", name: "Pearl Necklace", description: "Freshwater pearl strand necklace, 18 inch", priceGhs: 220, inventory: 12, category: "Jewellery", createdAt: daysAgo(50) },
    { id: "prod_4", name: "Afro Charm Bracelet", description: "Beaded bracelet with cultural charms", priceGhs: 95, inventory: 30, category: "Bracelets", createdAt: daysAgo(45) },
    { id: "prod_5", name: "Statement Ring Set", description: "Pack of 5 stackable rings, gold finish", priceGhs: 60, inventory: 50, category: "Rings", createdAt: daysAgo(30) },
    { id: "prod_6", name: "Ankara Tote Bag", description: "Bold ankara print canvas tote, perfect everyday bag", priceGhs: 120, inventory: 18, category: "Bags", createdAt: daysAgo(20) },
  ];
  saveProducts(products);

  // Customers
  const customers: Customer[] = [
    { id: "cust_1", name: "Ama Owusu", phone: "+233244567890", email: "ama@gmail.com", orders: 4, lifetimeValueGhs: 640, lastOrderAt: daysAgo(2) },
    { id: "cust_2", name: "Kofi Asante", phone: "+233201234567", orders: 2, lifetimeValueGhs: 290, lastOrderAt: daysAgo(5) },
    { id: "cust_3", name: "Efua Mensah", phone: "+233559876543", email: "efua.m@yahoo.com", orders: 3, lifetimeValueGhs: 480, lastOrderAt: daysAgo(1) },
    { id: "cust_4", name: "Kwame Boateng", phone: "+233270111222", orders: 1, lifetimeValueGhs: 180, lastOrderAt: daysAgo(7) },
    { id: "cust_5", name: "Abena Darko", phone: "+233244998877", email: "abena.d@gmail.com", orders: 5, lifetimeValueGhs: 810, lastOrderAt: daysAgo(0) },
    { id: "cust_6", name: "Yaw Amponsah", phone: "+233209988776", orders: 2, lifetimeValueGhs: 255, lastOrderAt: daysAgo(10) },
    { id: "cust_7", name: "Akosua Frimpong", phone: "+233551122334", email: "akosua@hotmail.com", orders: 1, lifetimeValueGhs: 95, lastOrderAt: daysAgo(14) },
    { id: "cust_8", name: "Nana Adjei", phone: "+233274556677", orders: 3, lifetimeValueGhs: 540, lastOrderAt: daysAgo(3) },
  ];
  saveCustomers(customers);

  // Orders — spread across last 30 days with varying statuses
  const orders: Order[] = [
    makeOrder("ord_1", "cust_1", "Ama Owusu", "+233244567890", [{ productId: "prod_1", productName: "Gold Bangle Set", quantity: 2, priceGhs: 180 }], "fulfilled", daysAgo(1)),
    makeOrder("ord_2", "cust_3", "Efua Mensah", "+233559876543", [{ productId: "prod_2", productName: "Kente Earrings", quantity: 1, priceGhs: 75 }, { productId: "prod_5", productName: "Statement Ring Set", quantity: 1, priceGhs: 60 }], "processing", daysAgo(0)),
    makeOrder("ord_3", "cust_5", "Abena Darko", "+233244998877", [{ productId: "prod_3", productName: "Pearl Necklace", quantity: 1, priceGhs: 220 }], "pending", daysAgo(0)),
    makeOrder("ord_4", "cust_2", "Kofi Asante", "+233201234567", [{ productId: "prod_4", productName: "Afro Charm Bracelet", quantity: 2, priceGhs: 95 }], "fulfilled", daysAgo(3)),
    makeOrder("ord_5", "cust_8", "Nana Adjei", "+233274556677", [{ productId: "prod_6", productName: "Ankara Tote Bag", quantity: 1, priceGhs: 120 }, { productId: "prod_2", productName: "Kente Earrings", quantity: 1, priceGhs: 75 }], "fulfilled", daysAgo(4)),
    makeOrder("ord_6", "cust_4", "Kwame Boateng", "+233270111222", [{ productId: "prod_1", productName: "Gold Bangle Set", quantity: 1, priceGhs: 180 }], "fulfilled", daysAgo(5)),
    makeOrder("ord_7", "cust_1", "Ama Owusu", "+233244567890", [{ productId: "prod_5", productName: "Statement Ring Set", quantity: 2, priceGhs: 60 }], "fulfilled", daysAgo(7)),
    makeOrder("ord_8", "cust_6", "Yaw Amponsah", "+233209988776", [{ productId: "prod_4", productName: "Afro Charm Bracelet", quantity: 1, priceGhs: 95 }, { productId: "prod_5", productName: "Statement Ring Set", quantity: 1, priceGhs: 60 }], "fulfilled", daysAgo(8)),
    makeOrder("ord_9", "cust_7", "Akosua Frimpong", "+233551122334", [{ productId: "prod_2", productName: "Kente Earrings", quantity: 1, priceGhs: 75 }], "fulfilled", daysAgo(10)),
    makeOrder("ord_10", "cust_3", "Efua Mensah", "+233559876543", [{ productId: "prod_3", productName: "Pearl Necklace", quantity: 1, priceGhs: 220 }, { productId: "prod_1", productName: "Gold Bangle Set", quantity: 1, priceGhs: 180 }], "fulfilled", daysAgo(12)),
    makeOrder("ord_11", "cust_8", "Nana Adjei", "+233274556677", [{ productId: "prod_6", productName: "Ankara Tote Bag", quantity: 2, priceGhs: 120 }], "fulfilled", daysAgo(15)),
    makeOrder("ord_12", "cust_5", "Abena Darko", "+233244998877", [{ productId: "prod_1", productName: "Gold Bangle Set", quantity: 1, priceGhs: 180 }, { productId: "prod_4", productName: "Afro Charm Bracelet", quantity: 1, priceGhs: 95 }], "fulfilled", daysAgo(20)),
  ];
  saveOrders(orders);

  // Seed auth so the demo user is logged in from the start
  if (!localStorage.getItem("vh_auth")) {
    localStorage.setItem(
      "vh_auth",
      JSON.stringify({ name: profile.name, email: profile.email }),
    );
  }

  write(KEYS.seeded, true);
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  // Randomize hour to make the data look natural
  d.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));
  return d.toISOString();
}

function makeOrder(
  id: string,
  customerId: string,
  customerName: string,
  customerPhone: string,
  items: Order["items"],
  status: OrderStatus,
  createdAt: string
): Order {
  return {
    id,
    customerId,
    customerName,
    customerPhone,
    items,
    totalGhs: items.reduce((sum, i) => sum + i.priceGhs * i.quantity, 0),
    status,
    createdAt,
  };
}
