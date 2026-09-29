"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type AnchorHTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Variant = "primary" | "secondary";

interface MagneticButtonProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** 0–1: how far the button follows the pointer. */
  strength?: number;
}

const VARIANTS: Record<Variant, string> = {
  primary: "text-white shadow-[0_8px_30px_-8px_rgb(139_92_246/0.6)]",
  secondary: "glass text-foreground hover:border-border-strong",
};

/** Link-button that is pulled toward the pointer (fine pointers only, off with reduced motion). */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  strength = 0.35,
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-6 py-3.5 text-sm font-medium transition-[border-color,box-shadow] duration-300 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {variant === "primary" && (
        <>
          <span aria-hidden className="bg-accent-gradient absolute inset-0" />
          <span
            aria-hidden
            className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10"
          />
        </>
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
