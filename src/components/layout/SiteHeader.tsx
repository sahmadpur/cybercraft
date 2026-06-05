"use client";

import { m, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { getAsset } from "@/content/assets";
import type { CommonContent } from "@/content/types";
import { Container } from "./Container";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { MegaMenu, type MenuService } from "@/components/nav/MegaMenu";
import { MobileMenu } from "@/components/nav/MobileMenu";

interface SiteHeaderProps {
  common: CommonContent;
  services: MenuService[];
}

export function SiteHeader({ common, services }: SiteHeaderProps) {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const logo = getAsset("logo-main");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (adjust-state-during-render pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Escape + click-outside close for the mega menu
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const navLink =
    "rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-navy";

  return (
    <>
    <m.header
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-30 bg-surface/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-b border-line shadow-[0_8px_24px_-20px_rgba(0,5,68,0.35)]" : ""
      }`}
    >
      <div ref={navRef} className="relative">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" onClick={() => setMegaOpen(false)}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <Link href="/vendors" className={navLink}>
              {common.nav.vendors}
            </Link>
            <Link href="/partners" className={navLink}>
              {common.nav.partners}
            </Link>
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              className={`${navLink} flex cursor-pointer items-center gap-1.5 ${megaOpen ? "text-navy" : ""}`}
            >
              {common.nav.productSolutions}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
                className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
              >
                <path d="m1.5 3.5 3.5 3.5L8.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link href="/contact-us" className={navLink}>
              {common.nav.contactUs}
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher label={common.languageSwitcherLabel} />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid size-10 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-navy lg:hidden"
            aria-label={common.menuLabel}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 5h14M2 9h14M2 13h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </Container>

        <MegaMenu
          open={megaOpen}
          services={services}
          heading={common.nav.productSolutions}
          exploreLabel={common.cta.explore}
          onNavigate={() => setMegaOpen(false)}
        />
      </div>

    </m.header>

    {/* Outside the header: backdrop-blur/transform ancestors would otherwise
        become the containing block for this fixed-position drawer */}
    <MobileMenu
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      common={common}
      services={services}
    />
    </>
  );
}
