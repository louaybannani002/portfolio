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

export const projectLabels = {
  filterAll: "All",
  filterAriaLabel: "Filter projects by category",
  caseStudy: "Case study",
  github: "GitHub",
  demo: "Live demo",
  comingSoon: "New project coming soon",
  moreProjects: "More projects",
  backToProjects: "All projects",
  previous: "Previous project",
  next: "Next project",
  galleryEmpty: "Screenshots coming soon",
  sections: {
    overview: "Overview",
    problem: "Problem",
    solution: "Solution",
    architecture: "Architecture",
    features: "Key Features",
    results: "Results",
    techStack: "Tech Stack",
    gallery: "Gallery",
  },
};

export const contactLabels = {
  channels: {
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  copyEmail: "Copy email address",
  copied: "Copied!",
  copyFailed: "Couldn't copy — please select the address manually",
  form: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    subjectOptional: "optional",
    message: "Message",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Message sent",
    successText: "Thank you for reaching out.",
    sendAnother: "Send another message",
    errorTitle: "Something went wrong",
    errorText: "Your message wasn't sent. Please try again, or email me directly:",
    notConfigured: "The contact form isn't set up yet. Please email me directly:",
    retry: "Try again",
    defaultSubject: "New message from the portfolio",
    fromName: "Portfolio contact form",
  },
  validation: {
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email.",
    emailInvalid: "Please enter a valid email address.",
    messageRequired: "Please write a message.",
    messageTooShort: "Please write at least 10 characters.",
  },
};

export const footerLabels = {
  backToTop: "Back to top",
  navAriaLabel: "Footer",
};

export const skillsLabels = {
  marqueeAriaLabel: "Technologies",
};

export const certificateLabels = {
  viewCredential: "View credential",
  total: "Certificates",
};

export const extrasLabels = {
  languages: "Languages",
  softSkills: "Soft skills",
  associativeLife: "Associative life",
};

export const experienceLabels = {
  education: "Education",
};

export const heroLabels = {
  viewWork: "View my work",
  scroll: "Scroll",
};

export const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
};
