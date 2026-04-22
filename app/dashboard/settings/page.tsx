"use client";

import { useState, useEffect } from "react";
import { useStoreProfile } from "@/hooks/useLocalStore";
import type { StoreProfile } from "@/types";

const INPUT = "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all w-full";

const PLAN_NAMES = { starter: "Starter", growth: "Growth", pro: "Pro" };

export default function DashboardSettingsPage() {
  const { profile, save } = useStoreProfile();
  const [form, setForm] = useState<StoreProfile>({
    name: "",
    slug: "",
    description: "",
    whatsapp: "",
    country: "",
    city: "",
    plan: "growth",
    email: "",
    createdAt: new Date().toISOString(),
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile?.name]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
          Settings
        </span>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Store settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update your store profile and contact details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card shadow-sm grid gap-4 p-6 md:grid-cols-2"
      >
        <p className="text-sm font-semibold text-foreground md:col-span-2">Store profile</p>

        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Store name
          <input name="name" value={form.name} onChange={handleChange} className={INPUT} />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Store slug
          <input name="slug" value={form.slug} onChange={handleChange} className={INPUT} placeholder="my-store" />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Email
          <input name="email" value={form.email} onChange={handleChange} className={INPUT} type="email" />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          WhatsApp number
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className={INPUT} placeholder="+233 20 000 0000" />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          City
          <input name="city" value={form.city} onChange={handleChange} className={INPUT} />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Country
          <input name="country" value={form.country} onChange={handleChange} className={INPUT} />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Plan
          <select
            name="plan"
            value={form.plan}
            onChange={handleChange}
            className={INPUT}
          >
            {(Object.keys(PLAN_NAMES) as StoreProfile["plan"][]).map((p) => (
              <option key={p} value={p}>
                {PLAN_NAMES[p]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
          Store description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`${INPUT} min-h-24 resize-none`}
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            {saved ? "Saved!" : "Save settings"}
          </button>
        </div>
      </form>

      {/* Plan info */}
      <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current plan</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-foreground capitalize">{form.plan} plan</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {form.plan === "starter" && "Up to 10 products and basic analytics."}
              {form.plan === "growth" && "Unlimited products, full analytics, and WhatsApp integration."}
              {form.plan === "pro" && "Everything in Growth plus priority support and custom domain."}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
            {form.plan}
          </span>
        </div>
      </div>
    </div>
  );
}