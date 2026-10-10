# Tanishq Mishra: portfolio

Personal portfolio. Design principles reverse-engineered from itsjay.us (see `research/`), rebuilt with my own content, copy, fonts and accent.

## Stack
Next.js 16 (App Router, Cache Components, Partial Prefetching) · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger) · Lenis · Geist + Doto · simple-icons · Netlify.

## Commands
```bash
npm install
netlify dev        # http://localhost:8888 (proxies next dev on 3000)
npm run build      # production build
npm run lint
npx next typegen   # regenerate route types after adding a route, before tsc
```

## Where things live
| What | Where |
|---|---|
| Profile, info row, dock roles, About copy, links | `content/profile.ts` |
| Projects (cards, reel, project pages) | `content/projects.ts` |
| Full case studies (typed data, no MDX) | `content/case-studies.ts` |
| "How I build" rows and the stack grid | `content/craft.ts` |
| Design tokens (type scale, colours, easing) | `app/globals.css` (`@theme`) |
| Site chrome: loader, info row, pill, dock, footer | `components/chrome/` |
| Home sections | `components/sections/` |
| Case study template | `components/case-study/` |
| Reel screenshots | `public/reel/` |
| Research (screenshots, design system, brief) | `research/` |

## Adding a case study
Add an entry keyed by the project slug to `content/case-studies.ts`. The page, card label ("Read case study"), sitemap priority and metadata pick it up automatically.

## Notes
- Motion respects `prefers-reduced-motion`: no loader, no Lenis, no scrubbed or reveal animations.
- Scroll-in animations use `opacity`, never `autoAlpha`, on anything containing links (`visibility: hidden` removes them from the Tab order).
- `URL` (set by Netlify at build) is the base for OG images and the sitemap; locally it falls back to `http://localhost:8888`.
- Unknown `/work/<slug>` URLs render the 404 page with `noindex` but return HTTP 200 (Partial Prefetching streams the shell first).
