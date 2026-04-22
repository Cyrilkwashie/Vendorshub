"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoreProfile, getProducts } from "@/lib/store";
import type { StoreProfile, Product } from "@/types";
import { formatGHS } from "@/lib/utils";
import { CartProvider, useCart } from "@/components/storefront/CartContext";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontProductCard } from "@/components/storefront/StorefrontProductCard";

const CATEGORY_COLORS: Record<string, string> = {
  Jewellery: "bg-amber-50",
  Bracelets: "bg-rose-50",
  Rings: "bg-orange-50",
  Bags: "bg-emerald-50",
  Clothing: "bg-sky-50",
  Accessories: "bg-violet-50",
};

function ProductDetailContent({
  slug,
  store,
  product,
  allProducts,
}: {
  slug: string;
  store: StoreProfile;
  product: Product;
  allProducts: Product[];
}) {
  const { add, count, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const bgColor = CATEGORY_COLORS[product.category] ?? "bg-muted/50";
  const initials = store.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href={`/store/${slug}`} className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shrink-0">
              {initials}
            </div>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{store.name}</span>
          </Link>
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer whatsapp={store.whatsapp} storeName={store.name} />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href={`/store/${slug}`} className="hover:text-primary transition-colors">{store.name}</Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Image */}
          <div>
            <div className={`${bgColor} rounded-2xl flex items-center justify-center aspect-square relative overflow-hidden`}>
              {product.inventory > 0 && product.inventory <= 5 && (
                <span className="absolute top-4 left-4 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-600">
                  Only {product.inventory} left
                </span>
              )}
              {product.inventory === 0 && (
                <span className="absolute top-4 left-4 rounded-full bg-muted border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Out of stock
                </span>
              )}
              <div className="flex h-36 w-36 items-center justify-center rounded-3xl border border-border/40 bg-white/70 shadow-lg">
                <svg width="56" height="56" viewBox="0 0 32 32" fill="none" className="text-muted-foreground/30">
                  <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="24" cy="11" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>
              <h1
                className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {product.name}
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{product.description}</p>
            </div>

            {/* Price & stock */}
            <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <strong className="text-3xl font-semibold text-foreground">{formatGHS(product.priceGhs)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stock</span>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  product.inventory > 5 ? "text-emerald-600" : product.inventory > 0 ? "text-amber-600" : "text-red-600"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    product.inventory > 5 ? "bg-emerald-500" : product.inventory > 0 ? "bg-amber-500" : "bg-red-500"
                  }`} />
                  {product.inventory > 0 ? `${product.inventory} available` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Qty selector */}
            {product.inventory > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-foreground">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.inventory, q + 1))}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all shadow-md ${
                added
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : "bg-primary text-white hover:bg-primary/90 shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Added to cart!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add to cart
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Add items to cart, then checkout via WhatsApp
            </p>

            <Link href={`/store/${slug}`} className="text-center text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Continue shopping
            </Link>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">More like this</p>
              <h2 className="mt-1 text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                You might also like
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <StorefrontProductCard key={p.id} product={p} storeSlug={slug} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white text-[9px] font-bold">V</span>
            Powered by VendorsHub
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function StorefrontProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Product not found</p>
      <Link href={`/store/${slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to store</Link>
    </div>
  );

  if (!store || !product) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );

  return (
    <CartProvider>
      <ProductDetailContent slug={slug} store={store} product={product} allProducts={allProducts} />
    </CartProvider>
  );
}