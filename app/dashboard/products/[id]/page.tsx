"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";
import type { Product } from "@/types";

const INPUT = "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all w-full";

export default function DashboardProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { products, update } = useProducts();
  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    category: "",
    priceGhs: 0,
    inventory: 0,
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (product) setForm(product);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground text-sm">Product not found.</p>
        <Link href="/dashboard/products" className="text-xs font-medium text-primary hover:underline">
          ← Back to products
        </Link>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    update(id, {
      name: String(form.name ?? "").trim(),
      category: String(form.category ?? "").trim(),
      priceGhs: parseFloat(String(form.priceGhs)) || 0,
      inventory: parseInt(String(form.inventory)) || 0,
      description: String(form.description ?? "").trim(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/dashboard/products" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            ← Products
          </Link>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {product.name}
          </h1>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
          {product.category}
        </span>
      </div>

      {/* Quick stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Price</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{formatGHS(product.priceGhs)}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Stock</p>
          <h2 className={`mt-3 text-2xl font-semibold ${
            product.inventory <= 5 ? "text-red-600" : product.inventory <= 15 ? "text-amber-600" : "text-foreground"
          }`}>
            {product.inventory}
          </h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-xs text-muted-foreground">Added</p>
          <h2 className="mt-3 text-sm font-semibold text-foreground">
            {new Date(product.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </h2>
        </article>
      </section>

      {/* Edit form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card shadow-sm grid gap-4 p-6 md:grid-cols-2"
      >
        <p className="text-sm font-semibold text-foreground md:col-span-2">Edit product</p>
        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Product name
          <input name="name" value={String(form.name ?? "")} onChange={handleChange} className={INPUT} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Category
          <input name="category" value={String(form.category ?? "")} onChange={handleChange} className={INPUT} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Price (GHS)
          <input name="priceGhs" value={String(form.priceGhs ?? 0)} onChange={handleChange} className={INPUT} type="number" min="0" step="0.01" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Stock quantity
          <input name="inventory" value={String(form.inventory ?? 0)} onChange={handleChange} className={INPUT} type="number" min="0" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Description
          <textarea name="description" value={String(form.description ?? "")} onChange={handleChange} className={`${INPUT} min-h-28 resize-none`} />
        </label>
        <div className="flex items-center gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}