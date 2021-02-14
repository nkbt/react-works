#!/usr/bin/env node


const {
  NODE_HOST = '0.0.0.0',
  NODE_PORT = 8000
} = process.env;

module.exports = async dir => {
  const {getPortPromise} = require('portfinder');
  const port = await getPortPromise({host: NODE_HOST, port: NODE_PORT});

  return new Promise((resolve, reject) => {
    const {Server} = require('node-static');
    const fileserver = new Server(dir);

    const onRequest = (req, res) => {
      console.log(`${req.method} ${req.url}`);
      req.addListener('end', () => {
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
      }).resume();
    };

    const server = require('http').createServer(onRequest);

    const onListen = err => {
      if (err) {
        console.error(`Could not start app server on http://${NODE_HOST}:${port}`);
        console.error(err);
        reject(err);
        return;
      }
      console.log(`App server is listening on http://${NODE_HOST}:${port}`);
      resolve(server);
    };

    server.listen(port, NODE_HOST, onListen);
  });
};


if (require.main === module) {
  const [dir] = process.argv.slice(2);
  module.exports(dir);
}
