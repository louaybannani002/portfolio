import { CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, type Education as EducationEntry } from "@/data/portfolio";

function EducationCard({ edu }: { edu: EducationEntry }) {
  return (
    <article className="glass group relative flex h-full flex-col gap-6 overflow-hidden rounded-card p-6 transition-colors duration-300 hover:border-border-strong sm:flex-row sm:items-start sm:p-8">
      <div
        aria-hidden
        className="bg-accent-gradient pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-[0.08] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
      />
      <span className="gradient-border flex h-14 w-14 shrink-0 items-center justify-center rounded-control p-px">
        <span className="flex h-full w-full items-center justify-center rounded-[calc(var(--radius-control)-1px)] bg-background">
          <GraduationCap aria-hidden className="h-6 w-6 text-foreground" />
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {edu.degree}
        </h3>
        <p className="text-gradient mt-2 text-base font-semibold">{edu.school}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="h-3.5 w-3.5 text-subtle" />
            {edu.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="h-3.5 w-3.5 text-subtle" />
            {edu.period}
          </span>
        </p>
      </div>
    </article>
  );
}

/** Degrees, as cards (one per entry in data/portfolio.ts → education). */
export function Education() {
  if (!education.length) return null;
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="mx-auto max-w-content px-gutter py-section cv-auto"
    >
      <SectionHeading section="education" />

      <Reveal as="ul" stagger className="grid gap-4">
        {education.map((edu) => (
          <EducationCard key={edu.school} edu={edu} />
        ))}
      </Reveal>
    </section>
  );
}
