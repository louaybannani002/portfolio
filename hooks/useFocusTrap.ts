"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab cycling inside `ref` while `active` (modal dialogs).
 * `extraSelector` adds controls that live outside the container but belong to the dialog
 * (e.g. the navbar's menu toggle), placed first in the cycle.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, extraSelector?: string) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !ref.current) return;
      const extra = extraSelector ? [...document.querySelectorAll<HTMLElement>(extraSelector)] : [];
      const items = [...extra, ...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = items.includes(document.activeElement as HTMLElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ref, active, extraSelector]);
}
