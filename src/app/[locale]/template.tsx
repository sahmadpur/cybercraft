"use client";

import { m, useReducedMotion } from "motion/react";

/**
 * Remounts on every route change, giving each page a consistent entrance.
 * True cross-route exit animations are deliberately out of scope (App Router
 * unmounts the old tree first); this entrance is the pragmatic alternative.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <m.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
