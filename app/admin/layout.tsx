import type { ReactNode } from "react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Logo } from "@/components/shared/Logo";

const adminItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/vendors", label: "Vendors" },
  { href: "/admin/revenue", label: "Revenue" },
  { href: "/admin/flags", label: "Flags" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6">
        <header className="rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between px-5 py-4">
          <Logo />
          <p className="text-sm text-muted-foreground">Admin control tower</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Sidebar title="Admin" items={adminItems} />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}