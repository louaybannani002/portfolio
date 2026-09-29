import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { identity } from "@/data/portfolio";
import { getProjectBySlug, publishedProjects } from "@/data/projects";

// Static export: only published projects get a page; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${identity.name}`,
    description: project.tagline || project.overview || project.features[0],
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
