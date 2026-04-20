import { notFound } from "next/navigation";

import { fetchCustomerById, fetchOrderById, fetchVendorById } from "@/lib/api";
import { formatDate, formatGHS } from "@/lib/utils";

export default async function DashboardOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await fetchOrderById(id);

  if (!order) {
    notFound();
  }

  const [customer, vendor] = await Promise.all([
    fetchCustomerById(order.customerId),
    fetchVendorById(order.vendorId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Order detail</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Order #{order.id}</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Total</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatGHS(order.totalGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Status</p>
          <h2 className="mt-3 text-3xl font-semibold capitalize text-foreground">{order.status}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Placed</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatDate(order.createdAt)}</h2>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Customer</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{customer?.name ?? "Unknown customer"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{customer?.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">{customer?.phone}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Vendor</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{vendor?.name ?? "Unknown vendor"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{vendor?.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">{order.items} line items</p>
        </article>
      </section>
    </div>
  );
}