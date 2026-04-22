"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OnboardingData } from "./config";

function ConfettiPiece({ delay, left, color }: { delay: number; left: number; color: string }) {
  return (
    <div
      className="absolute top-0 w-2.5 h-2.5 rounded-sm opacity-0"
      style={{
        left: `${left}%`,
        backgroundColor: color,
        animation: `confettiFall 2.5s ${delay}s ease-out forwards`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}

export function LaunchScreen({ data }: { data: OnboardingData }) {
  const [show, setShow] = useState(false);
  const storeName = data.storeName || "Your Store";
  const storeUrl = `vendorshub.store/${data.slug || "your-store"}`;

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const confettiColors = ["#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#ec4899", "#14b8a6", "#f97316"];
  const confettiPieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: Math.random() * 1.5,
    left: Math.random() * 100,
    color: confettiColors[i % confettiColors.length],
  }));

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(-20px) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg) scale(0.3); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((p) => (
            <ConfettiPiece key={p.id} delay={p.delay} left={p.left} color={p.color} />
          ))}
        </div>

        <div
          className={`relative z-10 flex flex-col items-center text-center px-6 max-w-lg transition-all duration-700 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          {/* Celebration emoji */}
          <div className="text-7xl mb-6" style={{ animation: "scaleIn 0.5s 0.3s ease-out both" }}>🎉</div>

          {/* Heading */}
          <h1
            className="text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", animation: "slideUp 0.5s 0.5s ease-out both" }}
          >
            Your store is LIVE!
          </h1>

          <p
            className="text-lg text-muted-foreground mb-2"
            style={{ animation: "slideUp 0.5s 0.6s ease-out both" }}
          >
            <strong className="text-foreground">{storeName}</strong> is ready for customers
          </p>

          {/* Store URL */}
          <div
            className="flex items-center gap-2 rounded-full border border-border bg-muted px-5 py-2.5 mb-8"
            style={{ animation: "slideUp 0.5s 0.7s ease-out both" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald-500">
              <circle cx="6" cy="6" r="4" fill="currentColor" />
            </svg>
            <span className="text-sm font-medium text-foreground">{storeUrl}</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(`https://${storeUrl}`)}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Copy
            </button>
          </div>

          {/* Action buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
            style={{ animation: "slideUp 0.5s 0.8s ease-out both" }}
          >
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20BD5A] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.612l4.458-1.495A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.313 0-4.445-.78-6.153-2.094l-.43-.338-3.154 1.057 1.057-3.154-.338-.43A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Share on WhatsApp
            </button>
            <Link
              href={`/store/${data.slug || "your-store"}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary/5 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              View Store
            </Link>
          </div>

          {/* Go to dashboard */}
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{ animation: "slideUp 0.5s 1s ease-out both" }}
          >
            Go to my dashboard
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </>
  );
}
