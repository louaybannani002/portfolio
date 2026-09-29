import { ArrowUp, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Education, Experience } from "@/data/portfolio";
import { experienceLabels } from "@/data/site";
import { highlightMetrics } from "@/lib/highlight";
import { TimelineNode } from "./TimelineNode";

/** Row padding that clears the rail: content starts right of var(--tl-x). */
const ROW = "relative pb-12 last:pb-0 pl-[calc(var(--tl-x)+1.75rem)] md:pl-[calc(var(--tl-x)+2.75rem)]";

function splitPeriod(period: string) {
  const [start, end] = period.split(" – ");
  return { start, end };
}

/** Desktop-only date column, left of the rail. */
function DateColumn({ period }: { period: string }) {
  const { start, end } = splitPeriod(period);
  return (
    <p className="label-mono absolute top-7 left-0 hidden w-[calc(var(--tl-x)-2.5rem)] text-right leading-relaxed text-muted md:block">
      {start}
      {end && (
        <>
          {" –"}
          <br />
          <span className="text-subtle">{end}</span>
        </>
      )}
    </p>
  );
}

function MetaItem({ icon: Icon, children, className = "" }: { icon: typeof MapPin; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Icon aria-hidden className="h-3.5 w-3.5 text-subtle" />
      {children}
    </span>
  );
}

const CARD =
  "glass rounded-card p-6 transition-colors duration-300 hover:border-border-strong sm:p-8";

export function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <li className={ROW}>
      <TimelineNode className="top-8" />
      <DateColumn period={exp.period} />
      <Reveal y={32}>
        <article className={CARD}>
          <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                <span className="text-gradient text-base font-semibold">{exp.company}</span>
                <MetaItem icon={MapPin}>{exp.location}</MetaItem>
                <MetaItem icon={CalendarDays} className="md:hidden">
                  <time dateTime={exp.startDate}>{splitPeriod(exp.period).start}</time>
                  {" – "}
                  <time dateTime={exp.endDate}>{splitPeriod(exp.period).end}</time>
                </MetaItem>
              </p>
            </div>
            <span className="label-mono shrink-0 rounded-pill border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] text-foreground/90">
              {exp.duration}
            </span>
          </header>

          <ul className="mt-6 space-y-3">
            {exp.bullets.map((bullet) => (
              <li key={bullet} className="relative pl-5 leading-relaxed text-muted">
                <span aria-hidden className="bg-accent-gradient absolute top-[0.75em] left-0 h-px w-2.5" />
                {highlightMetrics(bullet)}
              </li>
            ))}
          </ul>

          {exp.tags.length > 0 && (
            <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              {exp.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-pill border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </article>
      </Reveal>
    </li>
  );
}

/** Connector between two related roles (e.g. prototype → production). */
export function ProgressionItem({ label, detail }: { label: string; detail: string }) {
  return (
    <li className={`${ROW} -mt-4`}>
      <TimelineNode size="sm" className="top-1">
        <ArrowUp className="h-3.5 w-3.5 text-accent-2" />
      </TimelineNode>
      <Reveal y={12}>
        <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl sm:rounded-pill border border-dashed border-accent-2/40 bg-accent-2/[0.06] px-4 py-1.5 text-sm">
          <span className="font-medium text-foreground">{label}</span>
          <span className="font-mono text-xs text-muted">{detail}</span>
        </p>
      </Reveal>
    </li>
  );
}

export function EducationItem({ edu }: { edu: Education }) {
  return (
    <li className={ROW}>
      <TimelineNode className="top-6">
        <GraduationCap className="h-[18px] w-[18px] text-foreground" />
      </TimelineNode>
      <DateColumn period={edu.period} />
      <Reveal y={32}>
        <article className={CARD}>
          <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {edu.degree}
              </h3>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                <span className="text-gradient text-base font-semibold">{edu.school}</span>
                <MetaItem icon={MapPin}>{edu.location}</MetaItem>
                <MetaItem icon={CalendarDays} className="md:hidden">
                  {edu.period}
                </MetaItem>
              </p>
            </div>
            <span className="label-mono shrink-0 rounded-pill border border-accent-2/30 bg-accent-2/10 px-3 py-1 text-[0.7rem] text-foreground/90">
              {experienceLabels.education}
            </span>
          </header>
        </article>
      </Reveal>
    </li>
  );
}
