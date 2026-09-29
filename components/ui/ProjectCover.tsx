import {
  AudioLines,
  Bot,
  BrainCircuit,
  Clapperboard,
  FileScan,
  LineChart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { FallbackImage } from "./FallbackImage";
import type { Project } from "@/data/projects";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Multi-Agent AI": Bot,
  "Computer Vision": FileScan,
  "LLMs & RAG": BrainCircuit,
  "Deep Learning": AudioLines,
  "Recommender Systems": Clapperboard,
  "Time Series": LineChart,
};

const GRADIENTS = [
  "from-indigo-600/70 via-violet-700/40 to-slate-950",
  "from-cyan-500/60 via-sky-800/40 to-slate-950",
  "from-fuchsia-600/60 via-purple-800/40 to-slate-950",
  "from-emerald-500/50 via-teal-800/40 to-slate-950",
  "from-amber-500/50 via-orange-800/30 to-slate-950",
  "from-blue-600/60 via-indigo-900/40 to-slate-950",
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type CoverProject = Pick<Project, "slug" | "title" | "category" | "coverImage">;

/** Generated placeholder: deterministic gradient + category icon + title. */
export function ProjectPlaceholder({ project }: { project: CoverProject }) {
  const Icon = CATEGORY_ICONS[project.category] ?? Sparkles;
  const gradient = GRADIENTS[hash(project.slug) % GRADIENTS.length];

  return (
    <div
      role="img"
      aria-label={project.title}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br ${gradient} p-6 text-center`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <Icon aria-hidden className="relative h-10 w-10 text-white/85" strokeWidth={1.5} />
      <span className="relative text-sm font-medium text-white/90">{project.title}</span>
    </div>
  );
}

interface ProjectCoverProps {
  project: CoverProject;
  className?: string;
}

/** Project cover image; missing/failed file → generated placeholder. */
export function ProjectCover({ project, className = "" }: ProjectCoverProps) {
  return (
    <div className={`relative aspect-video overflow-hidden bg-surface ${className}`}>
      <FallbackImage
        src={project.coverImage}
        alt={project.title}
        className="h-full w-full object-cover"
        fallback={<ProjectPlaceholder project={project} />}
      />
    </div>
  );
}
