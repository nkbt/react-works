module.exports = async function clickable({page}) {
  page.setDefaultTimeout(100);

  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="off"]');
  await page.click('[data-e2e="clickable"] [data-e2e="off"]');
  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="on"]');
  await page.click('[data-e2e="clickable"] [data-e2e="on"]');
  await page.waitForSelector('[data-e2e="clickable"] [data-e2e="off"]');
};
