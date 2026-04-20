import Link from "next/link";

import { fetchCustomers } from "@/lib/api";
import { formatGHS } from "@/lib/utils";

export default async function DashboardCustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Customers</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">See customer value and repeat activity</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <Link key={customer.id} href={`/dashboard/customers/${customer.id}`} className="rounded-2xl border border-border bg-card shadow-sm p-5">
            <p className="text-sm text-muted-foreground">{customer.email}</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">{customer.name}</h2>
            <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
              <span>{customer.orders} orders</span>
              <span>{formatGHS(customer.lifetimeValueGhs)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}