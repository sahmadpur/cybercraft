import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAsset } from "@/content/assets";
import type { CommonContent } from "@/content/types";
import { Container } from "./Container";

export function SiteFooter({ common }: { common: CommonContent }) {
  const logo = getAsset("logo-footer");

  return (
    <footer className="mt-auto border-t border-line bg-surface-alt">
      <Container className="grid gap-12 py-16 md:grid-cols-[1fr_auto_auto] md:gap-20">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-23 w-auto"
            />
          </Link>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm">
          <Link href="/vendors" className="w-fit text-ink-soft transition-colors hover:text-navy">
            {common.nav.vendors}
          </Link>
          <Link href="/partners" className="w-fit text-ink-soft transition-colors hover:text-navy">
            {common.nav.partners}
          </Link>
          <Link href="/product-solutions" className="w-fit text-ink-soft transition-colors hover:text-navy">
            {common.nav.productSolutions}
          </Link>
          <Link href="/contact-us" className="w-fit text-ink-soft transition-colors hover:text-navy">
            {common.nav.contactUs}
          </Link>
        </nav>

        <address className="flex max-w-xs flex-col gap-2.5 text-sm not-italic text-ink-soft">
          <span>{common.contact.address}</span>
          <a
            href={`mailto:${common.contact.email}`}
            className="w-fit font-medium text-navy underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-dark"
          >
            {common.contact.email}
          </a>
          <a
            href={`tel:${common.contact.phone}`}
            className="w-fit transition-colors hover:text-navy"
          >
            {common.contact.phone}
          </a>
        </address>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-ink-muted">
          <p>{common.footer.copyright}</p>
          <p className="inline-flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            cybercraft.az
          </p>
        </Container>
      </div>
    </footer>
  );
}
