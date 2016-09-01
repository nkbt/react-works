# react-swap [![npm](https://img.shields.io/npm/v/react-swap.svg?style=flat-square)](https://www.npmjs.com/package/react-swap)

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)

[![CircleCI](https://img.shields.io/circleci/project/nkbt/react-swap.svg?style=flat-square&label=nix-build)](https://circleci.com/gh/nkbt/react-swap)
[![AppVeyor](https://img.shields.io/appveyor/ci/nkbt/react-swap.svg?style=flat-square&label=win-build)](https://ci.appveyor.com/project/nkbt/react-swap)
[![Coverage](https://img.shields.io/codecov/c/github/nkbt/react-swap.svg?style=flat-square)](https://codecov.io/github/nkbt/react-swap?branch=master)
[![Dependencies](https://img.shields.io/david/nkbt/react-swap.svg?style=flat-square)](https://david-dm.org/nkbt/react-swap)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-swap.svg?style=flat-square)](https://david-dm.org/nkbt/react-swap#info=devDependencies)

React component-wrapper to swap one element with another and back, useful to show/hide popups, expand/collapse elements, various toggles, etc.

## Installation

### NPM
```sh
npm install --save react react-swap
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.


### Bower:
```sh
bower install --save https://unpkg.com/react-swap/bower.zip
```


### 1998 Script Tag:
```html
<script src="https://unpkg.com/react/dist/react.js"></script>
<script src="https://unpkg.com/react-swap/build/react-swap.js"></script>
(Module exposed as `ReactSwap`)
```


## Demo

[http://nkbt.github.io/react-swap](http://nkbt.github.io/react-swap)

## Codepen demo

[http://codepen.io/nkbt/pen/zvodrN](http://codepen.io/nkbt/pen/zvodrN?editors=101)

## Usage
```js
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactSwap from 'react-swap';

const Off = React.createClass({
  propTypes: {
    children: PropTypes.arrayOf(PropTypes.element)
  },


  render() {
    const style = {
      width: '100px',
      height: '100px',
      backgroundColor: '#06c',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };
    return (
      <div {...this.props} style={style}>{this.props.children}</div>
    );
  }
});


const On = React.createClass({
  propTypes: {
    children: PropTypes.arrayOf(PropTypes.element)
  },


  render() {
    const style = {
      borderRadius: '50px',
      width: '100px',
      height: '100px',
      backgroundColor: '#c00',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };
    return (
      <div {...this.props} style={style}>{this.props.children}</div>
    );
  }
});


const Clickable = React.createClass({
  render() {
    return (
      <div>
        <h2>Clickable</h2>
        <Swap>
          <Off data-swap-handler>OFF</Off>
          <On data-swap-handler>ON</On>
        </Swap>
      </div>
    );
  }
});


const Hoverable = React.createClass({
  render() {
    return (
      <div>
        <h2>Hoverable</h2>
        <Swap isHover={true}>
          <Off data-swap-handler>OFF</Off>
          <On>ON</On>
        </Swap>
      </div>
    );
  }
});


const Delayed = React.createClass({
  render() {
    return (
      <div>
        <h2>Hoverable with delay</h2>
        <Swap isHover={true} delay={200}>
          <Off>OFF</Off>
          <On>ON</On>
        </Swap>
      </div>
    );
  }
});


const Deep = React.createClass({
  render() {
    return (
      <div>
        <h2>Deep Swap</h2>
        <Swap>
          <div>
            <h3 style={{marginLeft: 20}} data-swap-handler>Click me</h3>
          </div>
          <div>
            <h3 style={{marginLeft: 20}} data-swap-handler>Unclick me</h3>
            <div style={{marginLeft: 50}}>
              <Clickable />
            </div>
          </div>
        </Swap>
      </div>
    );
  }
});


const WithCallback = React.createClass({
  getInitialState() {
    return {opened: false};
  },


  render() {
    return (
      <div>
        <h2>With callback (opened: {this.state.opened ? 'yes' : 'no'})</h2>
        <Swap onSwap={opened => this.replaceState({opened})}>
          <Off data-swap-handler={1}>OFF</Off>
          <On data-swap-handler={1}>ON</On>
        </Swap>
      </div>
    );
  }
});


const App = React.createClass({
  render() {
    return (
      <div>
        <Clickable />
        <Hoverable />
        <Delayed />
        <Deep />
        <WithCallback />
      </div>
    );
  }
});


const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

## Options


#### `isHover`: PropTypes.bool

Should swap happen on hover rather then on click (default)?


#### `isSwapped`: PropTypes.bool

Should be initially swapped?


#### `delay`: PropTypes.number

Delay in `ms` for swapping back to first element.


#### `dataHandler`: PropTypes.string

Custom data attribute name for click-swap handler.
Defaults to `swapHandler` which is `data-swap-handler`


#### `onSwap(value)`: PropTypes.func

Callback which is called every time ReactSwap state is changed, `value` is `true` or `false`


## WARNING

At the moment you can only use native DOM elements as swappable children.
Though you can put any custom components inside as shown in example above.

The reason is that when custom component is used, it is not possible to capture `onClick` on it.


## Development and testing

Currently is being developed and tested with the latest stable `Node 6` on `OSX` and `Windows`.

To run example covering all `ReactSwap` features, use `npm start dev`, which will compile `src/example/Example.js`

```bash
git clone git@github.com:nkbt/react-swap.git
cd react-swap
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
