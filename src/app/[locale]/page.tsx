import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowLink } from "@/components/buttons/ArrowButton";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Container } from "@/components/layout/Container";
import { LogoMarquee } from "@/components/logos/LogoMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { StaggerText } from "@/components/motion/StaggerText";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ContactCta } from "@/components/sections/ContactCta";
import { getContent } from "@/content";
import { getAsset } from "@/content/assets";
import { serviceById, type Locale } from "@/content/services.registry";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const { home } = getContent(locale as Locale);
  return {
    title: home.seo.title,
    description: home.seo.description,
    alternates: alternatesFor(locale as Locale, "/"),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { home, common } = getContent(locale as Locale);
  const aboutImage = getAsset("image-about-us");
  const heroBanner = getAsset("banner-hero");
  const softwareDevSlug = serviceById("software-development")?.slug[locale as Locale];
  const [productShot1, productShot2] = home.product.screenshots.map(getAsset);

  return (
    <main>
      {/* Hero — oversized staggered headline over a dot-grid field */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 [background-image:radial-gradient(circle,var(--color-line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <Container className="relative pb-16 pt-20 sm:pt-28">
          <StaggerText
            text={home.hero.headline}
            as="h1"
            delay={0.15}
            className="max-w-4xl font-display text-display font-semibold text-navy md:text-display-lg lg:text-display-xl"
          />
          <StaggerGroup onMount stagger={0.12} delay={0.55} className="flex flex-wrap items-center gap-4 pt-10">
            <StaggerItem>
              <ArrowLink href="/product-solutions" label={common.cta.explore} size="lg" />
            </StaggerItem>
            <StaggerItem>
              <ArrowLink href="/contact-us" label={common.cta.contact} variant="outline" size="lg" />
            </StaggerItem>
          </StaggerGroup>
        </Container>
        <Container className="relative pb-20">
          <Reveal>
            <Image
              src={heroBanner.src}
              alt={heroBanner.alt}
              width={heroBanner.width}
              height={heroBanner.height}
              priority
              className="w-full rounded-2xl border border-line object-cover"
            />
          </Reveal>
        </Container>
      </section>

      {/* Vendor trust strip */}
      <section className="border-t border-line">
        <Container className="py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <Eyebrow>{home.vendors.heading}</Eyebrow>
            <p className="pt-5 leading-relaxed text-ink-soft">{home.vendors.intro}</p>
          </Reveal>
          <div className="pt-12">
            <LogoMarquee logos={home.vendors.logos.slice(0, 9)} />
            <div className="pt-10">
              <LogoMarquee logos={home.vendors.logos.slice(9)} reverse />
            </div>
          </div>
        </Container>
      </section>

      {/* About — editorial split */}
      <section className="border-t border-line bg-surface-alt">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              width={aboutImage.width}
              height={aboutImage.height}
              className="aspect-square w-full rounded-2xl border border-line object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-display-sm font-semibold text-navy md:text-display">
              <span aria-hidden className="mr-4 inline-block size-3 rounded-[3px] bg-brand" />
              {home.about.heading}
            </h2>
            <div className="flex flex-col gap-4 pt-6">
              {home.about.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Featured product — Software Development & AI (DocAI) */}
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow className="text-white/60">{home.product.eyebrow}</Eyebrow>
            <h2 className="pt-5 font-display text-display-sm font-semibold md:text-display">
              {home.product.heading}
            </h2>
            <div className="flex flex-col gap-4 pt-6">
              {home.product.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-white/85">
                  {p}
                </p>
              ))}
            </div>
            <p className="pt-8 text-sm font-semibold tracking-wide text-brand">
              {home.product.aiHeading}
            </p>
            <ul className="flex flex-col divide-y divide-white/10 pt-2">
              {home.product.aiPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-4 py-3.5">
                  <span aria-hidden className="size-2 shrink-0 rounded-[2px] bg-brand" />
                  <span className="leading-relaxed text-white/85">{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-8">
              <a
                href={home.product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-brand px-6 py-3.5 text-base font-medium text-navy transition-colors duration-300 hover:bg-brand-dark"
              >
                {home.product.ctaProduct}
                <span aria-hidden>↗</span>
              </a>
              {softwareDevSlug && (
                <Link
                  href={{ pathname: "/[service]", params: { service: softwareDevSlug } }}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-white/25 px-6 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  {home.product.ctaService}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col items-end">
              <Image
                src={productShot1.src}
                alt={productShot1.alt}
                width={productShot1.width}
                height={productShot1.height}
                className="w-full rounded-2xl border border-white/15 shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)]"
              />
              <Image
                src={productShot2.src}
                alt={productShot2.alt}
                width={productShot2.width}
                height={productShot2.height}
                className="-mt-10 w-3/4 rounded-2xl border border-white/15 shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)] sm:-mt-16"
              />
            </div>
            <p className="pt-6 text-sm text-white/60">
              <span className="font-semibold text-brand">{home.product.productName}</span>
              {" — "}
              {home.product.productTagline}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Solutions overview */}
      <section className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-3xl">
            <Eyebrow>{common.nav.productSolutions}</Eyebrow>
            <h2 className="pt-5 font-display text-display-sm font-semibold text-navy md:text-display">
              {home.solutions.heading}
            </h2>
            <p className="pt-6 leading-relaxed text-ink-soft">{home.solutions.intro}</p>
          </Reveal>
          <StaggerGroup
            as="ul"
            stagger={0.05}
            className="grid gap-5 pt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {home.solutions.cards.map((card) => {
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
      </section>

      {/* Engineering support — navy editorial break */}
      <section className="bg-navy text-white">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow className="text-white/60">{home.engineering.heading}</Eyebrow>
            <h2 className="pt-5 font-display text-display-sm font-semibold md:text-display">
              {home.engineering.intro}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold tracking-wide text-brand">
              {home.engineering.offerHeading}
            </p>
            <ul className="flex flex-col divide-y divide-white/10 pt-2">
              {home.engineering.offers.map((offer, i) => (
                <li key={i} className="flex items-center gap-4 py-4">
                  <span aria-hidden className="size-2 shrink-0 rounded-[2px] bg-brand" />
                  <span className="leading-relaxed text-white/85">{offer}</span>
                </li>
              ))}
            </ul>
            <p className="pt-6 leading-relaxed text-white/60">{home.engineering.closing}</p>
          </Reveal>
        </Container>
      </section>

      {/* Partner proof */}
      <section>
        <Container className="py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <Eyebrow>{home.partners.heading}</Eyebrow>
            <p className="pt-5 leading-relaxed text-ink-soft">{home.partners.intro}</p>
          </Reveal>
          <div className="pt-12">
            <LogoMarquee logos={home.partners.logos} />
          </div>
        </Container>
      </section>

      <ContactCta common={common} withMap />
    </main>
  );
}
