import { certificates, education, identity, skills, summary } from "./portfolio";

/**
 * Absolute site URL used by metadata, Open Graph, sitemap and robots (all generated at build time).
 * Priority: NEXT_PUBLIC_SITE_URL (set it for a custom domain) → URL (set automatically by Netlify
 * during builds) → localhost for local builds.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Mirrors CONTENT.md → "SEO". */
export const siteTitle = "Louay Bannani — Data Scientist & AI/ML Engineer";

/** First sentence of the CV summary, verbatim. */
export const siteDescription = summary.split(". ")[0] + ".";

export const siteKeywords = [
  identity.name,
  "Data Scientist",
  "AI/ML Engineer",
  "Data Science",
  "Machine Learning",
  "Deep Learning",
  "LLM",
  "Multi-Agent Systems",
  "RAG",
  "MCP",
  "Time Series Forecasting",
  "Computer Vision",
  "Python",
  "Tunisia",
];

/** Static 1200×630 image in public/ (regenerate if the name/title changes). */
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: siteTitle };

/** schema.org Person for the home page (JSON-LD). */
export function personJsonLd() {
  const edu = education[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: identity.title,
    description: siteDescription,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    email: `mailto:${identity.email}`,
    telephone: identity.phone.replace(/\s+/g, ""),
    address: { "@type": "PostalAddress", addressCountry: "TN" },
    sameAs: [identity.linkedin.url, identity.github.url],
    ...(edu && {
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: edu.school,
        address: { "@type": "PostalAddress", addressLocality: edu.location },
      },
    }),
    knowsAbout: [...new Set(skills.flatMap((c) => c.skills))],
    hasCredential: certificates.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      ...(c.issuer && { recognizedBy: { "@type": "Organization", name: c.issuer } }),
    })),
  };
}
