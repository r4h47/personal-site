# CLAUDE.md — Engineering rules for this repo

Personal engineering portfolio for Maeen Uddin Mohammad Abdur Rahman.
Stack: Next.js (App Router, static export) · TypeScript · Tailwind CSS v4.
Design source of truth: `./DESIGN.md`. Content source of truth: `src/data/profile.ts`.

## Content integrity (highest priority)

- Every fact, metric, date, and credential comes from `src/data/profile.ts`, which holds
  only candidate-verified data. Never invent metrics, employers, dates, issuers, or skills.
- No placeholder text (`[EDIT]`, lorem ipsum, "TBD", sample names) may ship.
- If data is missing, omit the element. Do not fill the gap with plausible-sounding copy.

## Forbidden "AI slop"

- No gradient text headlines, no purple-to-blue gradients, no glow blobs or orbs.
- No emoji, and no decorative icon tiles stacked above headings.
- No cards nested inside cards — use dividers / definition lists for inner structure.
- No generic hero filler ("passionate", "innovative solutions", "cutting-edge").

## Web interface guidelines (Vercel-style)

- `tabular-nums` on every metric, rating, voltage, date range, and GPA.
- Hit targets ≥ 24×24px on desktop and ≥ 44×44px on touch / below 768px.
- Visible `:focus-visible` outline on every interactive element (2px accent, 2px offset).
- Semantic landmarks: one `<header>`, `<nav>`, `<main id="main">`, `<footer>`;
  sections are `<section aria-labelledby>`; repeated entries are `<article>`.
- Sequential headings (h1 → h2 → h3); exactly one `h1` per page.
- Icon-only buttons need `aria-label`; toggles use `aria-pressed`; live updates use `aria-live`.
- `prefers-reduced-motion` respected; animate transform/opacity only.
- No horizontal scroll at 390px. Body text ≥ 16px on mobile.
- Forms: visible labels, validate on blur, errors under the field, focus first invalid field.
- Color is never the only signal (charts use labels + hatch patterns).

## SEO & recruiter discoverability

- Full metadata in `src/app/layout.tsx`: title, description, canonical, OpenGraph, Twitter.
- schema.org `Person` JSON-LD on the home page.
- `robots.txt`, `sitemap.xml`, and an OG image are generated at build time.
- `/resume` is a printable CV view (Print / Save as PDF) built from the same data file.

## Workflow

- `npm run dev` — local dev at http://localhost:3000
- `npm run build` — static export to `out/` (no base path; for local preview)
- `npm run deploy` — builds with `/personal-site` base path and publishes `out/` to the
  `gh-pages` branch → https://r4h47.github.io/personal-site/
- Before shipping: `npm run typecheck`, then check 1440×900, 768×1024, and 390×844 for
  console errors, overflow, and focus order.
