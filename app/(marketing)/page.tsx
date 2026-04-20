import { LandingHero } from "@/components/landing/Hero";
import { DirectionCards } from "@/components/landing/DirectionCards";
import { ValueSection } from "@/components/landing/ValueSection";
import { ProductInsight } from "@/components/landing/ProductInsight";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <DirectionCards />
      <ValueSection />
      <ProductInsight />
      <HowItWorks />
      <ProductDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
