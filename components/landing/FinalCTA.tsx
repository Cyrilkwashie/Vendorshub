import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Ready when you are
        </p>
        <h2
          className="mb-6 text-balance text-4xl font-serif font-semibold leading-tight text-white md:text-[3rem]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Your store is ready{" "}
          <em style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            in minutes.
          </em>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base leading-7 text-white/60">
          Join hundreds of Ghanaian vendors who turned their Instagram and WhatsApp business into a real online store — no tech skills needed.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Create My Free Store
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            See how it works
          </Link>
        </div>

        {/* Small reassurance */}
        <p className="mt-8 text-xs text-white/40">
          Free plan available. No credit card required.
        </p>
      </div>
    </section>
  );
}
