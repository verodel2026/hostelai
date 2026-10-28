# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Reglas fijas

- Responder siempre a Vero en español.
- Nunca publicar desde Google AI Studio (rompe el pre-renderizado).
- Antes de cada commit: `npm run lint`, `npm run build` y comprobar que el texto cambiado aparece en `dist/index.html`.
- Publicar = `git push` a `main`; Vercel despliega solo.
- No hacer commit ni push sin que Vero lo confirme.
- Nunca poner tokens de GitHub en la URL del remoto ni en archivos.
- Imágenes del método con URLs absolutas de `raw.githubusercontent.com` (como las de `paso1-escucho.webp`, etc. en `App.tsx`).
- Diseño: Fraunces + Archivo, colores con prefijo `brand-` definidos en `src/index.css`, iconos de Lucide (`lucide-react`).
- No ejecutar `npm audit fix --force`.

## What this is

Marketing site for **HostelAI** (www.hostelai.es), Verónica Delgado's consultancy for bars, cafés and small restaurants around A Coruña (Google reviews / Google Business Profile management, operations). All content is in **Spanish**; commit messages are written in Spanish too. Deployed on Vercel. The project was bootstrapped from a Google AI Studio template; its leftover files and dependencies have been removed and the site uses no API keys or environment variables.

## Commands

```bash
npm install
npm run dev      # Vite dev server on port 3000
npm run build    # client build + SSR build + prerender (see below)
npm run lint     # type-check only (tsc --noEmit); there is no test suite
```

## Architecture

Two independent kinds of pages live side by side:

1. **The React single-page home** (`index.html` → `src/main.tsx` → `src/App.tsx`).
   - `src/App.tsx` is one large component file containing the whole landing page (sections, modals, mockups, the interactive review demo). Navigation is by scrolling to section ids, not routing.
   - Nearly all copy lives in `src/constants.ts` as `PROJECT_DATA` (services, rates, problems, process, blog posts, legal texts, contact info, Formspree id). Change copy there rather than in JSX where possible. Blog posts are entries in `PROJECT_DATA.blog`, rendered in a modal (`BlogPostModal`), not separate URLs.
   - Styling is Tailwind v4 via `@tailwindcss/vite`; theme tokens (`--color-brand-*`, the dark "night mode" navy palette) and fonts (Fraunces + Archivo, plus Caveat/Courier Prime) are defined in `src/index.css` under `@theme`. Light "paper" sections re-scope those tokens via classes like `.papel-grano` / `.bg-white`.

2. **Static SEO pages** in `public/<slug>/index.html` (local landing pages `gestion-resenas-<town>`, guides like `como-subir-nota-google`, the `/manual-resenas` sales page) plus `public/portfolio.html`. These are hand-written, self-contained HTML with inline `<style>`, their own meta/canonical/OG tags and JSON-LD (Article / FAQPage). They do not share CSS or components with the React app, so visual/branding changes must be applied to each file separately. Canonical URLs use `https://www.hostelai.es/<slug>/` (with `www` and trailing slash).

### Build / prerender (SSG)

`npm run build` runs three steps: normal Vite client build → SSR build of `src/entry-server.tsx` into `dist-ssr/` → `scripts/prerender.mjs`, which calls `render()` and injects the HTML into `<div id="root">` of `dist/index.html`, then deletes `dist-ssr/`. `src/main.tsx` hydrates when the root already has children, otherwise renders from scratch (dev).

Consequence: `App.tsx` must render on the server. Do not touch `window`/`document`/`localStorage` during render — only inside event handlers or effects.

### Routing and SEO files

- `vercel.json` rewrites `/portfolio` → `/portfolio.html` and everything else to `/index.html`; real files in `public/` (the static pages) are served first.
- When adding or removing a static page, also update `public/sitemap.xml` and, where relevant, the cross-links between pages (footer "zonas" links on local pages, related-guide links).
- The booking CTA everywhere is the Calendly link `https://calendly.com/hostelaicalendly/30min`; it is hard-coded in both `App.tsx` and the static pages, so changing it means a repo-wide replace.

## Content conventions

- Case studies in blog posts and guides are anonymised: never name real clients' venues.
