# Louay Bannani — Portfolio

Personal portfolio of **Louay Bannani**, Data Science & AI/ML Engineer.
It's a fast, static site with a dark AI-engineer design, animated sections, and a case-study page per project.

**Live:** https://louaybannani.netlify.app

## Stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, TypeScript), **static export** (`out/`) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (design tokens in `app/globals.css`) |
| Motion | [motion](https://motion.dev) and [Lenis](https://lenis.darkroom.engineering) smooth scrolling |
| Icons | [lucide-react](https://lucide.dev) and [react-icons](https://react-icons.github.io/react-icons/) |
| Contact form | [Web3Forms](https://web3forms.com) (client-side, no server) |
| Hosting | [Netlify](https://www.netlify.com) (`netlify.toml`) |

## Run locally

Requires **Node 20+**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build → static site in out/
npx serve out    # preview the production build
```

To use the contact form locally, copy `.env.example` to `.env.local`, paste your Web3Forms key into
`NEXT_PUBLIC_WEB3FORMS_KEY`, then restart `npm run dev`. Without a key, the form shows an
"email me directly" message and sends nothing.

## Edit content

All text on the site comes from two data files. Components never contain personal text.

1. **`CONTENT.md`** is the source of truth. Edit it first, so it always reflects what's on the site.
2. Mirror the change in:
   - **`data/portfolio.ts`**: identity, hero, summary, experience, education, skills, certificates,
     languages, soft skills, associative life, contact text, footer text
   - **`data/projects.ts`**: projects (cards, filters, case-study pages)
   - `data/site.ts`: navigation and UI labels · `data/seo.ts`: page title, description and keywords
3. Run `npm run build` to check it, then push.

An empty string (`""`) or empty list (`[]`) means "not provided yet", and the site hides it.
For example, setting `tagline` in `data/portfolio.ts` makes the hero tagline appear. A certificate's
**View credential** link appears once its `credentialUrl` is filled.

## Add a project

Follow **[`data/PROJECT_TEMPLATE.md`](data/PROJECT_TEMPLATE.md)**. In short: add an entry to `data/projects.ts` and drop
images in `public/projects/<slug>/`. No component changes are needed. The card, filter tab and
case-study page at `/projects/<slug>/` are generated from the data.

## Replace images

| What | Where | Notes |
|---|---|---|
| Profile photo | `public/images/profile.jpg` | Then run **`npm run photo`** to regenerate `profile.webp` (what the site displays). If the face isn't centered, adjust `PROFILE_PHOTO_POSITION` in `data/portfolio.ts`. |
| Project cover | `public/projects/<slug>/cover.jpg` | 16:9, ~1600×900, under 400 KB. Until it exists, a generated placeholder is shown. Once it exists, it's also used as the project's social preview. |
| Project gallery | `public/projects/<slug>/1.jpg`, `2.jpg`… | Also list them in the project's `gallery` in `data/projects.ts`. |
| CV (download button) | `public/Louay_Bannani_CV.pdf` | Keep the same file name. |
| Social preview image | `public/og-image.png` | 1200×630. |
| Favicon / app icons | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png` | |

Each `public/projects/<slug>/README.txt` lists the images that project expects. The site never shows a broken image:
missing files fall back to placeholders, or to the "LB" initials for the photo.

## Deploy (Netlify)

The repo includes `netlify.toml`: build command `npm run build`, publish directory `out`, Node 20,
long-term caching for hashed assets, and security headers.

1. Push to GitHub. Netlify builds and deploys automatically on every push to `main`.
2. Environment variables (Site configuration → Environment variables):
   - `NEXT_PUBLIC_WEB3FORMS_KEY`: your Web3Forms access key (required for the contact form)
   - `NEXT_PUBLIC_SITE_URL`: only if you use a custom domain (e.g. `https://louaybannani.com`)
3. These values are baked in at build time, so **trigger a redeploy after changing them**.

Canonical, Open Graph and sitemap URLs use Netlify's site URL automatically, so build on Netlify
rather than uploading a locally built `out/` folder (a local build contains `localhost` URLs).

## Project structure

```
app/                  Pages (home, /projects/[slug], 404), metadata, sitemap, robots, icons
components/           layout/ · sections/ · projects/ · ui/ · providers/
data/                 portfolio.ts · projects.ts · site.ts · seo.ts · PROJECT_TEMPLATE.md
public/               images/ · projects/<slug>/ · CV · social image · icons
scripts/              build helpers (image index, photo optimizer, Windows font-preload fix)
CONTENT.md            source of truth for all text
CLAUDE.md             conventions and rules for AI-assisted development
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static production build into `out/` |
| `npm run lint` | ESLint |
| `npm run photo` | Regenerate `profile.webp` from `profile.jpg` |
