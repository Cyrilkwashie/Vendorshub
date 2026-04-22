/**
 * Shared types for all storefront template page components.
 * Every template page receives the same props shape.
 */
import type { StoreProfile, Product } from "@/types";

/** Props passed to Home, Shop, About, Contact pages */
export interface StorePageProps {
  slug: string;
  store: StoreProfile;
  products: Product[];
}

/** Props passed to the Product detail page */
export interface ProductPageProps {
  slug: string;
  store: StoreProfile;
  product: Product;
  allProducts: Product[];
}

/** Every template must export these 5 page components */
export interface TemplatePages {
  HomePage: React.ComponentType<StorePageProps>;
  ShopPage: React.ComponentType<StorePageProps>;
  AboutPage: React.ComponentType<StorePageProps>;
  ContactPage: React.ComponentType<StorePageProps>;
  ProductPage: React.ComponentType<ProductPageProps>;
}
