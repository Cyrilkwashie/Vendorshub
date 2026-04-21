import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/shared/Logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left — image panel */}
      <div className="hidden lg:block lg:w-[45%] relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/slide-2.jpg"
          alt=""
          fill
          sizes="45vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-primary/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Logo />
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Welcome back
            </p>
            <h2
              className="text-4xl font-semibold leading-snug text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Your store didn&apos;t stop while you were away.
            </h2>
            <p className="text-sm leading-7 text-white/70 max-w-xs">
              Orders, customers, and products — all right where you left them.
            </p>
          </div>
          <p className="text-xs text-white/30">© {new Date().getFullYear()} VendorsHub</p>
        </div>
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
            <h1
              className="text-3xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground">
              Good to have you back. Enter your details below.
            </p>
          </div>

          {/* Google sign in */}
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
            <span className="text-xs text-muted-foreground">or sign in with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <label className="block space-y-1.5 text-sm font-medium text-foreground">
              Email address
              <input
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="block space-y-1.5 text-sm font-medium text-foreground">
              Password
              <input
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            <div className="flex justify-end">
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Sign in
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
