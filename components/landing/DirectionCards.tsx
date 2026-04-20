import Link from "next/link";

const cards = [
  {
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
        <path d="M3 6h16M3 11h16M3 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 14.5v1.5l1 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    tag: "Getting started",
    title: "Start selling professionally",
    description:
      "Launch a clean, shareable storefront that reflects your brand — no technical skills needed.",
  },
  {
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 8h8M7 12h6M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tag: "Orders",
    title: "Organise my orders",
    description:
      "Track every order — from WhatsApp, Instagram, and your storefront — in one clean dashboard.",
  },
  {
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
        <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 18c0-3.314 3.134-6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16.5" cy="14.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14.5 14.5h4M16.5 12.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tag: "Customers",
    title: "Manage my customers",
    description:
      "Build a proper customer list, see purchase history, and follow up without losing track.",
  },
  {
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
        <path d="M11 2l2.09 6.26L19 9.27l-4.73 4.11L15.82 20 11 17.27 6.18 20l1.55-6.62L3 9.27l5.91-1.01L11 2z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    tag: "Trust",
    title: "Look more trustworthy online",
    description:
      "Give customers a professional experience that builds confidence and drives repeat orders.",
  },
];

export function DirectionCards() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Where do you want to go?
          </p>
          <h2
            className="max-w-xl text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Tell us what you need. We&apos;ll point you in the right direction.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:border-primary/20"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/6 transition-colors group-hover:bg-primary/10">
                  {card.icon}
                </div>
                {/* Tag */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                  {card.tag}
                </p>
                {/* Title */}
                <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                {/* Description */}
                <p className="text-sm leading-6 text-muted-foreground">
                  {card.description}
                </p>
              </div>

              {/* Explore link */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
