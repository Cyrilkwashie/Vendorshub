/**
 * Template Registry
 * Maps template names to their page components.
 * Route files use this to pick the right template.
 */
import type { TemplatePages } from "./types";
import SmallShop from "./small-shop";
import CategoryShop from "./category-shop";
import SingleProduct from "./single-product";

const TEMPLATES: Record<string, TemplatePages> = {
  "small-shop": SmallShop,
  "category-shop": CategoryShop,
  "single-product": SingleProduct,
};

export function getTemplate(templateName?: string): TemplatePages {
  return TEMPLATES[templateName || "small-shop"] || SmallShop;
}

export type { TemplatePages, StorePageProps, ProductPageProps } from "./types";
