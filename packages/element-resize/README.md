# react-element-resize [![npm](https://img.shields.io/npm/v/react-element-resize.svg?style=flat-square)](https://www.npmjs.com/package/react-element-resize)

React component-wrapper to swap one element with another and back, useful to show/hide popups, expand/collapse elements, various toggles, etc.

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)
[![Dependencies](https://img.shields.io/david/nkbt/react-element-resize.svg?style=flat-square)](https://david-dm.org/nkbt/react-element-resize)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-element-resize.svg?style=flat-square)](https://david-dm.org/nkbt/react-element-resize#info=devDependencies)


## Installation


### NPM

```sh
npm install --save react react-element-resize
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.


### 1998 Script Tag:

```html
<script src="https://unpkg.com/react/dist/react.js"></script>
<script src="https://unpkg.com/react-element-resize/build/react-element-resize.js"></script>
(Module exposed as `ReactElementResize`)
```


## Demo

[http://nkbt.github.io/react-element-resize](http://nkbt.github.io/react-element-resize)

## Codepen demo

```js
// TODO
```

## Usage
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactElementResize} from 'react-element-resize';


const onResize = ({width, height}) =>
  console.log({width, height})


const onScroll = ({offsetLeft, offsetTop, scrollLeft, scrollTop}) =>
  console.log({offsetLeft, offsetTop, scrollLeft, scrollTop})


const App = () => (
  <ReactElementResize debounceTimeout={200} onResize={onResize} onScroll={onScroll}>
    {data => <pre>{JSON.stringify(data, null, 2)}</pre>}
  </ReactElementResize>
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
