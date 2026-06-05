"use client";

import { m, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, { root: string; chip: string }> = {
  solid: {
    root: "bg-navy text-white hover:bg-navy/90",
    chip: "bg-brand text-navy",
  },
  outline: {
    root: "border border-line-strong text-ink hover:border-navy",
    chip: "bg-brand-soft text-navy group-hover:bg-brand",
  },
  ghost: {
    root: "text-ink hover:text-navy",
    chip: "bg-brand-soft text-navy group-hover:bg-brand",
  },
};

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ArrowButtonOwnProps {
  label: string;
  variant?: Variant;
  size?: "md" | "lg";
}

function Inner({
  label,
  variant = "solid",
  size = "md",
}: ArrowButtonOwnProps) {
  const reduced = useReducedMotion();
  const s = styles[variant];

  return (
    <>
      <span>{label}</span>
      <span
        className={`grid place-items-center rounded-md transition-colors duration-300 ${s.chip} ${
          size === "lg" ? "size-8" : "size-7"
        }`}
      >
        <m.span
          className="grid place-items-center"
          variants={
            reduced
              ? undefined
              : {
                  rest: { x: 0 },
                  hover: {
                    x: [0, 14, -14, 0],
                    transition: {
                      duration: 0.4,
                      times: [0, 0.5, 0.5, 1],
                      ease: "easeInOut",
                    },
                  },
                }
          }
        >
          <ArrowIcon />
        </m.span>
      </span>
    </>
  );
}

const rootClasses = (variant: Variant, size: "md" | "lg") =>
  `group inline-flex w-fit cursor-pointer items-center gap-3 rounded-lg font-medium transition-colors duration-300 ${
    styles[variant].root
  } ${size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"}`;

type LinkHref = ComponentProps<typeof Link>["href"];

/** Signature action: label + green accent square with a fly-through arrow */
export function ArrowLink({
  href,
  label,
  variant = "solid",
  size = "md",
  className = "",
}: ArrowButtonOwnProps & { href: LinkHref; className?: string }) {
  return (
    <m.span initial="rest" whileHover="hover" className="inline-flex">
      <Link href={href} className={`${rootClasses(variant, size)} ${className}`}>
        <Inner label={label} variant={variant} size={size} />
      </Link>
    </m.span>
  );
}

export function ArrowButton({
  label,
  variant = "solid",
  size = "md",
  type = "submit",
  disabled = false,
  className = "",
}: ArrowButtonOwnProps & {
  type?: "submit" | "button";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <m.button
      type={type}
      disabled={disabled}
      initial="rest"
      whileHover="hover"
      className={`${rootClasses(variant, size)} disabled:cursor-default disabled:opacity-60 ${className}`}
    >
      <Inner label={label} variant={variant} size={size} />
    </m.button>
  );
}
