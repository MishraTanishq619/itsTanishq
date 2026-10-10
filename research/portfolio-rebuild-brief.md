# Portfolio rebuild brief

Inputs: `page-map.md`, `design-system.md`, `interaction-spec.md`, `technology-report.md`, `content-inventory.md`, `screenshots/`.

## 1. What makes the reference work
1. **Two type extremes**: 14vw display type next to 1.2vw UI text. Confidence without decoration.
2. **Grayscale UI, colourful work**: the project media is the only colour on the page.
3. **Motion as narrative**: the loader counts in, the reel grows, the paragraph assembles itself, the titles rise. Each scroll step shows the next thing.
4. **Persistent chrome**: the info row (status, where you work, availability) and the dock (who + menu) mean you never need a classic navbar.
5. **Voice**: short, cheeky lines ("A seriously good design engineer").

## 2. Our translation (original, not a clone)
- Identity: a frontend engineer who ships real product for real users (healthtech, Telugu-first, mobile-first). The hook is *shipping*, not "design engineer".
- Hero: small words "A · FULL-STACK · PRODUCT" over a giant **"ENGINEER"** (decided 11 Oct).
- Info row: "Based in India / Working with HealthyDay / Open to · <status>".
- Dock: avatar, name, a marquee ("FRONTEND ENGINEER, SHIPS ON FRIDAYS, MOBILE-FIRST, TELUGU-FIRST, …"), menu.
- Work: 6 cards (suggested): HealthyDay (portal + WHH), Whiteboard (CRDT/realtime), DocuMind (RAG), Technorollix 2025, Zcrum, Aurika/ONDC. Experience as a separate timeline (HealthyDay, Aurika, Technorollix ×2, GSSOC, Hacktoberfest) plus awards. Case studies explain **the problem, constraints, decisions and trade-offs** (e.g. "why the PDF is drawn to canvas").
- Replace "Services" with **"How I build"**: 3 rows, e.g. 01 Product UI · 02 Backend & data · 03 Performance & reliability, each with chips and an image.
- Stack grid like the reference, with your top 3 featured.
- Footer bento: Work, Lab or Writing, Contact, GitHub, LinkedIn, Resume, with your wordmark blurred behind.
- Skip /lab for v1, or make it a simple "experiments" grid later.

## 3. Design tokens (proposed)
- Colours: neutral-50 → 900 like the reference, **plus one accent** of your own (to pick) for focus rings and small highlights. Secondary text at neutral-500 on light (passes AA), not neutral-400.
- Fonts (free stand-ins for the paid ones):
  - Display/UI: **Geist** or **Inter Tight** (600/700, tight tracking)
  - Dot-matrix accent: **Doto** (Google Fonts) for the marquee and chips
- Type scale: reuse the reference's clamp values (see design-system.md).
- Layout: 12-col, gutter 16→32px, section spacing 112–224px, radii 12/16/20/full, no shadows.

## 4. Architecture
- **Next.js (App Router) + TypeScript + Tailwind v4**, static export where possible.
- **Lenis + GSAP (ScrollTrigger, SplitText)**: needed. Scrubbed, pinned and split-text effects are the core of the experience, and the reference uses exactly this.
- **Motion**: only for small UI states (menu open, hover pops). Optional. Can drop it if GSAP covers everything.
- shadcn/ui: probably not needed. The UI is custom and minimal. Lucide for icons.
- Video: self-hosted short MP4/WebM clips (muted, loop, `preload="none"`, played when in view). No Mux.
- Content: typed data files (`content/projects.ts`) plus MDX for case studies. No CMS.
- Hosting: **Netlify** (decided). Local preview with `netlify dev` on 8888.

```
app/
  layout.tsx          fonts, Lenis provider, InfoRow, Dock, Loader
  page.tsx            Hero, Showreel, About, FeaturedWork, HowIBuild, Stack, Footer
  work/page.tsx
  work/[slug]/page.tsx
components/
  chrome/  InfoRow, Dock, Marquee, Menu, Loader, ContactPill
  sections/ Hero, Showreel, About, FeaturedWork, HowIBuild, StackGrid, FooterBento
  ui/      ProjectCard, Chip, SplitReveal, ScrubWords, StickyGrow
content/   projects.ts, profile.ts, case-studies/*.mdx
lib/       gsap.ts (plugin registration), useReducedMotion.ts
```

## 5. Implementation order
1. Tokens, fonts, global layout, Lenis
2. Chrome: info row, contact pill, dock with marquee and menu, loader
3. Hero + showreel grow
4. About (scrub words), Featured work + card hover
5. How I build, stack grid, footer bento
6. /work grid + case study template + 1 full case study
7. Mobile pass (hide sticky reel, stack layouts), reduced motion, a11y (focus states, keyboard menu, alt text)
8. Performance: lazy video, image sizes, Lighthouse > 90; compare screenshots against the reference

## 6. Risks
- Motion-heavy pages can be slow on mid-range Android. Budget: hero interactive < 2.5s on 4G. Videos must be lazy.
- Scroll-jacking hurts accessibility. Every effect needs a reduced-motion version (no scrub, no Lenis).
- Real HealthyDay screenshots contain student data. Use stubs/preview modes only.
- Too close to the reference = a clone. Keep our own copy, accent colour, fonts and section concepts.

## 7. Open decisions (needed before build)
1. ~~Hero headline~~ → small words "A · FULL-STACK · PRODUCT", giant "ENGINEER"
2. ~~Accent colour~~ → electric lime #C6F432 (focus rings, small highlights only)
3. ~~Netlify or Vercel~~ → Netlify
4. ~~HealthyDay numbers~~ → none, describe the work qualitatively
5. Top 3 to 6 projects to feature, and which gets the first full case study
6. Items marked [CONFIRM] in content-inventory.md
