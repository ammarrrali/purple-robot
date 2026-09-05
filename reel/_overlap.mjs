import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT='/private/tmp/claude-501/-Users-ammarali-Desktop-codeeeelabs-website-5sep/0a02da47-bda1-4d75-b337-24b987bbb6ea/scratchpad/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] });
const cases = [
  ['iphone-se',320,568,true],['iphone-14',390,844,true],['pixel',412,915,true],
  ['iphone-land',844,390,true],['ipad',768,1024,true],['ipad-land',1024,768,true],
  ['laptop',1280,800,false],['desktop',1440,860,false],['wide',1920,1080,false],
];
let bad = 0;
for (const [name, w, h, mobile] of cases) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile?2:1 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise(r => setTimeout(r, 4000));
  const m = await page.evaluate(() => {
    const box = el => { if(!el) return null; const b = el.getBoundingClientRect();
      return {t:Math.round(b.top),b:Math.round(b.bottom),l:Math.round(b.left),r:Math.round(b.right)}; };
    const hit = (a,c) => a&&c ? !(a.r<=c.l||c.r<=a.l||a.b<=c.t||c.b<=a.t) : false;
    const bot = box(document.querySelector('.hb-stage'));
    const h1 = box(document.querySelector('h1'));
    const eb = box(document.querySelector('h1')?.previousElementSibling);
    const p  = box(document.querySelector('h1')?.nextElementSibling);
    // Does the gradient span still get clipped? compare painted vs layout width.
    const span = document.querySelector('h1 span');
    const sb = span.getBoundingClientRect();
    return { bot, hitH1: hit(bot,h1), hitEyebrow: hit(bot,eb), hitPara: hit(bot,p),
             overflowX: document.documentElement.scrollWidth > window.innerWidth,
             spanRight: Math.round(sb.right), h1Right: Math.round(box(document.querySelector('h1')).r) };
  });
  const ok = !m.hitH1 && !m.hitEyebrow && !m.hitPara && !m.overflowX;
  if (!ok) bad++;
  console.log((ok?'PASS ':'FAIL ') + name.padEnd(12),
    'h1:'+m.hitH1, 'eyebrow:'+m.hitEyebrow, 'para:'+m.hitPara, 'overflowX:'+m.overflowX);
  await page.screenshot({ path: OUT+'v2-'+name+'.png' });
  await page.close();
}
console.log(bad === 0 ? 'ALL CLEAR' : bad+' FAILING');
await browser.close();
