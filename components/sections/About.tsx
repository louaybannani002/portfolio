import { GraduationCap, Languages, MapPin, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, identity, languages, stats, summary, summaryHighlights } from "@/data/portfolio";
import { highlightPhrases } from "@/lib/highlight";
import { PhotoFrame } from "./about/PhotoFrame";

interface Chip {
  icon: LucideIcon;
  label: string;
}

const edu = education[0];
const chips: Chip[] = [
  { icon: MapPin, label: identity.location },
  ...(edu ? [{ icon: GraduationCap, label: `${edu.shortDegree} (${edu.shortName})` }] : []),
  ...languages.map((l) => ({ icon: Languages, label: `${l.language} · ${l.level}` })),
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-content px-gutter py-section"
    >
      <SectionHeading section="about" />

      <div className="grid items-center gap-14 lg:items-start lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal y={40}>
          <PhotoFrame />
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <p className="text-lg leading-relaxed text-pretty text-muted sm:text-xl sm:leading-relaxed">
              {highlightPhrases(summary, summaryHighlights)}
            </p>
          </Reveal>

          {stats.length > 0 && (
            <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass group relative h-full overflow-hidden rounded-card p-5 transition-colors duration-300 hover:border-border-strong sm:p-6"
                >
                  <div
                    aria-hidden
                    className="bg-accent-gradient absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  />
                  <CountUp
                    value={stat.value}
                    className="block font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
                  />
                  <span className="mt-2 block text-sm text-muted">{stat.label}</span>
                </div>
              ))}
            </Reveal>
          )}

          <Reveal as="ul" stagger={0.05} className="mt-8 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="glass inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-sm text-muted"
              >
                <Icon aria-hidden className="h-3.5 w-3.5 text-accent" />
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
