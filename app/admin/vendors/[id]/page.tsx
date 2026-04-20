import { notFound } from "next/navigation";

import { fetchVendorById } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function AdminVendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = await fetchVendorById(id);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Vendor profile</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{vendor.name}</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Plan</p>
          <h2 className="mt-3 text-3xl font-semibold capitalize text-foreground">{vendor.plan}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Orders</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{vendor.orders}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatGHS(vendor.revenueGhs)}</h2>
        </article>
      </section>

      <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Contact</p>
        <p className="mt-3 text-lg font-medium text-foreground">{vendor.email}</p>
        <p className="mt-1 text-sm text-muted-foreground">{vendor.phone}</p>
      </article>
    </div>
  );
}