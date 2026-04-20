export default function DashboardNewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">New product</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Create a new catalog entry</h1>
      </div>

      <form className="rounded-2xl border border-border bg-card shadow-sm grid gap-4 p-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground md:col-span-2">
          Product name
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" placeholder="Handwoven Basket" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Category
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" placeholder="Home" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Price (GHS)
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" placeholder="180" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground md:col-span-2">
          Description
          <textarea className="min-h-32 rounded-2xl border border-border bg-white px-4 py-3 outline-none" placeholder="Describe the product" />
        </label>
        <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white md:col-span-2" type="submit">
          Save draft
        </button>
      </form>
    </div>
  );
}