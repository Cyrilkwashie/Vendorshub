"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStoreProfile } from "@/hooks/useLocalStore";
import { clearLocalAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ICON_OVERVIEW = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9.5" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="1" y="9.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const ICON_ORDERS = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M2 4h13M2 8.5h13M2 13h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="13.5" cy="13" r="2.5" fill="currentColor" />
  </svg>
);
const ICON_PRODUCTS = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M8.5 1L15 4.5v8L8.5 16 2 12.5v-8L8.5 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8.5 1v15M2 4.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ICON_CUSTOMERS = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="6.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1 14.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="13" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M15 13c0-2.21-1.343-4-3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ICON_ANALYTICS = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M2 13.5V8.5M6 13.5V5.5M10 13.5V9.5M14 13.5V3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ICON_SETTINGS = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8.5 1.5v2M8.5 13.5v2M1.5 8.5h2M13.5 8.5h2M3.55 3.55l1.41 1.41M12.04 12.04l1.41 1.41M12.04 4.96l1.41-1.41M3.55 13.45l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", exact: true, Icon: ICON_OVERVIEW },
  { href: "/dashboard/orders", label: "Orders", exact: false, Icon: ICON_ORDERS },
  { href: "/dashboard/products", label: "Products", exact: false, Icon: ICON_PRODUCTS },
  { href: "/dashboard/customers", label: "Customers", exact: false, Icon: ICON_CUSTOMERS },
  { href: "/dashboard/analytics", label: "Analytics", exact: false, Icon: ICON_ANALYTICS },
  { href: "/dashboard/settings", label: "Settings", exact: false, Icon: ICON_SETTINGS },
];

const PLAN_BADGE: Record<string, string> = {
  starter: "bg-muted text-muted-foreground",
  growth: "bg-primary/10 text-primary",
  pro: "bg-amber-50 text-amber-700",
};

export interface SidebarItem {
  href: string;
  label: string;
  exact?: boolean;
  Icon?: React.ComponentType;
}

export function Sidebar({ title = "Dashboard", items }: { title?: string; items?: SidebarItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useStoreProfile();
  const initials = profile?.name
    ? profile.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
    : "VH";

  function handleSignOut() {
    clearLocalAuth();
    router.push("/login");
  }

  const navItems = items ?? NAV_ITEMS;

  return (
    <aside
      className="flex flex-col rounded-2xl border border-border bg-card shadow-sm w-full p-4"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <h2 className="mb-4 text-lg font-bold text-foreground" style={{fontFamily: 'var(--font-playfair), Georgia, serif'}}>{title}</h2>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, exact, Icon }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {Icon && <span className="shrink-0"><Icon /></span>}
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <Link
        href={`/store/${profile?.slug ?? "my-store"}`}
        target="_blank"
        className="mb-3 flex items-center gap-2.5 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5.5 1.5H2A1.5 1.5 0 0 0 .5 3v9A1.5 1.5 0 0 0 2 13.5h9A1.5 1.5 0 0 0 12.5 12V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M8.5.5H13.5V5.5M13.5.5L6.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        View my store
      </Link>

      <button
        onClick={handleSignOut}
        className="mb-3 flex w-full items-center gap-2.5 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:border-red-200 hover:text-red-500 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 12.5H2.5A1.5 1.5 0 0 1 1 11V3A1.5 1.5 0 0 1 2.5 1.5H5M9.5 10.5L13 7l-3.5-3.5M13 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Sign out
      </button>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-3.5 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground leading-tight">
            {profile?.name ?? "Your Store"}
          </p>
          <span
            className={cn(
              "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
              PLAN_BADGE[profile?.plan ?? "growth"],
            )}
          >
            {profile?.plan ?? "growth"} plan
          </span>
        </div>
      </div>
    </aside>
  );
}
