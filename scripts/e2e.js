#!/usr/bin/env node
'use strict';


const path = require(`path`);
const nightwatch = require(`nightwatch`);
const finalhandler = require(`finalhandler`);
const http = require(`http`);
const serveStatic = require(`serve-static`);
const {CWD} = require(`../lib/bash`);


const {
  DOCKER_IP
} = process.env;


if (!DOCKER_IP) {
  console.error(new Error(`DOCKER_IP ENV is required`));
}


const createServer = ({cwd, port}) => new Promise((resolve, reject) => {
  const serve = serveStatic(`${cwd}/pub`);
  const server = http.createServer((req, res) => serve(req, res, finalhandler(req, res)));
  server.listen(port, `0.0.0.0`, err => {
    if (err) {
      reject(err);
      return;
    }
    console.log(`Server "${path.basename(cwd)}" is listening on 0.0.0.0:${port}`);
    setTimeout(() => resolve(server));
  });
});


const wait = func =>
  new Promise((resolve, reject) => func((err, ...args) => err ? reject(err) : resolve(...args)));


const run = async ({cwd, port}) => {
  const server = await createServer({cwd, port});
  const finish = () => new Promise(resolve => server.close(() => setTimeout(resolve)));
  const die = async err => {
    console.error(err.message);
    console.log(err.stack);
    await finish();
    process.exit(1);
  };


  process.on(`uncaughtException`, die);
  process.on(`unhandledRejection`, die);


  const client = nightwatch.initClient({
    selenium_port: 4444,
    selenium_host: `localhost`,
    silent: true,
    output: true,
    detailed_output: true
  });


  const browser = client.api();

  browser
    .url(`http://${DOCKER_IP}:3000`)
    .waitForElementVisible(`body`, 1000)
    .assert.containsText(`body`, require(`${cwd}/package.json`).name)
    .end();

  try {
    await wait(client.start.bind(client));
  } catch (_err) {
    await finish();
    process.exit(1);
  }

  await finish();
  process.exit(0);
};


run({cwd: CWD, port: 3000});
