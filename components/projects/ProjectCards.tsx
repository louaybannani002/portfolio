import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/data/projects";
import { projectLabels } from "@/data/site";
import { MetricBadge, ProjectLinks, TechPills, projectHref } from "./ProjectBits";

function Meta({ project }: { project: Project }) {
  const parts = [project.category, project.year].filter(Boolean);
  return <p className="label-mono text-[0.7rem] text-subtle">{parts.join(" · ")}</p>;
}

/** Cover wrapped in a (non-tabbable) link, zooming on card hover. */
function CoverLink({ project, aspect, className = "" }: { project: Project; aspect: string; className?: string }) {
  return (
    <Link href={projectHref(project.slug)} tabIndex={-1} aria-hidden className={`block overflow-hidden ${className}`}>
      <div className="h-full transition-transform duration-700 ease-out group-hover/card:scale-[1.05]">
        <ProjectCover project={project} aspect={aspect} className="h-full" />
      </div>
    </Link>
  );
}

/** Large card; image side alternates with `reverse`. */
export function FeaturedProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <SpotlightCard maxTilt={3}>
      <article className="grid md:grid-cols-2">
        <CoverLink
          project={project}
          aspect="aspect-[16/10] md:aspect-auto"
          className={`md:min-h-[24rem] ${reverse ? "md:order-last" : ""}`}
        />
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <Meta project={project} />
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            <Link href={projectHref(project.slug)} className="transition-colors hover:text-accent-2">
              {project.title}
            </Link>
          </h3>
          {project.context && <p className="mt-1.5 text-sm text-muted">{project.context}</p>}
          {project.tagline && <p className="mt-4 leading-relaxed text-muted">{project.tagline}</p>}
          {project.metrics[0] && (
            <div className="mt-5">
              <MetricBadge metric={project.metrics[0]} />
            </div>
          )}
          <TechPills items={project.techStack} max={7} className="mt-6" />
          <ProjectLinks project={project} className="mt-auto pt-8" />
        </div>
      </article>
    </SpotlightCard>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard maxTilt={6}>
      <article className="flex h-full flex-col">
        <CoverLink project={project} aspect="aspect-video" />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Meta project={project} />
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
            <Link href={projectHref(project.slug)} className="transition-colors hover:text-accent-2">
              {project.title}
            </Link>
          </h3>
          {project.context && <p className="mt-1 text-sm text-muted">{project.context}</p>}
          {project.tagline && <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>}
          {project.metrics[0] && (
            <div className="mt-4">
              <MetricBadge metric={project.metrics[0]} />
            </div>
          )}
          <TechPills items={project.techStack} max={4} className="mt-5" />
          <ProjectLinks project={project} size="sm" className="mt-auto pt-6" />
        </div>
      </article>
    </SpotlightCard>
  );
}

/** Non-interactive teaser for a `coming-soon` slot. */
export function ComingSoonCard() {
  return (
    <div className="relative flex h-full min-h-[18rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-card border border-dashed border-border-strong bg-glass p-6 text-center">
      <div aria-hidden className="shimmer pointer-events-none absolute inset-0" />
      <span className="gradient-border flex h-12 w-12 items-center justify-center rounded-full p-px">
        <span className="flex h-full w-full items-center justify-center rounded-full bg-background">
          <Sparkles aria-hidden className="h-5 w-5 text-accent-2" />
        </span>
      </span>
      <p className="label-mono text-muted">{projectLabels.comingSoon}</p>
    </div>
  );
}
