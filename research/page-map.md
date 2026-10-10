# Page map: itsjay.us (captured 10 Oct 2026)

No robots.txt or sitemap.xml (both return the app's HTML). Routes found by following links.

| Route | Status | Doc height @1440 | What it is |
|---|---|---|---|
| `/` | 200 | ~7700px | Home: hero, about, featured work, services, tech stack, footer |
| `/work` | 200 | ~3100px | "SELECTED WORK [2022-2025]": 6 project cards in a 2-col grid |
| `/work/<slug>` | 200 | 5500–7800px | Case study. Slugs: jazmin-wong, trackstack, kick-bass, socialstats, westend, delivrd |
| `/lab` | 200 | 100vh, no scroll | "THE LAB": playground of floating thumbnails (13 videos, ~51 images) |

## Global chrome (every page)
- **Top info row** (fixed): 3 label/value pairs: "US Based / Working globally", "Building at / Hightouch", "Freelance availability / September 2025". Label is dark, value is grey.
- **"Get in touch" pill** (fixed top-right): mailto link, with an emoji video that appears on hover.
- **Floating dock** (fixed bottom-centre, ~700×98): square avatar, name in caps, a marquee of roles in a dot-matrix font ("CREATIVE DESIGN ENGINEER, AWWWARDS STALKER, PRODUCT BUILDER, NEXT.JS ENTHUSIAST"), and a hamburger that opens the nav (Home / Work / Lab).
- **Footer**: a bento grid of light-grey tiles (Work, Lab, Contact, Github, Instagram, LinkedIn) behind a huge blurred "itsjay.us" wordmark.

## Home section order
1. Loader: a 0→100 counter in the centre of a blank screen.
2. Hero: info row, a small video card at top-centre, small words "A … SERIOUSLY … GOOD" spread across the width above a full-width "DESIGN ENGINEER", "↓ Scroll for … cool sh*t ↓" at the bottom corners.
3. Showreel: the video card grows to full width as you scroll (sticky).
4. About (`#about`): a big paragraph whose words drift into place, with a portrait on the right.
5. Work '25: a huge "WORK '25" title, 2 featured project cards, "See all →".
6. Services: a dark rounded panel with an intro statement and 3 numbered rows (01 Brand Strategy, 02 Digital Design, 03 Development), each with a description, tag chips and an image.
7. Modern Tech Stack: a huge 2-line title, then a "PROFESSIONAL AT" logo grid (3 large cells, then 7 small ones).
8. Footer.

## Case study layout (from /work/trackstack)
Dark rounded main panel → huge title → 3 cols: Year / Services chips / Summary → bento of media and stat tiles (1.5M, 10K, 99%) → team photos → device mockups → page screenshots → colour palette → footer. There's no prev/next project navigation.

## Content hierarchy takeaway
Identity line first ("A seriously good design engineer"), proof second (work), then capability (services, stack). The work page and each case study are mostly visual. Copy is short.

Screenshots: `screenshots/{desktop,tablet,mobile}-<route>-{fold,full}.png`
