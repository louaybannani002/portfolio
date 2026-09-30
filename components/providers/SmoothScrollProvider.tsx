"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { prefersReducedMotion, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  /** Scroll to "#id" / "id" / "#top", offset by the navbar height. */
  scrollTo: (target: string, opts?: { immediate?: boolean }) => void;
  /** Lock/unlock page scroll (e.g. while the mobile menu is open). */
  setLocked: (locked: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  setLocked: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

function navOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
  return parseFloat(v) || 0;
}

/**
 * App-wide Lenis smooth scrolling + in-page anchor handling.
 * With prefers-reduced-motion, Lenis is not created and anchors jump instantly.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Read the media query directly: on the first commit the hook still holds the SSR default
    if (reduceMotion || prefersReducedMotion()) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true });
    lenisRef.current = instance;
    setLenis(instance);
    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduceMotion]);

  // Idempotent: Lenis.start() resets any running scroll animation, so only call it when stopped
  const setLocked = useCallback((locked: boolean) => {
    const instance = lenisRef.current;
    if (instance) {
      if (locked && !instance.isStopped) instance.stop();
      if (!locked && instance.isStopped) instance.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const scrollTo = useCallback(
    (target: string, opts?: { immediate?: boolean }) => {
      const id = target.replace(/^#/, "");
      const el = id && id !== "top" ? document.getElementById(id) : null;
      if (id && id !== "top" && !el) return;

      // Unlock first (e.g. link clicked inside the open mobile menu)
      setLocked(false);

      // Render all content-visibility sections so positions use real heights (see .cv-auto)
      document.documentElement.classList.add("cv-visible");

      // Absolute position minus navbar height (don't rely on scroll-margin-top: Lenis adds it too)
      const top = el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - navOffset()) : 0;
      const instance = lenisRef.current;
      if (instance) {
        instance.scrollTo(top, { immediate: opts?.immediate, duration: 1.2 });
      } else {
        window.scrollTo({ top, behavior: "auto" });
      }
    },
    [setLocked],
  );

  // Intercept same-page anchor clicks: <a href="#section">
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href")!;
      const id = hash.slice(1);
      if (id && id !== "top" && !document.getElementById(id)) return;
      e.preventDefault();
      scrollTo(hash);
      history.pushState(null, "", id && id !== "top" ? hash : window.location.pathname);

      // Move keyboard focus to the target like a native anchor jump would
      const target = id && id !== "top" ? document.getElementById(id) : document.body;
      if (target) {
        if (!target.hasAttribute("tabindex") && target !== document.body) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  // Deep link on first load: /#projects → land at the right offset
  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => scrollTo(window.location.hash, { immediate: true }));
    }
  }, [scrollTo, lenis]);

  const value = useMemo(() => ({ lenis, scrollTo, setLocked }), [lenis, scrollTo, setLocked]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
