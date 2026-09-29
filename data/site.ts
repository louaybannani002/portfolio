/** Site-level UI labels (navigation + section headings). Personal content stays in portfolio.ts. */

export type SectionId = "about" | "experience" | "projects" | "skills" | "certificates" | "contact";

export interface NavLink {
  id: SectionId;
  label: string;
  /** Mono label shown above the section title, e.g. "02 — EXPERIENCE" */
  index: string;
}

export const navLinks: NavLink[] = [
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "certificates", label: "Certificates", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export const getNavLink = (id: SectionId) => navLinks.find((l) => l.id === id)!;

export const downloadCvLabel = "Download CV";

export const heroLabels = {
  viewWork: "View my work",
  scroll: "Scroll",
};

export const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
};
