import { OrderCard } from "@/components/dashboard/OrderCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { fetchOrders, fetchProducts, fetchRevenueSeries } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardOverviewPage() {
  const [orders, products, revenue] = await Promise.all([
    fetchOrders(),
    fetchProducts(),
    fetchRevenueSeries(),
  ]);

  const stats = [
    { label: "Current month revenue", value: formatGHS(revenue[revenue.length - 1]?.value ?? 0), change: "+12.4%" },
    { label: "Open orders", value: `${orders.length}`, change: "+5 today" },
    { label: "Active products", value: `${products.length}`, change: "+2 new" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Overview</span>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Track day-to-day vendor performance</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          This overview page anchors the vendor dashboard with key metrics, a revenue trend, and recent order activity.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <RevenueChart points={revenue} />

      <section className="grid gap-4 md:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}