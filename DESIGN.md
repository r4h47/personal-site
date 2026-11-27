# DESIGN.md — Maeen Uddin · Engineering Portfolio

Adapted from the community "Vercel-inspired" and "Linear-inspired" design analyses in
`VoltAgent/awesome-design-md` (themselves unofficial). Tuned for an engineering profile:
precise, quiet, data-forward. One chromatic accent, used only where something is "energized".

## 1. Principles

- **Blueprint, not brochure.** Hairline structure, monospaced data, generous whitespace.
- **Depth from surfaces and 1px borders, not shadows.** No heavy drop shadows anywhere.
- **One accent.** Amber = energized / live / selected. Never decorative, never a gradient.
- **Numbers are the hero.** Every metric, rating, date, and GPA uses `tabular-nums`.
- **Truth over polish.** Only verified candidate data. No placeholder or invented figures.

## 2. Color tokens

Semantic tokens only — components never use raw hex. Defined in `src/app/globals.css`.

| Token          | Light       | Dark        | Use                                         |
|----------------|-------------|-------------|---------------------------------------------|
| `canvas`       | `#fafafa`   | `#08090a`   | Page background                             |
| `surface`      | `#ffffff`   | `#0f1011`   | Panels, inputs                              |
| `surface-2`    | `#f4f4f5`   | `#16171a`   | Hover / selected surface                    |
| `line`         | `#e7e7e9`   | `#23252a`   | 1px structural borders, dividers            |
| `line-strong`  | `#cfcfd4`   | `#34343a`   | Hover borders, SLD conductors               |
| `ink`          | `#171717`   | `#f7f8f8`   | Headings, primary text, primary button fill |
| `ink-muted`    | `#45464d`   | `#c9ced6`   | Body copy                                   |
| `ink-subtle`   | `#66676e`   | `#8a8f98`   | Captions, labels (≥ 4.5:1 on canvas)        |
| `accent`       | `#b45309`   | `#f2b44c`   | Energized lines, focus ring, active state   |
| `accent-soft`  | amber @ 9%  | amber @ 10% | Selected backgrounds                        |

Contrast: all text tokens meet WCAG AA (≥ 4.5:1) on `canvas` and `surface` in both themes.
Data-viz second series uses `ink-subtle` **plus a hatch pattern** — never color alone.

## 3. Typography

- Sans: **Inter** (400 / 500 / 600). Weight ceiling 600. Sentence case. Negative tracking on display.
- Mono: **JetBrains Mono** (400 / 500) — metrics, voltage ratings, dates, equipment specs, eyebrows.

| Role        | Size / line-height       | Weight | Tracking  |
|-------------|--------------------------|--------|-----------|
| Display     | clamp(36px→60px) / 1.04  | 600    | -0.035em  |
| H2          | clamp(28px→40px) / 1.12  | 600    | -0.025em  |
| H3          | 18–22px / 1.3            | 600    | -0.01em   |
| Body-lg     | 18px / 1.6               | 400    | 0         |
| Body        | 16px / 1.6               | 400    | 0         |
| Small       | 14px / 1.5               | 400    | 0         |
| Eyebrow     | 12px mono / 1.3          | 500    | +0.08em, uppercase |
| Metric      | 32–40px / 1              | 600    | -0.02em, tabular-nums |

## 4. Spacing, radius, layout

- 4px base: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- Radius: 6px chips · 8px buttons & inputs · 12px panels · 9999px status pills only.
- Max content width 1200px; gutters 20px (mobile) → 32px (≥ 640px).
- Breakpoints: 390 · 640 · 768 · 1024 · 1280 · 1440.
- Section rhythm: 96px desktop / 64px mobile; sections separated by a 1px `line` rule.

## 5. Components

- **Primary button:** `ink` fill, `canvas` text, 8px radius, 40px tall (44px on touch).
- **Secondary button:** `surface` fill, 1px `line` border → `line-strong` on hover.
- **Icon button:** 36px desktop / 44px mobile, always has `aria-label`.
- **Panel:** `surface`, 1px `line`, 12px radius. Never nest a panel inside a panel —
  inner structure uses dividers and definition lists instead.
- **Chip / tag:** 6px radius, 1px `line`, mono 12px.
- **Segmented filter:** buttons with `aria-pressed`, active = `surface-2` + `ink` text + accent underline.
- **Inputs:** 44px tall, visible `<label>`, error text below the field, `aria-invalid` + `aria-describedby`.

## 6. Motion

- Micro-interactions 150–200ms `cubic-bezier(0.16, 1, 0.3, 1)`; transform/opacity only.
- Scroll reveals are CSS-only (`animation-timeline: view()`), progressive — content is
  never hidden when unsupported.
- The SLD travelling-wave pulse is an illustration; it moves at constant speed so the arrival-time
  difference is physically consistent. It never presents itself as live or measured data.
- `prefers-reduced-motion: reduce` removes all non-essential motion.

## 7. Don't

- No gradient text, no purple-blue gradients, no glow blobs.
- No emoji or icon tiles above headings.
- No cards inside cards.
- No placeholder copy, lorem ipsum, or unverified metrics.
- No weight 700+ on the sans; no all-caps headlines (eyebrows only).
