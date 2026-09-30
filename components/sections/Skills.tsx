import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, type SkillCategory } from "@/data/portfolio";
import { getTechIcon } from "@/lib/techIcons";
import { LogoMarquee } from "./skills/LogoMarquee";

/**
 * Bento layout on a 6-column grid for the current 7 categories (rows of 2+4, 3+3, 2+2+2).
 * If the number of categories changes, every card falls back to a third of the row.
 */
const SPANS_FOR_7 = [
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];
const spans = skills.length === SPANS_FOR_7.length ? SPANS_FOR_7 : skills.map(() => "lg:col-span-2");

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <article className="glass h-full rounded-card p-6 transition-colors duration-300 hover:border-border-strong">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{category.category}</h3>
        <span className="label-mono text-[0.65rem] text-subtle">
          {String(category.skills.length).padStart(2, "0")}
        </span>
      </header>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const Icon = getTechIcon(skill);
          return Icon ? (
            <li
              key={skill}
              className="group/skill inline-flex items-center gap-2 rounded-control border border-border bg-white/[0.02] px-3 py-2 text-sm text-foreground/90 transition-colors duration-200 hover:border-accent/40"
            >
              <Icon aria-hidden className="h-4 w-4 text-muted transition-colors duration-200 group-hover/skill:text-accent-2" />
              {skill}
            </li>
          ) : (
            // No logo available: mono text pill
            <li
              key={skill}
              className="inline-flex items-center rounded-control border border-dashed border-border-strong px-3 py-2 font-mono text-xs text-muted"
            >
              {skill}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-content px-gutter py-section">
      <SectionHeading section="skills" />

      <Reveal className="mb-12">
        <LogoMarquee />
      </Reveal>

      <Reveal as="ul" stagger={0.07} itemClassNames={spans} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skills.map((category) => (
          <SkillCard key={category.category} category={category} />
        ))}
      </Reveal>
    </section>
  );
}
