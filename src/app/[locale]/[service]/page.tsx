import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { getContent } from "@/content";
import { serviceAsset } from "@/content/assets";
import {
  LOCALES,
  SERVICES,
  serviceBySlug,
  type Locale,
} from "@/content/services.registry";
import { Link } from "@/i18n/navigation";
import { serviceAlternatesFor } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, service: s.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[service]">): Promise<Metadata> {
  const { locale, service } = await params;
  const entry = serviceBySlug(locale as Locale, service);
  if (!entry) return {};
  const content = getContent(locale as Locale).services[entry.id];
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: serviceAlternatesFor(locale as Locale, entry.slug),
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[locale]/[service]">) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  const entry = serviceBySlug(locale as Locale, service);
  if (!entry) notFound();

  const { services, productSolutions, common } = getContent(locale as Locale);
  const content = services[entry.id];
  const image = serviceAsset(entry.id);

  // Related services: the next 3 in registry order, wrapping around
  const index = SERVICES.findIndex((s) => s.id === entry.id);
  const related = [1, 2, 3]
    .map((offset) => SERVICES[(index + offset) % SERVICES.length])
    .map((s) => ({
      entry: s,
      card: productSolutions.cards.find((c) => c.serviceId === s.id) ?? {
        serviceId: s.id,
        title: services[s.id].title,
        blurb: services[s.id].tagline ?? "",
      },
    }));

  return (
    <main>
      <PageHero
        eyebrow={common.nav.productSolutions}
        title={content.title}
        intro={content.tagline}
      >
        <div className="pt-8">
          <Link
            href="/product-solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-navy"
          >
            <span aria-hidden>←</span>
            {common.cta.backToServices}
          </Link>
        </div>
      </PageHero>

      {image && (
        <Container className="pt-12">
          <Reveal>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="max-h-96 w-full rounded-2xl border border-line object-cover"
            />
          </Reveal>
        </Container>
      )}

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="flex flex-col gap-5">
            {content.intro.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="flex flex-col gap-12 pt-12">
            {content.sections.map((section, i) => (
              <Reveal key={i}>
                {section.heading && (
                  <h2 className="font-display text-xl font-semibold text-navy">
                    <span aria-hidden className="mr-3 inline-block size-2.5 rounded-[2px] bg-brand" />
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="pt-4 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="flex flex-col divide-y divide-line pt-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 py-3.5">
                        <span
                          aria-hidden
                          className="mt-2 size-2 shrink-0 rounded-[2px] bg-brand"
                        />
                        <span className="leading-relaxed text-ink-soft">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Related services */}
      <section className="border-t border-line bg-surface-alt">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <h2 className="font-display text-display-sm font-semibold text-navy">
              {common.cta.relatedServices}
            </h2>
          </Reveal>
          <StaggerGroup as="ul" stagger={0.07} className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ entry: rel, card }) => (
              <StaggerItem as="li" key={rel.id} kind="scaleIn">
                <ServiceCard card={card} slug={rel.slug[locale as Locale]} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <ContactCta common={common} />
    </main>
  );
}
