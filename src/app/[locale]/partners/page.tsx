import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { LogoGrid } from "@/components/logos/LogoGrid";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { getContent } from "@/content";
import type { Locale } from "@/content/services.registry";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  const { partners } = getContent(locale as Locale);
  return {
    title: partners.seo.title,
    description: partners.seo.description,
    alternates: alternatesFor(locale as Locale, "/partners"),
  };
}

export default async function PartnersPage({
  params,
}: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { partners, common } = getContent(locale as Locale);

  return (
    <main>
      <PageHero
        eyebrow={common.nav.partners}
        title={partners.heading}
        intro={partners.intro}
      />
      <Container className="py-16 sm:py-20">
        <LogoGrid
          logos={partners.logos}
          columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        />
      </Container>
      <ContactCta common={common} />
    </main>
  );
}
