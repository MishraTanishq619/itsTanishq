// Captures scroll frames, hover states and the menu on the homepage (desktop),
// and logs how sticky/pinned elements and transforms change while scrolling.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] ?? "https://www.itsjay.us/";
await mkdir("screenshots/scroll", { recursive: true });
await mkdir("screenshots/states", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });

// Intro / loading sequence frames.
const intro = await browser.newPage({ viewport: { width: 1440, height: 900 } });
intro.goto(base);
for (const t of [300, 800, 1500, 2500]) {
  await intro.waitForTimeout(t === 300 ? 300 : 500);
  await intro.screenshot({ path: `screenshots/states/intro-${t}ms.png` });
}
await intro.close();

await page.waitForTimeout(2500);
const log = [];
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0, i = 0; y < height; y += 450, i++) {
  await page.mouse.wheel(0, 450); // real wheel events so Lenis drives the scroll
  await page.waitForTimeout(700);
  const n = String(i).padStart(2, "0");
  await page.screenshot({ path: `screenshots/scroll/${n}.png` });
  log.push(await page.evaluate(() => ({
    scrollY: Math.round(scrollY),
    pinned: [...document.querySelectorAll("*")]
      .filter((el) => ["fixed", "sticky"].includes(getComputedStyle(el).position) && el.offsetWidth > 100)
      .map((el) => `${el.tagName}.${String(el.className).slice(0, 60)}`).slice(0, 6),
    transformed: [...document.querySelectorAll("section *")]
      .filter((el) => { const t = el.style.transform; return t && t !== "none" && el.getBoundingClientRect().top < innerHeight && el.getBoundingClientRect().bottom > 0; })
      .map((el) => `${el.tagName}: ${el.style.transform.slice(0, 70)} op=${el.style.opacity}`).slice(0, 6),
  })));
}

// Hover states.
await page.mouse.wheel(0, -100000);
await page.waitForTimeout(1500);
const targets = {
  "cta": "header a[href^='mailto']",
  "project-card": "a[href='/work/jazmin-wong']",
  "footer-tile": "footer a[href='/work']",
};
for (const [name, sel] of Object.entries(targets)) {
  const el = page.locator(sel).first();
  if (!(await el.count())) continue;
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const box = await el.boundingBox();
  await page.screenshot({ path: `screenshots/states/${name}-before.png` });
  await el.hover();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `screenshots/states/${name}-hover.png` });
  log.push({ hover: name, box, transitions: await el.evaluate((n) => [n, ...n.querySelectorAll("*")].map((e) => getComputedStyle(e).transition).filter((t) => t && !t.startsWith("all 0s")).slice(0, 5)) });
}

// Floating nav bar menu button.
await page.mouse.wheel(0, -100000);
await page.waitForTimeout(1500);
const menuBtn = page.locator("header button, nav button").first();
if (await menuBtn.count()) {
  await menuBtn.click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "screenshots/states/menu-open.png" });
}

// Mobile menu.
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base, { waitUntil: "networkidle" });
await m.waitForTimeout(2000);
const mBtn = m.locator("header button, nav button").first();
if (await mBtn.count()) { await mBtn.click(); await m.waitForTimeout(1200); await m.screenshot({ path: "screenshots/states/mobile-menu-open.png" }); }

await writeFile("raw/motion-log.json", JSON.stringify(log, null, 2));
await browser.close();
console.log("frames:", log.filter((l) => l.scrollY !== undefined).length);
