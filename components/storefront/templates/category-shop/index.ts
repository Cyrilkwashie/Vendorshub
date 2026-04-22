import type { TemplatePages } from "../types";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ProductPage from "./ProductPage";

const CategoryShop: TemplatePages = { HomePage, ShopPage, AboutPage, ContactPage, ProductPage };
export default CategoryShop;
