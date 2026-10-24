// Renders src/cards.html to assets/<name>-<theme>.png (light and dark, 2x).
// Run: npm install && npx playwright install chromium && npm run build
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'assets');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(root, 'src', 'cards.html'));
await page.evaluate(() => document.fonts.ready);

for (const theme of ['light', 'dark']) {
  await page.evaluate((t) => {
    document.documentElement.dataset.theme = t === 'dark' ? 'dark' : '';
    if (t !== 'dark') document.documentElement.removeAttribute('data-theme');
    draw();
  }, theme);
  await page.waitForTimeout(200);
  for (const handle of await page.$$('[data-shot]')) {
    const name = await handle.getAttribute('data-shot');
    await handle.screenshot({ path: path.join(out, `${name}-${theme}.png`), omitBackground: true });
  }
}
await browser.close();
console.log('wrote', fs.readdirSync(out).length, 'images to', out);
