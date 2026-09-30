import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { OG_IMAGE } from "@/data/seo";
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
  const description = project.tagline || project.overview || project.features[0];
  const url = `/projects/${project.slug}/`;
  // Use the project cover once it exists (public/projects/<slug>/cover.jpg), else the site image
  const image = existsSync(join(process.cwd(), "public", project.coverImage))
    ? { url: project.coverImage, alt: project.title }
    : OG_IMAGE;
  return {
    title: project.title, // → "PrediBot — Louay Bannani" via the root title template
    description,
    keywords: [...project.techStack, project.category],
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: project.title, description, images: [image] },
    twitter: { card: "summary_large_image", title: project.title, description, images: [image.url] },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
