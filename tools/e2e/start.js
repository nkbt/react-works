#!/usr/bin/env node

const [glob] = process.argv.slice(2);
const files = require('glob').sync(glob, {realpath: true});

module.exports = async function watch(assert, {skipReload}) {
  const {devPage} = require('@nkbt/react-works--e2e');

  const page = await devPage();

  if (!skipReload || page.url() === 'about:blank') {
    console.log('[RELOAD]', '\n');
    await page.goto('http://0.0.0.0:8080');
  }

  await files.reduce(async (promise, file) => {
    await promise;
    const name = require('path').relative('./example', file);
    console.log('[begin]', name);
    await require(file)({page, assert});
    console.log('[end]  ', name, '\n');
  }, Promise.resolve());
};

if (require.main === module) {
  const {watcher} = require('@nkbt/react-works--e2e');
  watcher(__filename, files, process.argv.slice(3));
}
