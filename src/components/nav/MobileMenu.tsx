"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { drawerPanel, fade, staggerContainer, fadeUp } from "@/components/motion/variants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { MenuService } from "./MegaMenu";
import type { CommonContent } from "@/content/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  common: CommonContent;
  services: MenuService[];
}

export function MobileMenu({ open, onClose, common, services }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Collapse the services accordion whenever the drawer closes
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) setServicesOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <m.div
            variants={drawerPanel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
            aria-label={common.menuLabel}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-line bg-surface px-6 pb-10 pt-5 lg:hidden"
          >
            <div className="flex items-center justify-between pb-8">
              <LanguageSwitcher label={common.languageSwitcherLabel} />
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-navy"
                aria-label={common.closeLabel}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <m.nav
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              <m.div variants={fadeUp}>
                <Link
                  href="/vendors"
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-display text-xl font-medium text-navy transition-colors hover:bg-brand-soft"
                >
                  {common.nav.vendors}
                </Link>
              </m.div>
              <m.div variants={fadeUp}>
                <Link
                  href="/partners"
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-display text-xl font-medium text-navy transition-colors hover:bg-brand-soft"
                >
                  {common.nav.partners}
                </Link>
              </m.div>
              <m.div variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-display text-xl font-medium text-navy transition-colors hover:bg-brand-soft"
                >
                  {common.nav.productSolutions}
                  <span
                    aria-hidden
                    className={`text-brand-dark transition-transform duration-300 ${servicesOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <m.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-l border-line"
                    >
                      <li>
                        <Link
                          href="/product-solutions"
                          onClick={onClose}
                          className="block px-5 py-2 text-sm font-semibold text-navy underline decoration-brand decoration-2 underline-offset-4"
                        >
                          {common.cta.explore}
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={{ pathname: "/[service]", params: { service: s.slug } }}
                            onClick={onClose}
                            className="block px-5 py-2 text-sm text-ink-soft transition-colors hover:text-navy"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </m.ul>
                  )}
                </AnimatePresence>
              </m.div>
              <m.div variants={fadeUp}>
                <Link
                  href="/contact-us"
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-display text-xl font-medium text-navy transition-colors hover:bg-brand-soft"
                >
                  {common.nav.contactUs}
                </Link>
              </m.div>
            </m.nav>

            <div className="mt-auto pt-10 text-sm text-ink-muted">
              <p>{common.contact.email}</p>
              <p className="pt-1">{common.contact.phone}</p>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
