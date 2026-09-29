"use client";

import { motion, type Variants } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getNavLink, type SectionId } from "@/data/site";
import { EASE_OUT } from "./Reveal";

interface SectionHeadingProps {
  section: SectionId;
  /** Defaults to the nav label. */
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Mono label ("02 — EXPERIENCE") + title revealed word by word from a mask.
 * The <h2> gets id `${section}-heading` for aria-labelledby on the section.
 */
export function SectionHeading({
  section,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const reduce = usePrefersReducedMotion();
  const link = getNavLink(section);
  const text = title ?? link.label;
  const words = text.split(" ");
  const centered = align === "center";

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 0, y: "0%" }, visible: { opacity: 1, y: "0%", transition: { duration: 0.3 } } }
    : {
        hidden: { y: "110%" },
        visible: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
      };
  const line: Variants = {
    hidden: { scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
  };

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={`mb-12 flex flex-col gap-4 sm:mb-16 ${centered ? "items-center text-center" : ""} ${className}`}
    >
      <motion.p variants={fade} className="label-mono flex items-center gap-3 text-muted">
        <span>
          <span className="text-gradient font-medium">{link.index}</span> — {link.label}
        </span>
        <motion.span
          aria-hidden
          variants={line}
          className="bg-accent-gradient h-px w-10 origin-left"
        />
      </motion.p>

      <h2
        id={`${section}-heading`}
        aria-label={text}
        className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {words.map((w, i) => (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </h2>

      {description && (
        <motion.p
          variants={fade}
          className={`max-w-2xl text-base text-muted sm:text-lg ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
