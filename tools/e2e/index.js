const {devServer} = require('./server');
const {devBrowser, devPage} = require('./browser');
const {watcher} = require('./watcher');
const {assert} = require('./assert');

module.exports = {
  devServer,
  watcher,
  devBrowser,
  devPage,
  assert
};
