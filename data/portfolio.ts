/**
 * All personal/site content. Mirrors CONTENT.md exactly — edit CONTENT.md first,
 * then update this file. Empty strings/arrays mean "not provided yet" (see
 * CONTENT.md → "Missing — to fill"); UI must hide empty fields gracefully.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SocialLink {
  label: string;
  url: string;
  /** Display text, e.g. "linkedin.com/in/LouayBannani" */
  handle: string;
}

export interface Identity {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: SocialLink;
  github: SocialLink;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  bullets: string[];
  tags: string[];
  /** Slug in data/projects.ts this experience relates to, if any */
  relatedProject?: string;
}

export interface Education {
  school: string;
  shortName: string;
  location: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  /** Link to the credential — empty until provided */
  credentialUrl?: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface AssociativeRole {
  role: string;
  organization: string;
  period: string;
}

export interface ContactContent {
  heading: string;
  text: string;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

/** Single place to change the profile photo. Missing file → "LB" initials fallback. */
export const PROFILE_PHOTO = "/images/profile.jpg";

/** Downloadable CV (copied from LouayBannani(CV).pdf). */
export const CV_PATH = "/Louay_Bannani_CV.pdf";

export const identity: Identity = {
  name: "Louay Bannani",
  firstName: "Louay",
  lastName: "Bannani",
  initials: "LB",
  title: "Data Science & AI/ML Engineer",
  location: "Tunisia",
  email: "louay.bannani002@gmail.com",
  phone: "+216 52070154",
  linkedin: {
    label: "LinkedIn",
    url: "https://linkedin.com/in/LouayBannani",
    handle: "linkedin.com/in/LouayBannani",
  },
  github: {
    label: "GitHub",
    url: "https://github.com/louaybannani002",
    handle: "github.com/louaybannani002",
  },
};

/** Rotating hero roles. Only the CV title is known — add more in CONTENT.md first. */
export const heroRoles: string[] = ["Data Science & AI/ML Engineer"];

/** TODO (CONTENT.md → Missing): one-line hero tagline. */
export const tagline = "";

export const summary =
  "AI & Data Science engineer who builds end-to-end intelligent systems, from data pipelines and forecasting models to LLM-powered multi-agent assistants deployed on real business channels. Delivered PrediBot, a multi-agent restaurant-operations platform (six MCP sub-agents, 21 n8n workflows, Prophet forecasting service, WhatsApp integration), and a CNN-based invoice OCR pipeline with financial anomaly detection. Strong in Python, deep learning, RAG, time series and REST API integration, with full-stack experience in Laravel, MySQL and Vue.js.";

/** Numbers taken verbatim from the CV. */
export const stats: Stat[] = [
  { value: "6", label: "MCP-based sub-agents" },
  { value: "21", label: "n8n workflows" },
  { value: "93%", label: "OCR field-level accuracy" },
  { value: "91%", label: "Speech emotion recognition accuracy" },
  { value: "9%", label: "Forecast error (MAPE)" },
];

export const experiences: Experience[] = [
  {
    id: "prendstapart-2026",
    role: "Data Science & AI Engineer Intern",
    company: "PrendsTaPart",
    location: "Tunis, Tunisia",
    period: "February 2026 – August 2026",
    duration: "6 months",
    startDate: "2026-02",
    endDate: "2026-08",
    bullets: [
      "Architected and delivered PrediBot, a multi-agent AI system integrated with the FoodEatUp platform, enabling natural-language access to inventory, HACCP, suppliers, HR, and production management.",
      "Built and orchestrated six MCP-based sub-agents and 21 n8n workflows connecting LLMs, REST APIs, authentication, and automated business processes.",
      "Developed a Python/Flask forecasting microservice with Prophet for recipe-level production forecasting, covering data preprocessing, per-recipe models, fallback strategies, and API integration (forecast error: 9% MAPE).",
      "Deployed conversational access through OpenAI Agent Builder, ChatKit, and Twilio WhatsApp, with proactive operational alerts for kitchen and stock teams.",
    ],
    tags: [
      "PrediBot",
      "Multi-Agent",
      "MCP",
      "n8n",
      "Python",
      "Flask",
      "Prophet",
      "REST APIs",
      "OpenAI Agent Builder",
      "ChatKit",
      "Twilio WhatsApp",
    ],
    relatedProject: "predibot",
  },
  {
    id: "prendstapart-2025",
    role: "Data Science & AI Engineer Intern",
    company: "PrendsTaPart",
    location: "Tunis, Tunisia",
    period: "July 2025 – August 2025",
    duration: "2 months",
    startDate: "2025-07",
    endDate: "2025-08",
    bullets: [
      "Led the design and first prototype of PrediBot, an AI agent for restaurant management combining sales forecasting, inventory optimization, and HACCP anomaly detection.",
      "Automated data ingestion and processing pipelines with n8n, storing curated data in PostgreSQL.",
      "Trained predictive models for sales, stock levels, and temperature anomalies, and exposed results through REST APIs for real-time alerts.",
    ],
    tags: [
      "PrediBot",
      "Sales Forecasting",
      "Inventory Optimization",
      "Anomaly Detection",
      "n8n",
      "PostgreSQL",
      "REST APIs",
    ],
    relatedProject: "predibot",
  },
  {
    id: "proxym-2025",
    role: "Data Science & AI Engineer Intern",
    company: "Proxym",
    location: "Tunis, Tunisia",
    period: "June 2025 – July 2025",
    duration: "1 month",
    startDate: "2025-06",
    endDate: "2025-07",
    bullets: [
      "Developed a CNN-based OCR system extracting key financial fields from invoices (dates, totals, VAT, line items) into structured data (field-level accuracy: 93%).",
      "Designed a document layout analysis workflow with deep learning and OpenCV to segment invoice components across heterogeneous templates.",
      "Implemented financial anomaly detection rules flagging inconsistent totals, incorrect VAT calculations, and suspicious invoice structures.",
      "Built an end-to-end pipeline (preprocessing, extraction, validation, standardized JSON export) ready for integration with accounting systems.",
    ],
    tags: [
      "CNN",
      "OCR",
      "Deep Learning",
      "OpenCV",
      "Document Layout Analysis",
      "Anomaly Detection",
      "JSON",
    ],
    relatedProject: "invoice-ocr",
  },
];

export const education: Education[] = [
  {
    school: "École Pluridisciplinaire Internationale (EPI)",
    shortName: "EPI",
    location: "Sousse, Tunisia",
    degree: "Engineering Degree in Artificial Intelligence and Data Science",
    period: "September 2021 – August 2026",
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "Java", "PHP", "JavaScript"],
  },
  {
    category: "Machine Learning & Deep Learning",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "XGBoost",
      "Prophet",
      "OpenCV",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "LLMs & Agents",
    skills: [
      "LangChain",
      "RAG",
      "ChromaDB",
      "MCP",
      "OpenAI Agent Builder",
      "ChatKit",
      "Prompt Engineering",
    ],
  },
  {
    category: "Data Engineering & APIs",
    skills: ["n8n", "FastAPI", "Flask", "REST APIs", "PostgreSQL", "MySQL"],
  },
  {
    category: "Web Development",
    skills: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    category: "MLOps & Deployment",
    skills: ["Docker", "MLflow", "Git", "GitHub Actions (CI/CD)"],
  },
  {
    category: "Tools",
    skills: ["Jupyter Notebook", "VS Code", "PyCharm", "Postman", "Twilio"],
  },
];

export const certificates: Certificate[] = [
  { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", credentialUrl: "" },
  { name: "Fundamentals of Deep Learning", issuer: "NVIDIA", credentialUrl: "" },
  { name: "Computer Vision for Industrial Inspection", issuer: "NVIDIA", credentialUrl: "" },
  { name: "Applications of AI for Anomaly Detection", issuer: "NVIDIA", credentialUrl: "" },
  { name: "Fundamentals of Accelerated Data Science", issuer: "NVIDIA", credentialUrl: "" },
  // Issuer not stated in the CV — TODO (CONTENT.md → Missing)
  { name: "Data Science Bootcamp", issuer: "", credentialUrl: "" },
  {
    name: "CCNA 1 & 2: Networks, Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    credentialUrl: "",
  },
];

export const languages: Language[] = [
  { language: "Arabic", level: "Native" },
  { language: "English", level: "Professional" },
  { language: "French", level: "Intermediate" },
];

export const softSkills: string[] = [
  "Communication & Presentation",
  "Team Leadership",
  "Project Management",
  "Problem-Solving",
  "Self-Learning",
];

export const associativeLife: AssociativeRole[] = [
  {
    role: "Active Member",
    organization: "EPI Junior Entreprise, Project Division",
    period: "2024–2025",
  },
  {
    role: "Former Member",
    organization: "IEEE EPI Student Branch, Computer Society Chapter",
    period: "2024",
  },
];

/** TODO (CONTENT.md → Missing): contact heading + invitation text. */
export const contact: ContactContent = {
  heading: "",
  text: "",
};

/** TODO (CONTENT.md → Missing): footer text. */
export const footerText = "";
