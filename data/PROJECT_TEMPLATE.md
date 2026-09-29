# How to add a new project

All projects live in `data/projects.ts` in the `projects` array. No component changes are needed:
the site renders whatever is in that file.

## 1. Add the text to CONTENT.md first

`CONTENT.md` is the source of truth. Add a new `### N. <Title>` entry under **Projects** with the
bullets, stack, year and metrics. Then copy that text into `data/projects.ts` word for word.

## 2. Pick a slug

Use lowercase, hyphen-separated and unique, e.g. `fraud-detection-xgboost`. The slug is used in:
- the project page URL: `/projects/<slug>/`
- the image folder: `public/projects/<slug>/`

## 3. Add the entry to `data/projects.ts`

Either copy the block below into the `projects` array (before the coming-soon slots), or replace
one of the `coming-soon-N` slots with it.

```ts
{
  slug: "my-project",                  // unique, kebab-case
  title: "My Project",
  tagline: "One line that sells it.",  // "" hides it
  category: "Computer Vision",         // see categories below (controls placeholder icon)
  year: "2026",
  context: "Internship — Company",     // or "Personal project", "Academic project", ""
  status: "published",                 // "published" | "coming-soon"
  featured: false,                     // true = large alternating card on the home page
  filters: ["computer-vision"],        // filter tabs it appears under (see below)
  overview: "Short summary of the project.",
  problem: "What problem did it solve?",
  solution: "How did you solve it?",
  features: [
    "What you built, one bullet per item.",
  ],
  pipelineSteps: ["Step 1", "Step 2"], // optional: animated pipeline in the Architecture section
  // architecture: [...],              // optional: layered diagram instead of the pipeline (see below)
  metrics: [
    { value: "93%", label: "Accuracy" },
  ],
  techStack: ["Python", "PyTorch"],
  githubUrl: "",                       // "" hides the GitHub button
  demoUrl: "",                         // "" hides the demo button
  coverImage: "/projects/my-project/cover.jpg",
  gallery: [
    "/projects/my-project/1.jpg",
    "/projects/my-project/2.jpg",
  ],
},
```

### Field reference

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | Unique and URL-safe. It must match the image folder name. |
| `title` | yes | |
| `tagline` | no | Short one-liner shown on cards. |
| `category` | yes | Existing categories: `Multi-Agent AI`, `Computer Vision`, `LLMs & RAG`, `Deep Learning`, `Recommender Systems`, `Time Series`. A new category works too; it just gets a generic ✨ icon on the placeholder. You can map an icon to it in `components/ui/ProjectCover.tsx`. |
| `year` | yes | A string, so `"2025–2026"` works. |
| `context` | no | Where or why it was built. |
| `status` | yes | `coming-soon` shows a teaser card with no detail page. |
| `featured` | yes | Keep about 3 featured projects. |
| `filters` | yes | Any of `llm-agents`, `computer-vision`, `deep-learning`, `forecasting`, `nlp-recsys`. A tab is hidden when no published project uses it. |
| `overview` / `problem` / `solution` | no | Case-study sections. Empty strings are hidden. Separate paragraphs with a blank line (`

`). |
| `features` | yes | At least one bullet. Percentages such as "93%" or "9% MAPE" are highlighted automatically. |
| `pipelineSteps` | no | Animated step-by-step flow in the "Architecture" section. |
| `architecture` | no | Layered diagram (takes precedence over `pipelineSteps`). See PrediBot for an example. |
| `metrics` | no | The first one is the badge on cards. All of them appear in "Results" with a count-up animation. |
| `techStack` | yes | Shown as tags. |
| `githubUrl` / `demoUrl` | no | Full `https://` URLs. |
| `coverImage` | yes | Path under `public/`, starting with `/`. |
| `gallery` | no | Ordered list of image paths. |

### Architecture diagrams (optional)

Tiers are drawn top to bottom, with animated connectors between them. A tier with a single node
is drawn as the central hub. The icons are `whatsapp`, `chat`, `bot`, `inventory`, `haccp`,
`suppliers`, `hr`, `production`, `forecast`, `workflow`, `server`, `alert`, `database`, `api`,
`model` and `document`.

```ts
architecture: [
  { label: "Input", nodes: [{ title: "Invoices", icon: "document" }] },
  { label: "Models", nodes: [{ title: "CNN", subtitle: "Field extraction", icon: "model" }, …] },
],
```

### What appears automatically

- **Home page:** a card (large if `featured`) with the cover, metric badge, tech pills and buttons.
  The GitHub and Live demo buttons only appear when their URL is set.
- **Detail page:** `/projects/<slug>/`, generated at build time for every `published` project.
  Sections without data are hidden. The Gallery shows "Screenshots coming soon" until you add images.
- **Previous / next** navigation between published projects, in the array order.

## 4. Add the images

Create the folder `public/projects/<slug>/` and add:

```
public/projects/<slug>/
├── cover.jpg   ← 16:9, ~1600×900 px, under 400 KB (card + project hero)
├── 1.jpg       ← gallery image 1
├── 2.jpg       ← gallery image 2
└── ...
```

- A missing `cover.jpg` is fine: the site shows a generated placeholder (gradient, category
  icon and title). Broken images never appear.
- Only images listed in `gallery` are shown. Adding a file to the folder is not enough.
- PNG or WebP also work if you use the same extension in `data/projects.ts`.
- Compress images before adding them (e.g. squoosh.app).

## 5. Check

```bash
npm run build
```

The build must pass, because the static export fails if a project page can't be generated. Then run
`npx serve out` and check the card and the project page.
