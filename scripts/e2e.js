#!/usr/bin/env node


const {npm, CWD} = require(`../lib/bash`);
const {output_folder: REPORT_DIR} = require(`../lib/nightwatch.json`);


npm(`rimraf reports/e2e`, {cwd: CWD});
npm(`nightwatch-autorun `, {
  cwd: CWD,
  env: {
    NIGHTWATCH_CONFIG: require.resolve(`../lib/nightwatch.json`),
    WEBPACK_CONFIG: require.resolve(`../lib/webpack/dev.config.js`),
    REPORT_DIR,
    LOG_DIR: REPORT_DIR
  }
});
