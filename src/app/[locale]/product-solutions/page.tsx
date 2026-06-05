import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Container } from "@/components/layout/Container";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { getContent } from "@/content";
import { serviceById, type Locale } from "@/content/services.registry";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/product-solutions">): Promise<Metadata> {
  const { locale } = await params;
  const { productSolutions } = getContent(locale as Locale);
  return {
    title: productSolutions.seo.title,
    description: productSolutions.seo.description,
    alternates: alternatesFor(locale as Locale, "/product-solutions"),
  };
}

export default async function ProductSolutionsPage({
  params,
}: PageProps<"/[locale]/product-solutions">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { productSolutions, common } = getContent(locale as Locale);

  return (
    <main>
      <PageHero
        eyebrow={common.nav.productSolutions}
        title={productSolutions.heading}
        intro={productSolutions.intro}
      />
      <Container className="py-16 sm:py-20">
        <StaggerGroup
          as="ul"
          stagger={0.05}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {productSolutions.cards.map((card) => {
            const entry = serviceById(card.serviceId);
            if (!entry) return null;
            return (
              <StaggerItem as="li" key={card.serviceId} kind="scaleIn">
                <ServiceCard card={card} slug={entry.slug[locale as Locale]} />
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
      <ContactCta common={common} />
    </main>
  );
}
