import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { fetchRevenueSeries } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardAnalyticsPage() {
  const revenue = await fetchRevenueSeries();
  const average = Math.round(revenue.reduce((sum, point) => sum + point.value, 0) / revenue.length);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Analytics</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Monitor revenue momentum across the period</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Average revenue</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatGHS(average)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Peak month</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{revenue.reduce((top, point) => (point.value > top.value ? point : top)).label}</h2>
        </article>
      </section>

      <RevenueChart points={revenue} />
    </div>
  );
}