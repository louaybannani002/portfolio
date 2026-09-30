import { Languages, Sparkles, Users, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { associativeLife, languages, softSkills } from "@/data/portfolio";
import { extrasLabels } from "@/data/site";
import { ProficiencyBar } from "./ProficiencyBar";

function ExtraCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <article className="glass h-full rounded-card p-6">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-foreground">
        <Icon aria-hidden className="h-4 w-4 text-accent-2" />
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </article>
  );
}

/** Compact trio: languages (animated bars), soft skills, associative life. Empty lists are skipped. */
export function Extras({ className = "" }: { className?: string }) {
  const cards = [
    languages.length > 0 && (
      <ExtraCard key="languages" icon={Languages} title={extrasLabels.languages}>
        <ul className="space-y-4">
          {languages.map((l, i) => (
            <li key={l.language}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="font-medium text-foreground">{l.language}</span>
                <span className="label-mono text-[0.65rem] text-muted">{l.level}</span>
              </div>
              <ProficiencyBar value={l.proficiency} delay={i * 0.15} />
            </li>
          ))}
        </ul>
      </ExtraCard>
    ),
    softSkills.length > 0 && (
      <ExtraCard key="soft" icon={Sparkles} title={extrasLabels.softSkills}>
        <ul className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <li
              key={s}
              className="rounded-pill border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-foreground/90"
            >
              {s}
            </li>
          ))}
        </ul>
      </ExtraCard>
    ),
    associativeLife.length > 0 && (
      <ExtraCard key="assoc" icon={Users} title={extrasLabels.associativeLife}>
        <ul className="space-y-4">
          {associativeLife.map((a) => (
            <li key={a.organization} className="relative border-l border-border pl-4">
              <span aria-hidden className="bg-accent-gradient absolute top-1.5 -left-[3px] h-1.5 w-1.5 rounded-full" />
              <p className="leading-snug font-medium text-foreground">{a.organization}</p>
              <p className="mt-1 text-sm text-muted">
                {a.role} <span className="font-mono text-xs text-subtle">· {a.period}</span>
              </p>
            </li>
          ))}
        </ul>
      </ExtraCard>
    ),
  ].filter(Boolean);

  if (!cards.length) return null;

  return (
    <Reveal as="ul" stagger={0.08} className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {cards}
    </Reveal>
  );
}
