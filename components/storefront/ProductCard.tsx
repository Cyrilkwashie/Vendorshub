import type { Product } from "@/types";
import { formatGHS } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden p-5">
      <div className="rounded-2xl border border-border bg-muted/50 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
        <h3 className="mt-3 text-xl font-semibold text-foreground">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <strong className="text-lg text-foreground">{formatGHS(product.priceGhs)}</strong>
        <span className="text-sm text-muted-foreground">{product.inventory} in stock</span>
      </div>
    </article>
  );
}