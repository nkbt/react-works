#!/usr/bin/env node


const {npm, CWD} = require(`../lib/bash`);


npm(`eslint .`, {
  cwd: CWD
});
