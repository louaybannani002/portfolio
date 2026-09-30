import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";
import { SITE_URL } from "@/data/seo";

// Static export: generated once at build time as out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...publishedProjects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
