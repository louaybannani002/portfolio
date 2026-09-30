import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experiences } from "@/data/portfolio";
import { EducationItem, ExperienceItem, ProgressionItem } from "./experience/TimelineItems";
import { TimelineRail } from "./experience/TimelineRail";

/** Newest-first timeline of experiences, ending with education. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-content px-gutter py-section cv-auto"
    >
      <SectionHeading section="experience" />

      <TimelineRail>
        <ol>
          {experiences.map((exp, i) => (
            <Fragment key={exp.id}>
              <ExperienceItem exp={exp} />
              {exp.progression && i < experiences.length - 1 && (
                <ProgressionItem label={exp.progression.label} detail={exp.progression.detail} />
              )}
            </Fragment>
          ))}
          {education.map((edu) => (
            <EducationItem key={edu.school} edu={edu} />
          ))}
        </ol>
      </TimelineRail>
    </section>
  );
}
