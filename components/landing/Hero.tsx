import Link from "next/link";
import Image from "next/image";

function StoreMockup() {
  return (
    <div className="relative w-full">
      {/* Main store card */}
      <div className="relative rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="mx-auto text-[10px] text-muted-foreground/50 font-mono tracking-wide">
            vendorshub.store/adwoa-jewels
          </span>
        </div>

        {/* Store header */}
        <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">
            AJ
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Adwoa&apos;s Jewels &amp; Accessories</p>
            <p className="text-xs text-muted-foreground">Accra, Ghana · ★ 4.9 (128 reviews)</p>
          </div>
          <span className="ml-auto text-[10px] border border-border rounded-full px-2 py-0.5 text-muted-foreground">
            Open
          </span>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { name: "Gold Bangle", price: "GHS 120", bg: "bg-amber-50" },
            { name: "Pearl Set", price: "GHS 240", bg: "bg-rose-50" },
            { name: "Ankara Cuff", price: "GHS 85", bg: "bg-orange-50" },
          ].map((product) => (
            <div key={product.name} className="rounded-xl overflow-hidden border border-border/60">
              <div className={`${product.bg} h-16 flex items-center justify-center`}>
                <div className="w-6 h-6 rounded-full bg-white/70 border border-border/40" />
              </div>
              <div className="p-2">
                <p className="text-[10px] font-medium text-foreground truncate">{product.name}</p>
                <p className="text-[10px] text-muted-foreground">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="border-t border-border/50 px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">Recent Orders</p>
          {[
            { id: "#1045", customer: "Kofi Asante", amount: "GHS 240", status: "Delivered", dot: "bg-green-400" },
            { id: "#1044", customer: "Abena Mensah", amount: "GHS 120", status: "Processing", dot: "bg-amber-400" },
          ].map((order) => (
            <div key={order.id} className="flex items-center gap-2 py-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${order.dot} shrink-0`} />
              <span className="text-[10px] text-muted-foreground font-mono">{order.id}</span>
              <span className="text-[10px] text-foreground flex-1">{order.customer}</span>
              <span className="text-[10px] font-semibold text-foreground">{order.amount}</span>
              <span className="text-[9px] text-muted-foreground">{order.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-card shadow-lg px-4 py-3 flex items-center gap-3 max-w-45">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5L12 3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-foreground">New order</p>
          <p className="text-[9px] text-muted-foreground">Efua · GHS 185</p>
        </div>
      </div>

      {/* Floating stat */}
      <div className="absolute -top-4 -left-4 rounded-xl border border-border bg-primary px-4 py-3 shadow-lg">
        <p className="text-[9px] text-white/60 uppercase tracking-widest">Monthly Sales</p>
        <p className="text-base font-bold text-white">GHS 12,480</p>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay so text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-primary/75" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          {/* Left: copy */}
          <div className="flex flex-col space-y-8">
            {/* Label */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Built for modern vendors
            </span>

            {/* Headline */}
            <div className="space-y-4">
              <h1
                className="text-balance text-5xl font-serif font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-[4.25rem]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Turn your WhatsApp business into a real{" "}
                <em className="not-italic text-white/80 underline decoration-white/30 underline-offset-4">online store.</em>
              </h1>
              <p className="max-w-lg text-base leading-7 text-white/70">
                VendorsHub gives Ghanaian and West African vendors a professional storefront, clean order tracking, and customer management — in minutes, not weeks.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary hover:bg-white/90 transition-all hover:shadow-lg hover:-translate-y-px"
              >
                Create My Free Store
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                See how it works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Trust note */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["K", "A", "E", "O"].map((initial) => (
                  <span
                    key={initial}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-white/20 text-[10px] font-semibold text-white"
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/70">
                <span className="font-semibold text-white">500+</span> vendors already selling online
              </p>
            </div>
          </div>

          {/* Right: mockup */}
          <div className="relative pt-6 pb-6 pl-2 pr-6 lg:pt-0">
            <StoreMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
