import Link from "next/link";

import { fetchProducts } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Products</span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Manage product inventory and catalog health</h1>
        </div>
        <Link href="/dashboard/products/new" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">
          Add product
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-line text-left text-sm">
          <thead className="bg-primary/10/50 text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-medium">Product</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 font-medium">Inventory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-card">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-4 font-medium text-foreground">
                  <Link href={`/dashboard/products/${product.id}`}>{product.name}</Link>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{product.category}</td>
                <td className="px-5 py-4 text-muted-foreground">{formatGHS(product.priceGhs)}</td>
                <td className="px-5 py-4 text-muted-foreground">{product.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}