"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatGHS } from "@/lib/utils";
import { useCart } from "@/components/storefront/CartContext";

const CATEGORY_COLORS: Record<string, string> = {
  Jewellery: "bg-amber-50",
  Bracelets: "bg-rose-50",
  Rings: "bg-orange-50",
  Bags: "bg-emerald-50",
  Clothing: "bg-sky-50",
  Accessories: "bg-violet-50",
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? "bg-muted/50";
}

interface StorefrontProductCardProps {
  product: Product;
  storeSlug: string;
  featured?: boolean;
}

export function StorefrontProductCard({ product, storeSlug, featured }: StorefrontProductCardProps) {
  const { add } = useCart();
  const bgColor = getCategoryColor(product.category);

  return (
    <article className={`group rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5 ${featured ? "ring-2 ring-primary/10" : ""}`}>
      {/* Image area */}
      <Link href={`/store/${storeSlug}/${product.id}`} className="block relative">
        <div className={`${bgColor} flex items-center justify-center h-52 relative`}>
          {featured && (
            <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white tracking-wide">
              FEATURED
            </span>
          )}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/40 bg-white/70 shadow-sm">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-muted-foreground/40">
              <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="24" cy="11" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          {product.inventory > 0 && product.inventory <= 5 && (
            <span className="absolute top-3 right-3 rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-semibold text-red-600">
              Only {product.inventory} left
            </span>
          )}
          {product.inventory === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
              <span className="rounded-full bg-muted border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">Out of stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          <span className="inline-block rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
          <Link href={`/store/${storeSlug}/${product.id}`}>
            <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <strong className="text-lg font-semibold text-foreground">{formatGHS(product.priceGhs)}</strong>
          <button
            onClick={() => add(product)}
            disabled={product.inventory === 0}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}


