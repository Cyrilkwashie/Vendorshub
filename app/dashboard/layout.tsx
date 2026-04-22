"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Logo } from "@/components/shared/Logo";
import { useStoreProfile, useSeeder } from "@/hooks/useLocalStore";
import { getLocalAuth, setLocalAuth } from "@/lib/auth";
import { getStoreProfile } from "@/lib/store";

function DashboardHeader() {
  useSeeder();
  const { profile } = useStoreProfile();
  const initials = profile?.name
    ? profile.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
    : "VH";

  return (
    <header className="rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between px-5 py-4">
      <Logo />
      <div className="flex items-center gap-3">
        {profile && (
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />
            <span className="text-xs font-medium text-foreground">{profile.name}</span>
          </div>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!getLocalAuth()) {
      // Fallback: if store is seeded but auth key is missing, restore from profile
      const profile = getStoreProfile();
      if (profile?.name) {
        setLocalAuth({ name: profile.name, email: profile.email });
        return; // auth restored, stay on dashboard
      }
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6">
        <DashboardHeader />
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}