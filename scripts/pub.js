#!/usr/bin/env node


const {npm, CWD} = require(`../lib/bash`);


npm(`rimraf lib`, {cwd: CWD});
npm(`webpack --config ${require.resolve(`../lib/webpack/pub.config.js`)}`, {
  cwd: CWD,
  env: {NODE_ENV: `production`}
});
