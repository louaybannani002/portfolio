"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT } from "@/components/ui/Reveal";

interface RotatingRoleProps {
  roles: string[];
  interval?: number;
  className?: string;
}

/**
 * Cycles through roles with a vertical slide (crossfade with reduced motion).
 * One role → static text. Screen readers get all roles once, not every change.
 */
export function RotatingRole({ roles, interval = 2800, className = "" }: RotatingRoleProps) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const multiple = roles.length > 1;

  useEffect(() => {
    if (!multiple) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    return () => window.clearInterval(id);
  }, [multiple, roles.length, interval]);

  if (!roles.length) return null;

  const caret = (
    <span
      aria-hidden
      className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-pulse bg-accent-2"
    />
  );

  if (!multiple) {
    return (
      <p className={className}>
        <span className="text-gradient">{roles[0]}</span>
        {caret}
      </p>
    );
  }

  return (
    <p className={className}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-grid overflow-hidden align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="text-gradient col-start-1 row-start-1 whitespace-nowrap"
            initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      {caret}
    </p>
  );
}
