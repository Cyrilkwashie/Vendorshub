"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { RegisterCarousel } from "@/components/auth/RegisterCarousel";
import { getLocalAuth, setLocalAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, skip registration
  useEffect(() => {
    if (getLocalAuth()) router.replace("/dashboard");
  }, [router]);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setLocalAuth({ name, email });
    router.push("/onboarding");
  }
  return (
    <div className="flex min-h-screen">
      {/* Left — carousel */}
      <div className="hidden lg:block lg:w-[45%] relative overflow-hidden">
        <div className="absolute top-8 left-8 z-20">
          <Logo />
        </div>
        <RegisterCarousel />
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start selling online in minutes — no technical skills needed.
            </p>
          </div>

          {/* Google sign up */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or sign up with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
            <label className="block space-y-1.5 text-sm font-medium text-foreground">
              Full name
              <input
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                type="text"
                placeholder="Ama Boateng"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="block space-y-1.5 text-sm font-medium text-foreground">
              Email address
              <input
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="block space-y-1.5 text-sm font-medium text-foreground">
              Password
              <input
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create my free account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground/60 leading-5">
            By creating an account you agree to our{" "}
            <Link href="#" className="underline hover:text-muted-foreground">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-muted-foreground">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
