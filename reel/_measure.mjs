import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] });
for (const [name, w, h, mobile] of [['iphone-se',320,568,true],['iphone-14',390,844,true],['pixel',412,915,true],['ipad',768,1024,true]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise(r => setTimeout(r, 3500));
  const m = await page.evaluate(() => {
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom)]; };
    const nav = document.querySelector('nav') || document.querySelector('header');
    return {
      nav: r(nav),
      eyebrow: r(document.querySelector('h1')?.previousElementSibling),
      h1: r(document.querySelector('h1')),
      bot: r(document.querySelector('.hb-stage')),
      vh: window.innerHeight,
    };
  });
  console.log(name.padEnd(10), JSON.stringify(m));
  await page.close();
}
await browser.close();
