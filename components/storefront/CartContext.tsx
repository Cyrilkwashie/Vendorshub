"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function add(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function increment(productId: string) {
    setItems((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i));
  }

  function decrement(productId: string) {
    setItems((prev) => prev
      .map((i) => i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
      .filter((i) => i.quantity > 0)
    );
  }

  const total = items.reduce((sum, i) => sum + i.product.priceGhs * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, increment, decrement, total, count, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
