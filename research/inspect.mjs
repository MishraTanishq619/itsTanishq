// Usage: node inspect.mjs https://www.itsjay.us/ [/path ...]
// Captures screenshots at 3 widths and a JSON report per route. Low request volume.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const [base, ...paths] = process.argv.slice(2);
if (!base) throw new Error("Usage: node inspect.mjs <baseUrl> [/path ...]");
const routes = paths.length ? paths : ["/"];
const viewports = { desktop: [1440, 900], tablet: [834, 1112], mobile: [390, 844] };

await mkdir("screenshots", { recursive: true });
await mkdir("raw", { recursive: true });
const browser = await chromium.launch();

for (const route of routes) {
  const slug = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "_");
  for (const [name, [w, h]] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const requests = [];
    page.on("request", (r) => requests.push({ type: r.resourceType(), url: r.url() }));
    const consoleMsgs = [];
    page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`));

    const res = await page.goto(new URL(route, base).href, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500); // let intro animations settle
    await page.screenshot({ path: `screenshots/${name}-${slug}-fold.png` });

    // Scroll slowly so scroll-triggered content renders before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshots/${name}-${slug}-full.png`, fullPage: true });

    if (name === "desktop") {
      const report = await page.evaluate(() => {
        const clean = (v) => v?.replace(/\s+/g, " ").trim() ?? "";
        const cs = (el) => {
          const s = getComputedStyle(el);
          return {
            font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight,
            ls: s.letterSpacing, color: s.color, bg: s.backgroundColor, tt: s.textTransform,
          };
        };
        const textEls = [...document.querySelectorAll("h1,h2,h3,h4,p,a,span,li,button")]
          .filter((el) => el.offsetParent && clean(el.innerText).length > 1 && el.children.length === 0)
          .slice(0, 150)
          .map((el) => ({ tag: el.tagName, text: clean(el.innerText).slice(0, 60), ...cs(el) }));

        const rootVars = {};
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.selectorText === ":root" || rule.selectorText === "html") {
                for (const p of rule.style) if (p.startsWith("--")) rootVars[p] = rule.style.getPropertyValue(p).trim();
              }
            }
          } catch {}
        }
        const mediaQueries = new Set();
        for (const sheet of document.styleSheets) {
          try { for (const rule of sheet.cssRules) if (rule.media) mediaQueries.add(rule.media.mediaText); } catch {}
        }
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content ?? "",
          og: [...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute("property"), m.content]),
          htmlClass: document.documentElement.className,
          bodyClass: document.body.className,
          body: cs(document.body),
          headings: [...document.querySelectorAll("h1,h2,h3")].map((el) => ({ tag: el.tagName, text: clean(el.innerText) })),
          links: [...new Map([...document.querySelectorAll("a[href]")].map((a) => [a.href, clean(a.innerText) || a.getAttribute("aria-label") || ""])).entries()],
          images: [...document.images].map((i) => ({ alt: i.alt, src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight })),
          videos: [...document.querySelectorAll("video")].map((v) => v.currentSrc || v.querySelector("source")?.src),
          canvases: document.querySelectorAll("canvas").length,
          fonts: [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style} ${f.status}`),
          rootVars,
          mediaQueries: [...mediaQueries],
          textStyles: textEls,
          globals: Object.keys(window).filter((k) => /gsap|lenis|three|motion|framer|matter|barba|swup|locomotive|ScrollTrigger/i.test(k)),
          docHeight: document.body.scrollHeight,
          landmarks: [...document.querySelectorAll("header,nav,main,section,footer")].map((el) => `${el.tagName}#${el.id}.${clean(el.className).slice(0, 80)}`),
        };
      });
      await writeFile(`raw/${slug}.json`, JSON.stringify({ url: page.url(), status: res?.status(), report, requests, consoleMsgs }, null, 2));
    }
    await page.close();
  }
  console.log("done", route);
}
await browser.close();
