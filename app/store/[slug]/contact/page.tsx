"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoreProfile, getProducts } from "@/lib/store";
import type { StoreProfile, Product } from "@/types";
import { StoreShell } from "@/components/storefront/StoreShell";
import { getTemplate } from "@/components/storefront/templates";

export default function StoreContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [store, setStore] = useState<StoreProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const profile = getStoreProfile();
    if (!profile || profile.slug !== slug) { setNotFound(true); return; }
    setStore(profile);
    setProducts(getProducts());
  }, [slug]);

  if (notFound) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Store not found</p>
      <Link href="/" className="text-[11px] text-gray-400 hover:text-gray-900">← Back</Link>
    </div>
  );
  if (!store) return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
    </div>
  );

  const { ContactPage } = getTemplate(store.template);

  return (
    <StoreShell store={store} slug={slug}>
      <ContactPage slug={slug} store={store} products={products} />
    </StoreShell>
  );
}
