import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "GHS 299",
    description: "For early-stage vendor programs validating demand.",
    features: ["Up to 10 vendors", "Storefront pages", "Basic analytics"],
  },
  {
    name: "Growth",
    price: "GHS 899",
    description: "For active marketplaces with structured operations.",
    features: ["Up to 60 vendors", "Admin flags", "Billing controls"],
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For enterprise operator teams with dedicated support needs.",
    features: ["Unlimited vendors", "Priority support", "Custom integrations"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 md:py-20">
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Pricing</span>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Choose the operating layer that matches your vendor network.
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Each plan gives you the same route structure and management surfaces. Higher tiers increase vendor
          capacity, control features, and support coverage.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-2xl border border-border bg-card shadow-sm flex flex-col gap-6 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{plan.name}</p>
              <h2 className="mt-4 text-4xl font-semibold text-foreground">{plan.price}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.description}</p>
            </div>
            <ul className="grid gap-3 text-sm text-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-2xl border border-border px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="mt-auto inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Continue with {plan.name}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}