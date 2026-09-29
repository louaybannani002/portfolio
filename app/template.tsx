"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// The first page load renders immediately (no hidden SSR content, no LCP delay);
// only client-side navigations get the enter transition.
let hasMounted = false;

/** Page transition: templates re-mount on every navigation, so each new page fades/slides in. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const animateIn = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: reduce ? 0 : 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      // Next scrolls to a hash (e.g. "/#about") while the page is still offset by the enter
      // transition; re-align once it settles so the section lands exactly below the navbar.
      onAnimationComplete={() => {
        if (animateIn && window.location.hash) scrollTo(window.location.hash, { immediate: true });
      }}
    >
      {children}
    </motion.div>
  );
}
