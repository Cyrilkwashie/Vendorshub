// ── Types ─────────────────────────────────────────────────────────────────────

export type StoreStyle = "minimal" | "instagram" | "premium";
export type ThemePreset = "luxury" | "clean" | "bold";

export interface OnboardingData {
  storeName: string;
  description: string;
  slug: string;
  storeStyle: StoreStyle;
  theme: ThemePreset;
  country: string;
  city: string;
  whatsapp: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  plan: string;
}

export const DEFAULT_DATA: OnboardingData = {
  storeName: "",
  description: "",
  slug: "",
  storeStyle: "premium",
  theme: "clean",
  country: "",
  city: "",
  whatsapp: "",
  productName: "",
  productPrice: "",
  productDescription: "",
  plan: "Grow Your Business",
};

// ── Theme color configs ───────────────────────────────────────────────────────

export interface ThemeConfig {
  label: string;
  tagline: string;
  bg: string;
  headerBg: string;
  headerBorder: string;
  accent: string;
  cardBg: string;
  textColor: string;
  subColor: string;
  font: string;
}

export const THEMES: Record<ThemePreset, ThemeConfig> = {
  luxury: {
    label: "Luxury",
    tagline: "Dark, elegant & gold-accented",
    bg: "#0f0f0f",
    headerBg: "#1a1a1a",
    headerBorder: "#ffffff15",
    accent: "#D4AF37",
    cardBg: "#1f1f1f",
    textColor: "#ffffff",
    subColor: "#ffffff60",
    font: "inherit",
  },
  clean: {
    label: "Clean",
    tagline: "White, minimal & premium",
    bg: "#FAFAFA",
    headerBg: "#160B35",
    headerBorder: "#ffffff15",
    accent: "#160B35",
    cardBg: "#ffffff",
    textColor: "#030303",
    subColor: "#03030370",
    font: "inherit",
  },
  bold: {
    label: "Bold",
    tagline: "Vibrant, colorful & energetic",
    bg: "#4c1d95",
    headerBg: "#3b0764",
    headerBorder: "#ffffff15",
    accent: "#fbbf24",
    cardBg: "#6d28d9",
    textColor: "#ffffff",
    subColor: "#ffffff70",
    font: "inherit",
  },
};

// ── Layout presets ────────────────────────────────────────────────────────────

export const STORE_STYLES: Record<StoreStyle, {
  label: string;
  tagline: string;
  emoji: string;
  sections: string[];
}> = {
  minimal: {
    label: "Minimal Store",
    tagline: "Simple & clean — just the essentials",
    emoji: "✨",
    sections: ["hero", "products", "whatsapp", "footer"],
  },
  instagram: {
    label: "Instagram Style",
    tagline: "Visual & social — great for lifestyle brands",
    emoji: "📸",
    sections: ["hero", "products", "social", "whatsapp", "footer"],
  },
  premium: {
    label: "Premium Brand",
    tagline: "Full-featured — the complete experience",
    emoji: "👑",
    sections: ["hero", "products", "about", "reviews", "whatsapp", "contact", "footer"],
  },
};

// ── Plans ─────────────────────────────────────────────────────────────────────

export const PLANS = [
  {
    name: "Start Free",
    price: "Free",
    description: "Everything you need to launch",
    features: ["1 storefront", "Up to 10 products", "WhatsApp order button", "Basic order tracking"],
    cta: "Start free",
  },
  {
    name: "Grow Your Business",
    price: "GHS 49",
    period: "/mo",
    description: "For vendors ready to scale",
    features: ["Unlimited products", "WhatsApp + Instagram orders", "Customer management", "Sales analytics", "Priority support"],
    cta: "Start 14-day free trial",
    popular: true,
  },
  {
    name: "Scale Like a Brand",
    price: "GHS 99",
    period: "/mo",
    description: "For serious businesses",
    features: ["3 storefronts", "All channels", "Advanced analytics", "Custom domain", "Dedicated support"],
    cta: "Start 14-day free trial",
  },
];

// ── Phases & Steps ────────────────────────────────────────────────────────────

export const PHASES = [
  { name: "Build Your Store", color: "#3b82f6", emoji: "🔵", steps: [0, 1] },
  { name: "Make It Yours", color: "#8b5cf6", emoji: "🟣", steps: [2, 3, 4] },
  { name: "Start Selling", color: "#22c55e", emoji: "🟢", steps: [5, 6] },
];

export const STEPS = [
  { label: "Store identity", phase: 0, showPreview: true },
  { label: "Store style", phase: 0, showPreview: true },
  { label: "Theme & branding", phase: 1, showPreview: true },
  { label: "Location", phase: 1, showPreview: false },
  { label: "WhatsApp", phase: 1, showPreview: false },
  { label: "First product", phase: 2, showPreview: true },
  { label: "Choose plan", phase: 2, showPreview: false },
];

// ── Guided tips ───────────────────────────────────────────────────────────────

export const GUIDED_TIPS: Record<number, string> = {
  0: "Stores with clear names get 2× more orders. Keep it short and memorable!",
  1: "Premium stores with all sections get 60% higher engagement.",
  2: "Stores with logos and banners get 40% more clicks.",
  3: "Showing your location builds trust with local customers.",
  4: "Vendors who connect WhatsApp see 3× faster order response times.",
  5: "Stores with at least one product photo convert 5× more visitors.",
  6: "You won't be charged today. Start free and upgrade anytime.",
};

// ── Utilities ─────────────────────────────────────────────────────────────────

export function getAISuggestions(userName: string): string[] {
  if (!userName) return [];
  const first = userName.split(" ")[0];
  return [
    `${first}'s Collection`,
    `${first} Luxe Store`,
    `${first}'s Boutique`,
    `The ${first} Shop`,
  ];
}

export function checkSlugAvailable(slug: string): "available" | "taken" | "" {
  if (!slug || slug.length < 2) return "";
  const taken = ["test", "store", "shop", "demo", "admin", "vendorshub"];
  return taken.includes(slug.toLowerCase()) ? "taken" : "available";
}

const TIMEZONE_COUNTRY_MAP: Record<string, { country: string; city: string; code: string }> = {
  "Africa/Accra": { country: "GH", city: "Accra", code: "+233" },
  "Africa/Lagos": { country: "NG", city: "Lagos", code: "+234" },
  "Africa/Abidjan": { country: "CI", city: "Abidjan", code: "+225" },
  "Africa/Dakar": { country: "SN", city: "Dakar", code: "+221" },
  "Africa/Douala": { country: "CM", city: "Douala", code: "+237" },
  "Africa/Nairobi": { country: "KE", city: "Nairobi", code: "+254" },
  "Africa/Johannesburg": { country: "ZA", city: "Johannesburg", code: "+27" },
  "Africa/Kumasi": { country: "GH", city: "Kumasi", code: "+233" },
};

export function detectLocation(): { country: string; city: string } | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = TIMEZONE_COUNTRY_MAP[tz];
    return match ? { country: match.country, city: match.city } : null;
  } catch {
    return null;
  }
}

export function getCountryFlag(code: string): string {
  const flags: Record<string, string> = {
    GH: "🇬🇭", NG: "🇳🇬", CI: "🇨🇮", SN: "🇸🇳", CM: "🇨🇲", KE: "🇰🇪", ZA: "🇿🇦",
  };
  return flags[code] || "🌍";
}

export function getCountryName(code: string): string {
  const names: Record<string, string> = {
    GH: "Ghana", NG: "Nigeria", CI: "Côte d'Ivoire", SN: "Senegal", CM: "Cameroon", KE: "Kenya", ZA: "South Africa",
  };
  return names[code] || code;
}

export const SAMPLE_PRODUCT = {
  name: "Gold Bangle Set",
  price: "85",
  description: "Handcrafted 18K gold-plated bangle set. Perfect for everyday elegance.",
};
