"use client";

import { useState } from "react";
import Link from "next/link";
import type { StorePageProps } from "../types";
import { formatGHS } from "@/lib/utils";

const CATEGORY_BG: Record<string, string> = {
  Jewellery: "bg-amber-50", Bracelets: "bg-rose-50", Rings: "bg-orange-50",
  Bags: "bg-emerald-50", Clothing: "bg-sky-50", Accessories: "bg-violet-50",
  General: "bg-gray-50",
};

function ProductCard({ product, storeSlug }: { product: StorePageProps["products"][0]; storeSlug: string }) {
  const bg = CATEGORY_BG[product.category] || "bg-gray-50";
  return (
    <article className="group">
      <Link href={`/store/${storeSlug}/${product.id}`} className="block">
        <div className={`${bg} aspect-[3/4] relative overflow-hidden mb-4`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="text-gray-300"><rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          {product.inventory > 0 && product.inventory <= 5 && <span className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">Low stock</span>}
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

export default function ShopPage({ slug, store, products }: StorePageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-4">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">The Collection</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>All Products</h1>
        <p className="text-sm text-gray-400 mt-1">{products.length} {products.length === 1 ? "piece" : "pieces"}</p>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="border-t border-gray-200 my-8" />
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-all ${activeCategory === cat ? "bg-[#1a1a2e] text-white" : "text-gray-500 hover:text-gray-900"}`}>{cat}</button>
          ))}
        </div>
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-gray-400">{filtered.length} products</p>
          <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-gray-400">Sort: Featured</p>
        </div>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-400 mb-4">No products in this category.</p>
            <button onClick={() => setActiveCategory("All")} className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-900">View all products</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((p) => <ProductCard key={p.id} product={p} storeSlug={slug} />)}
          </div>
        )}
      </div>
    </>
  );
}
