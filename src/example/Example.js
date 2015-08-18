import React from 'react';
import Swap from '..';


const Off = React.createClass({
  propTypes: {
    children: React.PropTypes.node
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
    children: React.PropTypes.node
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
          <Off data-swap-handler={1}>OFF</Off>
          <On data-swap-handler={1}>ON</On>
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
          <Off data-swap-handler={1}>OFF</Off>
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
            <h3 style={{marginLeft: 20}} data-swap-handler={1}>Click me</h3>
          </div>
          <div>
            <h3 style={{marginLeft: 20}} data-swap-handler={1}>Unclick me</h3>
            <div style={{marginLeft: 50}}>
              <Clickable />
            </div>
          </div>
        </Swap>
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
          <Swap>
            <tr>
              <td>
                <h3 style={{marginLeft: 20}} data-swap-handler={1}>Click me</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 style={{marginLeft: 20}} data-swap-handler={1}>Unclick me</h3>
              </td>
            </tr>
          </Swap>
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
        <Swap>
          <tbody>
            <tr>
              <td>
                <h3 style={{marginLeft: 20}} data-swap-handler={1}>Click me</h3>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <h3 style={{marginLeft: 20}} data-swap-handler={1}>Unclick me</h3>
                <div style={{marginLeft: 20}}>
                  <Table />
                </div>
              </td>
            </tr>
          </tbody>
        </Swap>
      </table>
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


const ToggleFromOutside = React.createClass({
  getInitialState() {
    return {opened: false};
  },


  render() {
    return (
      <div>
        <h2>
          Toggle from outside
          &nbsp;
          <button onClick={() => this.replaceState({opened: !this.state.opened})}>toggle</button>
        </h2>
        <Swap isSwapped={this.state.opened}>
          <Off>OFF</Off>
          <On>ON</On>
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
        <Table />
        <DeepTableSwap />
        <WithCallback />
        <ToggleFromOutside />
      </div>
    );
  }
});


React.render(<App />, document.body);
