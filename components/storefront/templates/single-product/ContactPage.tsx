"use client";

import type { StorePageProps } from "../types";

export default function ContactPage({ slug, store }: StorePageProps) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-6">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Get in touch</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Contact Us</h1>
      </div>
      <div className="border-t border-gray-200 mx-auto max-w-7xl" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>We&apos;d love to hear from you</h2>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-2">WhatsApp</p>
              <a href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-[#25D366] transition-colors">
                <span className="flex h-10 w-10 items-center justify-center bg-[#25D366] text-white text-lg">💬</span>
                Chat with us on WhatsApp
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-2">Location</p>
              <p className="text-sm text-gray-600">{store.city}, {store.country}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-2">Business Hours</p>
              <p className="text-sm text-gray-600">Monday — Saturday: 8am — 8pm</p>
              <p className="text-sm text-gray-400 mt-1">Sunday: Available on WhatsApp</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">Send a message</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
            window.open(`https://wa.me/${store.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hi ${store.name}! I'm ${name}. ${message}`)}`, "_blank");
          }} className="space-y-5">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-2">Your name</label>
              <input name="name" required placeholder="Enter your name" className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-2">Your email</label>
              <input name="email" type="email" placeholder="Enter your email (optional)" className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-2">Message</label>
              <textarea name="message" rows={4} required placeholder="What would you like to know?" className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#1a1a2e] text-white py-3.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#2a2a3e] transition-all">Send via WhatsApp</button>
            <p className="text-[10px] text-gray-400 text-center">Your message will be sent directly to our WhatsApp</p>
          </form>
        </div>
      </div>
    </>
  );
}
