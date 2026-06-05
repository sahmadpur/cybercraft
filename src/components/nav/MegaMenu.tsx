"use client";

import { AnimatePresence, m } from "motion/react";
import { Link } from "@/i18n/navigation";
import { menuPanel, staggerContainer, fade } from "@/components/motion/variants";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export interface MenuService {
  id: string;
  slug: string;
  title: string;
}

interface MegaMenuProps {
  open: boolean;
  services: MenuService[];
  heading: string;
  exploreLabel: string;
  onNavigate: () => void;
}

/** Animated Product & Solutions panel — replaces the heavy WP mega-menu */
export function MegaMenu({
  open,
  services,
  heading,
  exploreLabel,
  onNavigate,
}: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mega-menu"
          variants={menuPanel}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-[0_24px_48px_-32px_rgba(0,5,68,0.25)]"
        >
          <Container className="py-8">
            <div className="flex items-baseline justify-between gap-6 pb-5">
              <Eyebrow>{heading}</Eyebrow>
              <Link
                href="/product-solutions"
                onClick={onNavigate}
                className="text-sm font-medium text-navy underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-dark"
              >
                {exploreLabel}
              </Link>
            </div>
            <m.ul
              variants={staggerContainer(0.02, 0.05)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-x-10 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => (
                <m.li key={service.id} variants={fade}>
                  <Link
                    href={{
                      pathname: "/[service]",
                      params: { service: service.slug },
                    }}
                    onClick={onNavigate}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-soft transition-colors duration-200 hover:bg-brand-soft hover:text-navy"
                  >
                    <span>{service.title}</span>
                    <span
                      aria-hidden
                      className="translate-x-1 text-brand-dark opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
}
