#!/usr/bin/env node

const puppeteer = require('puppeteer-core');
const {getPortPromise} = require('portfinder');
const nodeGlob = require('glob');
const {relative} = require('path');
const {createServer} = require('http');

async function glob(...args) {
  return new Promise((resolve, reject) =>
    nodeGlob(...args, (err, data) => (err ? reject(err) : resolve(data)))
  );
}

async function openBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-web-security',
      //      '--start-maximized',
      '--no-first-run',
      '--suppress-message-center-popups',
      '--remote-debugging-port=9222'
    ],
    defaultViewport: null,
    userDataDir: '/tmp/puppeteer__react-works--e2e',
    executablePath:
      process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    //    executablePath: '/Applications/Opera.app/Contents/MacOS/Opera'
  });

  return browser;
}

const {NODE_HOST: host = '0.0.0.0', NODE_PORT = 8000} = process.env;

async function openServer(dir) {
  const port = await getPortPromise({host, port: NODE_PORT});

  return new Promise((resolve, reject) => {
    const {Server} = require('node-static');
    const fileserver = new Server(dir, {
      cache: false,
      indexFile: 'index.html',
      gzip: false
    });

    const onRequest = (req, res) => {
      console.log(`${req.method} ${req.url}`);
      req
        .addListener('end', () => {
          fileserver.serve(req, res, err => {
            if (err) {
              if (req.url === '/favicon.ico') {
                res.writeHead(err.status, err.headers);
                res.end();
              } else {
                fileserver.serveFile('/index.html', 200, {}, req, res);
              }
            } else {
              res.writeHead(200);
              res.end();
            }
          });
        })
        .resume();
    };

    const server = createServer(onRequest);

    const onListen = err => {
      if (err) {
        console.error(`Could not start app server on http://${host}:${port}`);
        console.error(err);
        reject(err);
        return;
      }
      console.log(`App server is listening on http://${host}:${port}`);
      resolve(server);
    };

    server.listen(port, host, onListen);
  });
}

const assert = (isTrue, message) => {
  if (isTrue) {
    console.log('[OK]', message);
  } else {
    throw new Error(message);
  }
};

async function validate(pattern, dir) {
  const [files, browser, server] = await Promise.all([
    glob(pattern, {realpath: true}),
    openBrowser(),
    openServer(dir)
  ]);

  await files.reduce(async (promise, file) => {
    await promise;
    const name = relative('./', file);
    console.log('[begin]', name);
    const {address, port} = server.address();
    const page = await browser.newPage();
    await page.goto(`http://${address}:${port}`);
    await require(file)({page, assert});
    await page.close();
    console.log('[end]  ', name, '\n');
  }, Promise.resolve());

  await browser.close();
  await new Promise(ok => server.close(ok));
  console.log('[DONE]');
}
module.exports = validate;

if (require.main === module) {
  const [pattern, dir] = process.argv.slice(2);
  validate(pattern, dir)
    .then(() => process.exit(0))
    .catch(err => console.error(err) || process.exit(1));
}
