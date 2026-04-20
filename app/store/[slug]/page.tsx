import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/storefront/ProductGrid";
import { WhatsAppOrderButton } from "@/components/storefront/WhatsAppOrderButton";
import { fetchStoreBySlug, fetchStoreProducts } from "@/lib/api";

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [store, products] = await Promise.all([fetchStoreBySlug(slug), fetchStoreProducts(slug)]);

  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14">
        <section className="rounded-2xl border border-border bg-card shadow-sm grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Storefront</span>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-foreground">{store.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{store.headline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{store.description}</p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <WhatsAppOrderButton phone={store.whatsappNumber} />
          </div>
        </section>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}