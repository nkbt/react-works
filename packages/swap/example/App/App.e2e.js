module.exports = async function app({assert, page}) {
  await page.waitForSelector('h1');
  const h1 = await page.$eval('h1', e => e.innerText);
  assert(h1.includes('react-swap'), 'Expected header to include "react-swap"');
};
