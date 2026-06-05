import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Golos_Text, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getContent } from "@/content";
import { SERVICES, type Locale } from "@/content/services.registry";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

// Both families cover latin-ext (Azerbaijani ə) and cyrillic (Russian)
const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps<"/[locale]">, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { home } = getContent(locale as Locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: home.seo.title,
    openGraph: {
      siteName: "Cybercraft",
      locale,
      type: "website",
      images: [{ url: "/assets/brand/cybercraft-logo.webp" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getContent(locale as Locale);
  const menuServices = SERVICES.map((s) => ({
    id: s.id,
    slug: s.slug[locale as Locale],
    title: content.services[s.id].title,
  }));

  return (
    <html
      lang={locale}
      className={`${golos.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <MotionProvider>
            <SiteHeader common={content.common} services={menuServices} />
            {children}
            <SiteFooter common={content.common} />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
