"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  /** e.g. "21", "93%", "$1.5M" — the numeric part is animated, prefix/suffix kept. */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to the value when scrolled into view (once).
 * SSR/no-JS and reduced motion render the final value; screen readers always get the final value.
 */
export function CountUp({ value, duration = 1.8, className = "" }: CountUpProps) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(match ? match[2] : value);

  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].split(".")[1]?.length ?? 0;

  useEffect(() => {
    if (!match || prefersReducedMotion()) return;
    if (!inView) {
      setDisplay((0).toFixed(decimals));
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, decimals, duration]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden>
        {match[1]}
        {display}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
