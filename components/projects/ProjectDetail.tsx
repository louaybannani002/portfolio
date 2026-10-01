import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Reveal } from "@/components/ui/Reveal";
import { getAdjacentProjects, publishedProjects, type Project } from "@/data/projects";
import { projectLabels } from "@/data/site";
import { PUBLIC_IMAGES } from "@/lib/assets.generated";
import { highlightMetrics } from "@/lib/highlight";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Gallery } from "./Gallery";
import { PipelineDiagram } from "./PipelineDiagram";
import { MetricBadge, ProjectLinks, TechPills, projectHref } from "./ProjectBits";

const L = projectLabels.sections;

interface DetailSectionDef {
  id: string;
  title: string;
  content: ReactNode;
}

function Prose({ text }: { text: string }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
      {text.split(/\n{2,}/).map((para) => (
        <p key={para}>{para}</p>
      ))}
    </div>
  );
}

/** Builds the list of sections, skipping any whose data is empty. */
function buildSections(project: Project): DetailSectionDef[] {
  const sections: (DetailSectionDef | false)[] = [
    !!project.overview && { id: "overview", title: L.overview, content: <Prose text={project.overview} /> },
    !!project.problem && { id: "problem", title: L.problem, content: <Prose text={project.problem} /> },
    !!project.solution && { id: "solution", title: L.solution, content: <Prose text={project.solution} /> },
    !!(project.architecture?.length || project.pipelineSteps?.length) && {
      id: "architecture",
      title: L.architecture,
      content: project.architecture?.length ? (
        <ArchitectureDiagram layers={project.architecture} label={`${project.title} ${L.architecture}`} />
      ) : (
        <PipelineDiagram steps={project.pipelineSteps!} label={`${project.title} pipeline`} />
      ),
    },
    project.features.length > 0 && {
      id: "features",
      title: L.features,
      content: (
        <Reveal as="ul" stagger={0.06} className="grid gap-3 lg:grid-cols-2">
          {project.features.map((f) => (
            <div key={f} className="glass flex h-full gap-3 rounded-card p-5 leading-relaxed text-muted">
              <span aria-hidden className="bg-accent-gradient mt-[0.7em] h-px w-3 shrink-0" />
              <span>{highlightMetrics(f)}</span>
            </div>
          ))}
        </Reveal>
      ),
    },
    project.metrics.length > 0 && {
      id: "results",
      title: L.results,
      content: (
        <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass h-full rounded-card p-5 sm:p-6">
              <CountUp
                value={m.value}
                className="text-gradient block font-display text-4xl font-semibold tracking-tight sm:text-5xl"
              />
              <span className="mt-2 block text-sm text-muted">{m.label}</span>
            </div>
          ))}
        </Reveal>
      ),
    },
    project.techStack.length > 0 && {
      id: "tech-stack",
      title: L.techStack,
      content: (
        <Reveal as="ul" stagger={0.04} className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="glass inline-block rounded-pill px-4 py-2 font-mono text-sm text-foreground/90">
              {t}
            </span>
          ))}
        </Reveal>
      ),
    },
    // Always shown: an empty gallery renders the "screenshots coming soon" block
    { id: "gallery", title: L.gallery, content: <Gallery images={project.gallery} title={project.title} /> },
  ];
  return sections.filter((s): s is DetailSectionDef => !!s);
}

/** CSS entrance (see `.hero-enter` in globals.css): starts at first paint, so the LCP isn't gated on hydration. */
const enter = (i: number) => ({
  className: "hero-enter",
  style: { "--d": `${(i * 0.08).toFixed(2)}s` } as CSSProperties,
});

function DetailHero({ project }: { project: Project }) {
  const meta = [project.category, project.year].filter(Boolean).join(" · ");
  // Only rendered items take a stagger slot
  let slot = 0;
  const next = () => enter(slot++);
  return (
    <header className="relative isolate overflow-hidden pt-[calc(var(--nav-height)+2.5rem)] pb-12 sm:pb-16">
      <div
        aria-hidden
        className="bg-accent-gradient absolute top-0 left-1/2 -z-10 h-[26rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]"
      />
      <div className="mx-auto max-w-content px-gutter">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {projectLabels.backToProjects}
        </Link>

        <div className="mt-10 max-w-4xl">
          {meta && (
            <p {...next()}>
              <span className="label-mono text-muted">{meta}</span>
            </p>
          )}
          <div {...next()}>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-foreground">
              {project.title}
            </h1>
          </div>
          {project.context && (
            <div {...next()}>
              <p className="mt-4 text-lg text-muted">{project.context}</p>
            </div>
          )}
          {project.tagline && (
            <div {...next()}>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-pretty text-foreground/85">{project.tagline}</p>
            </div>
          )}
          {project.metrics.length > 0 && (
            <div {...next()}>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <MetricBadge key={m.label} metric={m} />
                ))}
              </div>
            </div>
          )}
          <div {...next()}>
            <TechPills items={project.techStack} className="mt-6" />
            <ProjectLinks project={project} showCaseStudy={false} className="mt-8" />
          </div>
        </div>

        <div {...enter(slot + 1)}>
          <div className="gradient-border mt-12 rounded-card p-px shadow-[0_40px_120px_-40px_rgb(59_130_246/0.4)] sm:mt-16">
            {project.demoVideo ? (
              // Demo replaces the cover; the cover (if present) becomes the poster frame
              <video
                src={project.demoVideo}
                poster={PUBLIC_IMAGES.has(project.coverImage) ? project.coverImage : undefined}
                controls
                playsInline
                preload="metadata"
                aria-label={`${project.title} — ${projectLabels.demoVideo}`}
                className="block aspect-video w-full rounded-[calc(var(--radius-card)-1px)] bg-black object-contain"
              />
            ) : (
              <ProjectCover
                project={project}
                aspect="aspect-video lg:aspect-[21/9]"
                priority
                className="rounded-[calc(var(--radius-card)-1px)]"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function ProjectNav({ slug }: { slug: string }) {
  if (publishedProjects.length < 2) return null;
  const { previous, next } = getAdjacentProjects(slug);
  const card =
    "glass group flex flex-col gap-2 rounded-card p-6 transition-colors duration-300 hover:border-border-strong sm:p-8";
  return (
    <nav aria-label="Projects" className="mx-auto grid max-w-content gap-4 px-gutter pb-section sm:grid-cols-2">
      <Link href={projectHref(previous.slug)} className={card} rel="prev">
        <span className="label-mono inline-flex items-center gap-2 text-subtle">
          <ArrowLeft aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          {projectLabels.previous}
        </span>
        <span className="font-display text-xl font-semibold text-foreground sm:text-2xl">{previous.title}</span>
      </Link>
      <Link href={projectHref(next.slug)} className={`${card} sm:items-end sm:text-right`} rel="next">
        <span className="label-mono inline-flex items-center gap-2 text-subtle">
          {projectLabels.next}
          <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="font-display text-xl font-semibold text-foreground sm:text-2xl">{next.title}</span>
      </Link>
    </nav>
  );
}

/** Full case-study page; every section is driven by data and hidden when empty. */
export function ProjectDetail({ project }: { project: Project }) {
  const sections = buildSections(project);
  return (
    <article>
      <DetailHero project={project} />

      <div className="mx-auto max-w-content px-gutter pb-section">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="grid gap-6 border-t border-border py-12 sm:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12"
          >
            <Reveal>
              <p className="label-mono text-subtle">
                <span className="text-gradient">{String(i + 1).padStart(2, "0")}</span> —
              </p>
              <h2
                id={`${section.id}-title`}
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {section.title}
              </h2>
            </Reveal>
            <div className="min-w-0">{section.content}</div>
          </section>
        ))}
      </div>

      <ProjectNav slug={project.slug} />
    </article>
  );
}
