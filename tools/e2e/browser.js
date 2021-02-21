#!/usr/bin/env node


const devBrowser = async () => {
  const puppeteer = require('puppeteer-core');
  try {
    return await puppeteer.connect({
      browserURL: 'http://localhost:9222',
      defaultViewport: null
    });
  } catch (err) {
    console.error(err.message);
    return puppeteer.launch({
      headless: false,
      // slowMo: 250,
      devtools: false,
      args: [
        '--no-sandbox',
        '--disable-web-security',
        '--start-maximized',
        '--no-first-run',
        '--suppress-message-center-popups',
        '--remote-debugging-port=9222'
      ],
      defaultViewport: null,
      userDataDir: '/tmp/puppeteer__react-works--e2e',
      // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      executablePath: '/Applications/Opera.app/Contents/MacOS/Opera'
    });
  }
};


let page;
const devPage = async () => {
  if (page) {
    return page;
  }
  const browser = await devBrowser();
  const [firstPage] = await browser.pages();
  page = firstPage;
  return page;
};

if (require.main === module) {
  devBrowser()
    .then(browser => console.log('Browser running and listening on',
      browser.wsEndpoint()));
}

module.exports = {
  devBrowser,
  devPage
};
