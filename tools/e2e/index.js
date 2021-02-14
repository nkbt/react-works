const {server} = require('./server');
const {devBrowser, devPage} = require('./browser');
const {watcher} = require('./watcher');
const {assert} = require('./assert');

module.exports = {
  server,
  watcher,
  devBrowser,
  devPage,
  assert
};
