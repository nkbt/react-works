'use strict';


module.exports = {
  'Smoketest, page with examples should load'(browser) {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Clickable')
      .assert.containsText('body', 'Hoverable')
      .assert.containsText('body', 'Hoverable with delay')
      .assert.containsText('body', 'Deep Swap')
      .assert.containsText('body', 'Table Swap')
      .assert.containsText('body', 'Deep Table Swap')
      .assert.containsText('body', 'With callback')
      .assert.containsText('body', 'Toggle from outside')
      .end();
  }
};
