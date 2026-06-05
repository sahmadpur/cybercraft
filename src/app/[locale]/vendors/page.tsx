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
}: PageProps<"/[locale]/vendors">): Promise<Metadata> {
  const { locale } = await params;
  const { vendors } = getContent(locale as Locale);
  return {
    title: vendors.seo.title,
    description: vendors.seo.description,
    alternates: alternatesFor(locale as Locale, "/vendors"),
  };
}

export default async function VendorsPage({
  params,
}: PageProps<"/[locale]/vendors">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { vendors, common } = getContent(locale as Locale);

  return (
    <main>
      <PageHero
        eyebrow={common.nav.vendors}
        title={vendors.heading}
        intro={vendors.intro}
      />
      <Container className="py-16 sm:py-20">
        <LogoGrid
          logos={vendors.logos}
          columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        />
      </Container>
      <ContactCta common={common} />
    </main>
  );
}
