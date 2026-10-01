/**
 * Projects. Mirrors CONTENT.md → "Projects". To add one, follow data/PROJECT_TEMPLATE.md.
 * Empty strings/arrays = not provided yet; the UI must hide them gracefully.
 */

export type ProjectStatus = "published" | "coming-soon";

/** Filter tabs on the home page. A project can appear under several. */
export type ProjectFilterId =
  | "llm-agents"
  | "computer-vision"
  | "deep-learning"
  | "forecasting"
  | "nlp-recsys";

export const projectFilters: { id: ProjectFilterId; label: string }[] = [
  { id: "llm-agents", label: "LLM & Agents" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "deep-learning", label: "Deep Learning" },
  { id: "forecasting", label: "Forecasting" },
  { id: "nlp-recsys", label: "NLP/RecSys" },
];

/** Icons available to architecture diagram nodes (mapped in components/projects/ArchitectureDiagram). */
export type ArchitectureIcon =
  | "whatsapp"
  | "chat"
  | "bot"
  | "inventory"
  | "haccp"
  | "suppliers"
  | "hr"
  | "production"
  | "forecast"
  | "workflow"
  | "server"
  | "alert"
  | "database"
  | "api"
  | "model"
  | "document";

export interface ArchitectureNode {
  title: string;
  subtitle?: string;
  icon?: ArchitectureIcon;
}

/** One horizontal tier of the diagram. A tier with a single node is drawn as the central hub. */
export interface ArchitectureLayer {
  label: string;
  nodes: ArchitectureNode[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  /** Where it was built, e.g. "Internship — PrendsTaPart" */
  context: string;
  status: ProjectStatus;
  featured: boolean;
  /** Filter tabs this project appears under. */
  filters: ProjectFilterId[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  /** Rendered as an animated step-by-step pipeline (when no `architecture`). */
  pipelineSteps?: string[];
  /** Layered architecture diagram, drawn top → bottom with animated connectors. */
  architecture?: ArchitectureLayer[];
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  /** public/projects/<slug>/cover.jpg — missing file → generated placeholder */
  coverImage: string;
  /** public/projects/<slug>/demo.mp4 — shown instead of the cover on the case-study page */
  demoVideo?: string;
  /** public/projects/<slug>/1.jpg, 2.jpg, ... */
  gallery: string[];
}

const cover = (slug: string) => `/projects/${slug}/cover.jpg`;

export const projects: Project[] = [
  {
    slug: "predibot",
    title: "PrediBot",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "Multi-Agent AI",
    year: "2025–2026",
    context: "Internship — PrendsTaPart",
    status: "published",
    featured: true,
    filters: ["llm-agents", "forecasting"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Architected and delivered PrediBot, a multi-agent AI system integrated with the FoodEatUp platform, enabling natural-language access to inventory, HACCP, suppliers, HR, and production management.",
      "Built and orchestrated six MCP-based sub-agents and 21 n8n workflows connecting LLMs, REST APIs, authentication, and automated business processes.",
      "Developed a Python/Flask forecasting microservice with Prophet for recipe-level production forecasting, covering data preprocessing, per-recipe models, fallback strategies, and API integration (forecast error: 9% MAPE).",
      "Deployed conversational access through OpenAI Agent Builder, ChatKit, and Twilio WhatsApp, with proactive operational alerts for kitchen and stock teams.",
      "Led the design and first prototype of PrediBot, an AI agent for restaurant management combining sales forecasting, inventory optimization, and HACCP anomaly detection.",
      "Automated data ingestion and processing pipelines with n8n, storing curated data in PostgreSQL.",
      "Trained predictive models for sales, stock levels, and temperature anomalies, and exposed results through REST APIs for real-time alerts.",
    ],
    architecture: [
      {
        label: "Channels",
        nodes: [
          { title: "Twilio WhatsApp", icon: "whatsapp" },
          { title: "OpenAI Agent Builder / ChatKit", icon: "chat" },
        ],
      },
      {
        label: "Orchestration",
        nodes: [{ title: "Orchestrator", icon: "bot" }],
      },
      {
        label: "Six MCP sub-agents",
        nodes: [
          { title: "Inventory", icon: "inventory" },
          { title: "HACCP", icon: "haccp" },
          { title: "Suppliers", icon: "suppliers" },
          { title: "HR", icon: "hr" },
          { title: "Production", icon: "production" },
          { title: "Forecasting", icon: "forecast" },
        ],
      },
      {
        label: "Automation & services",
        nodes: [
          { title: "21 n8n workflows", icon: "workflow" },
          { title: "Flask + Prophet", subtitle: "Forecasting service", icon: "server" },
          { title: "Proactive alerts", subtitle: "Kitchen and stock teams", icon: "alert" },
        ],
      },
    ],
    metrics: [
      { value: "6", label: "MCP-based sub-agents" },
      { value: "21", label: "n8n workflows" },
      { value: "9%", label: "Forecast error (MAPE)" },
    ],
    techStack: [
      "OpenAI Agent Builder",
      "ChatKit",
      "MCP",
      "n8n",
      "Python",
      "Flask",
      "Prophet",
      "PostgreSQL",
      "REST APIs",
      "Twilio WhatsApp",
    ],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("predibot"),
    demoVideo: "/projects/predibot/demo.mp4",
    gallery: [],
  },
  {
    slug: "invoice-ocr",
    title: "CNN-based Invoice OCR",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "Computer Vision",
    year: "2025",
    context: "Internship — Proxym",
    status: "published",
    featured: false,
    filters: ["computer-vision", "deep-learning"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Developed a CNN-based OCR system extracting key financial fields from invoices (dates, totals, VAT, line items) into structured data (field-level accuracy: 93%).",
      "Designed a document layout analysis workflow with deep learning and OpenCV to segment invoice components across heterogeneous templates.",
      "Implemented financial anomaly detection rules flagging inconsistent totals, incorrect VAT calculations, and suspicious invoice structures.",
      "Built an end-to-end pipeline (preprocessing, extraction, validation, standardized JSON export) ready for integration with accounting systems.",
    ],
    pipelineSteps: ["Preprocessing", "Extraction", "Validation", "Standardized JSON export"],
    metrics: [{ value: "93%", label: "Field-level accuracy" }],
    techStack: ["CNN", "Deep Learning", "OpenCV", "JSON"],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("invoice-ocr"),
    gallery: [],
  },
  {
    slug: "rag-hr-assistant",
    title: "RAG-Based HR Assistant",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "LLMs & RAG",
    year: "2025",
    context: "",
    status: "published",
    featured: false,
    filters: ["llm-agents", "nlp-recsys"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Built a Retrieval-Augmented Generation system answering HR questions from internal documents, with ingestion, chunking, and embedding-based semantic search.",
      "Constrained the LLM to retrieved context to produce grounded answers and reduce hallucinations.",
    ],
    pipelineSteps: ["Ingestion", "Chunking", "Embedding-based semantic search"],
    metrics: [],
    techStack: ["Python", "LangChain", "OpenAI API", "ChromaDB"],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("rag-hr-assistant"),
    gallery: [],
  },
  {
    slug: "speech-emotion-recognition",
    title: "Speech Emotion Recognition (CNN)",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "Deep Learning",
    year: "2025",
    context: "",
    status: "published",
    featured: false,
    filters: ["deep-learning"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Built a preprocessing pipeline over four datasets (RAVDESS, CREMA-D, TESS, SAVEE): slicing, normalization, and MFCC/spectrogram feature extraction.",
      "Trained CNN classifiers for emotion recognition, improving results through hyperparameter tuning and data augmentation (accuracy: 91%).",
    ],
    pipelineSteps: ["Slicing", "Normalization", "MFCC/spectrogram feature extraction"],
    metrics: [
      { value: "91%", label: "Accuracy" },
      { value: "4", label: "Datasets (RAVDESS, CREMA-D, TESS, SAVEE)" },
    ],
    techStack: ["Python", "TensorFlow", "Librosa", "Scikit-learn"],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("speech-emotion-recognition"),
    gallery: [],
  },
  {
    slug: "hybrid-movie-recommender",
    title: "Hybrid Movie Recommendation System",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "Recommender Systems",
    year: "2024",
    context: "",
    status: "published",
    featured: false,
    filters: ["nlp-recsys"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Combined collaborative filtering (Surprise) with content-based filtering (NLP on metadata, cosine similarity) into a blended hybrid recommender.",
    ],
    metrics: [],
    techStack: ["Python", "Scikit-learn", "NLTK", "Surprise"],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("hybrid-movie-recommender"),
    gallery: [],
  },
  {
    slug: "time-series-forecasting",
    title: "Time Series Forecasting",
    tagline: "", // TODO (CONTENT.md → Missing)
    category: "Time Series",
    year: "2023",
    context: "",
    status: "published",
    featured: false,
    filters: ["forecasting"],
    overview: "", // TODO (CONTENT.md → Missing)
    problem: "", // TODO (CONTENT.md → Missing)
    solution: "", // TODO (CONTENT.md → Missing)
    features: [
      "Applied decomposition and stationarity testing, then benchmarked ARIMA, SARIMA, and Prophet using RMSE and MAE to select the best model.",
    ],
    pipelineSteps: [
      "Decomposition",
      "Stationarity testing",
      "Benchmark ARIMA, SARIMA, Prophet (RMSE, MAE)",
      "Select the best model",
    ],
    metrics: [],
    techStack: ["Python", "ARIMA", "SARIMA", "Prophet"],
    githubUrl: "",
    demoUrl: "",
    coverImage: cover("time-series-forecasting"),
    gallery: [],
  },
  // --- Coming-soon slots: fill in and switch status to "published" when ready ---
  ...[1, 2, 3].map(
    (n): Project => ({
      slug: `coming-soon-${n}`,
      title: "Coming soon",
      tagline: "",
      category: "",
      year: "",
      context: "",
      status: "coming-soon",
      featured: false,
      filters: [],
      overview: "",
      problem: "",
      solution: "",
      features: [],
      metrics: [],
      techStack: [],
      githubUrl: "",
      demoUrl: "",
      coverImage: "",
      gallery: [],
    }),
  ),
];

export const publishedProjects = projects.filter((p) => p.status === "published");
export const featuredProjects = publishedProjects.filter((p) => p.featured);
export const comingSoonProjects = projects.filter((p) => p.status === "coming-soon");

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug && p.status === "published");

/** Previous / next published project (wraps around) for detail-page navigation. */
export function getAdjacentProjects(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  const n = publishedProjects.length;
  return {
    previous: publishedProjects[(i - 1 + n) % n],
    next: publishedProjects[(i + 1) % n],
  };
}
