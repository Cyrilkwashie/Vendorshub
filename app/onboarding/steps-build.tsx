"use client";
import { useState, useEffect } from "react";
import {
  OnboardingData, StoreStyle, ThemePreset,
  STORE_STYLES, THEMES, GUIDED_TIPS,
  getAISuggestions, checkSlugAvailable, SAMPLE_PRODUCT,
} from "./config";

type StepProps = { data: OnboardingData; setData: (d: OnboardingData) => void };

function GuidedTip({ step }: { step: number }) {
  const tip = GUIDED_TIPS[step];
  if (!tip) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 px-4 py-3 mt-6">
      <span className="text-lg shrink-0">💡</span>
      <p className="text-xs text-amber-900/80 leading-5">{tip}</p>
    </div>
  );
}

// ── Step 1: Store Identity ────────────────────────────────────────────────────

export function StepIdentity({ data, setData }: StepProps) {
  const [userName, setUserName] = useState("");
  const slugStatus = checkSlugAvailable(data.slug);

  useEffect(() => {
    try {
      const auth = localStorage.getItem("vendorshub_auth");
      if (auth) { const p = JSON.parse(auth); setUserName(p.name || ""); }
    } catch {}
  }, []);

  const suggestions = getAISuggestions(userName);

  const handleNameChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setData({ ...data, storeName: value, slug });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Name your store
        </h2>
        <p className="text-sm text-muted-foreground mt-1">This is what customers see when they visit.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Store name
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text"
            placeholder="e.g. Adwoa's Jewels & Accessories"
            value={data.storeName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </label>

        {/* AI suggestions */}
        {suggestions.length > 0 && !data.storeName && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[9px] text-white flex items-center justify-center">✦</span>
              AI suggestions for you
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} type="button" onClick={() => handleNameChange(s)}
                  className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <label className="block text-sm font-medium text-foreground">
          Store description
          <textarea
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
            rows={3}
            placeholder="Tell customers what you sell and what makes you special..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </label>

        <label className="block text-sm font-medium text-foreground">
          Store URL
          <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="px-4 py-3 text-sm text-muted-foreground bg-muted border-r border-border shrink-0">vendorshub.store/</span>
            <input
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              type="text" value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              placeholder="adwoa-jewels"
            />
          </div>
          {slugStatus && (
            <p className={`mt-1.5 text-xs font-medium flex items-center gap-1 ${slugStatus === "available" ? "text-emerald-600" : "text-red-500"}`}>
              {slugStatus === "available" ? "✓ vendorshub.store/" + data.slug + " is available!" : "✕ This URL is taken. Try another."}
            </p>
          )}
        </label>
      </div>
      <GuidedTip step={0} />
    </div>
  );
}

// ── Step 2: Store Style ───────────────────────────────────────────────────────

export function StepStoreStyle({ data, setData }: StepProps) {
  const selectStyle = (key: StoreStyle) => {
    setData({ ...data, storeStyle: key });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Choose your store style
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Pick a layout that matches your brand. You can change this later.</p>
      </div>
      <div className="space-y-3">
        {(Object.entries(STORE_STYLES) as [StoreStyle, typeof STORE_STYLES[StoreStyle]][]).map(([key, style]) => (
          <button key={key} type="button" onClick={() => selectStyle(key)}
            className={`relative w-full flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
              data.storeStyle === key ? "border-primary ring-4 ring-primary/10 bg-primary/4" : "border-border bg-card hover:border-primary/30"
            }`}>
            <span className="text-3xl mt-0.5">{style.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{style.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{style.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {style.sections.filter(s => s !== "footer").map((s) => (
                  <span key={s} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground capitalize">{s}</span>
                ))}
              </div>
            </div>
            {data.storeStyle === key && (
              <div className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <GuidedTip step={1} />
    </div>
  );
}

// ── Step 3: Theme & Branding ──────────────────────────────────────────────────

export function StepThemeBranding({ data, setData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Pick your theme
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Set the colors and mood. Upload your logo to make it yours.</p>
      </div>

      {/* Theme presets */}
      <div className="grid grid-cols-3 gap-3">
        {(Object.entries(THEMES) as [ThemePreset, typeof THEMES[ThemePreset]][]).map(([key, theme]) => (
          <button key={key} type="button" onClick={() => setData({ ...data, theme: key })}
            className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all ${
              data.theme === key ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-primary/30"
            }`}>
            <div className="h-16 w-full" style={{ backgroundColor: theme.bg }}>
              <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: theme.headerBg }}>
                <div className="h-1.5 w-8 rounded" style={{ backgroundColor: theme.textColor + "40" }} />
                <div className="h-3 w-6 rounded-full" style={{ backgroundColor: theme.accent }} />
              </div>
              <div className="px-3 py-2 space-y-1">
                <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: theme.textColor + "30" }} />
                <div className="h-1 w-1/2 rounded" style={{ backgroundColor: theme.textColor + "20" }} />
              </div>
            </div>
            <div className="p-3 bg-card">
              <p className="text-xs font-semibold text-foreground">{theme.label}</p>
              <p className="text-[10px] text-muted-foreground">{theme.tagline}</p>
            </div>
            {data.theme === key && (
              <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Upload areas */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Store logo</p>
          <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-6 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/8">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M11 2v12M7 6l4-4 4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">Upload logo</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB · Square recommended</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Banner <span className="text-muted-foreground font-normal">(optional)</span></p>
          <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-5 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all">
            <p className="text-sm font-medium text-foreground">Upload banner</p>
            <p className="text-xs text-muted-foreground">1200×400px recommended</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
      <GuidedTip step={2} />
    </div>
  );
}

// ── Step 4: Location ──────────────────────────────────────────────────────────

export { GuidedTip };
