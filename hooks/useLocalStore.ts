"use client";

/**
 * hooks/useLocalStore.ts — React hooks wrapping lib/store.ts with hydration safety.
 * All hooks return null/[] on server render, then hydrate on mount.
 */

import { useCallback, useEffect, useState } from "react";

import {
  addProduct,
  deleteProduct,
  getCustomers,
  getDailyRevenue,
  getMonthlyRevenue,
  getOrders,
  getProducts,
  getStoreProfile,
  saveStoreProfile,
  seedStore,
  updateOrderStatus,
  updateProduct,
} from "@/lib/store";
import type {
  Customer,
  Order,
  OrderStatus,
  Product,
  StoreProfile,
} from "@/types";

// ── Seeder — run once at app level ────────────────────────────────────────────

export function useSeeder() {
  useEffect(() => {
    seedStore();
  }, []);
}

// ── Store profile ─────────────────────────────────────────────────────────────

export function useStoreProfile() {
  const [profile, setProfile] = useState<StoreProfile | null>(null);

  useEffect(() => {
    setProfile(getStoreProfile());
  }, []);

  const save = useCallback((updated: StoreProfile) => {
    saveStoreProfile(updated);
    setProfile(updated);
  }, []);

  return { profile, save };
}

// ── Products ──────────────────────────────────────────────────────────────────

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const refresh = useCallback(() => setProducts(getProducts()), []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    (product: Omit<Product, "id" | "createdAt">) => {
      addProduct(product);
      refresh();
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, patch: Partial<Product>) => {
      updateProduct(id, patch);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      deleteProduct(id);
      refresh();
    },
    [refresh]
  );

  return { products, add, update, remove, refresh };
}

// ── Orders ────────────────────────────────────────────────────────────────────

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const refresh = useCallback(() =>
    setOrders([...getOrders()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
    []
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setStatus = useCallback(
    (id: string, status: OrderStatus) => {
      updateOrderStatus(id, status);
      refresh();
    },
    [refresh]
  );

  return { orders, setStatus, refresh };
}

// ── Customers ─────────────────────────────────────────────────────────────────

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  return { customers };
}

// ── Revenue ───────────────────────────────────────────────────────────────────

export function useDailyRevenue(days = 7) {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    setData(getDailyRevenue(days));
  }, [days]);

  return data;
}

export function useMonthlyRevenue(months = 6) {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    setData(getMonthlyRevenue(months));
  }, [months]);

  return data;
}
