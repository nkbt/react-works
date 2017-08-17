#!/usr/bin/env node
'use strict';


const path = require(`path`);
const glob = require(`glob`);
const {CWD} = require(`../lib/bash`);


require(`babel-register`)({
  babelrc: false,
  plugins: [
    `transform-object-rest-spread`,
    `transform-class-properties`,
    [`transform-react-remove-prop-types`, {removeImport: true}]
  ],
  presets: [
    `react`,
    [`env`, {targets: {node: `7`}}]
  ],
  retainLines: true,
  comments: false
});


glob
  .sync(`**/*-test.js`, {
    realpath: true,
    cwd: path.resolve(CWD, `test`)
  })
  .forEach(require);
