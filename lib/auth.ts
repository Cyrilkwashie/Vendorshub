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