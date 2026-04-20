import Link from "next/link";

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <p className="text-xs font-semibold text-foreground">Dashboard Overview</p>
        <span className="rounded-full bg-primary/8 px-3 py-1 text-[10px] font-medium text-primary">
          April 2026
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {[
          { label: "Orders", value: "148", trend: "+12%" },
          { label: "Revenue", value: "GHS 9.2K", trend: "+8%" },
          { label: "Customers", value: "64", trend: "+5%" },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-4">
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-base font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] font-medium text-green-600">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Order list */}
      <div className="px-5 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Latest Orders
        </p>
        <div className="space-y-2">
          {[
            { id: "#1048", name: "Kwame Boateng", product: "Kente Tote Bag", amount: "GHS 195", status: "Paid" },
            { id: "#1047", name: "Abena Osei",    product: "Ankara Dress",   amount: "GHS 320", status: "Shipped" },
            { id: "#1046", name: "Efua Acheampong",product: "Body Butter",   amount: "GHS 75",  status: "Processing" },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 rounded-xl bg-muted/30 px-3 py-2.5"
            >
              <span className="font-mono text-[10px] text-muted-foreground shrink-0">{order.id}</span>
              <span className="flex-1 text-[11px] font-medium text-foreground truncate">{order.name}</span>
              <span className="text-[10px] text-muted-foreground truncate hidden sm:block">{order.product}</span>
              <span className="text-[11px] font-bold text-foreground shrink-0">{order.amount}</span>
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-[9px] font-semibold shrink-0",
                  order.status === "Paid"
                    ? "bg-green-50 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700",
                ].join(" ")}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductInsight() {
  return (
    <section className="bg-primary/10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div className="space-y-8 lg:order-1">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Product insight
              </p>
              <h2
                className="text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-[2.75rem]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Fewer lost orders. Better organisation. Real trust.
              </h2>
              <p className="text-base leading-7 text-muted-foreground">
                Every sale, every customer, every conversation — pulled into one clear view. So you always know what&apos;s happening in your business.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                {
                  title: "No more lost orders",
                  body: "Stop managing orders through DMs. Every order is captured, timestamped, and tracked.",
                },
                {
                  title: "Your customer list, finally organised",
                  body: "Know who bought what, when, and how often. Build real relationships with your regulars.",
                },
                {
                  title: "A store that earns trust",
                  body: "Professional product pages, real pricing, and a shareable link that looks like a proper business.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/6">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/6 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all"
            >
              Get organised today
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right: mockup */}
          <div className="lg:order-2">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
