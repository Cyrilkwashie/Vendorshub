"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoreProfile, getProducts } from "@/lib/store";
import type { StoreProfile, Product } from "@/types";
import { CartProvider, useCart } from "@/components/storefront/CartContext";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { StorefrontProductCard } from "@/components/storefront/StorefrontProductCard";

// ── Navbar ───────────────────────────────────────────────────────────────────
function StoreNav({ store }: { store: StoreProfile }) {
  const { count, openCart } = useCart();
  const initials = store.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border/60 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shrink-0">
            {initials}
          </div>
          <span className="text-sm font-semibold text-foreground">{store.name}</span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shop</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </nav>

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
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function StoreHero({ store, productCount }: { store: StoreProfile; productCount: number }) {
  const { openCart } = useCart();
  const initials = store.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Open now · {store.city}, {store.country}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {store.name}
          </h1>
          <p className="text-base leading-7 text-white/65 max-w-md">{store.description}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#products"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90 transition-colors shadow-md"
            >
              Browse collection
            </a>
            <button
              onClick={openCart}
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              View cart
            </button>
          </div>
        </div>

        {/* Right — store card mockup */}
        <div className="hidden md:flex justify-end">
          <div className="w-72 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm overflow-hidden shadow-2xl">
            <div className="bg-white/10 border-b border-white/10 px-5 py-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold">
                {initials}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{store.name}</p>
                <p className="text-[10px] text-white/50">{store.city} · ⭐ 4.9</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: "Products", value: `${productCount} items` },
                { label: "Delivery", value: "Next day" },
                { label: "Payment", value: "On WhatsApp" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-white/40">{row.label}</span>
                  <span className="text-[11px] font-semibold text-white/80">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <div className="rounded-xl bg-white/10 px-4 py-2.5 text-center text-xs font-semibold text-white">
                🛍 Shop now &amp; order on WhatsApp
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ store, productCount }: { store: StoreProfile; productCount: number }) {
  const stats = [
    { label: "Products", value: `${productCount}+` },
    { label: "Location", value: store.city },
    { label: "WhatsApp orders", value: "Accepted" },
    { label: "Response time", value: "< 1 hour" },
  ];
  return (
    <div className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-base font-semibold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function StorePageContent({ slug, store, products }: { slug: string; store: StoreProfile; products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);
  const featured = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <StoreNav store={store} />
      <CartDrawer whatsapp={store.whatsapp} storeName={store.name} />
      <StoreHero store={store} productCount={products.length} />
      <StatsBar store={store} productCount={products.length} />

      {/* Featured picks */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Hand-picked</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Featured products
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <StorefrontProductCard key={product.id} product={product} storeSlug={slug} featured />
            ))}
          </div>
        </section>
      )}

      {/* All products with category filter */}
      <section id="products" className="mx-auto max-w-6xl px-6 pb-16 scroll-mt-20">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              All products
            </h2>
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">No products in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <StorefrontProductCard key={product.id} product={product} storeSlug={slug} />
            ))}
          </div>
        )}
      </section>

      {/* About section */}
      <section id="about" className="border-t border-border bg-muted/30 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
            <h2 className="text-3xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              About {store.name}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">{store.description}</p>
            <p className="text-sm leading-7 text-muted-foreground">
              Based in {store.city}, {store.country} — we take pride in delivering quality products and a seamless shopping experience directly through WhatsApp.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🛍", title: "Easy ordering", desc: "Add items and checkout via WhatsApp in seconds" },
              { icon: "🚀", title: "Fast delivery", desc: "We deliver across " + store.city + " and beyond" },
              { icon: "💬", title: "Always available", desc: "Chat with us on WhatsApp anytime" },
              { icon: "✅", title: "Quality products", desc: "Every item is carefully curated and verified" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 space-y-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs leading-5 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA section */}
      <section id="contact" className="bg-primary scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Ready to order?
            </h2>
            <p className="text-sm text-white/65">Start shopping and checkout directly on WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us
            </a>
            <a href="#products"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Browse products
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
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

// ── Route component ───────────────────────────────────────────────────────────
export default function StorefrontPage({ params }: { params: Promise<{ slug: string }> }) {
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Store not found</p>
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to VendorsHub</Link>
    </div>
  );

  if (!store) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );

  return (
    <CartProvider>
      <StorePageContent slug={slug} store={store} products={products} />
    </CartProvider>
  );
}