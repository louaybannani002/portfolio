"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import {
  comingSoonProjects,
  featuredProjects,
  projectFilters,
  publishedProjects,
  type Project,
  type ProjectFilterId,
} from "@/data/projects";
import { projectLabels } from "@/data/site";
import { ComingSoonCard, FeaturedProjectCard, ProjectCard } from "./ProjectCards";

type Filter = "all" | ProjectFilterId;

const EASE = [0.22, 1, 0.36, 1] as const;

// Tabs only for filters that have at least one published project
const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: projectLabels.filterAll },
  ...projectFilters.filter((f) => publishedProjects.some((p) => p.filters.includes(f.id))),
];

const itemMotion = {
  layout: true,
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE },
} as const;

/** Filter tabs + featured cards + grid of other projects + coming-soon slots, all layout-animated. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const matches = (p: Project) => filter === "all" || p.filters.includes(filter);

  const featured = featuredProjects.filter(matches);
  const others = publishedProjects.filter((p) => !p.featured && matches(p));
  const soon = filter === "all" ? comingSoonProjects : [];

  return (
    <LayoutGroup>
      {tabs.length > 2 && (
        <div role="group" aria-label={projectLabels.filterAriaLabel} className="-mx-1 mb-10 flex flex-wrap gap-1.5">
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(tab.id)}
                className={`relative isolate rounded-pill px-4 py-2 text-sm transition-colors duration-200 ${
                  active ? "text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden
                    className="bg-accent-gradient absolute inset-0 -z-10 rounded-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {!active && <span aria-hidden className="absolute inset-0 -z-10 rounded-pill border border-border" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {featured.length > 0 && (
        <motion.ul layout className="flex flex-col gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {featured.map((project, i) => (
              <motion.li key={project.slug} {...itemMotion}>
                <FeaturedProjectCard project={project} reverse={i % 2 === 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {(others.length > 0 || soon.length > 0) && (
        <>
          <motion.h3 layout className="label-mono mt-16 mb-6 text-muted">
            {projectLabels.moreProjects}
          </motion.h3>
          <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {others.map((project) => (
                <motion.li key={project.slug} {...itemMotion}>
                  <ProjectCard project={project} />
                </motion.li>
              ))}
              {soon.map((project) => (
                <motion.li key={project.slug} {...itemMotion}>
                  <ComingSoonCard />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      )}
    </LayoutGroup>
  );
}
