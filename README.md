# react-works 

Monorepo for React components

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)
[![CircleCI](https://img.shields.io/circleci/project/nkbt/react-works/master.svg?style=flat-square)](https://circleci.com/gh/nkbt/react-works/tree/master)
[![Dependencies](https://img.shields.io/david/nkbt/react-works.svg?style=flat-square)](https://david-dm.org/nkbt/react-works)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-works.svg?style=flat-square)](https://david-dm.org/nkbt/react-works#info=devDependencies)


## packages

### [react-swap](./packages/swap) [![react-swap](https://img.shields.io/npm/v/react-swap.svg?style=flat-square)](https://www.npmjs.com/package/react-swap)


## Development and testing

### Install

Currently is being developed and tested with the latest stable `Node 7` on `OSX`.

```sh
git clone git@github.com:nkbt/react-works.git
cd react-works
npm install

# install dependencies for all packages
npm run lerna -- bootstrap
```

### Run tests for all packages

```bash
# to run eslint for all packages
npm run lerna -- run lint

# to run tests for all packages
npm run lerna -- run test

# to run end-to-end tests for all packages
# note `--concurrency 1`, we should run e2e in sequence
npm run lerna -- run e2e --concurrency 1
```

### Run package example

To run example covering all package features, use `npm start`, which will compile `example/index.js`

```sh
cd packages/<package-name>
npm start

# then
open http://localhost:8080
```

### Test one package only

```sh
cd packages/<package-name>

# to run lint
npm run lint

# to run tests
npm run test

# to run end-to-end tests
npm run e2e
```


## Moar badges

[![Greenkeeper badge](https://badges.greenkeeper.io/nkbt/react-works.svg)](https://greenkeeper.io/)


## License

MIT
