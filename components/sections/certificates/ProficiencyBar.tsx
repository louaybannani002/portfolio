"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { EASE_OUT } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Gradient bar that fills to value/max when scrolled into view.
 * With reduced motion it is filled immediately, whether or not it was ever scrolled into view.
 * (A single always-mounted element with a reactive target, so the post-hydration switch
 * to reduced motion reliably updates it.)
 */
export function ProficiencyBar({ value, max = 5, delay = 0 }: { value: number; max?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduce = usePrefersReducedMotion();
  const fill = Math.max(0, Math.min(1, value / max));
  const show = reduce || inView;

  return (
    <div ref={ref} aria-hidden className="h-1.5 overflow-hidden rounded-pill bg-white/[0.06]">
      <motion.div
        className="bg-accent-gradient h-full origin-left rounded-pill"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: show ? fill : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE_OUT, delay }}
      />
    </div>
  );
}
