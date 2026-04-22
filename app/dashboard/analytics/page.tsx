"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useOrders,
  useProducts,
  useCustomers,
  useDailyRevenue,
  useMonthlyRevenue,
} from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const PIE_COLORS: Record<OrderStatus, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  fulfilled: "#10B981",
};

export default function DashboardAnalyticsPage() {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { customers } = useCustomers();
  const daily = useDailyRevenue(14);
  const monthly = useMonthlyRevenue(6);

  const fulfilledOrders = orders.filter((o) => o.status === "fulfilled");
  const totalRevenue = fulfilledOrders.reduce((s, o) => s + o.totalGhs, 0);
  const avgOrderValue = fulfilledOrders.length
    ? Math.round(totalRevenue / fulfilledOrders.length)
    : 0;

  const peakDay = daily.reduce(
    (top, d) => (d.value > top.value ? d : top),
    daily[0] ?? { label: "—", value: 0 }
  );

  // Order status breakdown for pie
  const statusCounts: Record<OrderStatus, number> = { pending: 0, processing: 0, fulfilled: 0 };
  orders.forEach((o) => { statusCounts[o.status]++; });
  const pieData = (Object.keys(statusCounts) as OrderStatus[])
    .filter((k) => statusCounts[k] > 0)
    .map((k) => ({ name: k, value: statusCounts[k] }));

  // Top products by order frequency
  const productFreq: Record<string, { name: string; count: number }> = {};
  orders.forEach((o) =>
    o.items.forEach((item) => {
      if (!productFreq[item.productId]) {
        productFreq[item.productId] = { name: item.productName, count: 0 };
      }
      productFreq[item.productId].count++;
    })
  );
  const topProducts = Object.values(productFreq)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
          Analytics
        </span>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Store analytics
        </h1>
      </div>

      {/* Top stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total revenue", value: formatGHS(totalRevenue) },
          { label: "Avg order value", value: formatGHS(avgOrderValue) },
          { label: "Total orders", value: String(orders.length) },
          { label: "Customers", value: String(customers.length) },
        ].map((s) => (
          <article key={s.label} className="rounded-2xl border border-border bg-card shadow-sm p-5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">{s.value}</h2>
          </article>
        ))}
      </section>

      {/* Monthly revenue trend */}
      <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
        <p className="text-sm font-semibold text-foreground mb-1">Monthly revenue (6 months)</p>
        <p className="text-xs text-muted-foreground mb-4">Fulfilled orders only</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `₵${v}`}
            />
            <Tooltip
              formatter={(v: number) => [formatGHS(v), "Revenue"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #CECECE", fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#160B35"
              strokeWidth={2.5}
              dot={{ fill: "#160B35", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Daily + Pie row */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Daily bar */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Daily revenue (14 days)</p>
          <p className="text-xs text-muted-foreground mb-4">
            Peak: {peakDay?.label} — {formatGHS(peakDay?.value ?? 0)}
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={daily} barSize={16} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: "#888" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `₵${v}`}
              />
              <Tooltip
                formatter={(v: number) => [formatGHS(v), "Revenue"]}
                contentStyle={{ borderRadius: 12, border: "1px solid #CECECE", fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#160B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order status pie */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Order status breakdown</p>
          <p className="text-xs text-muted-foreground mb-4">{orders.length} total orders</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[entry.name as OrderStatus]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, name: string) => [v, name]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #CECECE", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ background: PIE_COLORS[entry.name as OrderStatus] }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{entry.name}</span>
                  <span className="text-xs font-semibold text-foreground">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top products */}
      {topProducts.length > 0 && (
        <section className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Top ordered products</p>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{p.count} orders</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}