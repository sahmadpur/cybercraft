import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/content/services.registry";

export const SITE_URL = "https://cybercraft.az";

type Href = Parameters<typeof getPathname>[0]["href"];

/** Absolute URL for a route in a given locale (localized slugs included). */
export function localizedUrl(locale: Locale, href: Href): string {
  return SITE_URL + getPathname({ locale, href });
}

/**
 * Canonical + hreflang alternates for a page. en doubles as x-default,
 * matching the live site's WPML setup.
 */
export function alternatesFor(locale: Locale, href: Href): Metadata["alternates"] {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, localizedUrl(l, href)]),
  ) as Record<Locale, string>;

  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages.en },
  };
}

/** Service pages need per-locale slugs from the registry. */
export function serviceAlternatesFor(
  locale: Locale,
  slug: Record<Locale, string>,
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [
      l,
      localizedUrl(l, { pathname: "/[service]", params: { service: slug[l] } }),
    ]),
  ) as Record<Locale, string>;

  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages.en },
  };
}
