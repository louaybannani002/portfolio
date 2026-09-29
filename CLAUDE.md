# CLAUDE.md — Louay Bannani portfolio

Personal portfolio of Louay Bannani (Data Science & AI/ML Engineer). It is a static site deployed on Netlify.

## Stack (do not change without asking)

- **Next.js 15** App Router + **TypeScript**
- **Static export**: `output: "export"`, `images.unoptimized: true`, `trailingSlash: true` (next.config.ts)
- **Tailwind CSS v4** (CSS-first config in `app/globals.css` via `@theme`; there is no tailwind.config)
- **motion** (`import { motion } from "motion/react"`) for animations
- **lenis** for smooth scrolling
- **lucide-react** and **react-icons** for icons (react-icons for brand/tech logos, lucide for UI)

## Folder structure

```
app/                  Routes (App Router). layout.tsx, page.tsx, globals.css
components/ui/        Reusable UI primitives (FallbackImage, ProfileAvatar, ProjectCover…)
components/sections/  Page sections (Hero, About, Experience…), when built
data/portfolio.ts     ALL personal content (identity, experience, skills, certificates…)
data/projects.ts      ALL projects (typed Project interface)
data/PROJECT_TEMPLATE.md  How to add a project
public/images/profile.jpg Profile photo (path constant: PROFILE_PHOTO)
public/projects/<slug>/   cover.jpg, 1.jpg, 2.jpg… per project
public/Louay_Bannani_CV.pdf  Downloadable CV (CV_PATH)
CONTENT.md            Source of truth for all text
LouayBannani(CV).pdf  Original CV (keep, do not rename)
```

## Content rules

- **CONTENT.md is the single source of truth.** All content lives in `data/`; components never
  hard-code personal text. To change content, edit CONTENT.md first, then mirror it in `data/`.
- Never invent, paraphrase away or change facts, numbers, dates or company names.
- Empty strings or arrays mean "not provided yet". The UI must hide them gracefully and never
  render placeholder copy such as "Lorem ipsum" or "TBD".
- The phone number (+216 52070154) may be displayed (approved by Louay).
- Git commits use `Louay Bannani <louay.bannani002@gmail.com>` only.

## Images

- Never show a broken image. Always render through `FallbackImage` or its wrappers:
  - `ProjectCover` → a missing cover shows a generated placeholder (gradient + category icon + title)
  - `ProfileAvatar` → a missing photo shows the "LB" initials
- Use plain `<img>` (via FallbackImage), not `next/image` optimization (static export).

## Design direction

Dark premium AI aesthetic: near-black background (`--background`), subtle surfaces, violet
(`--accent`) and cyan (`--accent-2`) accents, glassy borders (`border-white/10`), soft glows and
gradients, Geist Sans/Mono, generous spacing and restrained motion. It must look polished on mobile
(≥ 360px) and never scroll horizontally. Use the tokens from `globals.css`; don't scatter raw hex values.

## Motion and accessibility

- **Always respect `prefers-reduced-motion`**: use `useReducedMotion()` from motion, disable Lenis
  when reduced motion is on, and keep the global CSS reduced-motion guard.
- Semantic HTML, visible focus states, alt text and sufficient contrast.

## Static export compatibility

- No server-only features: no API routes, server actions, middleware, ISR/revalidate,
  `cookies()`/`headers()` or runtime `next/image` optimization.
- Dynamic routes (e.g. `/projects/[slug]`) must export `generateStaticParams` from `data/projects.ts`.
- Browser-only code (Lenis, window) goes in `"use client"` components inside `useEffect`.

## Definition of done

**Run `npm run build` before finishing any task.** It must pass with no type or lint errors,
and the `out/` folder must be generated.
