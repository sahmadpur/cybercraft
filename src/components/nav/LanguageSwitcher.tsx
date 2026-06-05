"use client";

import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import {
  LOCALES,
  serviceBySlug,
  type Locale,
} from "@/content/services.registry";

const SHORT: Record<Locale, string> = { en: "EN", az: "AZ", ru: "RU" };
const FULL: Record<Locale, string> = {
  en: "English",
  az: "Azərbaycan",
  ru: "Русский",
};

/** Internal route segment (below the [locale] layout) → canonical pathname */
const STATIC_SEGMENTS: Record<string, AppPathname> = {
  vendors: "/vendors",
  partners: "/partners",
  "product-solutions": "/product-solutions",
  "contact-us": "/contact-us",
};

interface LanguageSwitcherProps {
  label: string;
  className?: string;
}

/**
 * Preserves the current page across locales. The internal layout segment is
 * used instead of usePathname so localized non-ASCII slugs can't fail the
 * reverse pathname match; service slugs map through the services registry.
 * Falls back to the target locale's homepage when no equivalent exists.
 */
export function LanguageSwitcher({ label, className = "" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const segment = useSelectedLayoutSegment();
  const params = useParams<{ service?: string }>();

  function hrefFor(target: Locale):
    | AppPathname
    | { pathname: "/[service]"; params: { service: string } } {
    if (segment === null) return "/";
    if (segment in STATIC_SEGMENTS) return STATIC_SEGMENTS[segment];
    if (params.service) {
      const entry = serviceBySlug(locale, params.service);
      if (entry) {
        return {
          pathname: "/[service]",
          params: { service: entry.slug[target] },
        };
      }
    }
    return "/";
  }

  return (
    <nav aria-label={label} className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((target) => (
        <Link
          key={target}
          // @ts-expect-error -- href shape is validated by hrefFor against the pathnames config
          href={hrefFor(target)}
          locale={target}
          aria-label={FULL[target]}
          aria-current={target === locale ? "true" : undefined}
          className={`rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors duration-200 ${
            target === locale
              ? "bg-brand text-navy"
              : "text-ink-muted hover:bg-surface-alt hover:text-ink"
          }`}
        >
          {SHORT[target]}
        </Link>
      ))}
    </nav>
  );
}
