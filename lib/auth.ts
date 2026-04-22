export type AuthRole = "vendor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

export const authConfig = {
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

export function isProtectedPath(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
}

export function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin");
}

// ── localStorage auth (used while backend is not yet wired up) ──────────────

const LOCAL_AUTH_KEY = "vh_auth";

export interface LocalAuthUser {
  name: string;
  email: string;
}

export function getLocalAuth(): LocalAuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_KEY);
    return raw ? (JSON.parse(raw) as LocalAuthUser) : null;
  } catch {
    return null;
  }
}

export function setLocalAuth(user: LocalAuthUser): void {
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  // Set the session cookie so middleware lets the request through
  document.cookie = "vendorshub_session=1; path=/; max-age=604800; SameSite=Lax";
}

export function clearLocalAuth(): void {
  localStorage.removeItem(LOCAL_AUTH_KEY);
  // Expire the session cookie
  document.cookie = "vendorshub_session=; path=/; max-age=0; SameSite=Lax";
}