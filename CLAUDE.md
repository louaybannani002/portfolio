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
components/layout/    Navbar, MobileMenu, Logo, SectionLink, Footer, BackToTop, ScrollProgress, CustomCursor,
                      IntroLoader (first-visit "LB" loader + inline head script)
components/ui/        Primitives: Reveal, SectionHeading, MagneticButton, CountUp, FallbackImage,
                      ProfileImage/ProfileAvatar, ProjectCover, SpotlightCard, Toast,
                      TechIcon/IssuerLogo + IconSprite (brand icons via one SVG sprite)
components/sections/  Page sections: Hero, About, Experience, Projects, Skills, Certificates (+ Extras), Contact
                      with sub-parts in hero/, about/, experience/, skills/, certificates/, contact/
components/projects/  Project cards, filter explorer, detail page, diagrams, gallery/lightbox
app/projects/[slug]/  Static case-study pages (generateStaticParams, dynamicParams = false)
app/template.tsx      Page enter transition (client-side navigations only)
lib/                  Small helpers: highlight.tsx (phrase + metric highlighting),
                      techIcons.ts (tech/issuer name → brand icon; unmapped names render as mono pills)
hooks/                useActiveSection, usePrefersReducedMotion, useFinePointer, useFocusTrap
scripts/              gen-assets.mjs (prebuild/predev: indexes public/ images → lib/assets.generated.ts),
                      fix-next-font-windows.mjs (postinstall: Windows-only Next.js font-preload fix),
                      optimize-photo.mjs (`npm run photo`: profile.jpg → profile.webp)
app/sitemap.ts, robots.ts, manifest.ts, not-found.tsx, icon.png, apple-icon.png, favicon.ico
data/seo.ts           Site URL, title/description/keywords, OG image, JSON-LD Person
data/portfolio.ts     ALL personal content (identity, experience, skills, certificates…)
data/projects.ts      ALL projects (typed Project interface)
data/site.ts          Nav links + section labels ("02 — EXPERIENCE"), UI labels
data/PROJECT_TEMPLATE.md  How to add a project
public/images/profile.jpg Profile photo source → `npm run photo` → profile.webp (PROFILE_PHOTO)
public/projects/<slug>/   cover.jpg, 1.jpg, 2.jpg… per project
public/Louay_Bannani_CV.pdf  Downloadable CV (CV_PATH)
netlify.toml          Build (npm run build → out/, Node 20), caching + security headers
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
- Links to home sections go through `SectionLink` (a plain `#id` anchor on "/", or a Next link to "/#id" elsewhere).
- In-page links are plain `<a href="#id">`. SmoothScrollProvider intercepts them (navbar offset,
  focus management). For programmatic scrolling use `useSmoothScroll().scrollTo("#id")`.
- Custom cursor: only on `(hover: hover) and (pointer: fine)`. Add `data-cursor="hover"` to
  make non-link elements grow the ring.
- Semantic HTML, visible focus states, alt text and sufficient contrast.

## Static export compatibility

- No server-only features: no API routes, server actions, middleware, ISR/revalidate,
  `cookies()`/`headers()` or runtime `next/image` optimization.
- Dynamic routes (e.g. `/projects/[slug]`) must export `generateStaticParams` from `data/projects.ts`.
- Fixed overlays (lightbox, modals) must be portaled to `document.body`. Ancestors with `transform`
  or `filter` (Reveal, the page transition) break `position: fixed`.
- Adding a project must never require component changes: everything is driven by `data/projects.ts`.
- Browser-only code (Lenis, window) goes in `"use client"` components inside `useEffect`.

## SEO

- All SEO text lives in `data/seo.ts` (mirrors CONTENT.md → "SEO"). Root metadata in `app/layout.tsx`,
  per-project metadata in `app/projects/[slug]/page.tsx` (uses the project cover as OG image once it exists).
- `SITE_URL` = `NEXT_PUBLIC_SITE_URL` → Netlify's build-time `URL` → localhost. Absolute URLs (canonical,
  OG, sitemap, robots) are baked in at build time, so a local build contains localhost URLs.
- `public/og-image.png` (1200×630) and the icon set are static; regenerate them if the name/title changes.

## Performance rules (Lighthouse 90+ mobile)

- The hero entrance is **CSS** (`.hero-enter` / `.hero-letter`), not motion: it must start at first paint,
  not after hydration. Don't move above-the-fold content back to JS-driven entrance animations.
- The intro loader's logo is an inlined image on purpose (it is the LCP; gradient/transparent text is
  ignored by LCP and web-font text re-renders on swap).
- Below-the-fold sections carry `cv-auto` (content-visibility). Programmatic scrolling adds
  `html.cv-visible` first so targets are measured with real heights.
- Brand icons go through `TechIcon`/`IssuerLogo` (sprite `<use>`), never raw react-icons in repeated lists.
- Phones/touch: no backdrop-filter on `.glass`, no continuous gradient-border/node-glow animations.
- Above-the-fold images: `priority` on FallbackImage/ProjectCover. Everything else stays lazy.
- Images missing from public/ are never requested (gen-assets index) — no 404s in the console.

## Contact form

- Web3Forms, posted client-side to `https://api.web3forms.com/submit` (static export: no server).
- Key: `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (gitignored; template in `.env.example`) and in
  the Netlify environment variables. It is inlined at build time, so rebuild after changing it.
  Without a key the form shows a "not set up" message with a mailto fallback and sends nothing.
- Never send real test submissions. Mock `api.web3forms.com` when testing.

## Definition of done

**Run `npm run build` before finishing any task.** It must pass with no type or lint errors,
and the `out/` folder must be generated.
