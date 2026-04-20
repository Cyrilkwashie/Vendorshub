import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Login</span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Sign in to your workspace</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Wire this form into your API or NextAuth credentials flow when authentication is ready.
        </p>
      </div>

      <form className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Email
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" type="email" placeholder="vendor@business.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Password
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" type="password" placeholder="••••••••" />
        </label>
        <button className="mt-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white" type="submit">
          Continue
        </button>
      </form>

      <p className="text-sm text-muted-foreground">
        Need an account? <Link href="/register" className="font-semibold text-primary">Create one</Link>
      </p>
    </div>
  );
}