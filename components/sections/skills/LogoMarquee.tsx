import type { CSSProperties } from "react";
import { skills } from "@/data/portfolio";
import { getTechIcon } from "@/lib/techIcons";

// Unique technologies that have a logo, in data order
const logos = [...new Set(skills.flatMap((c) => c.skills))].filter((name) => getTechIcon(name));
const half = Math.ceil(logos.length / 2);
const rows = [logos.slice(0, half), logos.slice(half)];

function Row({ items, reverse, duration }: { items: string[]; reverse: boolean; duration: number }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="marquee-track group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {/* Content is doubled so translateX(-50%) loops seamlessly; spacing is padding, not gap */}
        {[...items, ...items].map((name, i) => {
          const Icon = getTechIcon(name)!;
          return (
            <span key={`${name}-${i}`} className="shrink-0 pr-3">
              <span className="glass inline-flex items-center gap-2.5 rounded-pill px-4 py-2 text-sm whitespace-nowrap text-muted">
                <Icon className="h-4 w-4 text-foreground/80" />
                {name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Two rows of technology logos scrolling in opposite directions; hovering pauses both. */
export function LogoMarquee() {
  if (!logos.length) return null;
  return (
    // Decorative duplicate of the skill cards below, so hidden from assistive tech
    <div aria-hidden className="group/marquee -mx-gutter flex flex-col gap-3 sm:mx-0">
      <Row items={rows[0]} reverse={false} duration={45} />
      {rows[1].length > 0 && <Row items={rows[1]} reverse duration={50} />}
    </div>
  );
}
