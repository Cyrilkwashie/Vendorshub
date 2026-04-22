"use client";

import Link from "next/link";
import type { StorePageProps } from "../types";
import { formatGHS } from "@/lib/utils";

const CAT_BG: Record<string, string> = {
  Jewellery: "bg-amber-50", Bracelets: "bg-rose-50", Rings: "bg-orange-50",
  Bags: "bg-emerald-50", Clothing: "bg-sky-50", Accessories: "bg-violet-50",
};
const CAT_ICONS: Record<string, string> = {
  Jewellery: "💍", Bracelets: "📿", Rings: "💎", Bags: "👜", Clothing: "👗",
  Accessories: "✨", Shoes: "👟",
};

function ProductCard({ product, storeSlug }: { product: StorePageProps["products"][0]; storeSlug: string }) {
  const bg = CAT_BG[product.category] || "bg-gray-50";
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
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors truncate">{product.name}</h3>
        </div>
        <span className="text-sm font-medium text-gray-900 shrink-0">{formatGHS(product.priceGhs)}</span>
      </div>
    </article>
  );
}

export default function HomePage({ slug, store, products }: StorePageProps) {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const grouped: Record<string, StorePageProps["products"]> = {};
  categories.forEach((c) => { grouped[c] = products.filter((p) => p.category === c); });

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a1a2e] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 text-center">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/30 mb-6">Shop by category</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{store.name}</h1>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed mb-10">{store.description}</p>
          <Link href={`/store/${slug}/shop`} className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] px-8 py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-white/90 transition-all">
            Browse All →
          </Link>
        </div>
      </section>

      {/* Category cards */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Browse by</p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-10" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a key={cat} href={`#cat-${cat.toLowerCase().replace(/\s/g, "-")}`}
              className={`group ${CAT_BG[cat] || "bg-gray-50"} aspect-[4/3] flex flex-col justify-end p-6 relative overflow-hidden transition-all hover:opacity-80`}>
              <span className="text-4xl mb-auto">{CAT_ICONS[cat] || "🛍️"}</span>
              <p className="text-sm font-semibold text-gray-900">{cat}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{grouped[cat]?.length || 0} pieces</p>
            </a>
          ))}
        </div>
      </section>

      {/* Products by category */}
      <div className="mx-auto max-w-7xl px-6 pb-20 space-y-20">
        {categories.map((cat) => {
          const items = grouped[cat] || [];
          if (!items.length) return null;
          return (
            <section key={cat} id={`cat-${cat.toLowerCase().replace(/\s/g, "-")}`} className="scroll-mt-16">
              <div className="border-t border-gray-200 pt-10 mb-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-1">{items.length} pieces</p>
                  <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{cat}</h2>
                </div>
                <span className="text-3xl">{CAT_ICONS[cat] || "🛍️"}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {items.map((p) => <ProductCard key={p.id} product={p} storeSlug={slug} />)}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="bg-[#1a1a2e]">
        <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Ready to order?</h2>
            <p className="text-sm text-white/40">Browse categories, add to your bag, checkout via WhatsApp.</p>
          </div>
          <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#1ebe5d] transition-all">💬 Chat on WhatsApp</a>
        </div>
      </section>
    </>
  );
}
