"use client";

import Link from "next/link";
import type { StorePageProps } from "../types";

export default function AboutPage({ slug, store }: StorePageProps) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-6">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>About {store.name}</h1>
      </div>
      <div className="border-t border-gray-200 mx-auto max-w-7xl" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Who We Are</h2>
          <p className="text-sm leading-7 text-gray-500 mb-5">{store.description || `${store.name} is dedicated to bringing you quality products from ${store.city}, ${store.country}.`}</p>
          <p className="text-sm leading-7 text-gray-500 mb-5">We believe in making shopping simple and personal. That&apos;s why we use WhatsApp for ordering — real conversations with real people.</p>
          <p className="text-sm leading-7 text-gray-500">Based in {store.city}, {store.country}, we deliver quality products directly to your door.</p>
        </div>
        <div className="bg-gray-50 aspect-[4/3] flex items-center justify-center">
          <div className="text-center"><span className="text-5xl block mb-3 opacity-30">🏪</span><p className="text-[10px] text-gray-400 uppercase tracking-wider">Store Photo</p></div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2 text-center">What we stand for</p>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-14" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✨", title: "Quality First", desc: "Every product is carefully selected and quality-checked." },
              { icon: "🤝", title: "Personal Service", desc: "We treat every customer like family." },
              { icon: "🚀", title: "Fast Delivery", desc: "Same-day processing, delivered to your door." },
              { icon: "💯", title: "Trust", desc: "What you see is what you get. No surprises." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <span className="text-3xl mb-5 block">{v.icon}</span>
                <p className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider mb-2">{v.title}</p>
                <p className="text-xs text-gray-400 leading-5">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1a1a2e]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Ready to shop?</h2>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">Explore our collection and order directly via WhatsApp.</p>
          <Link href={`/store/${slug}/shop`} className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] px-8 py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-white/90 transition-all">Browse Collection →</Link>
        </div>
      </div>
    </>
  );
}
