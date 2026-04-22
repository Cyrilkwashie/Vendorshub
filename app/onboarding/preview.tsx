"use client";
import { useState } from "react";
import { OnboardingData, THEMES, STORE_STYLES, ThemeConfig } from "./config";

function Storefront({ data, s }: { data: OnboardingData; s: ThemeConfig }) {
  const sections = STORE_STYLES[data.storeStyle].sections;
  const has = (id: string) => sections.includes(id);
  const name = data.storeName || "Your Store";
  const desc = data.description || "Premium products, delivered right to your door.";
  const fontFamily = s.font === "inherit" ? "system-ui, -apple-system, sans-serif" : s.font;

  return (
    <div style={{ fontFamily, backgroundColor: s.bg, minHeight: 900 }}>
      <header style={{ backgroundColor: s.headerBg, borderBottom: `1px solid ${s.headerBorder}`, padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: s.textColor, letterSpacing: "-0.5px" }}>{name}</span>
        <nav style={{ display: "flex", gap: 32, fontSize: 14, color: s.subColor }}>
          {has("products") && <span>Products</span>}
          {has("about") && <span>About</span>}
          {has("contact") && <span>Contact</span>}
        </nav>
        <button style={{ backgroundColor: s.accent, color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}>Order Now</button>
      </header>

      <section style={{ background: `linear-gradient(135deg, ${s.accent}28 0%, ${s.bg} 65%)`, padding: "88px 48px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: s.accent, marginBottom: 16 }}>Welcome to</p>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: s.textColor, lineHeight: 1.08, marginBottom: 20 }}>{name}</h1>
        <p style={{ fontSize: 18, color: s.subColor, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.65 }}>{desc}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ backgroundColor: s.accent, color: "#fff", padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>💬 Order via WhatsApp</button>
          {has("products") && <button style={{ backgroundColor: "transparent", color: s.textColor, padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 600, border: `2px solid ${s.textColor}30`, cursor: "pointer" }}>Browse Products</button>}
        </div>
      </section>

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
              <div key={i} style={{ backgroundColor: s.cardBg, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}>
                <div style={{ height: 200, backgroundColor: s.accent + "28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🛍️</div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <p style={{ fontWeight: 700, color: s.textColor, fontSize: 16, marginBottom: 6 }}>{product.name}</p>
                  <p style={{ color: s.subColor, fontSize: 14, marginBottom: 16 }}>GHS {product.price}</p>
                  <button style={{ width: "100%", backgroundColor: s.accent, color: "#fff", padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>Add to Order</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {has("about") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.cardBg }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 20 }}>About Us</h2>
            <p style={{ fontSize: 17, color: s.subColor, lineHeight: 1.8 }}>{desc}</p>
          </div>
        </section>
      )}

      {has("reviews") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.bg }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 40 }}>What Our Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { text: "Absolutely love the products! Quality is top-notch.", name: "Ama K." },
              { text: "Ordering via WhatsApp is so easy and convenient!", name: "Kofi A." },
            ].map((review, i) => (
              <div key={i} style={{ backgroundColor: s.cardBg, borderRadius: 20, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ color: "#f59e0b", fontSize: 20, marginBottom: 14 }}>★★★★★</div>
                <p style={{ color: s.textColor, fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>"{review.text}"</p>
                <p style={{ color: s.subColor, fontSize: 13, fontWeight: 600 }}>— {review.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {has("whatsapp") && (
        <section style={{ padding: "72px 48px", textAlign: "center", background: `linear-gradient(135deg, ${s.accent}18, ${s.accent}08)` }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: s.textColor, marginBottom: 14 }}>Ready to Order?</h2>
          <p style={{ fontSize: 17, color: s.subColor, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Chat with us on WhatsApp to place your order instantly.</p>
          <button style={{ backgroundColor: "#25D366", color: "#fff", padding: "16px 40px", borderRadius: 999, fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer" }}>💬 Chat on WhatsApp</button>
        </section>
      )}

      {has("social") && (
        <section style={{ padding: "40px 48px", backgroundColor: s.bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          {[["📸", "Instagram"], ["🎵", "TikTok"], ["👍", "Facebook"]].map(([icon, label]) => (
            <button key={label} style={{ backgroundColor: s.cardBg, color: s.textColor, padding: "10px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, border: `1px solid ${s.headerBorder}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </section>
      )}

      {has("contact") && (
        <section style={{ padding: "72px 48px", backgroundColor: s.cardBg }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: s.textColor, marginBottom: 32 }}>Get In Touch</h2>
          <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
            <input placeholder="Your name" style={{ padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.headerBorder}`, fontSize: 15, backgroundColor: s.bg, color: s.textColor, outline: "none" }} />
            <input placeholder="Your email" style={{ padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.headerBorder}`, fontSize: 15, backgroundColor: s.bg, color: s.textColor, outline: "none" }} />
            <button style={{ backgroundColor: s.accent, color: "#fff", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>Send Message</button>
          </div>
        </section>
      )}

      <footer style={{ backgroundColor: s.headerBg, borderTop: `1px solid ${s.headerBorder}`, padding: "36px 48px", textAlign: "center" }}>
        <p style={{ fontWeight: 800, fontSize: 18, color: s.textColor, marginBottom: 8 }}>{name}</p>
        <p style={{ color: s.subColor, fontSize: 13 }}>© 2026 {name} · Powered by VendorsHub</p>
      </footer>
    </div>
  );
}

export function LivePreview({ data }: { data: OnboardingData }) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const s = THEMES[data.theme];
  const DESKTOP_W = 1280;
  const DESKTOP_CHROME_W = 540;
  const DESKTOP_CHROME_H = 440;
  const desktopScale = DESKTOP_CHROME_W / DESKTOP_W;
  const MOBILE_W = 390;
  const MOBILE_CHROME_W = 248;
  const MOBILE_CHROME_H = 520;
  const mobileScale = MOBILE_CHROME_W / MOBILE_W;
  const slug = data.slug || "your-store";

  return (
    <div className="sticky top-6 flex flex-col items-center gap-4 w-full">
      <div className="flex items-center rounded-full border border-border bg-muted p-1 gap-0.5">
        <button type="button" onClick={() => setViewMode("desktop")}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${viewMode === "desktop" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="0.75" y="0.75" width="11.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4.5 12h4M6.5 9.25V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          Desktop
        </button>
        <button type="button" onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${viewMode === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          <svg width="10" height="13" viewBox="0 0 10 13" fill="none"><rect x="0.75" y="0.75" width="8.5" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.3" /><circle cx="5" cy="10.5" r="0.75" fill="currentColor" /></svg>
          Mobile
        </button>
      </div>

      {viewMode === "desktop" ? (
        <div className="rounded-xl overflow-hidden border border-border shadow-2xl" style={{ width: DESKTOP_CHROME_W }}>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-2 flex items-center gap-1.5 bg-background border border-border rounded-md px-2.5 py-1 text-[11px] text-muted-foreground truncate">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" className="shrink-0 text-muted-foreground/60"><rect x="0.75" y="3.25" width="7.5" height="6" rx="1.25" stroke="currentColor" strokeWidth="1.2" /><path d="M2.5 3.25V2.5a2 2 0 0 1 4 0v.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              vendorshub.store/{slug}
            </div>
          </div>
          <div style={{ width: DESKTOP_CHROME_W, height: DESKTOP_CHROME_H, overflowY: "auto", overflowX: "hidden", backgroundColor: s.bg }}>
            <div style={{ width: DESKTOP_W, zoom: desktopScale }}>
              <Storefront data={data} s={s} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", width: MOBILE_CHROME_W + 28, paddingTop: 8 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 44, border: "10px solid", borderColor: "rgba(0,0,0,0.18)", boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.1)", pointerEvents: "none", zIndex: 10 }} />
          <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", width: 88, height: 24, backgroundColor: "rgba(0,0,0,0.85)", borderRadius: 20, zIndex: 20 }} />
          <div style={{ borderRadius: 36, overflow: "hidden", height: MOBILE_CHROME_H, margin: "0 14px", position: "relative", backgroundColor: s.bg }}>
            <div style={{ height: 44, backgroundColor: s.headerBg, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 8px", fontSize: 11, fontWeight: 600, color: s.textColor, flexShrink: 0 }}>
              <span>9:41</span>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}><span>●●●</span><span>WiFi</span><span>🔋</span></div>
            </div>
            <div style={{ height: MOBILE_CHROME_H - 44, overflowY: "auto", overflowX: "hidden" }}>
              <div style={{ width: MOBILE_W, zoom: mobileScale }}>
                <Storefront data={data} s={s} />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 100, height: 4, borderRadius: 99, backgroundColor: "rgba(0,0,0,0.2)" }} />
        </div>
      )}
      <p className="text-[11px] text-muted-foreground text-center opacity-70">Preview updates as you fill in your details</p>
    </div>
  );
}
