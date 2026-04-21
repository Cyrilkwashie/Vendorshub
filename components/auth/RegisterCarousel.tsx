"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/slide-1.jpg",
    tag: "Your storefront",
    heading: "Look professional from day one.",
    body: "Launch a clean, shareable store page in minutes. No designers, no developers — just you and your products.",
  },
  {
    image: "/slide-2.jpg",
    tag: "Order management",
    heading: "Every order. One dashboard.",
    body: "Stop juggling DMs, screenshots, and sticky notes. Track every order from WhatsApp, Instagram, and your storefront in one place.",
  },
  {
    image: "/slide-3.jpg",
    tag: "Customer trust",
    heading: "Customers who actually come back.",
    body: "Build a real customer list, see who's buying what, and follow up confidently. Turn one-time buyers into loyal regulars.",
  },
];

export function RegisterCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <>
      {/* Full background image */}
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt=""
          fill
          sizes="45vw"
          className={`object-cover object-center transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        {/* Slide text */}
        <div className="flex-1 flex flex-col justify-end pb-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {slide.tag}
          </p>
          <h2
            className="text-3xl font-semibold leading-snug text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {slide.heading}
          </h2>
          <p className="text-sm leading-7 text-white/70 max-w-xs">
            {slide.body}
          </p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
