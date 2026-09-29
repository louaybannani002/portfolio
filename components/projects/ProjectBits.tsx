import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import type { Project, ProjectMetric } from "@/data/projects";
import { projectLabels } from "@/data/site";

export const projectHref = (slug: string) => `/projects/${slug}/`;

export function MetricBadge({ metric, className = "" }: { metric: ProjectMetric; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-foreground/90 ${className}`}
    >
      <span className="text-gradient font-display text-sm font-semibold">{metric.value}</span>
      {metric.label}
    </span>
  );
}

export function TechPills({ items, max, className = "" }: { items: string[]; max?: number; className?: string }) {
  if (!items.length) return null;
  const shown = max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul aria-label="Tech stack" className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((t) => (
        <li
          key={t}
          className="rounded-pill border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[0.7rem] text-muted"
        >
          {t}
        </li>
      ))}
      {rest > 0 && (
        <li className="rounded-pill px-2 py-1 font-mono text-[0.7rem] text-subtle" aria-label={`and ${rest} more`}>
          +{rest}
        </li>
      )}
    </ul>
  );
}

interface ProjectLinksProps {
  project: Pick<Project, "slug" | "title" | "githubUrl" | "demoUrl">;
  showCaseStudy?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/** Case study / GitHub / Live demo. Buttons with an empty URL are not rendered. */
export function ProjectLinks({ project, showCaseStudy = true, size = "md", className = "" }: ProjectLinksProps) {
  const pad = size === "sm" ? "px-3.5 py-2 text-xs" : "px-4.5 py-2.5 text-sm";
  const secondary = `glass inline-flex items-center gap-2 rounded-pill ${pad} font-medium text-foreground transition-colors hover:border-border-strong`;
  const hasAny = showCaseStudy || project.githubUrl || project.demoUrl;
  if (!hasAny) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showCaseStudy && (
        <Link
          href={projectHref(project.slug)}
          aria-label={`${projectLabels.caseStudy}: ${project.title}`}
          className={`group/btn bg-accent-gradient inline-flex items-center gap-1.5 rounded-pill ${pad} font-medium text-white shadow-[0_8px_24px_-10px_rgb(139_92_246/0.7)]`}
        >
          {projectLabels.caseStudy}
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${projectLabels.github}: ${project.title}`}
          className={secondary}
        >
          <FaGithub aria-hidden className="h-4 w-4" />
          {projectLabels.github}
        </a>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${projectLabels.demo}: ${project.title}`}
          className={secondary}
        >
          <ExternalLink aria-hidden className="h-4 w-4" />
          {projectLabels.demo}
        </a>
      )}
    </div>
  );
}
