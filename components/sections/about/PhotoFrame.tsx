"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { ProfileImage } from "@/components/ui/ProfileAvatar";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MAX_TILT = 8; // degrees

/**
 * Profile photo in an animated gradient border, floating gently and tilting toward the pointer.
 * Float + tilt are off with reduced motion; tilt is off on touch devices.
 */
export function PhotoFrame({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  const fine = useFinePointer();
  const tiltEnabled = fine && !reduce;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * MAX_TILT * 2);
    rx.set(-py * MAX_TILT * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={`relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:mt-2 [perspective:1000px] ${className}`}>
      <motion.div
        animate={reduce ? { y: 0 } : { y: [0, -12, 0] }}
        transition={reduce ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={reset}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <div
            aria-hidden
            className="bg-accent-gradient absolute -inset-6 -z-10 rounded-[2.5rem] opacity-25 blur-3xl"
          />
          <div className="gradient-border rounded-card p-[2px] shadow-[0_30px_80px_-30px_rgb(59_130_246/0.45)]">
            <ProfileImage
              className="aspect-[4/5] w-full rounded-[calc(var(--radius-card)-2px)]"
              initialsClassName="text-8xl"
            />
          </div>
          {/* Soft sheen that follows the tilt */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[2px] rounded-[calc(var(--radius-card)-2px)] bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08]"
            style={{ transform: "translateZ(20px)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
