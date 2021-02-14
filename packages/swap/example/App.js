import React from 'react';
import {ReactSwap} from '../src/Component';


const On = props => <div data-e2e="on" className="on" {...props} />;
const Off = props => <div data-e2e="off" className="off" {...props} />;


const Clickable = () => (
  <div data-e2e="clickable">
    <h2>Clickable</h2>
    <ReactSwap>
      <Off data-swap-handler={1}>OFF</Off>
      <On data-swap-handler={1}>ON</On>
    </ReactSwap>
  </div>
);


const Hoverable = () => (
  <div data-e2e="hoverable">
    <h2>Hoverable</h2>
    <ReactSwap isHover>
      <Off data-swap-handler={1}>OFF</Off>
      <On>ON</On>
    </ReactSwap>
  </div>
);


const Delayed = () => (
  <div data-e2e="delayed">
    <h2>Hoverable with delay</h2>
    <ReactSwap delay={200} isHover>
      <Off>OFF</Off>
      <On>ON</On>
    </ReactSwap>
  </div>
);


const Deep = () => (
  <div data-e2e="deep">
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


const Table = () => (
  <table data-e2e="table" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
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


const DeepTableSwap = () => (
  <table data-e2e="deep-table" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
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


class WithCallback extends React.Component {
  state = {opened: false};

  onSwap = opened => {
    this.setState({opened});
  };

  render() {
    const {opened} = this.state;
    return (
      <div data-e2e="with-callback">
        <h2>With callback (opened: {opened ? 'yes' : 'no'})</h2>
        <ReactSwap onSwap={this.onSwap}>
          <Off data-swap-handler={1}>OFF</Off>
          <On data-swap-handler={1}>ON</On>
        </ReactSwap>
      </div>
    );
  }
}

class ToggleFromOutside extends React.Component {
  state = {opened: false};

  onClick = () => {
    this.setState(({opened}) => ({opened: !opened}));
  };

  render() {
    const {opened} = this.state;
    return (
      <div data-e2e="toggle-from-outside">
        <h2>
          Toggle from outside
          &nbsp;
          <button type="button" onClick={this.onClick}>
            toggle (opened: {opened ? 'yes' : 'no'})
          </button>
        </h2>
        <ReactSwap isSwapped={opened}>
          <Off>OFF</Off>
          <On>ON</On>
        </ReactSwap>
      </div>
    );
  }
}


export const App = () => (
  <div className="app">
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
