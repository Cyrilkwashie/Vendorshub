"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoreProfile, getProducts } from "@/lib/store";
import type { StoreProfile, Product } from "@/types";
import { StoreShell } from "@/components/storefront/StoreShell";
import { getTemplate } from "@/components/storefront/templates";

export default function StorefrontProductPage({ params }: { params: Promise<{ slug: string; productId: string }> }) {
  const { slug, productId } = use(params);
  const [store, setStore] = useState<StoreProfile | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const profile = getStoreProfile();
    if (!profile || profile.slug !== slug) { setNotFound(true); return; }
    const products = getProducts();
    const found = products.find((p) => p.id === productId);
    if (!found) { setNotFound(true); return; }
    setStore(profile);
    setProduct(found);
    setAllProducts(products);
  }, [slug, productId]);

  if (notFound) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Product not found</p>
      <Link href={`/store/${slug}/shop`} className="text-[11px] text-gray-400 hover:text-gray-900">← Back to shop</Link>
    </div>
  );
  if (!store || !product) return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
    </div>
  );

  const { ProductPage } = getTemplate(store.template);

  return (
    <StoreShell store={store} slug={slug}>
      <ProductPage slug={slug} store={store} product={product} allProducts={allProducts} />
    </StoreShell>
  );
}