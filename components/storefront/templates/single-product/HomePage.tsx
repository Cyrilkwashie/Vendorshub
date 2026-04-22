"use client";

import Link from "next/link";
import type { StorePageProps } from "../types";
import { formatGHS } from "@/lib/utils";
import { useCart } from "@/components/storefront/CartContext";

const CAT_BG: Record<string, string> = {
  Jewellery: "bg-amber-50", Bracelets: "bg-rose-50", Rings: "bg-orange-50",
  Bags: "bg-emerald-50", Clothing: "bg-sky-50", General: "bg-gray-50",
};

export default function HomePage({ slug, store, products }: StorePageProps) {
  const { add } = useCart();
  const hero = products[0];

  if (!hero) {
    return (
      <div className="py-40 text-center">
        <p className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Coming Soon</p>
        <p className="text-sm text-gray-400">This store is being set up. Check back soon!</p>
      </div>
    );
  }

  const bg = CAT_BG[hero.category] || "bg-gray-50";

  return (
    <>
      {/* Hero product */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className={`${bg} aspect-square flex items-center justify-center`}>
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none" className="text-gray-300">
              <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1"/>
              <circle cx="16" cy="17" r="5" stroke="currentColor" strokeWidth="1"/>
              <circle cx="24" cy="11" r="2" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">{store.name}</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{hero.name}</h1>
            <p className="text-sm text-gray-500 leading-7 mb-8">{hero.description}</p>
            <p className="text-3xl font-semibold text-gray-900 mb-8">{formatGHS(hero.priceGhs)}</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={() => add(hero)}
                className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#1a1a2e] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#2a2a3e] transition-all">
                Add to Bag
              </button>
              <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hi! I'd like to order: ${hero.name}`)}`}
                target="_blank" rel="noreferrer"
                className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#1ebe5d] transition-all">
                💬 Order via WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-6 text-[10px] text-gray-400 uppercase tracking-wider">
              <span>🚀 Fast delivery</span><span>✅ Quality guaranteed</span><span>💬 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 text-center mb-2">Why choose us</p>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-14" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>What Makes Us Different</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✨", title: "Premium Quality", desc: "Carefully selected materials and expert craftsmanship." },
              { icon: "📦", title: "Fast Delivery", desc: "Same-day processing. Delivered right to your door." },
              { icon: "💬", title: "WhatsApp Ordering", desc: "No complicated checkout. Just message us." },
              { icon: "🔄", title: "Easy Returns", desc: "Not satisfied? We'll sort it out quickly." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <span className="text-3xl mb-5 block">{f.icon}</span>
                <p className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-2">{f.title}</p>
                <p className="text-xs text-gray-400 leading-5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 text-center mb-2">Gallery</p>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-14" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>See It Up Close</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {["Front View", "Side View", "Detail", "Packaging"].map((v) => (
              <div key={v} className="bg-gray-50 aspect-square flex flex-col items-center justify-center gap-3">
                <span className="text-3xl opacity-30">📷</span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1a1a2e]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30 text-center mb-2">Reviews</p>
          <h2 className="text-2xl font-semibold text-white text-center mb-14" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>What Customers Say</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { name: "Ama K.", text: "Absolutely love it! Quality exceeded expectations." },
              { name: "Kofi A.", text: "Great product, fast delivery. WhatsApp ordering was easy." },
              { name: "Efua M.", text: "Beautiful packaging and amazing product. Highly recommended." },
            ].map((r) => (
              <div key={r.name} className="border border-white/10 p-8">
                <div className="text-amber-400 text-sm tracking-wider mb-4">★★★★★</div>
                <p className="text-sm text-white/70 leading-7 mb-6">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="order" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">Limited availability</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Get Yours Today</h2>
          <p className="text-4xl font-semibold text-gray-900 mb-10">{formatGHS(hero.priceGhs)}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button onClick={() => add(hero)} className="flex-1 h-12 bg-[#1a1a2e] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#2a2a3e] transition-all">Add to Bag</button>
            <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hi! I'd like to order: ${hero.name}`)}`}
              target="_blank" rel="noreferrer"
              className="flex-1 h-12 flex items-center justify-center bg-[#25D366] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#1ebe5d] transition-all">
              💬 Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
