import { notFound } from "next/navigation";

import { fetchProductById, fetchVendorById } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const vendor = await fetchVendorById(product.vendorId);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Product detail</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{product.name}</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Category</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{product.category}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Price</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{formatGHS(product.priceGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Inventory</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{product.inventory}</h2>
        </article>
      </section>

      <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Description</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground">{product.description}</p>
        <p className="mt-6 text-sm text-muted-foreground">Vendor: {vendor?.name ?? "Unknown vendor"}</p>
      </article>
    </div>
  );
}