import type { CSSProperties } from "react";

interface AnimatedNameProps {
  name: string;
  /** Seconds before the first letter starts. */
  delay?: number;
  className?: string;
}

/**
 * <h1> revealed letter by letter (rise + unblur). Pure CSS (`.hero-letter` in globals.css) so the
 * LCP text starts animating at first paint rather than after hydration.
 * Screen readers get the plain name.
 */
export function AnimatedName({ name, delay = 0, className = "" }: AnimatedNameProps) {
  const words = name.split(" ");
  let index = 0;

  return (
    <h1 aria-label={name} className={className}>
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char, i) => {
            const d = delay + index++ * 0.03;
            return (
              <span key={i} className="hero-letter" style={{ "--d": `${d.toFixed(2)}s` } as CSSProperties}>
                {char}
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}
