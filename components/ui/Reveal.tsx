"use client";

import { motion, type Variants } from "motion/react";
import { Children, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealTag = "div" | "section" | "article" | "header" | "footer" | "ul" | "ol" | "p" | "span";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  /** Seconds before the animation starts. */
  delay?: number;
  /**
   * Stagger direct children (each is wrapped in its own animated element; <li> inside ul/ol).
   * `true` = 0.08s between children, or pass seconds.
   */
  stagger?: boolean | number;
  /** className for each wrapped child when staggering. */
  itemClassName?: string;
  /** Per-child classNames (by index), appended to itemClassName — e.g. grid column spans. */
  itemClassNames?: string[];
  /** Slide distance in px. */
  y?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
}

function itemVariants(reduce: boolean, y: number, delay = 0): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 0, y: 0, filter: "blur(0px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3, delay } },
    };
  }
  return {
    hidden: { opacity: 0, y, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT, delay },
    },
  };
}

/**
 * Fade + slide up + slight blur when scrolled into view (once).
 * With prefers-reduced-motion: a short opacity fade only.
 *
 *   <Reveal>…</Reveal>
 *   <Reveal as="ul" stagger className="grid gap-4">{items.map(i => <Card key=… />)}</Reveal>
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  stagger,
  itemClassName,
  itemClassNames,
  y = 24,
  amount = 0.2,
}: RevealProps) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as];
  const viewport = { once: true, amount, margin: "0px 0px -8% 0px" };

  if (!stagger) {
    return (
      <Tag
        className={className}
        variants={itemVariants(reduce, y, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {children}
      </Tag>
    );
  }

  const gap = typeof stagger === "number" ? stagger : 0.08;
  const Item = as === "ul" || as === "ol" ? motion.li : motion.div;
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: delay } },
  };

  return (
    <Tag className={className} variants={container} initial="hidden" whileInView="visible" viewport={viewport}>
      {Children.toArray(children).map((child, i) => (
        <Item
          key={i}
          className={[itemClassName, itemClassNames?.[i]].filter(Boolean).join(" ") || undefined}
          variants={itemVariants(reduce, y)}
        >
          {child}
        </Item>
      ))}
    </Tag>
  );
}
