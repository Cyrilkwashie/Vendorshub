import Link from "next/link";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Settings</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Workspace settings and account preferences</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/settings/appearance" className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-foreground">Appearance</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Brand colors, layout defaults, and storefront presentation.</p>
        </Link>
        <Link href="/dashboard/settings/billing" className="rounded-2xl border border-border bg-card shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-foreground">Billing</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Subscription, invoices, and payment contact details.</p>
        </Link>
      </section>
    </div>
  );
}