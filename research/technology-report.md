# Technology report: itsjay.us

| Technology | Confidence | Evidence |
|---|---|---|
| Next.js (App Router) | High | `/_next/static/chunks`, `x-nextjs-prerender`, RSC `vary` headers, `next-router-*` |
| Turbopack build | High | `turbopack-*.js` chunk |
| React | High | Implied by Next. React logo in their own stack grid. |
| Vercel hosting | High | `server: Vercel`, `x-vercel-cache`, `x-vercel-id: bom1::…` |
| Static prerender | High | `x-nextjs-prerender: 1`, `x-vercel-cache: HIT`, `age` ~8 days |
| Tailwind CSS v4 | High | `@layer properties`, `--tw-*` vars, `lab()` neutral colours, `--spacing:.25rem` |
| GSAP | High | `window.gsapVersions`, `window._gsap` on every route |
| Lenis | High | `window.lenisVersion` |
| Motion (Framer Motion) | High | `window.MotionIsMounted` |
| Mux video | High | `stream.mux.com/*.m3u8`, `image.mux.com` thumbnails, `litix.io` (Mux Data analytics) |
| next/image | High | `/_next/image` requests |
| next/font (local) | High | hashed `/_next/static/media/Saans_*.woff2` with "Fallback" faces |
| GSAP ScrollTrigger / SplitText | Medium | scrubbed `translate` values on word/char spans; plugins aren't exposed as globals |
| Contentful CMS | Low–Medium | listed in their stack grid; no Contentful requests seen in the browser (could be fetched at build time) |
| Supabase | Low | listed in their stack grid; no client requests seen |
| Matter.js on /lab | Low | listed on project cards only |
| Analytics | None seen | no GA/GTM requests (Vercel Analytics not detected) |

## Performance notes
- Home loads 21 scripts, 6 fonts, 26 images and 4 HLS streams up front. 71 xhr are mostly video chunks. That's heavy, so we should lazy-load videos.
- The lcddot font fails to decode (OTS cmap error) and falls back. That's a bug on their site.
- No `prefers-reduced-motion` handling found.

## Unknowns
Their component structure, CMS schema, how the scroll timelines are written, page-transition logic, and what the /lab physics actually does.

## Licensing
Saans (Displaay) is a paid font. lcddot and Respira are third-party display fonts. The project media, Mux videos and copy belong to the owner. **We copy the principles, not the assets or fonts.**
