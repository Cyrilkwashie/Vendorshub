"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductPageProps } from "../types";
import { formatGHS } from "@/lib/utils";
import { useCart } from "@/components/storefront/CartContext";

const CATEGORY_BG: Record<string, string> = {
  Jewellery: "bg-amber-50", Bracelets: "bg-rose-50", Rings: "bg-orange-50",
  Bags: "bg-emerald-50", Clothing: "bg-sky-50", Accessories: "bg-violet-50",
  General: "bg-gray-50",
};

function RelatedCard({ product, storeSlug }: { product: ProductPageProps["allProducts"][0]; storeSlug: string }) {
  const bg = CATEGORY_BG[product.category] || "bg-gray-50";
  return (
    <Link href={`/store/${storeSlug}/${product.id}`} className="group">
      <div className={`${bg} aspect-[3/4] relative overflow-hidden mb-4`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-300"><rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.2"/></svg>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
      </div>
      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-1">{product.category}</p>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors truncate">{product.name}</h3>
        <span className="text-sm font-medium text-gray-900 shrink-0">{formatGHS(product.priceGhs)}</span>
      </div>
    </Link>
  );
}

export default function ProductPage({ slug, store, product, allProducts }: ProductPageProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const bg = CATEGORY_BG[product.category] || "bg-gray-50";
  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  function handleAdd() {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="flex items-center gap-2 text-[11px] text-gray-400">
          <Link href={`/store/${slug}`} className="hover:text-gray-900 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/store/${slug}/shop`} className="hover:text-gray-900 transition-colors">Shop</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-6 mb-6">
        <Link href={`/store/${slug}/shop`} className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 hover:text-gray-900 transition-colors">← Back</Link>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`${bg} aspect-square flex items-center justify-center relative`}>
            {product.inventory > 0 && product.inventory <= 5 && <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">Low stock</span>}
            {product.inventory === 0 && <div className="absolute inset-0 bg-white/50 flex items-center justify-center"><span className="bg-gray-900 text-white px-4 py-2 text-[10px] font-semibold uppercase tracking-wider">Sold out</span></div>}
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none" className="text-gray-300"><rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1"/><circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1"/><circle cx="24" cy="11" r="2" stroke="currentColor" strokeWidth="1"/></svg>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{product.name}</h1>
            <div className="flex items-center gap-2 mb-4"><div className="flex text-amber-400 text-sm tracking-wider">★★★★★</div><span className="text-xs text-gray-400">4.8</span></div>
            <p className="text-2xl font-semibold text-gray-900 mb-8">{formatGHS(product.priceGhs)}</p>
            {product.inventory > 0 && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-gray-500 hover:text-gray-900 text-lg">−</button>
                  <span className="w-12 text-center text-sm font-medium text-gray-900">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.inventory, q + 1))} className="flex h-12 w-12 items-center justify-center text-gray-500 hover:text-gray-900 text-lg">+</button>
                </div>
                <button onClick={handleAdd} className={`flex-1 h-12 flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all ${added ? "bg-emerald-600 text-white" : "bg-[#1a1a2e] text-white hover:bg-[#2a2a3e]"}`}>
                  {added ? "✓ Added!" : "🛍 Add to bag"}
                </button>
              </div>
            )}
            <p className="text-xs text-gray-400 mb-8">Checkout via WhatsApp · Delivery across {store.city}</p>
            <p className="text-sm leading-7 text-gray-500 mb-8">{product.description}</p>
            <div className="border-t border-gray-200">
              <button onClick={() => setDetailsOpen(!detailsOpen)} className="w-full flex items-center justify-between py-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-900">
                Product Details
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`}><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {detailsOpen && <div className="pb-5 text-sm text-gray-500 leading-7 space-y-2"><p>Category: {product.category}</p><p>Availability: {product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}</p></div>}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-24">
            <div className="border-t border-gray-200 pt-16 mb-10">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">You may also like</p>
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Complete the Look</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">{related.map((p) => <RelatedCard key={p.id} product={p} storeSlug={slug} />)}</div>
          </div>
        )}
      </div>
    </>
  );
}
