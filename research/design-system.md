# Design system: itsjay.us

**M** = measured (computed styles or CSS). **E** = estimated from screenshots.

## Philosophy
Swiss/editorial minimalism. Everything is grayscale, and all the colour comes from project media. Huge, tight display type sits next to small UI text. Dark rounded panels sit on a light grey page. There's lots of empty space, and motion drives the experience. Personality comes through in the copy ("A seriously good design engineer", "Scroll for cool sh*t").

## Colour (M): Tailwind v4 neutral scale only
| Token | Hex | Use |
|---|---|---|
| neutral-100 | #f5f5f5 | page background, light text on dark |
| neutral-200 | #e5e5e5 | footer tiles |
| neutral-300 | #d4d4d4 | secondary text on dark (category, marquee) |
| neutral-400 | #a1a1a1 | secondary text on light (info-row values) |
| neutral-700 | #404040 | chip backgrounds on dark (E) |
| neutral-800 | #262626 | inner service cards |
| neutral-900 | #171717 | primary text, dark panels, dock, CTA |

No accent colour. Contrast: #171717 on #f5f5f5 ≈ 16:1. #a1a1a1 on #f5f5f5 ≈ 2.4:1, which **fails AA** for body text; don't copy it.

## Typography (M)
- **Saans** (Displaay, commercial) 400/500/600/700: everything.
- **lcddot** (dot-matrix display font, 12px/10px, uppercase, tracking 1.1–1.2px): marquees and tag chips.
- **Respira Black** (blackletter): only on the /lab title.
- SaansMono is declared but not used on the home page.

Fluid scale (actual values from the CSS):
| Role | Size | Weight / leading / tracking |
|---|---|---|
| Hero / footer wordmark | `clamp(48px,14vw,250px)` (≈201px @1440) | 700, leading 0.8–0.9, tracking −0.025em |
| Section titles (WORK, TECH STACK) | `clamp(64px,8vw,180px)` / `clamp(48px,12vw,200px)` | 700, leading 0.85 |
| About paragraph | `clamp(28px,3.5vw,96px)` (50.4px @1440) | 600, leading 1.0, tracking −0.025em |
| Services statement / titles | `clamp(24px,3.3vw,56px)` | 500 |
| UI large (See all, menu items) | `clamp(20px,1.5vw,32px)` | 500–600 |
| UI body (info row, CTA, card meta) | `clamp(14px,1.2vw,20px)` (17.28px @1440) | 500–600, card meta uppercase +0.025em |
| Small | `clamp(12px,0.7vw,16px)` | |
| Body default | 16px / 24px | 400 |

The rule: two extremes. Display sizes are 8–14vw, and everything else is ~1.2vw clamped. There's almost nothing in between.

## Spacing and layout (M)
- Tailwind spacing base 4px. Page gutter `px-4` (16) mobile → `lg:px-8` (32). Cards and footer sit in a tighter `px-2 lg:px-4`.
- 12-col grid with `gap-4 lg:gap-8` (about section).
- Section rhythm: `pt-32 lg:pt-56 pb-28`, `py-28`, `py-16 lg:py-24`, so 112–224px between sections.
- Full-viewport sections use `h-[100svh]`.
- Case study main: `pt-[clamp(128px,12vw,500px)]`.

## Breakpoints (M)
Tailwind defaults: 640 (sm), 768 (md), 1024 (lg), 1280 (xl), 1536 (2xl), plus a custom **1700px (3xl)**. Hover effects are wrapped in `@media (hover:hover)`.
- `< md`: the hero video card and intro are hidden (`hidden md:block`), headings stack ("DESIGN / ENGINEER"), and the info row shrinks to one item.
- `< lg`: the sticky showreel is hidden (`hidden lg:block`).

## Shape and surfaces (M/E)
- Radii: CTA pill (full), dock `rounded-2xl md:rounded-[20px]`, cards and panels ~16–24px (`rounded-2xl/3xl`), media inside cards ~12px (E).
- No shadows. Depth comes only from the dark/light contrast and nesting (neutral-900 panel → neutral-800 cards → neutral-700 chips).
- Card pattern: a dark card with 16px padding, media (aspect ≈ 4:3 on home, ≈ 3:2 on /work), and a meta row (round logo 32px · NAME · CATEGORY · YEAR), then a tag marquee with faded edges.
- Logo grid: 1px hairline borders in neutral-300, the featured cell filled neutral-900.
- `backdrop-blur-sm/md` is used (likely on the dock/menu).

## Media
- Videos are streamed from **Mux** (HLS) with webp thumbnails. Images go through `next/image`. Tech logos are SVGs.
- Project media is always bright and colourful, which is what makes the grayscale UI work.
