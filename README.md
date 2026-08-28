# Aahana Ahir — Intelligent Systems Portfolio

An immersive, responsive technical portfolio for Aahana Ahir, a final-year Computer Science Engineering student focused on Python, AI/ML, backend systems and cloud-ready software.

## Experience

- Opt-in Web Audio entry with a silent alternative
- Spatial intelligence-core hero and scroll-led editorial sections
- Interactive skills-to-project mapping
- Four reusable, evidence-aware project case studies
- Interactive system traces and architecture flows
- Honest project-state, metric and evidence labels
- Responsive mobile layouts and reduced-motion support
- Keyboard navigation, semantic structure, sitemap and metadata

## Routes

- `/` — portfolio universe
- `/projects/opsassist-ai`
- `/projects/integratex`
- `/projects/healthbridge`
- `/projects/suicide-prevention-microservice`

## Project structure

```text
app/
  layout.tsx                 Site metadata and shell
  page.tsx                   Main portfolio route
  projects/[slug]/page.tsx  Reusable case-study route
components/
  PortfolioExperience.tsx   Main interactive experience
  ProjectTrace.tsx          Case-study system simulator
data/
  projects.ts               Editable project content
```

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Run the production build with:

```bash
npm run build
```

Create the static GitHub Pages build with:

```bash
npm run build:github
```

The included GitHub Actions workflow publishes the `out` directory whenever
the `main` branch is updated. For the address `https://aahanaahir22.github.io`,
the repository must be named exactly `aahanaahir22.github.io` and GitHub Pages
must use **GitHub Actions** as its source.

## Content updates

Project content, statuses, evaluation plans and architecture stages live in `data/projects.ts`. Replace the disabled résumé, GitHub and demo placeholders only after the corresponding URLs or files are verified.

The portfolio intentionally does not invent repositories, metrics, clients, testimonials, users or deployment claims. Prototype results and future evaluation criteria remain visually separate.
