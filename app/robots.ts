import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

// Static export: generated once at build time as out/robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
