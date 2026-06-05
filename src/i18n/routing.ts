import { defineRouting } from "next-intl/routing";

/**
 * en lives at `/` (no prefix), az/ru are prefixed.
 * Static page slugs are localized to match the current live site (WPML);
 * service detail pages use a root-level dynamic segment whose per-locale
 * slugs come from src/content/services.registry.ts.
 */
export const routing = defineRouting({
  locales: ["en", "az", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/vendors": {
      en: "/vendors",
      az: "/vendorlar",
      ru: "/поставщики",
    },
    "/partners": {
      en: "/partners",
      az: "/terefdaslar",
      ru: "/партнеры",
    },
    "/product-solutions": {
      en: "/product-solutions",
      az: "/məhsul-və-həllər",
      ru: "/продукты-и-решения",
    },
    "/contact-us": {
      en: "/contact-us",
      az: "/bizimle-elaqe",
      ru: "/связаться-с-нами",
    },
    // Service detail pages live at the root level (mirrors current site URLs).
    // The [service] param itself is localized via the services registry.
    "/[service]": "/[service]",
  },
});

export type AppPathname = keyof typeof routing.pathnames;
