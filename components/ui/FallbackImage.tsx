"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Rendered instead of the <img> when src is empty or fails to load. */
  fallback: ReactNode;
}

/**
 * Plain <img> (static export → images.unoptimized) that never shows a broken image.
 * Also catches errors that fire before hydration via the complete/naturalWidth check.
 */
export function FallbackImage({ src, alt, className, fallback }: FallbackImageProps) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(!src);
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
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
