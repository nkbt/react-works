#!/usr/bin/env node


const {npm, CWD} = require(`../lib/bash`);


npm(`rimraf lib`, {cwd: CWD});
npm(`babel src --out-dir lib`, {
  cwd: CWD,
  env: {NODE_ENV: `production`}
});
