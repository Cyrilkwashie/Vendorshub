import type { ReactNode } from "react";

import { Logo } from "@/components/shared/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="hidden rounded-4xl border border-border bg-primary p-10 text-white lg:block">
          <Logo />
          <div className="mt-12 space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Access VendorsHub</p>
            <h1 className="text-4xl font-semibold tracking-tight">
              Sign in to manage vendors, products, storefronts, and marketplace oversight.
            </h1>
            <p className="text-sm leading-7 text-white/80">
              This auth group is ready for your API-backed session flow and route protection middleware.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card shadow-sm p-8 md:p-10">{children}</section>
      </div>
    </div>
  );
}