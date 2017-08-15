#!/usr/bin/env node
'use strict';

const fs = require(`fs`);
const {bash, CWD} = require(`../lib/bash`);

const [script] = process.argv.slice(2);
if (!script) {
  console.error(new Error(`Script name is required`));
  process.exit(1);
}

const {scripts} = require(`${CWD}/package.json`);

if (script in scripts) {
  bash(`yarn ${script}`, {cwd: CWD});
} else {
  if (!fs.existsSync(`${__dirname}/${script}.js`)) {
    console.error(new Error(`/scripts/${script}.js does not exist`));
    process.exit(1);
  }
  require(`./${script}.js`);
}

