import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "GHS 0",
    period: "forever",
    description: "For vendors just getting started.",
    features: [
      "1 storefront",
      "Up to 10 products",
      "Basic order management",
      "VendorsHub subdomain",
    ],
    cta: "Get started free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "GHS 49",
    period: "per month",
    description: "For growing vendors who need more control.",
    features: [
      "1 storefront",
      "Up to 50 products",
      "Full order tracking",
      "Customer list",
      "Custom domain support",
    ],
    cta: "Start Starter",
    href: "/register?plan=starter",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "GHS 99",
    period: "per month",
    description: "For serious vendors building a real brand.",
    features: [
      "3 storefronts",
      "Unlimited products",
      "Advanced analytics",
      "Priority support",
      "WhatsApp order alerts",
      "Custom domain",
    ],
    cta: "Start Pro",
    href: "/register?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams, operators, and agencies.",
    features: [
      "Unlimited storefronts",
      "Unlimited products",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact us",
    href: "/contact",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Pricing
          </p>
          <h2
            className="mx-auto max-w-xl text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Simple, honest pricing. Start free.
          </h2>
        </div>

        {/* Plans */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "flex flex-col rounded-2xl border p-7 transition-shadow",
                plan.highlighted
                  ? "border-primary bg-primary text-white shadow-[0_8px_30px_rgba(22,11,53,0.25)]"
                  : "border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]",
              ].join(" ")}
            >
              {/* Plan name + badge */}
              <div className="mb-5 flex items-center justify-between">
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-[0.15em]",
                    plan.highlighted ? "text-white/60" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {plan.name}
                </p>
                {plan.highlighted && (
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                    Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-2">
                <span
                  className={[
                    "text-3xl font-bold",
                    plan.highlighted ? "text-white" : "text-foreground",
                  ].join(" ")}
                >
                  {plan.price}
                </span>
                <span
                  className={[
                    "ml-1.5 text-xs",
                    plan.highlighted ? "text-white/60" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={[
                  "mb-6 text-xs leading-5",
                  plan.highlighted ? "text-white/70" : "text-muted-foreground",
                ].join(" ")}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={[
                        "mt-0.5 shrink-0",
                        plan.highlighted ? "text-white/70" : "text-primary",
                      ].join(" ")}
                    >
                      <path
                        d="M2 7l3 3 7-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={[
                        "text-xs leading-5",
                        plan.highlighted ? "text-white/80" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={[
                  "mt-auto inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-white/90 hover:shadow-md"
                    : "border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary/30",
                ].join(" ")}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
