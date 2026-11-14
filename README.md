# Aahana Ahir — Creative Engineering Portfolio

Portfolio: **https://aahanaahir22.github.io/**

A restrained, interactive portfolio for international full-stack, backend, AI and IT support roles, built with Next.js 16, React 19 and TypeScript.

## Work

- **FreezoneB2B** — https://freezoneb2b.vercel.app/ — Global B2B marketplace and sourcing platform, with source-attributed research and in-progress commercial integrations.
- **OpsAssist AI** — https://aahanaahir22.github.io/opsassist-ai/ — Evidence-backed incident intelligence.
- **IntegrateX** — https://aahanaahir22.github.io/integratex/ — API workflow automation.

Sourced company references, demo products and isolated staging benchmarks are explicitly differentiated from verified live inventory, customers and production throughput. Public case studies link to real demos and repositories where available.

## Design

Homepage sections: Introduction, Work, Expertise, About, GitHub and Contact. Motion is purposeful, progressive enhancement is the default, and reduced-motion preferences are respected. No audio gate or decorative introduction is required.

Paths:
- `/`
- `/resume`
- `/projects/freezoneb2b`
- `/projects/opsassist-ai`
- `/projects/integratex`

## Development

Node.js 22 or newer.

```bash
npm install
npm run dev
npm run build:github
```

The static export is compatible with GitHub Pages through `next.config.ts` and the workflow `.github/workflows/deploy-pages.yml`.

The one-page PDF resume is published at `/Aahana_Ahir_Resume_International_Impact_1_Page.pdf`.

## Reliability

- Project content and measured claims are contained in `data/projects.ts`.
- Certifications and localized résumé data are in `data/resume.ts`.
- Layout styles are in `app/editorial.css`.
- Interactive client components: `EditorialPortfolio` and `CaseExplorer`.
- Never put secrets or private GitHub credentials in static client code.

Run `npx tsc --noEmit` and `npm run build:github` before merging. The PR validation workflow checks exported pages, removed obsolete project routes and the PDF.
