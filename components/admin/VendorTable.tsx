import type { Vendor } from "@/types";

import { formatGHS } from "@/lib/utils";

interface VendorTableProps {
  vendors: Vendor[];
}

export function VendorTable({ vendors }: VendorTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-primary/5 text-muted-foreground">
          <tr>
            <th className="px-5 py-4 font-medium">Vendor</th>
            <th className="px-5 py-4 font-medium">Plan</th>
            <th className="px-5 py-4 font-medium">Orders</th>
            <th className="px-5 py-4 font-medium">Revenue</th>
            <th className="px-5 py-4 font-medium">Risk</th>
          </tr>
        </thead>
          <tbody className="divide-y divide-border bg-card">
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="px-5 py-4">
                <div>
                  <p className="font-semibold text-foreground">{vendor.name}</p>
                  <p className="text-muted-foreground">{vendor.email}</p>
                </div>
              </td>
              <td className="px-5 py-4 capitalize text-muted-foreground">{vendor.plan}</td>
              <td className="px-5 py-4 text-muted-foreground">{vendor.orders}</td>
              <td className="px-5 py-4 font-medium text-foreground">{formatGHS(vendor.revenueGhs)}</td>
              <td className="px-5 py-4">
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {vendor.flagged ? "Flagged" : "Clear"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}