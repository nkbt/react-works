# react-bulkhead [![npm](https://img.shields.io/npm/v/react-bulkhead.svg?style=flat-square)](https://www.npmjs.com/package/react-bulkhead)

React component to allow 3rd party components to operate over DOM-tree (d3, three.js)

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)
[![Dependencies](https://img.shields.io/david/nkbt/react-bulkhead.svg?style=flat-square)](https://david-dm.org/nkbt/react-bulkhead)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-bulkhead.svg?style=flat-square)](https://david-dm.org/nkbt/react-bulkhead#info=devDependencies)


## Installation


### NPM

```sh
npm install --save react react-bulkhead
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.


### 1998 Script Tag:

```html
<script src="https://unpkg.com/react/dist/react.js"></script>
<script src="https://unpkg.com/react-bulkhead/build/react-bulkhead.js"></script>
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

## License

MIT
