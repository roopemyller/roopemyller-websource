# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page portfolio for roopemyller.fi (React 19 + TypeScript + Vite + Framer Motion). No router — the whole site is one page that renders as three switchable **modes** (Developer / Photography / Shooting), each showcasing a different side of the site owner (software dev, photography, competitive IPSC/SRA shooting). Within a mode, `<section id="...">` blocks are scrolled into view by `Navigation.tsx`.

## Commands

Package manager is **pnpm** (pnpm-lock.yaml is the source of truth; Vercel's `vercel.json` invokes `npm run build` at deploy time, but use pnpm locally).

- `pnpm install` — install deps
- `pnpm dev` — start Vite dev server
- `pnpm build` — production build to `dist/` (runs `vite build` only — it does **not** type-check; run `pnpm typecheck` first if you want type errors caught before a build)
- `pnpm preview` — serve the built `dist/` locally; use this to validate a production build before pushing, since dev (esbuild) and build (Rollup) can behave differently
- `pnpm lint` — ESLint (flat config in `eslint.config.js`, TypeScript + react-hooks + react-refresh rules)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` — Vitest (jsdom) unit/component tests; `pnpm test:watch` for the watcher, `pnpm test:coverage` for a v8 report
- `pnpm check` — lint + typecheck + test + build, the same gate `.github/workflows/ci.yml` runs on every PR

Tests live next to the code they cover as `*.test.ts(x)`. Vitest config is the `test` block in `vite.config.ts`; `src/test/setup.ts` stubs the jsdom-missing browser APIs (`matchMedia` reports reduced-motion **on**, so components render their static DOM — assert that, not animations) and resets `localStorage`/`data-*` between tests. Coverage-worthy targets: pure helpers, the mode/consent context reducers, and the data files (`src/app/data.test.ts` checks every gallery photo has dimensions and a file on disk). Animation/scroll/visual behaviour is out of scope here — that's for a future Playwright layer.

### Deployment target

The site deploys to **Vercel** via `vercel.json` (`framework: vite`, `npm run build`, output `dist`). `@vercel/speed-insights` renders via `src/app/Analytics.tsx`, which only mounts `<SpeedInsights />` once the visitor grants the analytics category in the cookie banner (`src/app/consent.tsx`).

## Architecture

### Mode system

`src/app/modes.ts` is the single source of truth for the three modes (`'developer' | 'photography' | 'shooting'`): each entry carries its label/icon, hero copy, about copy, contact prompt, and the list of in-page sections for that mode (`{ id, label }`, consumed by `Navigation.tsx` for both the scroll-spy nav links and `#`-anchor scrolling). `src/app/ModeContext.tsx` exposes `ModeProvider`/`useMode()` (plain React Context + `useState` — no state library) and sets `data-mode="<mode>"` on `<html>`, which is what drives per-mode theming in CSS. Adding a fourth mode means: add an entry to `modes.ts`, a `:root[data-mode="..."]` override block in `App.css`, and a `<NewMode>Mode.tsx` composition component under `src/features/<newmode>/`.

`App.tsx` is the composition root: `ModeProvider` > `Curtain` (fade-to-black overlay, always mounted) > `Navigation` (always mounted) > `ModeContent` (a plain conditional — `if (mode === 'photography') return <PhotographyMode />`, etc., not `AnimatePresence`) > `Contact` (always mounted, shared across modes — see below). `setMode` in `ModeContext.tsx` drives a "curtain" transition: it fades in an opaque overlay (`Curtain.tsx`), scrolls to top and swaps `mode` state while the overlay is fully opaque, then fades the overlay back out — this hides the mode-content swap so none of a mode's own mount animations (e.g. Hero's entrance stagger) are visible flickering in.

Each mode is a shareable/bookmarkable link via `?mode=photography` / `?mode=shooting` (`ModeContext.tsx` reads `?mode=` on mount, falls back to the `developer` default and normalizes the URL if the param is invalid). Switching modes via the nav pushes a `history` entry and updates the query param, so browser back/forward also steps through modes (`popstate` is handled to sync `mode` state back). No router is involved — this is plain `URLSearchParams` + `history.pushState`/`replaceState`, so it needs no static-host rewrites on any deploy target.

### Feature-based colocation, with one shared-components exception

Each section lives under `src/features/<name>/` as `<Name>.tsx` + `<Name>.module.css` (+ optional `.ts` data file). `Hero` and `About` are each a **single mode-aware component** (read `useMode()` and pull copy from `modes.ts`) rather than being duplicated per mode, since their layout is ~90% shared. Mode-specific content is composed by that mode's `<Mode>Mode.tsx`:
- `developer/DeveloperMode.tsx`: Hero → About → `Career` (timeline, data in `career.ts`) → `Academics` (education + thesis info, data in `education.ts`) → `Stats` (GitHub/skill counters) → `Projects` (data in `projects.ts`)
- `photography/PhotographyMode.tsx`: Hero → About → an inline Instagram callout section → `Gallery` (data in `photos.ts`, plus a Pixieset portfolio link)
- `shooting/ShootingMode.tsx`: Hero → About → `Results` (data in `results.ts`) → `Videos` (data in `videos.ts`) → `Gallery` (data in `shooting-photos.ts`)

`src/components/` is a deliberate, narrow exception to "no shared components dir" — it holds only things reused by 2+ modes with identical behavior: `Gallery`/`Lightbox` (photography + shooting galleries — `Gallery` lays photos out as a CSS-columns masonry grid so portrait/landscape/square images all keep their native aspect ratio) and `StatCounter` (developer + shooting stat bands), plus `SectionReveal`, a `whileInView` scroll-reveal wrapper used everywhere. Don't add anything else here — feature-specific UI stays feature-local.

**Contact is a single shared instance**, not duplicated per mode — it renders after the mode content with only its subheading pulled from `meta.contactPrompt`. Don't split it into three forms; the Web3Forms/hCaptcha wiring is intentionally not duplicated.

### Modals/overlays must portal to `document.body`

`.app-container` has `position: relative; z-index: 1`, which establishes its own stacking context — anything rendered inside it, no matter its own z-index value, is capped below that context and can never out-rank `Navigation`'s `z-index: 1000` (a root-level sibling). `Lightbox` renders via `createPortal(..., document.body)` for exactly this reason. Any future modal/overlay needs the same treatment — don't try to fix stacking issues by bumping a z-index that's nested inside `.app-container`.

### Theming

`App.css` defines shared base tokens on `:root` (`--bg`, `--surface`, `--text-main`, `--text-secondary`, spacing/radius/shadow) plus three `:root[data-mode="..."]` blocks that override `--accent`, `--accent-2`, `--accent-rgb`/`--accent-2-rgb` (for `rgba()` glows), and `--font-display` per mode (developer = cyan/violet + JetBrains Mono, photography = coral/gold + Playfair Display, shooting = hazard-orange/coyote-tan + Barlow Condensed). Feature `.module.css` files reference these vars — never hardcode a mode's color/font in a component stylesheet.

Fonts are self-hosted via `@fontsource/*` packages imported in `main.tsx` (not `<link>` tags) — add new weights there and in `package.json` if a design needs them.

Global concerns living outside `src/features/`:
- `main.tsx` sets up a scroll-driven parallax background effect imperatively (`DOMContentLoaded`/`scroll` listeners updating a CSS custom property), independent of React's render cycle.
- `App.css`'s `body::before` ambient grid background is accent-tinted via `rgba(var(--accent-rgb), ...)`, so it re-colors automatically on mode switch without extra JS.

### Environment variables

Vite convention: only `VITE_`-prefixed vars in `.env.local` are exposed to client code via `import.meta.env`. Currently used by `Contact.tsx`:
- `VITE_WEB3FORMS_ACCESS_KEY` — Web3Forms endpoint access key (serverless form submission)
- `VITE_HCAPTCHA_SITE_KEY` — hCaptcha site key

These are baked into the client bundle at build time, not read at runtime — changing `.env.local` requires a rebuild to take effect.

## Vite/React/motion conventions to follow

- New client-exposed env vars must be prefixed `VITE_`; never put secrets in them, since anything under `import.meta.env.VITE_*` ships in the client bundle.
- Don't import from `dist/`/build output of any package — import the package entry point.
- Mode is tracked via a `?mode=` query param (see Mode system above), not a path-based route, so it needs no static-host rewrites. If real path-based routing (e.g. `/photography`) is ever introduced, configure static-host rewrites (Vercel `rewrites`, Netlify `_redirects`, etc.) so deep links don't 404, and prefer `React.lazy`/`Suspense` for route-level code splitting.
- Before pushing a change that could affect the build (deps, config, env access), run `pnpm build && pnpm preview` locally rather than relying on `pnpm dev` alone.
- Any new Framer Motion animation must respect `prefers-reduced-motion` — use `useReducedMotion()` and skip/shorten the animation, following the pattern already in `Hero.tsx`/`SectionReveal.tsx`/`Curtain.tsx`. This isn't optional given how motion-heavy the site is.
- Scroll-based nav highlighting uses `IntersectionObserver` (`Navigation.tsx`), not scroll-position math — reuse that pattern for any similar "what's in view" logic instead of adding scroll listeners.
