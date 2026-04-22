"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";

export default function DashboardProductsPage() {
  const { products, remove } = useProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
            Products
          </span>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Product catalog
          </h1>
        </div>
        <Link
          href="/dashboard/products/new"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
        >
          + Add product
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Product</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Category</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Price</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Stock</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                  No products yet.{" "}
                  <Link href="/dashboard/products/new" className="font-medium text-primary hover:underline">
                    Add your first product →
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                    {product.description && (
                      <p className="text-xs text-muted-foreground truncate max-w-50">
                        {product.description}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">
                    {formatGHS(product.priceGhs)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-sm font-medium ${
                        product.inventory <= 5
                          ? "text-red-600"
                          : product.inventory <= 15
                          ? "text-amber-600"
                          : "text-foreground"
                      }`}
                    >
                      {product.inventory}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${product.name}"?`)) remove(product.id);
                        }}
                        className="text-xs font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}