#!/usr/bin/env node


const {performance} = require('perf_hooks');


const clickable = async ({assert, page}) => {
  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="off"]');
  await page.click('[data-e2e="clickable"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="on"]');
  await page.click('[data-e2e="clickable"] [data-e2e="on"]');
  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="off"]');
};


const hoverable = async ({assert, page}) => {
  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="off"]');
  await page.hover('[data-e2e="hoverable"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="on"]');
  await page.hover('h1');
  assert(await page.$('[data-e2e="delayed"] [data-e2e="on"]') === null,
    'Should instantly switch to OFF');
  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="off"]');
};


const delayed = async ({assert, page}) => {
  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="off"]');
  await page.hover('[data-e2e="delayed"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="on"]');
  await page.hover('h1');
  assert(await page.$('[data-e2e="delayed"] [data-e2e="off"]') === null,
    'Should stay in ON and switch after a delay');

  const check = performance.now();
  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="off"]');
  const delay = Math.ceil(performance.now() - check);
  assert(delay > 200,
    `Should switch to OFF after 200ms delay, actual: ${delay}`);
};


module.exports = async assert => {
  const {devPage, server} = require('@nkbt/react-works--e2e');


  const page = await devPage();
  page.setDefaultTimeout(500);
  if (page.url() === 'about:blank') {
    //  await page.goto(`http://${address}:${port}`);
    await page.goto('http://0.0.0.0:8080');
  }
  const {pathname} = require('url').parse(page.url());
  console.log('[URL]', pathname);

  //  const devServer = await server('../pub');
  //  const {address, port} = devServer.address();

  await page.waitForSelector('h1');
  const h1 = await page.$eval('h1', e => e.innerText);
  assert(h1.includes('react-swap'), 'Expected header to include "react-swap"');

  console.log('[...]', 'clickable');
  await clickable({page, assert});

  console.log('[...]', 'hoverable');
  await hoverable({page, assert});

  console.log('[...]', 'delayed');
  await delayed({page, assert});

  // await new Promise(ok => devServer.close(ok));
};

if (require.main === module) {
  const {watcher} = require('@nkbt/react-works--e2e');
  watcher(__filename);
}
