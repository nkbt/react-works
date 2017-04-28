#!/usr/bin/env node
'use strict';


const path = require(`path`);
const {publish} = require(`gh-pages`);
const {CWD} = require(`../lib/bash`);


require(`./pub`);


const {name} = require(path.join(CWD, `package.json`));
publish(path.join(CWD, `pub`), {
  repo: `https://github.com/nkbt/${name}.git`,
  branch: `gh-pages`,
  message: `Publish examples`,
  logger: message => console.log(message)
}, err => err ? console.error(err) : console.log(`Published`));
