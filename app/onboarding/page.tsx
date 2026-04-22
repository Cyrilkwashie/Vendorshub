"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

// ── Types ─────────────────────────────────────────────────────────────────────

type StoreStyle = "modern" | "warm" | "bold" | "minimal";

interface OnboardingData {
  storeName: string;
  description: string;
  slug: string;
  style: StoreStyle;
  sections: string[];
  country: string;
  city: string;
  whatsapp: string;
  productName: string;
  productPrice: string;
  plan: string;
}

const DEFAULT_DATA: OnboardingData = {
  storeName: "",
  description: "",
  slug: "",
  style: "warm",
  sections: ["hero", "products", "about", "reviews", "whatsapp", "footer"],
  country: "",
  city: "",
  whatsapp: "",
  productName: "",
  productPrice: "",
  plan: "Growth",
};

// ── Style configs ─────────────────────────────────────────────────────────────

const STYLES: Record<StoreStyle, {
  label: string;
  tagline: string;
  bg: string;
  headerBg: string;
  headerBorder: string;
  accent: string;
  cardBg: string;
  textColor: string;
  subColor: string;
  font: string;
}> = {
  modern: {
    label: "Modern",
    tagline: "Dark, clean & confident",
    bg: "#0f0f0f",
    headerBg: "#1a1a1a",
    headerBorder: "#ffffff15",
    accent: "#6366f1",
    cardBg: "#1f1f1f",
    textColor: "#ffffff",
    subColor: "#ffffff60",
    font: "inherit",
  },
  warm: {
    label: "VendorsHub",
    tagline: "Your store's default style",
    bg: "#FAFAFA",
    headerBg: "#160B35",
    headerBorder: "#ffffff15",
    accent: "#160B35",
    cardBg: "#ffffff",
    textColor: "#030303",
    subColor: "#03030370",
    font: "inherit",
  },
  bold: {
    label: "Bold",
    tagline: "Vibrant, energetic & standout",
    bg: "#4c1d95",
    headerBg: "#3b0764",
    headerBorder: "#ffffff15",
    accent: "#fbbf24",
    cardBg: "#6d28d9",
    textColor: "#ffffff",
    subColor: "#ffffff70",
    font: "inherit",
  },
  minimal: {
    label: "Minimal",
    tagline: "Clean, spacious & premium",
    bg: "#ffffff",
    headerBg: "#ffffff",
    headerBorder: "#f0f0f0",
    accent: "#111827",
    cardBg: "#f9fafb",
    textColor: "#111827",
    subColor: "#11182760",
    font: "Georgia, serif",
  },
};

// ── Section list ──────────────────────────────────────────────────────────────

const ALL_SECTIONS = [
  { id: "hero", label: "Hero banner", required: true, description: "Your store's first impression" },
  { id: "products", label: "Products", recommended: true, description: "Showcase what you sell" },
  { id: "about", label: "About", recommended: true, description: "Tell your story" },
  { id: "reviews", label: "Customer reviews", recommended: true, description: "Build social proof" },
  { id: "whatsapp", label: "WhatsApp CTA", recommended: true, description: "Let customers order instantly" },
  { id: "social", label: "Social links", description: "Instagram, TikTok, Facebook" },
  { id: "contact", label: "Contact form", description: "Let customers reach you" },
  { id: "footer", label: "Footer", required: true, description: "Store info and links" },
];

// ── Live Preview ──────────────────────────────────────────────────────────────

// Full-size storefront rendered at real dimensions, scaled via CSS transform.
// Using inline styles throughout so theme colors are applied dynamically.
type StyleConfig = typeof STYLES[StoreStyle];

function Storefront({ data, s }: { data: OnboardingData; s: StyleConfig }) {
  const has = (id: string) => data.sections.includes(id);
  const name = data.storeName || "Your Store";
  const desc = data.description || "Premium products, delivered right to your door.";
  const fontFamily = s.font === "inherit" ? "system-ui, -apple-system, sans-serif" : s.font;

  return (
    <div style={{ fontFamily, backgroundColor: s.bg, minHeight: 900 }}>
      {/* Nav */}
      <header style={{ backgroundColor: s.headerBg, borderBottom: `1px solid ${s.headerBorder}`, padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: s.textColor, letterSpacing: "-0.5px" }}>{name}</span>
        <nav style={{ display: "flex", gap: 32, fontSize: 14, color: s.subColor }}>
          {has("products") && <span>Products</span>}
          {has("about") && <span>About</span>}
          {has("contact") && <span>Contact</span>}
        </nav>
        <button style={{ backgroundColor: s.accent, color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}>
          Order Now
        </button>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${s.accent}28 0%, ${s.bg} 65%)`, padding: "88px 48px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: s.accent, marginBottom: 16 }}>
          Welcome to
        </p>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: s.textColor, lineHeight: 1.08, marginBottom: 20, fontFamily }}>
          {name}
        </h1>
        <p style={{ fontSize: 18, color: s.subColor, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.65 }}>
          {desc}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ backgroundColor: s.accent, color: "#fff", padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>
            💬 Order via WhatsApp
          </button>
          {has("products") && (
            <button style={{ backgroundColor: "transparent", color: s.textColor, padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 600, border: `2px solid ${s.textColor}30`, cursor: "pointer" }}>
              Browse Products
            </button>
          )}
        </div>
      </section>

      {/* Products */}
      {has("products") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.bg }}>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 8 }}>Our Products</h2>
            <p style={{ fontSize: 15, color: s.subColor }}>Browse what we have to offer</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { name: data.productName || "Product One", price: data.productPrice || "50" },
              { name: "Product Two", price: "75" },
              { name: "Product Three", price: "120" },
            ].map((product, i) => (
              <div key={i} style={{ backgroundColor: s.cardBg, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <div style={{ height: 200, backgroundColor: s.accent + "28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                  🛍️
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <p style={{ fontWeight: 700, color: s.textColor, fontSize: 16, marginBottom: 6 }}>{product.name}</p>
                  <p style={{ color: s.subColor, fontSize: 14, marginBottom: 16 }}>GHS {product.price}</p>
                  <button style={{ width: "100%", backgroundColor: s.accent, color: "#fff", padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {has("about") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.cardBg }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 20 }}>About Us</h2>
            <p style={{ fontSize: 17, color: s.subColor, lineHeight: 1.8, marginBottom: 16 }}>
              {desc}
            </p>
            <p style={{ fontSize: 17, color: s.subColor, lineHeight: 1.8 }}>
              We are passionate about bringing you the best quality products and making your shopping experience as easy as possible through WhatsApp ordering.
            </p>
          </div>
        </section>
      )}

      {/* Reviews */}
      {has("reviews") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.bg }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 40 }}>What Our Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { text: "Absolutely love the products! Quality is top-notch and delivery was so fast.", name: "Ama K." },
              { text: "Ordering via WhatsApp is so easy and convenient. Will definitely buy again!", name: "Kofi A." },
              { text: "Great customer service and beautiful products. Highly recommended.", name: "Efua M." },
              { text: "Best online store I've shopped from. The packaging was gorgeous too!", name: "Kwame B." },
            ].map((review, i) => (
              <div key={i} style={{ backgroundColor: s.cardBg, borderRadius: 20, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ color: "#f59e0b", fontSize: 20, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ color: s.textColor, fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>"{review.text}"</p>
                <p style={{ color: s.subColor, fontSize: 13, fontWeight: 600 }}>— {review.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      {has("whatsapp") && (
        <section style={{ padding: "72px 48px", textAlign: "center", background: `linear-gradient(135deg, ${s.accent}18, ${s.accent}08)` }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: s.textColor, marginBottom: 14 }}>Ready to Order?</h2>
          <p style={{ fontSize: 17, color: s.subColor, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Chat with us on WhatsApp to place your order instantly. We respond fast!
          </p>
          <button style={{ backgroundColor: "#25D366", color: "#fff", padding: "16px 40px", borderRadius: 999, fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer" }}>
            💬 Chat on WhatsApp
          </button>
        </section>
      )}

      {/* Social links */}
      {has("social") && (
        <section style={{ padding: "40px 48px", backgroundColor: s.bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          {[["📸", "Instagram"], ["🎵", "TikTok"], ["👍", "Facebook"]].map(([icon, label]) => (
            <button key={label} style={{ backgroundColor: s.cardBg, color: s.textColor, padding: "10px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, border: `1px solid ${s.headerBorder}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </section>
      )}

      {/* Contact */}
      {has("contact") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.cardBg }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 32 }}>Get In Touch</h2>
          <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
            <input placeholder="Your name" style={{ padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.headerBorder}`, fontSize: 15, backgroundColor: s.bg, color: s.textColor, outline: "none" }} />
            <input placeholder="Your email" style={{ padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.headerBorder}`, fontSize: 15, backgroundColor: s.bg, color: s.textColor, outline: "none" }} />
            <textarea placeholder="Message" rows={4} style={{ padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.headerBorder}`, fontSize: 15, backgroundColor: s.bg, color: s.textColor, outline: "none", resize: "none" }} />
            <button style={{ backgroundColor: s.accent, color: "#fff", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>Send Message</button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: s.headerBg, borderTop: `1px solid ${s.headerBorder}`, padding: "36px 48px", textAlign: "center" }}>
        <p style={{ fontWeight: 800, fontSize: 18, color: s.textColor, marginBottom: 8 }}>{name}</p>
        <p style={{ color: s.subColor, fontSize: 13 }}>© 2026 {name} · Powered by VendorsHub</p>
      </footer>
    </div>
  );
}

function LivePreview({ data }: { data: OnboardingData }) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const s = STYLES[data.style];

  // Desktop: render storefront at 1280px width, scale to fit chrome
  const DESKTOP_W = 1280;
  const DESKTOP_CHROME_W = 540;
  const DESKTOP_CHROME_H = 440;
  const desktopScale = DESKTOP_CHROME_W / DESKTOP_W;

  // Mobile: render storefront at 390px width (iPhone), scale to fit phone frame
  const MOBILE_W = 390;
  const MOBILE_CHROME_W = 248;
  const MOBILE_CHROME_H = 520;
  const mobileScale = MOBILE_CHROME_W / MOBILE_W;

  const slug = data.slug || "your-store";

  return (
    <div className="sticky top-6 flex flex-col items-center gap-4 w-full">
      {/* Desktop / Mobile toggle */}
      <div className="flex items-center rounded-full border border-border bg-muted p-1 gap-0.5">
        <button
          type="button"
          onClick={() => setViewMode("desktop")}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
            viewMode === "desktop" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="0.75" y="0.75" width="11.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4.5 12h4M6.5 9.25V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Desktop
        </button>
        <button
          type="button"
          onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
            viewMode === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
            <rect x="0.75" y="0.75" width="8.5" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="5" cy="10.5" r="0.75" fill="currentColor" />
          </svg>
          Mobile
        </button>
      </div>

      {viewMode === "desktop" ? (
        /* ── Desktop browser frame ── */
        <div className="rounded-xl overflow-hidden border border-border shadow-2xl" style={{ width: DESKTOP_CHROME_W }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-2 flex items-center gap-1.5 bg-background border border-border rounded-md px-2.5 py-1 text-[11px] text-muted-foreground truncate">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" className="shrink-0 text-muted-foreground/60">
                <rect x="0.75" y="3.25" width="7.5" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2.5 3.25V2.5a2 2 0 0 1 4 0v.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              vendorshub.store/{slug}
            </div>
          </div>
          {/* Scaled storefront — zoom affects layout so overflow-y scroll works */}
          <div style={{ width: DESKTOP_CHROME_W, height: DESKTOP_CHROME_H, overflowY: "auto", overflowX: "hidden", backgroundColor: s.bg }}>
            <div style={{ width: DESKTOP_W, zoom: desktopScale }}>
              <Storefront data={data} s={s} />
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile phone frame ── */
        <div style={{ position: "relative", width: MOBILE_CHROME_W + 28, paddingTop: 8 }}>
          {/* Phone outer bezel */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 44, border: "10px solid", borderColor: "rgba(0,0,0,0.18)", boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.1)", pointerEvents: "none", zIndex: 10 }} />
          {/* Dynamic island notch */}
          <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", width: 88, height: 24, backgroundColor: "rgba(0,0,0,0.85)", borderRadius: 20, zIndex: 20 }} />
          {/* Screen */}
          <div style={{ borderRadius: 36, overflow: "hidden", height: MOBILE_CHROME_H, margin: "0 14px", position: "relative", backgroundColor: s.bg }}>
            {/* Status bar */}
            <div style={{ height: 44, backgroundColor: s.headerBg, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 8px", fontSize: 11, fontWeight: 600, color: s.textColor, flexShrink: 0 }}>
              <span>9:41</span>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span>●●●</span>
                <span>WiFi</span>
                <span>🔋</span>
              </div>
            </div>
            {/* Scaled storefront content — zoom for scrollable layout */}
            <div style={{ height: MOBILE_CHROME_H - 44, overflowY: "auto", overflowX: "hidden" }}>
              <div style={{ width: MOBILE_W, zoom: mobileScale }}>
                <Storefront data={data} s={s} />
              </div>
            </div>
          </div>
          {/* Home indicator */}
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 100, height: 4, borderRadius: 99, backgroundColor: "rgba(0,0,0,0.2)" }} />
        </div>
      )}

      <p className="text-[11px] text-muted-foreground text-center opacity-70">
        Preview updates as you fill in your details
      </p>
    </div>
  );
}

// ── Step components ───────────────────────────────────────────────────────────

function StepStoreDetails({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  const update = (field: keyof OnboardingData, value: string) => setData({ ...data, [field]: value });

  const handleNameChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setData({ ...data, storeName: value, slug });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Tell us about your store
        </h2>
        <p className="text-sm text-muted-foreground mt-1">This is what customers see when they visit your storefront.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Store name
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text"
            placeholder="e.g. Adwoa's Jewels & Accessories"
            value={data.storeName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Store description
          <textarea
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            rows={3}
            placeholder="Tell customers what you sell and what makes you special..."
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Store URL
          <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="px-4 py-3 text-sm text-muted-foreground bg-muted border-r border-border shrink-0">
              vendorshub.store/
            </span>
            <input
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              type="text"
              value={data.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="adwoa-jewels"
            />
          </div>
        </label>
      </div>
    </div>
  );
}

function StepStyle({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Pick your store&apos;s style
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Choose the look and feel of your storefront. You can change this later.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(Object.entries(STYLES) as [StoreStyle, typeof STYLES[StoreStyle]][]).map(([key, style]) => (
          <button
            key={key}
            type="button"
            onClick={() => setData({ ...data, style: key })}
            className={`relative flex flex-col gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
              data.style === key ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-primary/30"
            }`}
          >
            {/* Mini style swatch */}
            <div className="rounded-xl overflow-hidden h-20 w-full" style={{ backgroundColor: style.bg }}>
              <div className="flex items-center justify-between px-2 py-1.5" style={{ backgroundColor: style.headerBg, borderBottom: `1px solid ${style.headerBorder}` }}>
                <div className="h-1.5 w-10 rounded" style={{ backgroundColor: style.textColor + "40" }} />
                <div className="h-4 w-8 rounded-full" style={{ backgroundColor: style.accent }} />
              </div>
              <div className="px-2 py-2 space-y-1.5">
                <div className="h-2 w-3/4 rounded" style={{ backgroundColor: style.textColor + "50", fontFamily: style.font }} />
                <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: style.textColor + "25" }} />
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-5 rounded" style={{ backgroundColor: style.cardBg + "cc" }} />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{style.label}</p>
              <p className="text-xs text-muted-foreground">{style.tagline}</p>
            </div>
            {data.style === key && (
              <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepSections({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  const toggle = (id: string) => {
    const has = data.sections.includes(id);
    const next = has ? data.sections.filter((s) => s !== id) : [...data.sections, id];
    setData({ ...data, sections: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Build your storefront
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Choose what sections appear on your store. We&apos;ve added recommendations based on your goals.</p>
      </div>
      <div className="space-y-2">
        {ALL_SECTIONS.map((section) => {
          const active = data.sections.includes(section.id);
          const disabled = section.required;
          return (
            <div
              key={section.id}
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all ${
                active ? "border-primary/30 bg-primary/4" : "border-border bg-card"
              } ${disabled ? "opacity-70" : "cursor-pointer hover:border-primary/20"}`}
              onClick={() => !disabled && toggle(section.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                  active ? "border-primary bg-primary" : "border-border bg-background"
                }`}>
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{section.label}</p>
                    {section.required && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Required</span>
                    )}
                    {section.recommended && !section.required && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Recommended</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepBranding() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Add your branding
        </h2>
        <p className="text-sm text-muted-foreground mt-1">A great logo and banner help customers trust and remember your store.</p>
      </div>
      <div className="space-y-5">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Store logo</p>
          <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/8">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2v12M7 6l4-4 4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Click to upload logo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB · Square recommended</p>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">
            Store banner <span className="text-muted-foreground font-normal">(optional)</span>
          </p>
          <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-6 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all">
            <p className="text-sm font-medium text-foreground">Click to upload banner</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB · 1200×400px recommended</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

function StepLocation({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  const update = (field: keyof OnboardingData, value: string) => setData({ ...data, [field]: value });
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Where are you based?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Helps customers know where you&apos;re shipping from and builds local trust.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Country
          <select
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
          >
            <option value="">Select a country</option>
            <option value="GH">Ghana</option>
            <option value="NG">Nigeria</option>
            <option value="CI">Côte d&apos;Ivoire</option>
            <option value="SN">Senegal</option>
            <option value="CM">Cameroon</option>
            <option value="KE">Kenya</option>
            <option value="ZA">South Africa</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-foreground">
          City
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text"
            placeholder="e.g. Accra"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Delivery areas <span className="text-muted-foreground font-normal">(optional)</span>
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text"
            placeholder="e.g. Accra, Kumasi, Tema"
          />
        </label>
      </div>
    </div>
  );
}

function StepWhatsApp({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Connect your WhatsApp
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Customers use this number to place orders directly with you.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          WhatsApp number
          <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="px-4 py-3 text-sm text-muted-foreground bg-muted border-r border-border shrink-0">+233</span>
            <input
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              type="tel"
              placeholder="24 000 0000"
              value={data.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Enter your number without the country code.</p>
        </label>
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 space-y-1.5">
          <p className="text-xs font-semibold text-foreground">Why do we need this?</p>
          <p className="text-xs text-muted-foreground leading-5">
            When a customer clicks &quot;Order via WhatsApp&quot; on your storefront, their order details are automatically sent to this number — so you never miss an order.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepFirstProduct({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Add your first product
        </h2>
        <p className="text-sm text-muted-foreground mt-1">You can always add more later — just get one up to start.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Product name
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text"
            placeholder="e.g. Gold Bangle Set"
            value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Price (GHS)
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="number"
            placeholder="0.00"
            min="0"
            value={data.productPrice}
            onChange={(e) => setData({ ...data, productPrice: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Product photo
          <label className="mt-1.5 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-6 cursor-pointer hover:border-primary/40 transition-all">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2v12M7 6l4-4 4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-medium text-foreground">Upload photo</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </label>
        <label className="block text-sm font-medium text-foreground">
          Short description <span className="text-muted-foreground font-normal">(optional)</span>
          <textarea
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            rows={3}
            placeholder="Describe the product briefly..."
          />
        </label>
      </div>
    </div>
  );
}

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: ["1 storefront", "Up to 10 products", "WhatsApp order button", "Basic order tracking"],
    cta: "Start free",
  },
  {
    name: "Growth",
    price: "GHS 49",
    period: "/mo",
    description: "For vendors ready to scale",
    features: ["Unlimited products", "WhatsApp + Instagram orders", "Customer management", "Sales analytics", "Priority support"],
    cta: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Pro",
    price: "GHS 99",
    period: "/mo",
    description: "For serious businesses",
    features: ["3 storefronts", "All channels", "Advanced analytics", "Custom domain", "Dedicated support"],
    cta: "Start 14-day trial",
  },
];

function StepPlan({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Choose your plan
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Start free anytime. Upgrade when you&apos;re ready to grow.</p>
      </div>
      <div className="space-y-3">
        {PLANS.map((plan) => (
          <button
            key={plan.name}
            type="button"
            onClick={() => setData({ ...data, plan: plan.name })}
            className={`relative w-full flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
              data.plan === plan.name ? "border-primary bg-primary/4" : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
                Most popular
              </span>
            )}
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              data.plan === plan.name ? "border-primary bg-primary" : "border-border"
            }`}>
              {data.plan === plan.name && (
                <div className="h-2 w-2 rounded-full bg-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-1.5 mb-1">
                <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                <span className="text-lg font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-xs text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-primary shrink-0">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Steps config ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Store details", showPreview: true },
  { label: "Store sections", showPreview: true },
  { label: "Branding", showPreview: false },
  { label: "Location", showPreview: false },
  { label: "WhatsApp", showPreview: false },
  { label: "First product", showPreview: false },
  { label: "Choose plan", showPreview: false },
];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA);
  const total = STEPS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const showPreview = STEPS[step].showPreview;

  const stepProps = { data, setData };

  const stepComponents = [
    <StepStoreDetails key="details" {...stepProps} />,
    <StepSections key="sections" {...stepProps} />,
    <StepBranding key="branding" />,
    <StepLocation key="location" {...stepProps} />,
    <StepWhatsApp key="whatsapp" {...stepProps} />,
    <StepFirstProduct key="product" {...stepProps} />,
    <StepPlan key="plan" {...stepProps} />,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div
                key={s.label}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < step ? "w-4 bg-primary" : i === step ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Step {step + 1} of {total}</span>
          <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Skip setup
          </Link>
        </div>
      </header>

      {/* Body */}
      <main className="flex flex-1 overflow-hidden">
        {/* Form side */}
        <div className={`flex flex-col flex-1 overflow-y-auto ${showPreview ? "lg:w-[55%] lg:flex-none" : "w-full"}`}>
          <div className="flex-1 px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-lg">
              {stepComponents[step]}
            </div>
          </div>

          {/* Footer nav */}
          <div className="border-t border-border px-6 py-5 shrink-0">
            <div className="mx-auto flex max-w-lg items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={isFirst}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>

              {isLast ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all"
                >
                  Go to my dashboard
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live preview side — only on first 3 steps */}
        {showPreview && (
          <div className="hidden lg:flex lg:w-[45%] shrink-0 flex-col items-center justify-center border-l border-border bg-muted/20 px-10 py-10 overflow-y-auto">
            <LivePreview data={data} />
          </div>
        )}
      </main>
    </div>
  );
}
