# roopemyller.fi

Source for my personal site, [roopemyller.fi](https://roopemyller.fi). It's a single-page portfolio built with React, TypeScript, Vite, and Framer Motion — no router, no backend. The whole site renders as three switchable **modes** (Developer / Photography / SRA shooting), each showcasing a different side of what I do, with its own theme, copy, and sections.

Each mode is a shareable link via `?mode=photography` / `?mode=shooting` (Developer is the default).

## Tech stack

- React 19 + TypeScript
- Vite 6
- Framer Motion for animation/transitions
- Web3Forms + hCaptcha for the contact form
- Self-hosted fonts via `@fontsource/*`

## Getting started

Package manager is **pnpm**.

```bash
pnpm install
pnpm dev       # start the dev server
```

Other useful commands:

```bash
pnpm build        # production build to dist/ (does not type-check)
pnpm typecheck    # tsc --noEmit
pnpm lint         # ESLint
pnpm test         # Vitest (jsdom) — unit/component tests
pnpm preview      # serve the production build locally
pnpm check        # lint + typecheck + test + build (same as the CI gate)
```

Tests live beside the code as `*.test.ts(x)`. `.github/workflows/ci.yml` runs
lint, type-check, tests and a production build on every pull request.

### Environment variables

Create a `.env.local` with:

```
VITE_WEB3FORMS_ACCESS_KEY=...
VITE_HCAPTCHA_SITE_KEY=...
```

Both are required for the contact form to submit. They're baked into the client bundle at build time, so a rebuild is needed after changing them.

## Deployment

The site deploys to **Vercel**, building via `vercel.json`.

## Project structure

```
src/
  app/          mode registry, mode context/provider, mount transition
  components/   shared UI reused across 2+ modes (Gallery, Lightbox, StatCounter, SectionReveal)
  features/     one folder per section, colocated with its styles and data
    developer/  hero/about (shared) + career, academics, projects, stats
    photography/
    shooting/
```

See `CLAUDE.md` for a deeper dive into the architecture and conventions.
