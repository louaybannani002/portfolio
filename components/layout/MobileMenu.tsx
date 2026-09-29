"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import { CV_PATH, identity } from "@/data/portfolio";
import { downloadCvLabel, navLinks } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const panel: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.55, ease: EASE, when: "beforeChildren", staggerChildren: 0.05 },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.45, ease: EASE, when: "afterChildren", staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

interface MobileMenuProps {
  active: string | null;
  onClose: (restoreFocus?: boolean) => void;
}

/** Full-screen mobile navigation. Scroll lock is handled by Navbar via SmoothScrollProvider. */
export function MobileMenu({ active, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-lenis-prevent
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 px-gutter pt-[calc(var(--nav-height)+2rem)] pb-10 backdrop-blur-2xl md:hidden"
    >
      <div
        aria-hidden
        className="bg-accent-gradient pointer-events-none absolute -top-32 right-[-20%] h-72 w-72 rounded-full opacity-20 blur-3xl"
      />

      <nav aria-label="Mobile" className="relative">
        <ul className="flex flex-col">
          {navLinks.map((link, i) => (
            <motion.li key={link.id} variants={item} className="border-b border-border">
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${link.id}`}
                onClick={() => onClose()}
                aria-current={active === link.id ? "location" : undefined}
                className="group flex items-baseline gap-4 py-4"
              >
                <span className="label-mono text-subtle">{link.index}</span>
                <span
                  className={`font-display text-4xl font-medium tracking-tight transition-colors ${
                    active === link.id ? "text-gradient" : "text-foreground group-hover:text-muted"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div variants={item} className="relative mt-auto flex flex-col gap-4 pt-10">
        <a
          href={CV_PATH}
          download="Louay_Bannani_CV.pdf"
          className="bg-accent-gradient inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3.5 font-medium text-white"
        >
          <Download aria-hidden className="h-4 w-4" />
          {downloadCvLabel}
        </a>
        <a
          href={`mailto:${identity.email}`}
          className="label-mono inline-flex items-center justify-center gap-1.5 text-muted normal-case tracking-normal"
        >
          {identity.email}
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </motion.div>
  );
}
