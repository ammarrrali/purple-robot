import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DIR = new URL('./', import.meta.url).pathname;
const OUT = DIR + 'hero/';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const N = 108; // frames for the 3.6s hero scene @ 30fps
const W = 1280, H = 800;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2', '--enable-unsafe-swiftshader'],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 14000)); // let the Spline scene fully load

// Smooth sweep: the robot head eases toward the pointer, so a smooth
// path per frame yields smooth head motion regardless of capture speed.
const cx = W * 0.5, cy = H * 0.45;
function pathAt(i) {
  const p = i / (N - 1);                  // 0..1
  const a = p * Math.PI * 2;              // one full loop
  return {
    x: cx + Math.sin(a) * W * 0.32,
    y: cy + Math.sin(a * 2) * H * 0.16 - p * 40,
  };
}

// settle pointer at start of path first
const start = pathAt(0);
await page.mouse.move(start.x, start.y, { steps: 10 });
await new Promise(r => setTimeout(r, 1500));

for (let i = 0; i < N; i++) {
  const { x, y } = pathAt(i);
  await page.mouse.move(x, y, { steps: 4 });
  await new Promise(r => setTimeout(r, 40));
  await page.screenshot({ path: `${OUT}h${String(i).padStart(3, '0')}.png` });
  if (i % 20 === 0) console.log(`hero frame ${i}/${N}`);
}

await browser.close();
console.log('done');
