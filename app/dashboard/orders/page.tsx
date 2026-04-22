"use client";

import Link from "next/link";
import { useState } from "react";
import { useOrders } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
};

const FILTERS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Fulfilled", value: "fulfilled" },
];

export default function DashboardOrdersPage() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
            Orders
          </span>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Manage your orders
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 rounded-xl border border-border bg-muted/40 p-1 w-fit">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === f.value
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Items</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Total</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                  No orders found
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{order.items.length}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{formatGHS(order.totalGhs)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_COLOR[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}