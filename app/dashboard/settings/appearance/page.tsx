export default function DashboardAppearanceSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Appearance</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Adjust how the storefront and dashboard look</h1>
      </div>

      <form className="rounded-2xl border border-border bg-card shadow-sm grid gap-4 p-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Accent color
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" defaultValue="#125b50" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Storefront headline
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" defaultValue="Modern Ghanaian decor for calm, expressive spaces." />
        </label>
      </form>
    </div>
  );
}