import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/8 border border-primary/15">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M4 9a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9z" stroke="var(--color-primary)" strokeWidth="1.75"/>
              <path d="M4 9l14 10L32 9" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1
            className="text-3xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Check your inbox
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            We sent a verification link to your email address. Click it to activate your account and start setting up your store.
          </p>
        </div>

        {/* Info box */}
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-left space-y-2">
          <p className="text-xs font-semibold text-foreground">Didn&apos;t get the email?</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Check your spam or junk folder</li>
            <li>Make sure you entered the right email</li>
            <li>Wait a minute and try again</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Resend verification email
          </button>
          <Link
            href="/onboarding"
            className="block w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all text-center"
          >
            I&apos;ve verified — continue setup
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Wrong account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Start over
          </Link>
        </p>
      </div>
    </div>
  );
}
