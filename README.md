# react-bulkhead [![npm](https://img.shields.io/npm/v/react-bulkhead.svg?style=flat-square)](https://www.npmjs.com/package/react-bulkhead)

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)

[![CircleCI](https://img.shields.io/circleci/project/nkbt/react-bulkhead.svg?style=flat-square&label=nix-build)](https://circleci.com/gh/nkbt/react-bulkhead)
[![AppVeyor](https://img.shields.io/appveyor/ci/nkbt/react-bulkhead.svg?style=flat-square&label=win-build)](https://ci.appveyor.com/project/nkbt/react-bulkhead)
[![Coverage](https://img.shields.io/codecov/c/github/nkbt/react-bulkhead.svg?style=flat-square)](https://codecov.io/github/nkbt/react-bulkhead?branch=master)
[![Dependencies](https://img.shields.io/david/nkbt/react-bulkhead.svg?style=flat-square)](https://david-dm.org/nkbt/react-bulkhead)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-bulkhead.svg?style=flat-square)](https://david-dm.org/nkbt/react-bulkhead#info=devDependencies)

React component to allow 3rd party components to operate over DOM-tree (d3, three.js)

## Installation

### NPM
```sh
npm install --save react react-bulkhead
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.


### Bower:
```sh
bower install --save https://npmcdn.com/react-bulkhead/bower.zip
```


### 1998 Script Tag:
```html
<script src="https://npmcdn.com/react/dist/react.js"></script>
<script src="https://npmcdn.com/react-bulkhead/build/react-bulkhead.js"></script>
(Module exposed as `ReactBulkhead`)
```


## Demo

[http://nkbt.github.io/react-bulkhead](http://nkbt.github.io/react-bulkhead)

## Codepen demo

```js
// TODO
```

## Usage
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactBulkhead} from 'react-bulkhead';


const onCreate = ({element}) => {
  element.innerHTML = 'Gotcha! Mutable DOM here';
}

const App = () => (
  <div>
    <ReactBulkhead onCreate={onCreate} />
  </div>
);

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

## Options

```js
// TODO
```

## Development and testing

Currently is being developed and tested with the latest stable `Node 6` on `OSX` and `Windows`.

To run example covering all `ReactBulkhead` features, use `npm start dev`, which will compile `src/example/Example.js`

```bash
git clone git@github.com:nkbt/react-bulkhead.git
cd react-bulkhead
npm install
npm start dev

# then
open http://localhost:8080
```

## Tests

```bash
# to run tests
npm start test

# to generate test coverage (./reports/coverage)
npm start test.cov

# to run end-to-end tests
npm start test.e2e
```

## License

MIT
