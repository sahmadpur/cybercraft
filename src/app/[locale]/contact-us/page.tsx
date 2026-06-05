import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { getContent } from "@/content";
import type { Locale } from "@/content/services.registry";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact-us">): Promise<Metadata> {
  const { locale } = await params;
  const { contact } = getContent(locale as Locale);
  return {
    title: contact.seo.title,
    description: contact.seo.description,
    alternates: alternatesFor(locale as Locale, "/contact-us"),
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact-us">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { common } = getContent(locale as Locale);
  const c = common.contact;

  return (
    <main>
      <PageHero
        eyebrow={common.nav.contactUs}
        title={c.heading}
        intro={c.body}
      />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <ContactForm labels={common.form} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface px-6">
            <li className="py-4 text-sm leading-relaxed text-ink-soft">{c.address}</li>
            <li className="py-4">
              <a
                href={`mailto:${c.email}`}
                className="text-sm font-medium text-navy underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark"
              >
                {c.email}
              </a>
            </li>
            <li className="py-4">
              <a href={`tel:${c.phone}`} className="text-sm text-ink-soft hover:text-navy">
                {c.phone}
              </a>
            </li>
          </ul>

          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              src={c.mapEmbedUrl}
              title={c.addressLabel}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full"
            />
            <div className="border-t border-line bg-surface px-5 py-3">
              <a
                href={c.mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-navy underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark"
              >
                {c.mapLinkLabel} ↗
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
