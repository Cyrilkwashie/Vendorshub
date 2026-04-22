"use client";
import { useState, useEffect } from "react";
import { OnboardingData, detectLocation, getCountryFlag, getCountryName, GUIDED_TIPS } from "./config";
import { GuidedTip } from "./steps-build";

type StepProps = { data: OnboardingData; setData: (d: OnboardingData) => void };

// ── Step 4: Location ──────────────────────────────────────────────────────────

export function StepLocation({ data, setData }: StepProps) {
  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    if (!data.country) {
      const loc = detectLocation();
      if (loc) {
        setData({ ...data, country: loc.country, city: loc.city });
        setAutoDetected(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (field: keyof OnboardingData, value: string) => {
    setAutoDetected(false);
    setData({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Where are you based?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Helps customers know where you&apos;re shipping from.</p>
      </div>

      {/* Auto-detected banner */}
      {autoDetected && data.country && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/50 px-4 py-3">
          <span className="text-2xl">{getCountryFlag(data.country)}</span>
          <div>
            <p className="text-sm font-medium text-emerald-900">We detected your location!</p>
            <p className="text-xs text-emerald-700/70">We&apos;ll show customers you&apos;re based in {data.city}, {getCountryName(data.country)} {getCountryFlag(data.country)}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Country
          <select
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
          >
            <option value="">Select a country</option>
            <option value="GH">🇬🇭 Ghana</option>
            <option value="NG">🇳🇬 Nigeria</option>
            <option value="CI">🇨🇮 Côte d&apos;Ivoire</option>
            <option value="SN">🇸🇳 Senegal</option>
            <option value="CM">🇨🇲 Cameroon</option>
            <option value="KE">🇰🇪 Kenya</option>
            <option value="ZA">🇿🇦 South Africa</option>
            <option value="other">🌍 Other</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-foreground">
          City
          <input
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            type="text" placeholder="e.g. Accra" value={data.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </label>
      </div>

      {/* Smart display */}
      {data.country && data.city && !autoDetected && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
          <span className="text-xl">{getCountryFlag(data.country)}</span>
          <p className="text-xs text-muted-foreground">We&apos;ll show customers you&apos;re based in <strong className="text-foreground">{data.city}, {getCountryName(data.country)}</strong></p>
        </div>
      )}
      <GuidedTip step={3} />
    </div>
  );
}

// ── Step 5: WhatsApp ──────────────────────────────────────────────────────────

export function StepWhatsApp({ data, setData }: StepProps) {
  const storeName = data.storeName || "Your Store";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Connect your WhatsApp
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Your order engine — customers will message you directly.</p>
      </div>

      <label className="block text-sm font-medium text-foreground">
        WhatsApp number
        <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <span className="px-4 py-3 text-sm text-muted-foreground bg-muted border-r border-border shrink-0">+233</span>
          <input
            className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
            type="tel" placeholder="24 000 0000" value={data.whatsapp}
            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
          />
        </div>
      </label>

      {/* WhatsApp preview — show the magic */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-2.5 bg-[#075E54] flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
            {storeName[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{storeName}</p>
            <p className="text-[10px] text-white/60">online</p>
          </div>
        </div>
        <div className="bg-[#ECE5DD] px-4 py-5 space-y-2.5">
          {/* Customer message */}
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3.5 py-2 max-w-[80%] shadow-sm">
              <p className="text-[13px] text-gray-800 leading-5">
                Hi! I&apos;d like to order the <strong>{data.productName || "Gold Bangle Set"}</strong> from your store 🛍️
              </p>
              <p className="text-[10px] text-gray-500 text-right mt-1">9:41 AM ✓✓</p>
            </div>
          </div>
          {/* Store reply */}
          <div className="flex justify-start">
            <div className="bg-white rounded-xl rounded-tl-sm px-3.5 py-2 max-w-[80%] shadow-sm">
              <p className="text-[13px] text-gray-800 leading-5">
                Welcome! 😊 Great choice! Let me confirm your order details...
              </p>
              <p className="text-[10px] text-gray-500 text-right mt-1">9:42 AM</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-[#f0f0f0] border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-gray-400">Type a message...</div>
            <div className="h-8 w-8 rounded-full bg-[#075E54] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/40 px-4 py-3">
        <span className="text-base">⚡</span>
        <p className="text-xs text-muted-foreground leading-5">
          When a customer taps <strong className="text-foreground">&quot;Order via WhatsApp&quot;</strong> on your store, their order details are automatically sent to this number — so you never miss a sale.
        </p>
      </div>
      <GuidedTip step={4} />
    </div>
  );
}
