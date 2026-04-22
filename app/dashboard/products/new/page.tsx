"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/hooks/useLocalStore";

const INPUT = "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all w-full";

export default function DashboardNewProductPage() {
  const router = useRouter();
  const { add } = useProducts();

  const [form, setForm] = useState({
    name: "",
    category: "",
    priceGhs: "",
    inventory: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    add({
      name: form.name.trim(),
      category: form.category.trim(),
      priceGhs: parseFloat(form.priceGhs) || 0,
      inventory: parseInt(form.inventory) || 0,
      description: form.description.trim(),
    });
    router.push("/dashboard/products");
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/products" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
          ← Products
        </Link>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Add new product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card shadow-sm grid gap-4 p-6 md:grid-cols-2"
      >
        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Product name *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={INPUT}
            placeholder="Gold Bangle Set"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Category *
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className={INPUT}
            placeholder="Jewellery"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Price (GHS) *
          <input
            name="priceGhs"
            value={form.priceGhs}
            onChange={handleChange}
            className={INPUT}
            placeholder="180"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Stock quantity
          <input
            name="inventory"
            value={form.inventory}
            onChange={handleChange}
            className={INPUT}
            placeholder="20"
            type="number"
            min="0"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`${INPUT} min-h-28 resize-none`}
            placeholder="Describe this product..."
          />
        </label>
        <div className="flex items-center gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save product"}
          </button>
          <Link
            href="/dashboard/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}