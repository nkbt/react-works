module.exports = async function hoverable({assert, page}) {
  page.setDefaultTimeout(100);

  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="off"]');
  await page.hover('[data-e2e="hoverable"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="on"]');
  await page.hover('h1');
  assert(
    (await page.$('[data-e2e="delayed"] [data-e2e="on"]')) === null,
    'Should instantly switch to OFF'
  );
  await page.waitForSelector('[data-e2e="hoverable"] [data-e2e="off"]');
};
