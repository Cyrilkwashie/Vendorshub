import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-muted-foreground text-xs font-medium tracking-wider">Register</span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Create a vendor or admin account</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          This page gives you the route structure for onboarding. Replace the placeholder fields with your actual
          registration flow and validation rules.
        </p>
      </div>

      <form className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Full name
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" type="text" placeholder="Ama Boateng" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Role
          <select className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" defaultValue="vendor">
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground md:col-span-2">
          Email
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" type="email" placeholder="you@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground md:col-span-2">
          Password
          <input className="rounded-2xl border border-border bg-white px-4 py-3 outline-none" type="password" placeholder="Create a secure password" />
        </label>
        <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white md:col-span-2" type="submit">
          Create account
        </button>
      </form>

      <p className="text-sm text-muted-foreground">
        Already registered? <Link href="/login" className="font-semibold text-primary">Sign in</Link>
      </p>
    </div>
  );
}