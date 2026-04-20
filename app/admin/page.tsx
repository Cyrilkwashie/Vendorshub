import { VendorTable } from "@/components/admin/VendorTable";
import { fetchVendors } from "@/lib/api";

export default async function AdminOverviewPage() {
  const vendors = await fetchVendors();

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Admin overview</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Monitor network growth and operational health</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Total vendors</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{vendors.length}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Flagged vendors</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">{vendors.filter((vendor) => vendor.flagged).length}</h2>
        </article>
        <article className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <p className="text-sm text-muted-foreground">Top plan mix</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Growth</h2>
        </article>
      </section>

      <VendorTable vendors={vendors} />
    </div>
  );
}