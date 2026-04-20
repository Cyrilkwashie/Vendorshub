import { VendorTable } from "@/components/admin/VendorTable";
import { fetchVendors } from "@/lib/api";

export default async function AdminFlagsPage() {
  const vendors = await fetchVendors();
  const flaggedVendors = vendors.filter((vendor) => vendor.flagged);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Flags</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Watch vendors that need manual review</h1>
      </div>
      <VendorTable vendors={flaggedVendors} />
    </div>
  );
}