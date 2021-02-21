const {performance} = require('perf_hooks');

module.exports = async function delayed({assert, page}) {
  page.setDefaultTimeout(500);

  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="off"]');
  await page.hover('[data-e2e="delayed"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="on"]');
  await page.hover('h1');
  assert(
    (await page.$('[data-e2e="delayed"] [data-e2e="off"]')) === null,
    'Should stay in ON and switch after a delay'
  );
  const check = performance.now();
  await page.waitForSelector('[data-e2e="delayed"] [data-e2e="off"]');
  const delay = Math.ceil(performance.now() - check);
  assert(delay > 200, `Should switch to OFF after 200ms delay, actual: ${delay}`);
};
