# Interaction spec: itsjay.us

**O** = observed in frames/computed styles. **I** = inferred. **?** = not captured.
Scroll frames (450px apart, real wheel events): `screenshots/scroll/00–17.png`. States: `screenshots/states/`.

## Global
| Interaction | Behaviour | Evidence |
|---|---|---|
| Smooth scroll | Lenis drives the page scroll (inertia) | O: `window.lenisVersion` on every route |
| Loader | Blank neutral-100 screen with a centred counter 0→100 (14px/600), then fades out. ~2s | O: intro-300/800ms frames; I: the fade |
| CTA hover | Emoji video (🤙🏼, `emoji.mov`) springs in next to "Get in touch". `transform 0.7s cubic-bezier(0.34,1.56,0.64,1)` (overshoot) | O: transition value; I: direction |
| Dock marquee | Role list scrolls horizontally forever, with edges fading via a mask | O: text shifts between frames |
| Dock menu | Hamburger opens the nav (Home/Work/Lab, 20px/600 light text) | ? the click wasn't captured; check by hand |
| Page transitions | Unknown. Next.js prefetches routes (`/work`, `/lab` fetches). | ? |

## Home, top to bottom
1. **Hero fold**: the small video card (~480×270) sits at top-centre. Big type is static on load (I: it may animate in after the loader).
2. **Showreel grow** (lg+ only): as you scroll, the card grows to the full container width, aspect-video, rounded, using a sticky wrapper `top-[calc(100vh-20vw-172px)]` plus scroll-scrubbed `translateY(vh)` / scale. The reel plays different project clips. *O: frames 01–02.*
3. **About paragraph**: words start scattered with big horizontal gaps (`translate(-0.8em, …)` on word spans) and close up into a normal paragraph as you scroll (scrubbed). *O: frames 02→04, transforms log.* Likely GSAP SplitText or a hand-made word split plus ScrollTrigger scrub (I).
4. **WORK '25 title**: letters rise from a clip mask (`translate(0%,100%)→0`). '25 lags a little. *O: frame 04.*
5. **Project card hover** (`hover:hover` only): the cover media blurs, and a framed preview (a screenshot or video of the actual site) scales or fades in at the centre. `0.7s cubic-bezier(0.87,0,0.13,1)` (expo in-out), with an `opacity 0.5s` layer. *O: project-card-before/hover.png.*
6. **Tag marquee in cards**: loops forever, like the dock.
7. **Services panel**: the dark panel slides up over the light page (rounded top). The intro statement reveals line by line. The 3 service rows are likely sticky and stack on top of each other (I: neutral-800 cards, `translateY(vh)` values in the log).
8. **MODERN TECH STACK**: char-by-char mask reveal from below, staggered (O: frame 11 caught it mid-way). Triggers once on enter (I).
9. **Logo grid**: cells fade in. Hairlines draw (I).
10. **Footer**: the giant "itsjay.us" wordmark is blurred (filter blur) and sits between the tiles, so it's partly hidden and partly showing. Tile hover: `0.5s cubic-bezier(0.4,0,0.2,1)` (O value); the visual change wasn't clear in the capture (?).

## /lab
A fixed 100vh canvas. "THE LAB" in blackletter at the centre, with ~60 thumbnails (images and videos) scattered around it. Matter.js is listed on the owner's projects, so the thumbnails may be draggable or follow physics (I, untested). The whole section is `pointer-events-none`, so the items themselves probably carry the pointer events.

## Easing vocabulary (O)
- `cubic-bezier(0.34,1.56,0.64,1)`: back-out spring, for small UI pops.
- `cubic-bezier(0.87,0,0.13,1)`: expo in-out, for big media changes.
- `cubic-bezier(0.4,0,0.2,1)`: standard, for tiles and opacity.
- Durations 0.5–0.7s. Scroll effects are scrubbed, not timed.

## Mobile
- No sticky showreel and no hero video card. Sections stack, and cards go full width.
- The dock stays, but smaller. The info row shows only one item.
- Hover effects are off (`hover:hover`).

## Reduced motion
?: no `prefers-reduced-motion` query found in the CSS. Our build must add it.
