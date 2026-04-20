const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2 6h6l-5 3.6 1.9 5.9L10 14l-4.9 3.5L7 11.6 2 8h6L10 2z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Simple setup",
    body: "Your store is live in minutes. Add products, set prices, and share your link — no developer needed.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 9h8M6 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M14 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M6 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: "Clean order tracking",
    body: "Every order in one place. See what's pending, what's shipped, and who ordered what — at a glance.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Professional presence",
    body: "A clean store link customers trust. Looks polished on WhatsApp, Instagram, and everywhere you share it.",
  },
];

export function ValueSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left: headline */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Why VendorsHub
            </p>
            <h2
              className="text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-[2.75rem]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Most vendors don&apos;t need more stress.{" "}
              <em
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                className="text-primary"
              >
                They need structure.
              </em>
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The right tools make selling feel easy, not overwhelming. We built VendorsHub to give you clarity, not complexity.
            </p>
          </div>

          {/* Right: pillars */}
          <div className="grid gap-px bg-border rounded-2xl overflow-hidden">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className={[
                  "flex gap-5 bg-card p-7",
                  i === 0 ? "rounded-t-2xl" : "",
                  i === pillars.length - 1 ? "rounded-b-2xl" : "",
                ].join(" ")}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/6 text-primary">
                  {pillar.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{pillar.label}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
