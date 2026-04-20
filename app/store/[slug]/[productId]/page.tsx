import { notFound } from "next/navigation";

import { WhatsAppOrderButton } from "@/components/storefront/WhatsAppOrderButton";
import { fetchProductById, fetchStoreBySlug } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function StorefrontProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const [store, product] = await Promise.all([fetchStoreBySlug(slug), fetchProductById(productId)]);

  if (!store || !product || product.storeSlug !== slug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-14">
        <section className="rounded-2xl border border-border bg-card shadow-sm grid gap-6 p-8 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Product detail</span>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-foreground">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{product.description}</p>
          </div>
          <div className="rounded-4xl border border-border bg-white p-6">
            <p className="text-sm text-muted-foreground">Price</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">{formatGHS(product.priceGhs)}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{product.inventory} items available</p>
            <div className="mt-6">
              <WhatsAppOrderButton phone={store.whatsappNumber} label="Buy via WhatsApp" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}