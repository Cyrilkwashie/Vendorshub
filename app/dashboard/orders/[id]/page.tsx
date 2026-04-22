"use client";

import Link from "next/link";
import { use } from "react";
import { useOrders } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
};

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pending: "processing",
  processing: "fulfilled",
  fulfilled: null,
};

const NEXT_LABEL: Record<OrderStatus, string | null> = {
  pending: "Mark as Processing",
  processing: "Mark as Fulfilled",
  fulfilled: null,
};

export default function DashboardOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { orders, setStatus } = useOrders();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground text-sm">Order not found.</p>
        <Link href="/dashboard/orders" className="text-xs font-medium text-primary hover:underline">
          ← Back to orders
        </Link>
      </div>
    );
  }

  const nextStatus = NEXT_STATUS[order.status];
  const nextLabel = NEXT_LABEL[order.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/orders"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            ← Orders
          </Link>
          <span className="ml-2 text-xs text-muted-foreground">/</span>
          <span className="ml-2 text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Order detail
          </h1>
        </div>
        {nextStatus && nextLabel && (
          <button
            onClick={() => setStatus(order.id, nextStatus)}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            {nextLabel}
          </button>
        )}
      </div>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Total</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{formatGHS(order.totalGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="mt-3">
            <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${STATUS_COLOR[order.status]}`}>
              {order.status}
            </span>
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Placed</p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
        </article>
      </section>

      {/* Customer + Items */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Customer */}
        <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">{order.customerName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{order.customerPhone}</p>
          {order.note && (
            <div className="mt-4 rounded-xl bg-muted/60 px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">Note</p>
              <p className="mt-1 text-sm text-foreground">{order.note}</p>
            </div>
          )}
        </article>

        {/* Items */}
        <article className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Order items ({order.items.length})
            </p>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {formatGHS(item.priceGhs * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-muted/30">
            <p className="text-sm font-semibold text-foreground">Total</p>
            <p className="text-sm font-bold text-foreground">{formatGHS(order.totalGhs)}</p>
          </div>
        </article>
      </section>
    </div>
  );
}