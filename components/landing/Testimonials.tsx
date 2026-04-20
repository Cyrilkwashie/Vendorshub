const testimonials = [
  {
    quote:
      "Before VendorsHub, I was taking orders through Instagram DMs and losing track of everything. Now my customers just go to my link and I get proper notifications. It feels like a real business.",
    name: "Abena Owusu",
    role: "Jewelry & Accessories",
    location: "Accra",
    initial: "AO",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    quote:
      "I used to spend hours every day replying to the same questions on WhatsApp. Now I just send my store link. Customers see the prices, place their order, and I manage it all in one place.",
    name: "Kwame Asante",
    role: "Fashion & Streetwear",
    location: "Kumasi",
    initial: "KA",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    quote:
      "My customers tell me my store looks more professional than shops with physical locations. VendorsHub gave my beauty brand the look it deserves without needing a developer.",
    name: "Efua Acheampong",
    role: "Skincare & Beauty",
    location: "Takoradi",
    initial: "EA",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
];

export function Testimonials() {
  return (
    <section className="bg-primary/10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Real vendors
          </p>
          <h2
            className="mx-auto max-w-xl text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Vendors who made the switch.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] transition-shadow"
            >
              {/* Quote mark */}
              <div className="mb-5">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-border">
                  <path d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0l1.2 2.4C8.4 3.6 6.6 5.4 6 8.4H10.8V18H0zm13.2 0V10.8C13.2 4.8 16.8 1.2 24 0l1.2 2.4C21.6 3.6 19.8 5.4 19.2 8.4H24V18H13.2z"
                    fill="currentColor"/>
                </svg>
              </div>

              {/* Quote text */}
              <p className="flex-1 text-sm leading-7 text-muted-foreground">{t.quote}</p>

              {/* Author */}
              <div className="mt-7 flex items-center gap-3 border-t border-border/50 pt-5">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.bg} ${t.text} text-xs font-bold`}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
