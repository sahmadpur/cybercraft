import { ArrowLink } from "@/components/buttons/ArrowButton";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import type { CommonContent } from "@/content/types";

interface ContactCtaProps {
  common: CommonContent;
  /** Show the embedded map block (used on Home and Contact) */
  withMap?: boolean;
}

export function ContactCta({ common, withMap = false }: ContactCtaProps) {
  const c = common.contact;

  return (
    <section id="contact" className="border-t border-line bg-surface-alt">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow>{common.nav.contactUs}</Eyebrow>
          <h2 className="pt-5 font-display text-display-sm font-medium text-navy md:text-display">
            {c.heading}
          </h2>
          <p className="max-w-md pt-5 leading-relaxed text-ink-soft">{c.body}</p>
          <div className="pt-8">
            <ArrowLink href="/contact-us" label={common.cta.contact} size="lg" />
          </div>
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

          {withMap && (
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                src={c.mapEmbedUrl}
                title={c.addressLabel}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full"
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
          )}
        </Reveal>
      </Container>
    </section>
  );
}
