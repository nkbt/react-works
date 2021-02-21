const {devBrowser, devPage} = require('./browser');
const {watcher} = require('./watcher');
const {assert} = require('./assert');

module.exports = {
  watcher,
  devBrowser,
  devPage,
  assert
};
