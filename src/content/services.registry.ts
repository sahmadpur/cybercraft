/**
 * Single source of truth for the 16 service detail pages.
 * Slugs were extracted from the live site's WPML hreflang alternates
 * (see scripts/crawl-content.ts → .crawl/slug-registry.json).
 */
export const LOCALES = ["en", "az", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export interface ServiceEntry {
  /** Stable id — also the EN slug and the asset filename under /assets/services/ */
  id: string;
  slug: Record<Locale, string>;
}

export const SERVICES: ServiceEntry[] = [
  {
    id: "software-development",
    slug: {
      en: "software-development",
      az: "proqram-təminatının-hazırlanması",
      ru: "разработка-программного-обеспечения",
    },
  },
  {
    id: "advanced-cybersecurity-services",
    slug: {
      en: "advanced-cybersecurity-services",
      az: "qabaqcil-kibertəhlukəsizlik-xidmətləri",
      ru: "расширенные-услуги-кибербезопасност",
    },
  },
  {
    id: "cloud-solutions",
    slug: {
      en: "cloud-solutions",
      az: "bulud-helleri",
      ru: "облачные-решения",
    },
  },
  {
    id: "collaboration-tools-unified-communications",
    slug: {
      en: "collaboration-tools-unified-communications",
      az: "eməkdasliq-alətləri-və-vahid-rabitə",
      ru: "инструменты-для-совместной-работы-и-у",
    },
  },
  {
    id: "cyber-security-solutions",
    slug: {
      en: "cyber-security-solutions",
      az: "kiber-təhlukəsizlik-həlləri",
      ru: "решения-по-кибербезопасности",
    },
  },
  {
    id: "it-sales-solutions-by-cybercraft",
    slug: {
      en: "it-sales-solutions-by-cybercraft",
      az: "cybercraft-tərəfindən-it-satis-və-həllər",
      ru: "продажи-ит-и-решения-от-cybercraft",
    },
  },
  {
    id: "it-support-help-desk-services",
    slug: {
      en: "it-support-help-desk-services",
      az: "it-dəstək-və-yardim-masasi-xidmətləri",
      ru: "ит-поддержка-и-услуги-справочной-служ",
    },
  },
  {
    id: "it-hardware-and-software",
    slug: {
      en: "it-hardware-and-software",
      az: "biznesiniz-ucun-it-aparat-və-proqram-həlləri",
      ru: "аппаратные-и-программные-решения-для",
    },
  },
  {
    id: "innovation-emerging-tech",
    slug: {
      en: "innovation-emerging-tech",
      az: "innovasiya-və-inkisaf-edən-texnologiya",
      ru: "инновации-и-новые-технологии",
    },
  },
  {
    id: "it-equipment-smart-solutions",
    slug: {
      en: "it-equipment-smart-solutions",
      az: "it-avadanliqlari-və-agilli-həllər",
      ru: "ит-оборудование-и-интеллектуальные-р",
    },
  },
  {
    id: "it-infrastructure-design-deployment",
    slug: {
      en: "it-infrastructure-design-deployment",
      az: "it-infrastrukturunun-dizayni-və-yerləsdirilməsi",
      ru: "проектирование-и-развертывание-ит-ин",
    },
  },
  {
    id: "managed-it-services",
    slug: {
      en: "managed-it-services",
      az: "idarə-olunan-it-xidmətləri",
      ru: "управляемые-ит-услуги",
    },
  },
  {
    id: "network-solutions-optimization",
    slug: {
      en: "network-solutions-optimization",
      az: "səbəkə-həlləri-və-optimallasdirma",
      ru: "сетевые-решения-и-оптимизация",
    },
  },
  {
    id: "smart-cctv-solutions-for-modern-security",
    slug: {
      en: "smart-cctv-solutions-for-modern-security",
      az: "muasir-təhlukəsizlik-ucun-agilli-cctv-həlləri",
      ru: "умные-решения-видеонаблюдения-для-со",
    },
  },
  {
    id: "virtualization-server-consolidation",
    slug: {
      en: "virtualization-server-consolidation",
      az: "virtuallasdirma-ve-server-konsolidasiyasi",
      ru: "виртуализация-и-консолидация-сервер",
    },
  },
];

export function serviceBySlug(locale: Locale, slug: string): ServiceEntry | undefined {
  const decoded = decodeURIComponent(slug);
  return SERVICES.find((s) => s.slug[locale] === decoded);
}

export function serviceById(id: string): ServiceEntry | undefined {
  return SERVICES.find((s) => s.id === id);
}
