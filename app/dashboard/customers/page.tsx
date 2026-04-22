"use client";

import Link from "next/link";
import { useCustomers } from "@/hooks/useLocalStore";
import { formatGHS } from "@/lib/utils";

export default function DashboardCustomersPage() {
  const { customers } = useCustomers();
  const sortedByValue = [...customers].sort((a, b) => b.lifetimeValueGhs - a.lifetimeValueGhs);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">
            Customers
          </span>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your customers
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{customers.length} total</p>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Orders</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Lifetime value</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Last order</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedByValue.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                  No customers yet
                </td>
              </tr>
            ) : (
              sortedByValue.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{customer.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">
                    {formatGHS(customer.lifetimeValueGhs)}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {new Date(customer.lastOrderAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}