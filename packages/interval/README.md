# react-interval [![npm](https://img.shields.io/npm/v/react-interval.svg?style=flat-square)](https://www.npmjs.com/package/react-interval)

Safe React wrapper for setInterval

[![Gitter](https://img.shields.io/gitter/room/nkbt/help.svg?style=flat-square)](https://gitter.im/nkbt/help)
[![Dependencies](https://img.shields.io/david/nkbt/react-interval.svg?style=flat-square)](https://david-dm.org/nkbt/react-interval)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-interval.svg?style=flat-square)](https://david-dm.org/nkbt/react-interval#info=devDependencies)


## Installation


### NPM

```sh
npm install --save react react-interval
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.


### 1998 Script Tag:

```html
<script src="https://unpkg.com/react/dist/react.min.js"></script>
<script src="https://unpkg.com/react-interval/build/react-interval.min.js"></script>
(Module exposed as `ReactInterval`)
```


## Demo

[http://nkbt.github.io/react-interval](http://nkbt.github.io/react-interval)

## Codepen demo

[http://codepen.io/nkbt/pen/ZGmpoO](http://codepen.io/nkbt/pen/ZGmpoO?editors=101)

## Usage

### Quickstart
Start counting on render

```js
import ReactInterval from 'react-interval';

const App = React.createClass({
  getInitialState() {
    return {count: 0};
  },

  render() {
    const {count} = this.state;

    return (
      <div>
        {count}
        <ReactInterval timeout={1000} enabled={true}
          callback={() => this.setState({count: this.state.count + 1})} />
      </div>
    );
  }
});
```

### Full example
Change timeout on the fly, start and stop counting

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInterval from 'react-interval';

const App = React.createClass({
  getInitialState() {
    return {
      enabled: false,
      timeout: 1000,
      count: 0
    };
  },

  render() {
    const {timeout, enabled, count} = this.state;

    return (
      <div>
        <ReactInterval {...{timeout, enabled}}
          callback={() => this.setState({count: this.state.count + 1})} />

        <input type="number" step="200" min="200" max="5000" value={this.state.timeout}
          onChange={({target: {value}}) => this.setState({timeout: parseInt(value, 10)})} />&nbsp;

        <button disabled={enabled} onClick={() => this.setState({enabled: true})}>
          Start</button>&nbsp;

        <button disabled={!enabled} onClick={() => this.setState({enabled: false})}>
          Stop</button>&nbsp;

        {count}
      </div>
    );
  }
});

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

## Options


#### `callback`: PropTypes.func.isRequired

Function repeatedly called after timeout


#### `enabled`: PropTypes.bool (default: false)

Should start timer?


#### `timeout`: PropTypes.number (default: 1000)

Timeout before each `callback` call


## License

MIT
