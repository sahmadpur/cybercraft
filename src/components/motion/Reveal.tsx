"use client";

import { m, useReducedMotion } from "motion/react";
import { fade, fadeUp } from "./variants";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/** Scroll-triggered reveal. Falls back to a plain fade for reduced motion. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = m[as];

  return (
    <Tag
      className={className}
      variants={reduced ? fade : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}
