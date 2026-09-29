"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Mouse-shaped scroll cue linking to the next section. */
export function ScrollIndicator({ href, label }: { href: string; label: string }) {
  const reduce = usePrefersReducedMotion();

  return (
    <a
      href={href}
      aria-label={label}
      className="group flex flex-col items-center gap-3 text-subtle transition-colors hover:text-muted"
    >
      <span className="flex h-9 w-[22px] justify-center rounded-full border border-border-strong pt-2 transition-colors group-hover:border-muted">
        <motion.span
          className="block h-1.5 w-1 rounded-full bg-foreground/80"
          animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="label-mono text-[0.65rem]">{label}</span>
    </a>
  );
}
