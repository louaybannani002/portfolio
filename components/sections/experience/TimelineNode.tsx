"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TimelineNodeProps {
  /** Icon element (education, connector); plain glowing dot when omitted. */
  children?: ReactNode;
  size?: "sm" | "lg";
  className?: string;
}

/** Marker centered on the timeline rail; pops in when scrolled into view. */
export function TimelineNode({ children, size = "lg", className = "" }: TimelineNodeProps) {
  const reduce = usePrefersReducedMotion();
  const dim = children ? (size === "lg" ? "h-10 w-10" : "h-7 w-7") : "h-3.5 w-3.5";

  return (
    <motion.span
      aria-hidden
      initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1, margin: "0px 0px -25% 0px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute left-[var(--tl-x)] z-10 -translate-x-1/2 ${className}`}
    >
      {children ? (
        <span className={`gradient-border flex ${dim} items-center justify-center rounded-full p-px`}>
          <span className="flex h-full w-full items-center justify-center rounded-full bg-background">
            {children}
          </span>
        </span>
      ) : (
        <span className={`relative flex ${dim} items-center justify-center`}>
          <span className="absolute inset-0 rounded-full bg-accent/30 blur-[6px]" />
          <span className="relative h-full w-full rounded-full border-2 border-accent bg-background" />
          <span className="absolute h-1.5 w-1.5 rounded-full bg-accent-2" />
        </span>
      )}
    </motion.span>
  );
}
