"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  useOrders,
  useProducts,
  useCustomers,
  useDailyRevenue,
} from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
};

export default function DashboardOverviewPage() {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { customers } = useCustomers();
  const daily = useDailyRevenue(7);

  const fulfilledRevenue = orders
    .filter((o) => o.status === "fulfilled")
    .reduce((s, o) => s + o.totalGhs, 0);

  const openOrders = orders.filter((o) => o.status !== "fulfilled").length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: "Total revenue (fulfilled)",
      value: formatGHS(fulfilledRevenue),
      change: "+12.4%",
      positive: true,
    },
    {
      label: "Open orders",
      value: String(openOrders),
      change: `${orders.length} total`,
      positive: null,
    },
    {
      label: "Products listed",
      value: String(products.length),
      change: `${customers.length} customers`,
      positive: null,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <section className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
          Overview
        </span>
        <h1
          className="text-3xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Track your store performance
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Revenue, orders, and products — all in one place.
        </p>
      </section>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-border bg-card shadow-sm p-5"
          >
            <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </h3>
              <span
                className={
                  stat.positive === true
                    ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
                    : "rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                }
              >
                {stat.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Revenue chart */}
      <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Revenue — last 7 days</p>
            <p className="text-xs text-muted-foreground">Fulfilled orders only</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={daily} barSize={28} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `₵${v}`}
            />
            <Tooltip
              formatter={(v) => [formatGHS(typeof v === 'number' ? v : 0), "Revenue"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #CECECE", fontSize: 12 }}
            />
            <Bar dataKey="value" fill="#160B35" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Recent orders */}
      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Recent orders</p>
          <Link
            href="/dashboard/orders"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              No orders yet
            </p>
          ) : (
            recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {formatGHS(order.totalGhs)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_COLOR[order.status]}`}
                  >
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