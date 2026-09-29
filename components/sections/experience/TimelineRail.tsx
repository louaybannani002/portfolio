"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Vertical timeline container. The rail sits at x = var(--tl-x) and draws itself
 * (scaleY) as the timeline scrolls through the viewport, with a glowing tip.
 * With reduced motion the rail is drawn fully and statically.
 */
export function TimelineRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative [--tl-x:11px] md:[--tl-x:12rem] ${className}`}>
      <div aria-hidden className="absolute inset-y-0 left-[var(--tl-x)] w-px -translate-x-1/2 bg-border">
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent-2 to-accent"
          style={{ scaleY: reduce ? 1 : progress }}
        />
        {!reduce && (
          <motion.div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_16px_4px_rgb(139_92_246/0.6)]"
            style={{ top: tipTop, opacity: tipOpacity }}
          />
        )}
      </div>
      {children}
    </div>
  );
}
