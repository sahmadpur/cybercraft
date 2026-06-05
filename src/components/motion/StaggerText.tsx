"use client";

import { m, useReducedMotion } from "motion/react";
import { fade, maskWord, staggerContainer } from "./variants";

interface StaggerTextProps {
  text: string;
  className?: string;
  /** Seconds before the first word reveals */
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}

/**
 * Word-by-word mask reveal for hero headlines. Splitting on spaces is
 * deterministic, so server and client markup always match.
 */
export function StaggerText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: StaggerTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <m.div variants={fade} initial="hidden" animate="visible">
        <Tag className={className}>{text}</Tag>
      </m.div>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      <m.span
        aria-hidden
        className="inline"
        variants={staggerContainer(0.055, delay)}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          >
            <m.span className="inline-block" variants={maskWord}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
