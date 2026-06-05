"use client";

import { m, useReducedMotion } from "motion/react";
import { fade, fadeUp, scaleIn, staggerContainer } from "./variants";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between children */
  stagger?: number;
  delay?: number;
  /** Animate on scroll into view (default) or on mount */
  onMount?: boolean;
  as?: "div" | "ul" | "section";
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  onMount = false,
  as = "div",
}: StaggerGroupProps) {
  const Tag = m[as];
  const trigger = onMount
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: { once: true, margin: "0px 0px -80px 0px" },
      };

  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      {...trigger}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  kind?: "fadeUp" | "scaleIn";
  as?: "div" | "li" | "span";
}

export function StaggerItem({
  children,
  className,
  kind = "fadeUp",
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Tag = m[as];
  const variants = reduced ? fade : kind === "scaleIn" ? scaleIn : fadeUp;

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
