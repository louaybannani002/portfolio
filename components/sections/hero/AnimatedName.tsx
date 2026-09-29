"use client";

import { motion, type Variants } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT } from "@/components/ui/Reveal";

interface AnimatedNameProps {
  name: string;
  delay?: number;
  className?: string;
}

/** <h1> revealed letter by letter (rise + unblur from a mask). Screen readers get the plain name. */
export function AnimatedName({ name, delay = 0, className = "" }: AnimatedNameProps) {
  const reduce = usePrefersReducedMotion();
  const words = name.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.04, delayChildren: delay } },
  };
  const letter: Variants = reduce
    ? {
        hidden: { opacity: 0, y: "0%", filter: "blur(0px)" },
        visible: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: "70%", filter: "blur(10px)" },
        visible: {
          opacity: 1,
          y: "0%",
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE_OUT },
        },
      };

  return (
    <motion.h1
      aria-label={name}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char, i) => (
            <motion.span key={i} variants={letter} className="inline-block will-change-transform">
              {char}
            </motion.span>
          ))}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.h1>
  );
}
