import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3001';
const OUT = new URL('./shots/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2', '--enable-unsafe-swiftshader'],
});

const shots = [
  { name: 'home-hero', path: '/', wait: 12000, scroll: 0 },
  { name: 'home-timeline', path: '/', wait: 12000, scrollToBottom: true },
  { name: 'services', path: '/services', wait: 6000, scroll: 0 },
  { name: 'services-mid', path: '/services', wait: 6000, scroll: 900 },
  { name: 'portfolio', path: '/portfolio', wait: 6000, scroll: 0 },
  { name: 'portfolio-mid', path: '/portfolio', wait: 6000, scroll: 900 },
  { name: 'about', path: '/about', wait: 6000, scroll: 0 },
  { name: 'contact', path: '/contact', wait: 6000, scroll: 0 },
];

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

for (const s of shots) {
  try {
    await page.goto(BASE + s.path, { waitUntil: 'networkidle2', timeout: 60000 });
    if (s.scrollToBottom) {
      await page.evaluate(() => {
        const el = document.querySelector('main') || document.scrollingElement;
        el.scrollTo({ top: el.scrollHeight, behavior: 'instant' });
      });
    } else if (s.scroll) {
      await page.evaluate((y) => {
        const el = document.querySelector('main') || document.scrollingElement;
        el.scrollTo({ top: y, behavior: 'instant' });
        window.scrollTo(0, y);
      }, s.scroll);
    }
    await new Promise(r => setTimeout(r, s.wait));
    await page.screenshot({ path: `${OUT}${s.name}.png` });
    console.log('captured', s.name);
  } catch (e) {
    console.error('FAILED', s.name, e.message);
  }
}

await browser.close();
