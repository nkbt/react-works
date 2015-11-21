# react-swap

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nkbt/help)

[![Circle CI](https://circleci.com/gh/nkbt/react-swap.svg?style=svg)](https://circleci.com/gh/nkbt/react-swap)
[![Coverage Status](https://coveralls.io/repos/github/nkbt/react-swap/badge.svg?branch=master)](https://coveralls.io/github/nkbt/react-swap?branch=master)
[![Dependency Status](https://david-dm.org/nkbt/react-swap.svg)](https://david-dm.org/nkbt/react-swap)
[![devDependency Status](https://david-dm.org/nkbt/react-swap/dev-status.svg)](https://david-dm.org/nkbt/react-swap#info=devDependencies)

React component-wrapper to swap one element with another and back, useful to show/hide popups, expand/collapse elements, various toggles, etc.

## Installation

### NPM

```sh
npm install --save react-swap
```


### Bower:
```sh
bower install --save https://npmcdn.com/react-swap/build.zip
```

or in `bower.json`

```json
{
  "dependencies": {
    "react-motion": "https://npmcdn.com/react-swap/build.zip"
  }
}
```

then include as
```html
<script src="bower_components/react-swap/react-swap.js"></script>
```


### 1998 Script Tag:
```html
<script src="https://npmcdn.com/react-swap/build/react-swap.js"></script>
(Module exposed as `ReactSwap`)
```


## Demo

[http://nkbt.github.io/react-swap/example](http://nkbt.github.io/react-swap/example)

## Codepen demo

[http://codepen.io/nkbt/pen/zvodrN](http://codepen.io/nkbt/pen/zvodrN?editors=101)

## Usage
```js
import React from 'react';
const {PropTypes} = React;
import Swap from './ReactSwap';


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


React.render(<App />, document.body);
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

To run example covering all `ReactSwap` features, use `npm start`, which will compile `src/example/Example.js`

```bash
git clone git@github.com:nkbt/react-swap.git
cd react-swap
npm install
npm start

# then
open http://localhost:8080
```

## License

MIT
