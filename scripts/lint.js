#!/usr/bin/env node
'use strict';


const {npm, CWD} = require(`../lib/bash`);


npm(`eslint --fix .`, {cwd: CWD});
