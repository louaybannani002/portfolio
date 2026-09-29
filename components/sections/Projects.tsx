import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-content px-gutter py-section"
    >
      <SectionHeading section="projects" />
      <ProjectsExplorer />
    </section>
  );
}
