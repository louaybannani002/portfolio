"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

/** reducedMotion="user": motion drops transform/layout animations when the OS asks for it. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
