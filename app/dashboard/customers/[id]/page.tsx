import { notFound } from "next/navigation";

import { fetchCustomerById } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Customer profile</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{customer.name}</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Orders</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{customer.orders}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Lifetime value</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatGHS(customer.lifetimeValueGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Phone</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{customer.phone}</h2>
        </article>
      </section>

      <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Contact email</p>
        <p className="mt-3 text-lg font-medium text-foreground">{customer.email}</p>
      </article>
    </div>
  );
}