#!/usr/bin/env node
'use strict';


const url = require(`url`);
const http = require(`http`);
const fs = require(`fs`);


const {CWD} = require(`../lib/bash`);
const config = require(`${CWD}/nightwatch.json`);


const {test_settings: {default: {launch_url: localUrl}}} = config;
const {port} = url.parse(localUrl);


if (`CI` in process.env) {
  const {DOCKER_IP} = process.env;
  console.log(`DOCKER_IP: ${DOCKER_IP}`);


  const launchUrl = `http://${DOCKER_IP}:${port}`;
  console.log(`launch_url: ${launchUrl}`);

  config.test_settings.default.launch_url = launchUrl;
  fs.writeFileSync(`${CWD}/nightwatch.json`, JSON.stringify(config, null, 2));
}


const server = http.createServer((req, res) => {
  const file = `${CWD}/pub${req.url === `/` ? `/index.html` : req.url}`;
  console.log(`Serving: ${file}`);
  if (fs.existsSync(file)) {
    fs.createReadStream(file).pipe(res);
    return;
  }
  res.end();
});
server.listen(port, `0.0.0.0`, () => {
  console.log(`Listening ${CWD} on 0.0.0.0:${port}`);
  //  npm(`nightwatch`, {cwd: CWD});
  //  process.exit(0);
});
