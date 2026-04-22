"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { saveStoreProfile, addProduct } from "@/lib/store";
import { setLocalAuth } from "@/lib/auth";
import { OnboardingData, DEFAULT_DATA, PHASES, STEPS } from "./config";
import { StepIdentity, StepStoreStyle, StepThemeBranding } from "./steps-build";
import { StepLocation, StepWhatsApp } from "./steps-customize";
import { StepFirstProduct, StepPlan } from "./steps-sell";
import { LivePreview } from "./preview";
import { LaunchScreen } from "./launch";
import type { StoreTemplate } from "@/types";

// ── Phase Indicator ───────────────────────────────────────────────────────────

function PhaseIndicator({ currentStep }: { currentStep: number }) {
  const currentPhase = STEPS[currentStep].phase;

  return (
    <div className="hidden sm:flex items-center gap-1">
      {PHASES.map((phase, pi) => {
        const isCompleted = pi < currentPhase;
        const isCurrent = pi === currentPhase;
        const phaseSteps = phase.steps;
        const stepsInPhase = phaseSteps.length;
        const stepsCompleted = phaseSteps.filter((s) => s < currentStep).length;
        const progress = isCurrent ? stepsCompleted / stepsInPhase : isCompleted ? 1 : 0;

        return (
          <div key={phase.name} className="flex items-center gap-1">
            {pi > 0 && (
              <div className={`w-6 h-px mx-1 transition-all duration-500 ${isCompleted || isCurrent ? "bg-primary/30" : "bg-border"}`} />
            )}
            <div className="flex items-center gap-1.5">
              {/* Phase dot */}
              <div
                className={`relative flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500 ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isCurrent
                    ? "bg-primary/10 text-primary ring-2 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  pi + 1
                )}
                {/* Progress ring for current phase */}
                {isCurrent && (
                  <svg className="absolute inset-0" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="var(--color-primary)" strokeWidth="2"
                      strokeDasharray={`${progress * 69.1} 69.1`}
                      strokeLinecap="round"
                      transform="rotate(-90 12 12)"
                      className="transition-all duration-500"
                    />
                  </svg>
                )}
              </div>
              {/* Phase label */}
              <span className={`text-xs font-medium transition-colors ${isCurrent ? "text-foreground" : isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                {phase.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA);
  const [launched, setLaunched] = useState(false);

  const total = STEPS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const showPreview = STEPS[step].showPreview;
  const currentPhase = PHASES[STEPS[step].phase];

  const stepProps = { data, setData };

  const stepComponents = [
    <StepIdentity key="identity" {...stepProps} />,
    <StepStoreStyle key="style" {...stepProps} />,
    <StepThemeBranding key="theme" {...stepProps} />,
    <StepLocation key="location" {...stepProps} />,
    <StepWhatsApp key="whatsapp" {...stepProps} />,
    <StepFirstProduct key="product" {...stepProps} />,
    <StepPlan key="plan" {...stepProps} />,
  ];

  function handleLaunch() {
    // Save store profile
    const templateMap: Record<string, StoreTemplate> = {
      "small-shop": "small-shop",
      "category-shop": "category-shop",
      "single-product": "single-product",
    };
    saveStoreProfile({
      name: data.storeName || "My Store",
      slug: data.slug || "my-store",
      description: data.description || "",
      whatsapp: data.whatsapp ? "+233" + data.whatsapp : "",
      country: data.country || "GH",
      city: data.city || "Accra",
      plan: "growth",
      email: "",
      createdAt: new Date().toISOString(),
      template: templateMap[data.storeStyle] || "small-shop",
    });

    // Save first product if provided
    if (data.productName) {
      addProduct({
        name: data.productName,
        description: data.productDescription || "",
        priceGhs: parseFloat(data.productPrice) || 0,
        inventory: 50,
        category: "General",
      });
    }

    // Ensure auth is set
    try {
      const auth = localStorage.getItem("vendorshub_auth");
      if (auth) {
        const parsed = JSON.parse(auth);
        setLocalAuth({ name: parsed.name || data.storeName, email: parsed.email || "" });
      }
    } catch {}

    setLaunched(true);
  }

  if (launched) {
    return <LaunchScreen data={data} />;
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .step-animate {
          animation: fadeSlideIn 0.35s ease-out;
        }
      `}</style>

      <div className="flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <Logo />
          <div className="flex items-center gap-4">
            <PhaseIndicator currentStep={step} />

            {/* Mobile: show phase name */}
            <div className="flex sm:hidden items-center gap-2">
              <span className="text-xs">{currentPhase.emoji}</span>
              <span className="text-xs font-medium text-foreground">{currentPhase.name}</span>
            </div>

            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Skip setup
            </Link>
          </div>
        </header>

        {/* Body */}
        <main className="flex flex-1 overflow-hidden">
          {/* Form side */}
          <div className={`flex flex-col flex-1 overflow-y-auto ${showPreview ? "lg:w-[55%] lg:flex-none" : "w-full"}`}>
            <div className="flex-1 px-6 py-10 sm:px-10">
              <div className="mx-auto max-w-lg">
                {/* Phase badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: currentPhase.color + "15", color: currentPhase.color }}>
                    {currentPhase.emoji} {currentPhase.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Step {step + 1} of {total}
                  </span>
                </div>

                {/* Step content with transition */}
                <div key={step} className="step-animate">
                  {stepComponents[step]}
                </div>
              </div>
            </div>

            {/* Footer nav */}
            <div className="border-t border-border px-6 py-5 shrink-0">
              <div className="mx-auto flex max-w-lg items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={isFirst}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>

                {isLast ? (
                  <button
                    type="button"
                    onClick={handleLaunch}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:shadow-lg"
                  >
                    🚀 Launch my store
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all"
                  >
                    Continue
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Live preview side */}
          {showPreview && (
            <div className="hidden lg:flex lg:w-[45%] shrink-0 flex-col items-center justify-center border-l border-border bg-muted/20 px-10 py-10 overflow-y-auto">
              <LivePreview data={data} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
