import type {
  Customer,
  Order,
  Product,
  RevenuePoint,
  Storefront,
  Vendor,
} from "@/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const ENDPOINTS = {
  orders: "/orders",
  products: "/products",
  customers: "/customers",
  vendors: "/vendors",
  stores: "/stores",
  revenue: "/analytics/revenue",
};

function buildUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    cache: "no-store",
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  return requestJson<T>(path, init);
}

export async function apiFetchOrNull<T>(path: string, init?: RequestInit): Promise<T | null> {
  const response = await fetch(buildUrl(path), {
    cache: "no-store",
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchOrders() {
  return apiFetch<Order[]>(ENDPOINTS.orders);
}

export async function fetchOrderById(id: string) {
  return apiFetchOrNull<Order>(`${ENDPOINTS.orders}/${id}`);
}

export async function fetchProducts() {
  return apiFetch<Product[]>(ENDPOINTS.products);
}

export async function fetchProductById(id: string) {
  return apiFetchOrNull<Product>(`${ENDPOINTS.products}/${id}`);
}

export async function fetchCustomers() {
  return apiFetch<Customer[]>(ENDPOINTS.customers);
}

export async function fetchCustomerById(id: string) {
  return apiFetchOrNull<Customer>(`${ENDPOINTS.customers}/${id}`);
}

export async function fetchVendors() {
  return apiFetch<Vendor[]>(ENDPOINTS.vendors);
}

export async function fetchVendorById(id: string) {
  return apiFetchOrNull<Vendor>(`${ENDPOINTS.vendors}/${id}`);
}

export async function fetchRevenueSeries() {
  return apiFetch<RevenuePoint[]>(ENDPOINTS.revenue);
}

export async function fetchStoreBySlug(slug: string) {
  return apiFetchOrNull<Storefront>(`${ENDPOINTS.stores}/${slug}`);
}

export async function fetchStoreProducts(slug: string) {
  return apiFetch<Product[]>(`${ENDPOINTS.stores}/${slug}/products`);
}