"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import type { StoreProfile } from "@/types";
import { CartProvider, useCart } from "@/components/storefront/CartContext";
import { CartDrawer } from "@/components/storefront/CartDrawer";

// ── Announcement Bar ──────────────────────────────────────────────────────────
function AnnouncementBar({ store }: { store: StoreProfile }) {
  return (
    <div className="bg-[#1a1a2e] text-center py-2.5 px-4">
      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/80">
        Order via WhatsApp · Fast delivery across {store.city} · New products weekly
      </p>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ store, slug }: { store: StoreProfile; slug: string }) {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: `/store/${slug}`, label: "Home" },
    { href: `/store/${slug}/shop`, label: "Shop" },
    { href: `/store/${slug}/about`, label: "About" },
    { href: `/store/${slug}/contact`, label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Left nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-gray-500 hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -ml-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href={`/store/${slug}`}>
            <span className="text-xl font-semibold tracking-[0.08em] text-gray-900"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {store.name.toUpperCase()}
            </span>
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button onClick={openCart} className="relative p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-900">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1a1a2e] text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block text-[11px] font-medium tracking-[0.12em] uppercase text-gray-500 hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function StoreFooter({ store, slug }: { store: StoreProfile; slug: string }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-gray-900 tracking-[0.05em] mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {store.name.toUpperCase()}
            </p>
            <p className="text-xs text-gray-400 leading-5 max-w-xs">
              {store.description || `Quality products from ${store.city}, ${store.country}.`}
            </p>
          </div>
          {/* Quick links */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-900 mb-4">Quick Links</p>
            <div className="space-y-2.5">
              <Link href={`/store/${slug}`} className="block text-xs text-gray-400 hover:text-gray-900 transition-colors">Home</Link>
              <Link href={`/store/${slug}/shop`} className="block text-xs text-gray-400 hover:text-gray-900 transition-colors">Shop</Link>
              <Link href={`/store/${slug}/about`} className="block text-xs text-gray-400 hover:text-gray-900 transition-colors">About</Link>
              <Link href={`/store/${slug}/contact`} className="block text-xs text-gray-400 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
          </div>
          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-900 mb-4">Get in touch</p>
            <div className="space-y-2.5">
              <p className="text-xs text-gray-400">{store.city}, {store.country}</p>
              {store.whatsapp && (
                <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors">
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-300">© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          <Link href="/" className="flex items-center gap-1.5 text-[10px] text-gray-300 hover:text-gray-500 transition-colors">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-[#1a1a2e] text-white text-[8px] font-bold">V</span>
            Powered by VendorsHub
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ── Shell (wraps all store pages) ─────────────────────────────────────────────
function ShellContent({ store, slug, children }: { store: StoreProfile; slug: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBar store={store} />
      <Navbar store={store} slug={slug} />
      <CartDrawer whatsapp={store.whatsapp} storeName={store.name} />
      <main className="flex-1">{children}</main>
      <StoreFooter store={store} slug={slug} />
    </div>
  );
}

export function StoreShell({ store, slug, children }: { store: StoreProfile; slug: string; children: ReactNode }) {
  return (
    <CartProvider>
      <ShellContent store={store} slug={slug}>{children}</ShellContent>
    </CartProvider>
  );
}
