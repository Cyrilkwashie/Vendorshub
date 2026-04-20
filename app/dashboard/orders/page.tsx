import Link from "next/link";

import { OrderCard } from "@/components/dashboard/OrderCard";
import { fetchOrders } from "@/lib/api";

export default async function DashboardOrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Orders</span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Review incoming and fulfilled orders</h1>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
            <OrderCard order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
}