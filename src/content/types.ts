import type { AssetId } from "./assets";
import type { Locale } from "./services.registry";

export type { AssetId, Locale };

export interface SeoMeta {
  title: string;
  description?: string;
}

/** Shared contact details (footer, contact CTA, contact page) */
export interface ContactBlock {
  heading: string;
  body: string;
  addressLabel: string;
  address: string;
  email: string;
  phone: string;
  mapEmbedUrl: string;
  mapExternalUrl: string;
  mapLinkLabel: string;
}

/** Visual-only contact form labels (submission handler comes in a later phase) */
export interface ContactFormLabels {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  submit: string;
}

/** Nav, footer, buttons, a11y strings shared across pages of one locale */
export interface CommonContent {
  nav: {
    vendors: string;
    partners: string;
    productSolutions: string;
    contactUs: string;
  };
  menuLabel: string;
  closeLabel: string;
  languageSwitcherLabel: string;
  cta: {
    explore: string;
    contact: string;
    readMore: string;
    backToServices: string;
    relatedServices: string;
  };
  footer: {
    copyright: string;
  };
  contact: ContactBlock;
  form: ContactFormLabels;
}

export interface ServiceCardInfo {
  /** id from services.registry.ts */
  serviceId: string;
  title: string;
  blurb: string;
}

/** Featured product showcase (Software Development / DocAI) on the homepage */
export interface ProductShowcase {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  aiHeading: string;
  aiPoints: string[];
  productName: string;
  productTagline: string;
  productUrl: string;
  ctaProduct: string;
  ctaService: string;
  screenshots: AssetId[];
}

export interface HomeContent {
  seo: SeoMeta;
  hero: { headline: string };
  about: { heading: string; paragraphs: string[] };
  product: ProductShowcase;
  vendors: { heading: string; intro: string; logos: AssetId[] };
  partners: { heading: string; intro: string; logos: AssetId[] };
  solutions: { heading: string; intro: string; cards: ServiceCardInfo[] };
  engineering: {
    heading: string;
    intro: string;
    offerHeading: string;
    offers: string[];
    closing: string;
  };
}

/** Vendors and Partners logo-gallery pages */
export interface LogoPageContent {
  seo: SeoMeta;
  heading: string;
  intro?: string;
  logos: AssetId[];
}

export interface ProductSolutionsContent {
  seo: SeoMeta;
  heading: string;
  intro?: string;
  cards: ServiceCardInfo[];
}

export interface ServiceSection {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface ServiceContent {
  /** id from services.registry.ts */
  id: string;
  seo: SeoMeta;
  title: string;
  /** Short tagline shown under the title in the service hero */
  tagline?: string;
  intro: string[];
  sections: ServiceSection[];
}

export interface ContactPageContent {
  seo: SeoMeta;
}
