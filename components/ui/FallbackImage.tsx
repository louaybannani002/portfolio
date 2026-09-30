"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { PUBLIC_IMAGES } from "@/lib/assets.generated";

/** Local paths not present in public/ at build time are known-missing: don't request them. */
const exists = (src: string) => !!src && (!src.startsWith("/") || PUBLIC_IMAGES.has(src));

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Above-the-fold image (LCP): load eagerly with high priority instead of lazily. */
  priority?: boolean;
  /** Rendered instead of the <img> when src is empty or fails to load. */
  fallback: ReactNode;
}

/**
 * Plain <img> (static export → images.unoptimized) that never shows a broken image.
 * Also catches errors that fire before hydration via the complete/naturalWidth check.
 */
export function FallbackImage({ src, alt, className, style, priority = false, fallback }: FallbackImageProps) {
  const [failed, setFailed] = useState(!exists(src));
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(!exists(src));
  }, [src]);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
