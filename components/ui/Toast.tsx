"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  /** Message to show; null hides the toast. */
  message: ReactNode | null;
  icon?: ReactNode;
}

/**
 * Small bottom-center notification, announced politely to screen readers.
 * Portaled to <body> so transformed ancestors can't break position: fixed.
 */
export function Toast({ message, icon }: ToastProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="glass inline-flex items-center gap-2 rounded-pill bg-elevated/90 px-4 py-2.5 text-sm text-foreground shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)]"
          >
            {icon}
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
