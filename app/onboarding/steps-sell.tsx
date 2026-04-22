"use client";
import { OnboardingData, PLANS, SAMPLE_PRODUCT } from "./config";
import { GuidedTip } from "./steps-build";

type StepProps = { data: OnboardingData; setData: (d: OnboardingData) => void };

// ── Step 6: First Product ─────────────────────────────────────────────────────

export function StepFirstProduct({ data, setData }: StepProps) {
  const fillSample = () => {
    setData({ ...data, productName: SAMPLE_PRODUCT.name, productPrice: SAMPLE_PRODUCT.price, productDescription: SAMPLE_PRODUCT.description });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Add your first product
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Just one to start — you can add more from your dashboard.</p>
      </div>

      {/* Sample product shortcut */}
      <button type="button" onClick={fillSample}
        className="w-full flex items-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/4 px-4 py-3 hover:bg-primary/8 transition-all group">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all">
          <span className="text-lg">⚡</span>
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-primary">Use sample product</p>
          <p className="text-xs text-muted-foreground">Auto-fill with a demo product to get started fast</p>
        </div>
      </button>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Product name
          <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text" placeholder="e.g. Gold Bangle Set" value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })} />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Price (GHS)
          <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="number" placeholder="0.00" min="0" value={data.productPrice}
            onChange={(e) => setData({ ...data, productPrice: e.target.value })} />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Product photo
          <label className="mt-1.5 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-6 cursor-pointer hover:border-primary/40 transition-all">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2v12M7 6l4-4 4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-medium text-foreground">Upload photo</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </label>
        <label className="block text-sm font-medium text-foreground">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
          <textarea className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            rows={3} placeholder="Describe the product briefly..." value={data.productDescription}
            onChange={(e) => setData({ ...data, productDescription: e.target.value })} />
        </label>
      </div>
      <GuidedTip step={5} />
    </div>
  );
}

// ── Step 7: Plan ──────────────────────────────────────────────────────────────

export function StepPlan({ data, setData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Choose your plan
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Start free anytime. Upgrade when you&apos;re ready to grow.</p>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <button key={plan.name} type="button" onClick={() => setData({ ...data, plan: plan.name })}
            className={`relative w-full flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
              data.plan === plan.name ? "border-primary bg-primary/4" : "border-border bg-card hover:border-primary/30"
            }`}>
            {plan.popular && (
              <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
                Most popular
              </span>
            )}
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              data.plan === plan.name ? "border-primary bg-primary" : "border-border"
            }`}>
              {data.plan === plan.name && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-1.5 mb-1">
                <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                <span className="text-lg font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-xs text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-primary shrink-0">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Reassurance */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200/40 bg-emerald-50/40 px-4 py-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-600 shrink-0">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="text-sm font-medium text-emerald-900">You won&apos;t be charged today</p>
          <p className="text-xs text-emerald-700/70">Cancel anytime. No credit card required for free plan.</p>
        </div>
      </div>
      <GuidedTip step={6} />
    </div>
  );
}
