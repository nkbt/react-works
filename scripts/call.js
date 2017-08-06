#!/usr/bin/env node
'use strict';

const fs = require(`fs`);


const [script] = process.argv.slice(2);
if (!script) {
  console.error(new Error(`Script name is required`));
  process.exit(1);
}
if (!fs.existsSync(`${__dirname}/${script}.js`)) {
  console.error(new Error(`/scripts/${script}.js does not exist`));
  process.exit(1);
}
require(`./${script}.js`);
