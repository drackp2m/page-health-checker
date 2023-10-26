import puppeteer from 'puppeteer';

(async () => {
  console.log('enter to function');

  setTimeout(() => {
    console.log('this is a message with delay');
  }, 1000);

  const browser = await puppeteer.launch({
    headless: 'new',
  });

  console.log('before create page');
  const page = await browser.newPage();

  console.log('before navigation');
  await page.goto('https://drackp2m.github.io/set-online');

  await page.setViewport({width: 1080, height: 1024});

  console.log('before selector');
  const text = await page.waitForSelector('.flex-row.justify-between a[href]');

  const fullTitle = await text?.evaluate(el => el.textContent);

  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
