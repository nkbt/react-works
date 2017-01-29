import React from 'react';
import ReactSwap from '../..';
import On from './On';
import Off from './Off';
import css from './App.css';


const Clickable = React.createClass({
  render() {
    return (
      <div>
        <h2>Clickable</h2>
        <ReactSwap>
          <Off data-swap-handler={1}>OFF</Off>
          <On data-swap-handler={1}>ON</On>
        </ReactSwap>
      </div>
    );
  }
});


const Hoverable = React.createClass({
  render() {
    return (
      <div>
        <h2>Hoverable</h2>
        <ReactSwap isHover={true}>
          <Off data-swap-handler={1}>OFF</Off>
          <On>ON</On>
        </ReactSwap>
      </div>
    );
  }
});


const Delayed = React.createClass({
  render() {
    return (
      <div>
        <h2>Hoverable with delay</h2>
        <ReactSwap delay={200} isHover={true}>
          <Off>OFF</Off>
          <On>ON</On>
        </ReactSwap>
      </div>
    );
  }
});


const Deep = React.createClass({
  render() {
    return (
      <div>
        <h2>Deep Swap</h2>
        <ReactSwap>
          <div>
            <h3 data-swap-handler={1} style={{marginLeft: 20}}>Click me</h3>
          </div>
          <div>
            <h3 data-swap-handler={1} style={{marginLeft: 20}}>Unclick me</h3>
            <div style={{marginLeft: 50}}>
              <Clickable />
            </div>
          </div>
        </ReactSwap>
      </div>
    );
  }
});


const Table = React.createClass({
  render() {
    return (
      <table style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <tbody>
          <tr>
            <td>
              <h2>Table Swap</h2>
            </td>
          </tr>
          <ReactSwap>
            <tr>
              <td>
                <h3 data-swap-handler={1} style={{marginLeft: 20}}>Click me</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 data-swap-handler={1} style={{marginLeft: 20}}>Unclick me</h3>
              </td>
            </tr>
          </ReactSwap>
        </tbody>
      </table>
    );
  }
});


const DeepTableSwap = React.createClass({
  render() {
    return (
      <table style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <tbody>
          <tr>
            <td>
              <h2>Deep Table Swap</h2>
            </td>
          </tr>
        </tbody>
        <ReactSwap>
          <tbody>
            <tr>
              <td>
                <h3 data-swap-handler={1} style={{marginLeft: 20}}>Click me</h3>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <h3 data-swap-handler={1} style={{marginLeft: 20}}>Unclick me</h3>
                <div style={{marginLeft: 20}}>
                  <Table />
                </div>
              </td>
            </tr>
          </tbody>
        </ReactSwap>
      </table>
    );
  }
});


const WithCallback = React.createClass({
  getInitialState() {
    return {opened: false};
  },


  onSwap(opened) {
    this.replaceState({opened});
  },


  render() {
    return (
      <div>
        <h2>With callback (opened: {this.state.opened ? 'yes' : 'no'})</h2>
        <ReactSwap onSwap={this.onSwap}>
          <Off data-swap-handler={1}>OFF</Off>
          <On data-swap-handler={1}>ON</On>
        </ReactSwap>
      </div>
    );
  }
});


const ToggleFromOutside = React.createClass({
  getInitialState() {
    return {opened: false};
  },


  onClick() {
    this.replaceState({opened: !this.state.opened});
  },


  render() {
    return (
      <div>
        <h2>
          Toggle from outside
          &nbsp;
          <button onClick={this.onClick}>toggle</button>
        </h2>
        <ReactSwap isSwapped={this.state.opened}>
          <Off>OFF</Off>
          <On>ON</On>
        </ReactSwap>
      </div>
    );
  }
});


const App = React.createClass({
  render() {
    return (
      <div className={css.app}>
        <h1>react-swap</h1>
        <Clickable />
        <Hoverable />
        <Delayed />
        <Deep />
        <Table />
        <DeepTableSwap />
        <WithCallback />
        <ToggleFromOutside />
      </div>
    );
  }
});


export default App;
