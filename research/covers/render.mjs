// Renders the architecture covers to public/reel/*.jpg (1440×1080, 4:3 like the project cards).
// Run from research/: node covers/render.mjs
import { chromium } from 'playwright';
import path from 'node:path';
const dir = path.resolve('covers');
const out = path.resolve('../public/reel');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1080 } });
for (const n of ['whiteboard', 'documind']) {
  await p.goto(`file://${dir}/${n}.html`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${out}/${n}.jpg`, type: 'jpeg', quality: 85 });
}
await b.close();
