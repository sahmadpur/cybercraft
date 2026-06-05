import { Container } from "@/components/layout/Container";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { StaggerText } from "@/components/motion/StaggerText";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

/** Editorial page opener: eyebrow, oversized staggered title, optional intro */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(circle,var(--color-line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <Container className="relative pb-14 pt-16 sm:pb-16 sm:pt-24">
        {eyebrow && (
          <StaggerGroup onMount stagger={0}>
            <StaggerItem>
              <Eyebrow className="pb-5">{eyebrow}</Eyebrow>
            </StaggerItem>
          </StaggerGroup>
        )}
        <StaggerText
          text={title}
          as="h1"
          delay={0.1}
          className="max-w-4xl font-display text-display-sm font-semibold text-navy md:text-display lg:text-display-lg"
        />
        {intro && (
          <StaggerGroup onMount stagger={0} delay={0.45}>
            <StaggerItem>
              <p className="max-w-2xl pt-6 leading-relaxed text-ink-soft">{intro}</p>
            </StaggerItem>
          </StaggerGroup>
        )}
        {children}
      </Container>
    </section>
  );
}
