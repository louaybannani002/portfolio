# Louay Bannani — Portfolio

Personal portfolio built with Next.js 15 (App Router, static export), Tailwind CSS v4, motion and Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

**Netlify:** build command `npm run build`, publish directory `out`, and the environment variable
`NEXT_PUBLIC_WEB3FORMS_KEY` (your free key from https://web3forms.com) for the contact form.

**Local contact form:** copy `.env.example` to `.env.local`, paste the key, then restart `npm run dev`.

- Content: `CONTENT.md` → `data/portfolio.ts`, `data/projects.ts`
- Add a project: `data/PROJECT_TEMPLATE.md`
- Project rules: `CLAUDE.md`
