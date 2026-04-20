const steps = [
  {
    number: "01",
    title: "Create your store",
    body: "Sign up, choose a store name, and your public storefront is ready — with a clean, shareable link.",
  },
  {
    number: "02",
    title: "Add your products",
    body: "Upload photos, write descriptions, and set prices. Your catalogue goes live instantly.",
  },
  {
    number: "03",
    title: "Share your link",
    body: "Post your store link on WhatsApp, Instagram bio, or anywhere your customers already are.",
  },
  {
    number: "04",
    title: "Receive clean orders",
    body: "Customers place orders through your storefront. You manage everything from one tidy dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Our process
          </p>
          <h2
            className="mx-auto max-w-xl text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Up and selling in four simple steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connector line — desktop only */}
          <div className="pointer-events-none absolute top-8 left-[12%] right-[12%] hidden h-px bg-border md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start md:items-center md:text-center">
              {/* Number bubble */}
              <div className="relative z-10 mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <span
                  className="font-serif text-xl font-semibold text-primary"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="mb-2 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
