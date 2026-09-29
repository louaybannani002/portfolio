"use client";

import { Download } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CV_PATH } from "@/data/portfolio";
import { downloadCvLabel, navLinks } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SectionLink } from "./SectionLink";

const SECTION_IDS = navLinks.map((l) => l.id);

export function Navbar() {
  const { scrollY } = useScroll();
  const { setLocked } = useSmoothScroll();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 16);
    if (menuOpen) return;
    if (y > prev && y > 160) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  useEffect(() => {
    setLocked(menuOpen);
    if (menuOpen) setHidden(false);
  }, [menuOpen, setLocked]);

  // Close the mobile menu when resizing up to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
            scrolled || menuOpen
              ? "border-border bg-background/60 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex h-nav max-w-content items-center justify-between px-gutter"
          >
            <Logo onClick={() => closeMenu()} />

            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id} className="relative">
                    <SectionLink
                      section={link.id}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-pill px-3.5 py-2 text-sm transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-pill border border-border-strong bg-white/[0.06]"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      {link.label}
                    </SectionLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={CV_PATH}
                download="Louay_Bannani_CV.pdf"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-pill px-4 py-2 text-sm font-medium text-white sm:inline-flex"
              >
                <span aria-hidden className="bg-accent-gradient absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100" />
                <Download aria-hidden className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="relative">{downloadCvLabel}</span>
              </a>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="glass relative flex h-10 w-10 items-center justify-center rounded-pill md:hidden"
              >
                <motion.span
                  aria-hidden
                  className="absolute h-[1.5px] w-4 rounded-full bg-foreground"
                  initial={false}
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  aria-hidden
                  className="absolute h-[1.5px] w-4 rounded-full bg-foreground"
                  initial={false}
                  animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu active={active} onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}
