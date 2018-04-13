const puppeteer = require('puppeteer');

const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  await sleep(3000);

  await page.waitForSelector('.more');
  for (let i = 0; i < 5; i++) {
    await sleep(3000);
    await page.click('.more');
  }
  const result = await page.evaluate(() => {
    const $ = window.$;
    const items = $('.list-wp a');
    const links = [];
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item);
        links.push({
          moveId: it.find('div').data('id'),
          title: it.find('.title').text(),
          rate: Number(it.find('.rate')),
          poster: it.find('img').attr('src').replace('s_ratio', 'l-ratio'),
        });
      })
    }
    return links;
  });
  browser.close();
  console.log(result.length)
})()
