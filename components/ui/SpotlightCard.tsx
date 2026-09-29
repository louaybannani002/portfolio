"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Max tilt in degrees (0 disables tilt). */
  maxTilt?: number;
}

/**
 * Card with a glowing border + inner spotlight that follow the cursor, and a subtle 3D tilt.
 * Children can use `group-hover/card:` for hover effects (e.g. image zoom).
 * Tilt is off on touch devices and with reduced motion; the glow stays (it isn't motion).
 */
export function SpotlightCard({ children, className = "", innerClassName = "", maxTilt = 5 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const tilt = fine && !reduce && maxTilt > 0;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      ry.set((x / r.width - 0.5) * maxTilt * 2);
      rx.set(-(y / r.height - 0.5) * maxTilt * 2);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group/card relative h-full rounded-card p-px [--mx:50%] [--my:0%] ${className}`}
    >
      {/* Base border */}
      <div aria-hidden className="absolute inset-0 rounded-card bg-border" />
      {/* Cursor-following glowing border */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgb(139 92 246 / 0.75), rgb(59 130 246 / 0.35) 35%, transparent 65%)",
        }}
      />
      <div
        className={`relative h-full overflow-hidden rounded-[calc(var(--radius-card)-1px)] bg-surface ${innerClassName}`}
      >
        {/* Inner spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: "radial-gradient(600px circle at var(--mx) var(--my), rgb(139 92 246 / 0.07), transparent 45%)",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}
