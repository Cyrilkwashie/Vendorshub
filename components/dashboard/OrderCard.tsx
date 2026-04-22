import type { Order } from "@/types";
import { formatDate, formatGHS } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{formatGHS(order.totalGhs)}</h3>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {order.status}
        </span>
      </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{order.items.length} items</span>
        <span>{formatDate(order.createdAt)}</span>
      </div>
    </article>
  );
}