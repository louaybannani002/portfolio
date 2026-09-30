"use client";

import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { projectLabels } from "@/data/site";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface GalleryProps {
  images: string[];
  title: string;
}

function MissingImage() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface text-subtle">
      <ImageIcon aria-hidden className="h-8 w-8" />
    </div>
  );
}

const SWIPE_THRESHOLD = 80;

/** Thumbnail grid + lightbox (←/→/Esc, swipe, focus return). Empty → "coming soon" block. */
export function Gallery({ images, title }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const { setLocked } = useSmoothScroll();
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef(0);
  const count = images.length;
  const open = index !== null;
  useFocusTrap(dialogRef, open);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i === null ? i : (i + delta + count) % count));
    },
    [count],
  );

  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (!open) return;
    const thumbs = thumbRefs.current;
    setLocked(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setLocked(false);
      thumbs[lastIndex.current]?.focus({ preventScroll: true });
    };
  }, [open, close, go, setLocked]);

  useEffect(() => {
    if (index !== null) lastIndex.current = index;
  }, [index]);

  if (!count) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border px-6 py-14 text-center">
        <ImageIcon aria-hidden className="h-6 w-6 text-subtle" />
        <p className="label-mono text-subtle">{projectLabels.galleryEmpty}</p>
      </div>
    );
  }

  const alt = (i: number) => `${title} — screenshot ${i + 1} of ${count}`;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) go(-1);
  };

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <li key={src}>
            <button
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                setDirection(0);
                setIndex(i);
              }}
              aria-label={`Open ${alt(i)}`}
              className="group block aspect-video w-full overflow-hidden rounded-card border border-border transition-colors hover:border-border-strong"
            >
              <FallbackImage
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallback={<MissingImage />}
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Portal: ancestors with transform/filter (Reveal, page transition) would break position: fixed */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={alt(index)}
                data-lenis-prevent
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.target === e.currentTarget && close()}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    drag={count > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={onDragEnd}
                    className="flex max-h-[85svh] w-[min(92vw,80rem)] cursor-grab items-center justify-center active:cursor-grabbing"
                  >
                    <FallbackImage
                      src={images[index]}
                      alt={alt(index)}
                      className="pointer-events-none max-h-[85svh] w-auto max-w-full rounded-control object-contain select-none"
                      fallback={
                        <div className="aspect-video w-full overflow-hidden rounded-card">
                          <MissingImage />
                        </div>
                      }
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="glass absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-pill text-foreground"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous image"
                      className="glass absolute left-3 flex h-11 w-11 items-center justify-center rounded-pill text-foreground sm:left-6"
                    >
                      <ChevronLeft aria-hidden className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next image"
                      className="glass absolute right-3 flex h-11 w-11 items-center justify-center rounded-pill text-foreground sm:right-6"
                    >
                      <ChevronRight aria-hidden className="h-5 w-5" />
                    </button>
                  </>
                )}

                <p
                  aria-live="polite"
                  className="label-mono absolute bottom-5 left-1/2 -translate-x-1/2 text-muted"
                >
                  {index + 1} / {count}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
