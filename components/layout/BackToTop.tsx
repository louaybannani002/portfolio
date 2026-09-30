"use client";

import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function BackToTop({ label }: { label: string }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <button
      type="button"
      onClick={() => {
        scrollTo("#top");
        document.body.focus({ preventScroll: true });
      }}
      className="group glass inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
    >
      {label}
      <ArrowUp aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
