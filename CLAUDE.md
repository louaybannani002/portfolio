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
app/                  Routes (App Router). layout.tsx (fonts, providers, navbar), page.tsx, globals.css (tokens)
components/providers/ AppProviders (MotionConfig), SmoothScrollProvider (Lenis + anchor links, useSmoothScroll)
components/layout/    Navbar, MobileMenu, Logo, ScrollProgress, CustomCursor
components/ui/        Primitives: Reveal, SectionHeading, MagneticButton, CountUp, FallbackImage,
                      ProfileImage/ProfileAvatar, ProjectCover
components/sections/  Page sections: Hero, About, Experience (+ hero/, about/, experience/ sub-parts)
lib/                  Small helpers (highlight.tsx: phrase + metric highlighting)
hooks/                useActiveSection, usePrefersReducedMotion, useFinePointer
data/portfolio.ts     ALL personal content (identity, experience, skills, certificates…)
data/projects.ts      ALL projects (typed Project interface)
data/site.ts          Nav links + section labels ("02 — EXPERIENCE"), UI labels
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

Premium, dark, modern AI-engineer aesthetic (Linear / Vercel style).
- Background `#0a0a0f`, subtle fixed grain overlay (body::after), glass cards (`glass` utility:
  translucent fill, thin `border-border`, backdrop blur).
- **One accent gradient only**: electric blue `--accent` (#3b82f6) → violet `--accent-2` (#8b5cf6).
  Use the `bg-accent-gradient` / `text-gradient` utilities; don't introduce other accent hues.
- Fonts (next/font): Space Grotesk `font-display` for headings, Inter `font-sans` for body,
  JetBrains Mono `font-mono` / `label-mono` for small technical labels.
- Tokens live in `app/globals.css` (`:root` + `@theme`): colors (`bg-surface`, `text-muted`,
  `border-border`…), radius (`rounded-card`, `rounded-control`, `rounded-pill`), spacing
  (`py-section`, `px-gutter`, `h-nav`), container (`max-w-content`). Never hard-code hex values in components.
- Sections: `<section id="…" aria-labelledby="…-heading" className="mx-auto max-w-content px-gutter py-section">`
  starting with `<SectionHeading section="…" />`. Wrap content in `<Reveal>` (use `stagger` for lists).
- Must look polished on mobile (≥ 360px) and never scroll horizontally.

## Motion and accessibility

- **Always respect `prefers-reduced-motion`**: use `usePrefersReducedMotion()` (hooks/). Inside
  effects, also check `prefersReducedMotion()` directly, because the hook returns the SSR default on the first commit.
  With reduced motion: Lenis is off, the custom cursor is off, and Reveal/SectionHeading fall back to opacity only.
  Keep `MotionConfig reducedMotion="user"` and the global CSS guard.
- In-page links are plain `<a href="#id">`. SmoothScrollProvider intercepts them (navbar offset,
  focus management). For programmatic scrolling use `useSmoothScroll().scrollTo("#id")`.
- Custom cursor: only on `(hover: hover) and (pointer: fine)`. Add `data-cursor="hover"` to
  make non-link elements grow the ring.
- Semantic HTML, visible focus states, alt text and sufficient contrast.

## Static export compatibility

- No server-only features: no API routes, server actions, middleware, ISR/revalidate,
  `cookies()`/`headers()` or runtime `next/image` optimization.
- Dynamic routes (e.g. `/projects/[slug]`) must export `generateStaticParams` from `data/projects.ts`.
- Browser-only code (Lenis, window) goes in `"use client"` components inside `useEffect`.

## Definition of done

**Run `npm run build` before finishing any task.** It must pass with no type or lint errors,
and the `out/` folder must be generated.
