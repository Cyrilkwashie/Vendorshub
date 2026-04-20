import type { RevenuePoint } from "@/types";
import { formatGHS } from "@/lib/utils";

interface RevenueChartProps {
  points: RevenuePoint[];
}

export function RevenueChart({ points }: RevenueChartProps) {
  const peak = Math.max(...points.map((point) => point.value));

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Revenue trend</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{formatGHS(points.at(-1)?.value ?? 0)}</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Live mock data</span>
      </div>
      <div className="mt-8 flex items-end gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-48 w-full items-end rounded-3xl bg-primary/10 p-2">
              <div
                className="w-full rounded-2xl bg-primary"
                style={{ height: `${Math.max((point.value / peak) * 100, 16)}%` }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{point.label}</p>
              <p className="text-xs text-muted-foreground">{formatGHS(point.value)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}