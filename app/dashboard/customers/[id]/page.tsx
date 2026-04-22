"use client";

import { use } from "react";
import Link from "next/link";
import { useCustomers, useOrders } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
};

export default function DashboardCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { customers } = useCustomers();
  const { orders } = useOrders();
  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter((o) => o.customerId === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground text-sm">Customer not found.</p>
        <Link href="/dashboard/customers" className="text-xs font-medium text-primary hover:underline">
          ← Back to customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/customers" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
          ← Customers
        </Link>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {customer.name}
        </h1>
        <p className="text-sm text-muted-foreground">{customer.phone}</p>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Total orders</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{customer.orders}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Lifetime value</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{formatGHS(customer.lifetimeValueGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Last order</p>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {new Date(customer.lastOrderAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </h2>
        </article>
      </section>

      {/* Order history */}
      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Order history</p>
        </div>
        <div className="divide-y divide-border">
          {customerOrders.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">No orders found</p>
          ) : (
            customerOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{formatGHS(order.totalGhs)}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_COLOR[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}