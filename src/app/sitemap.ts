import type { MetadataRoute } from "next";
import { LOCALES, SERVICES } from "@/content/services.registry";
import { localizedUrl } from "@/lib/seo";

const STATIC_PATHS = [
  "/",
  "/vendors",
  "/partners",
  "/product-solutions",
  "/contact-us",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((pathname) => ({
    url: localizedUrl("en", pathname),
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localizedUrl(l, pathname)]),
      ),
    },
    changeFrequency: "monthly" as const,
    priority: pathname === "/" ? 1 : 0.8,
  }));

  const serviceEntries = SERVICES.map((service) => {
    const href = (locale: (typeof LOCALES)[number]) =>
      localizedUrl(locale, {
        pathname: "/[service]",
        params: { service: service.slug[locale] },
      });
    return {
      url: href("en"),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, href(l)])),
      },
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticEntries, ...serviceEntries];
}
