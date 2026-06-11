import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DIR = new URL('./', import.meta.url).pathname;
const FRAMES = DIR + 'frames/';
fs.rmSync(FRAMES, { recursive: true, force: true });
fs.mkdirSync(FRAMES, { recursive: true });

const FPS = 30;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2', '--allow-file-access-from-files'],
});

const page = await browser.newPage();
await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2 });
await page.goto('file://' + DIR + 'reel.html', { waitUntil: 'networkidle0' });
await page.evaluate(() => window.READY);
await new Promise(r => setTimeout(r, 1000));

const total = await page.evaluate(() => window.TOTAL);
const nFrames = Math.round(total * FPS);
console.log(`rendering ${nFrames} frames @ ${FPS}fps (${total}s)`);

for (let i = 0; i < nFrames; i++) {
  await page.evaluate((t) => window.seek(t), i / FPS);
  await page.screenshot({ path: `${FRAMES}f${String(i).padStart(4, '0')}.png` });
  if (i % 60 === 0) console.log(`frame ${i}/${nFrames}`);
}

await browser.close();
console.log('done');
