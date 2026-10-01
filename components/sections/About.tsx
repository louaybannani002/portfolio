import { GraduationCap, Languages, MapPin, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, identity, languages, summary, summaryHighlights } from "@/data/portfolio";
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
      className="mx-auto max-w-content px-gutter py-section cv-auto"
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

          <Reveal as="ul" stagger={0.05} className="mt-10 flex flex-wrap gap-2">
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
