export default function DashboardBillingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Billing</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Manage billing contacts and plan details</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Current plan</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Growth</h2>
          <p className="mt-3 text-sm text-muted-foreground">Monthly billing with storefront, analytics, and admin access enabled.</p>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <p className="text-sm text-muted-foreground">Billing email</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">finance@vendor.com</h2>
        </article>
      </section>
    </div>
  );
}