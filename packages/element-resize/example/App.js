import React from 'react';
import {ReactElementResize} from '../src/Component';


export const App = React.createClass({
  getInitialState() {
    return {log: []};
  },


  onLog(data) {
    this.setState({log: [JSON.stringify(data)].concat(this.state.log).slice(0, 20)});
  },


  render() {
    const {log} = this.state;
    return (
      <div className="app">
        <h1>react-element-resize</h1>

        <h2>Debounce scrolling and resize by 200ms</h2>
        <ReactElementResize
          className="wrapper"
          debounceTimeout={200}
          onResize={this.onLog}
          onScroll={this.onLog}>
          {data => <pre className="pre">{JSON.stringify(data, null, 2)}</pre>}
        </ReactElementResize>

        <h2>Debounce scrolling by 200ms but no more then 1000ms</h2>
        <ReactElementResize
          className="wrapper"
          debounceTimeout={200}
          debounceOptions={{maxWait: 1000}}
          onScroll={this.onLog}>
          {data => <pre className="pre">{JSON.stringify(data, null, 2)}</pre>}
        </ReactElementResize>

        <div className="log">
          {log.map((line, i) => <pre className="line" key={`${i}/${line}`}>{line}</pre>)}
        </div>
      </div>
    );
  }
});
