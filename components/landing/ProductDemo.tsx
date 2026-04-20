export function ProductDemo() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Real product
          </p>
          <h2
            className="mx-auto max-w-2xl text-balance text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Everything you need, built into one clean workspace.
          </h2>
        </div>

        {/* Demo grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Storefront card */}
          <div className="rounded-2xl border border-border bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="border-b border-border/60 bg-muted/30 px-5 py-3">
              <p className="text-xs font-semibold text-foreground">Storefront</p>
              <p className="text-[10px] text-muted-foreground">vendorshub.store/efua-beauty</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Store identity */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 font-bold text-rose-400 text-sm">
                  EB
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Efua&apos;s Beauty Hub</p>
                  <p className="text-[10px] text-muted-foreground">Takoradi · ★ 4.8</p>
                </div>
              </div>
              {/* Products */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Shea Butter", price: "GHS 45", bg: "bg-amber-50" },
                  { name: "Glow Oil", price: "GHS 80", bg: "bg-orange-50" },
                  { name: "Face Serum", price: "GHS 120", bg: "bg-pink-50" },
                  { name: "Hair Mask", price: "GHS 65", bg: "bg-yellow-50" },
                ].map((p) => (
                  <div key={p.name} className="rounded-lg border border-border/60 overflow-hidden">
                    <div className={`${p.bg} h-12`} />
                    <div className="p-1.5">
                      <p className="text-[10px] font-medium text-foreground">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full rounded-xl bg-primary py-2 text-[11px] font-semibold text-white hover:bg-primary/90 transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Dashboard card */}
          <div className="rounded-2xl border border-border bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="border-b border-border/60 bg-muted/30 px-5 py-3">
              <p className="text-xs font-semibold text-foreground">Dashboard</p>
              <p className="text-[10px] text-muted-foreground">Your business at a glance</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Revenue chart placeholder */}
              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-[10px] text-muted-foreground mb-1">Revenue this month</p>
                <p className="text-xl font-bold text-foreground">GHS 8,340</p>
                <div className="mt-3 flex items-end gap-1 h-10">
                  {[40, 60, 45, 80, 70, 90, 75, 95, 85, 100, 92, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-primary/20"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Orders", value: "124" },
                  { label: "Customers", value: "57" },
                  { label: "Products", value: "32" },
                  { label: "Avg. Value", value: "GHS 67" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-muted/40 px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders + customers card */}
          <div className="rounded-2xl border border-border bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="border-b border-border/60 bg-muted/30 px-5 py-3">
              <p className="text-xs font-semibold text-foreground">Orders &amp; Customers</p>
              <p className="text-[10px] text-muted-foreground">Organised and trackable</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                {[
                  { name: "Ama Sarpong",    item: "Shea Butter x2",  amount: "GHS 90",  status: "Delivered",  color: "bg-green-50 text-green-700" },
                  { name: "Kofi Darko",     item: "Glow Oil",        amount: "GHS 80",  status: "Processing", color: "bg-amber-50 text-amber-700" },
                  { name: "Adjoa Boateng",  item: "Face Serum",      amount: "GHS 120", status: "Paid",       color: "bg-blue-50 text-blue-700" },
                  { name: "Kwesi Mensah",   item: "Hair Mask x3",    amount: "GHS 195", status: "Delivered",  color: "bg-green-50 text-green-700" },
                ].map((order) => (
                  <div key={order.name} className="flex items-center gap-2 rounded-xl bg-muted/20 px-3 py-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                      {order.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">{order.name}</p>
                      <p className="text-[9px] text-muted-foreground truncate">{order.item}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-bold text-foreground">{order.amount}</p>
                      <span className={`inline-block rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${order.color}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
