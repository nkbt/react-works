#!/usr/bin/env node


const {
  NODE_HOST: host = '0.0.0.0',
  NODE_PORT = 8000
} = process.env;


let devServer;

const server = async dir => {
  if (devServer) {
    return devServer;
  }
  const {getPortPromise} = require('portfinder');
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

    devServer = require('http').createServer(onRequest);

    const onListen = err => {
      if (err) {
        console.error(`Could not start app server on http://${host}:${port}`);
        console.error(err);
        reject(err);
        return;
      }
      console.log(`App server is listening on http://${host}:${port}`);
      resolve(devServer);
    };

    devServer.listen(port, host, onListen);
  });
};


if (require.main === module) {
  const [dir] = process.argv.slice(2);
  server(dir);
}

module.exports = {
  server
};
