"use client";

import Link from "next/link";
import type { StorePageProps } from "../types";
import { formatGHS } from "@/lib/utils";

const CATEGORY_BG: Record<string, string> = {
  Jewellery: "bg-amber-50", Bracelets: "bg-rose-50", Rings: "bg-orange-50",
  Bags: "bg-emerald-50", Clothing: "bg-sky-50", Accessories: "bg-violet-50",
  General: "bg-gray-50",
};

// ── Hero Banner ───────────────────────────────────────────────────────────────
function HeroBanner({ store, slug }: { store: StorePageProps["store"]; slug: string }) {
  const headline = store.headline || store.name;
  const hasBanner = !!store.bannerImage;

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "70vh" }}>
      {hasBanner ? (
        <div className="absolute inset-0">
          <img src={store.bannerImage} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#1a1a2e]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-6 flex flex-col justify-end" style={{ minHeight: "70vh", paddingBottom: "5rem" }}>
        <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/50 mb-4">{store.city}, {store.country}</p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-5 max-w-2xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{headline}</h1>
        <p className="text-sm md:text-base text-white/60 max-w-md leading-relaxed mb-8">{store.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/store/${slug}/shop`}
            className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] px-8 py-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-white/90 transition-all">
            Shop Now →
          </Link>
          <Link href={`/store/${slug}/about`}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-white/20 transition-all backdrop-blur-sm">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ product, storeSlug }: { product: StorePageProps["products"][0]; storeSlug: string }) {
  const bg = CATEGORY_BG[product.category] || "bg-gray-50";
  return (
    <article className="group">
      <Link href={`/store/${storeSlug}/${product.id}`} className="block">
        <div className={`${bg} aspect-[3/4] relative overflow-hidden mb-4`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="text-gray-300"><rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          {product.inventory === 0 && <div className="absolute inset-0 bg-white/60 flex items-center justify-center"><span className="bg-gray-900 text-white px-4 py-2 text-[10px] font-semibold uppercase tracking-wider">Sold out</span></div>}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
        </div>
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-1">{product.category}</p>
          <Link href={`/store/${storeSlug}/${product.id}`}><h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors truncate">{product.name}</h3></Link>
        </div>
        <span className="text-sm font-medium text-gray-900 shrink-0">{formatGHS(product.priceGhs)}</span>
      </div>
    </article>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────────
export default function HomePage({ slug, store, products }: StorePageProps) {
  const featured = products.slice(0, 4);
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <HeroBanner store={store} slug={slug} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Featured</p>
              <h2 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Our Picks</h2>
            </div>
            <Link href={`/store/${slug}/shop`} className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1.5">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {featured.map((p) => <FeaturedCard key={p.id} product={p} storeSlug={slug} />)}
          </div>
        </section>
      )}

      {categories.length > 1 && (
        <section className="border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2 text-center">Browse by</p>
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <Link key={cat} href={`/store/${slug}/shop?category=${encodeURIComponent(cat)}`}
                    className="group bg-gray-50 py-10 px-6 text-center hover:bg-gray-100 transition-colors">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{cat}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{count} pieces</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#1a1a2e]">
        <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Let&apos;s get you sorted</h2>
            <p className="text-sm text-white/40 max-w-sm">Browse products, add to your bag, and checkout via WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#1ebe5d] transition-all">💬 Chat on WhatsApp</a>
            <Link href={`/store/${slug}/shop`}
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-white/10 transition-all">Browse products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
