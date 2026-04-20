"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How quickly can I set up my store?",
    a: "Most vendors have their store live within 10–15 minutes. You create an account, add your products, and your public store link is ready to share.",
  },
  {
    q: "Do I need any technical skills?",
    a: "None at all. VendorsHub is designed for vendors, not developers. If you can upload a photo and type a description, you can run your store.",
  },
  {
    q: "Can I use my existing WhatsApp and Instagram content?",
    a: "Yes. You can copy your product descriptions and upload the same photos you already use. Your storefront will look clean and professional immediately.",
  },
  {
    q: "How are orders managed?",
    a: "Every order that comes through your storefront appears in your dashboard. You can see the customer's details, what they ordered, and mark it as processing, shipped, or delivered.",
  },
  {
    q: "What payment methods are supported?",
    a: "We currently support Mobile Money (MTN, Vodafone, AirtelTigo) and bank transfer. Payment gateway integrations are expanding continuously.",
  },
  {
    q: "Can I cancel or change my plan at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings. No long-term contracts or hidden fees.",
  },
  {
    q: "Can I use my own domain name?",
    a: "Yes, on the Starter plan and above you can connect a custom domain. Your store will be accessible at your own URL instead of the default subdomain.",
  },
  {
    q: "Is my store data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never share your data or your customers' data with third parties.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            FAQ
          </p>
          <h2
            className="text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Questions we hear often.
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="px-7">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  {faq.q}
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6">
                    <p className="text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
