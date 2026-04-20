import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { fetchRevenueSeries } from "@/lib/api";

export default async function AdminRevenuePage() {
  const points = await fetchRevenueSeries();

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Revenue</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Marketplace revenue watch</h1>
      </div>
      <RevenueChart points={points} />
    </div>
  );
}