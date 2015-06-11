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


const App = React.createClass({
  render() {
    return (
      <div>
        <Clickable />
        <Hoverable />
        <Delayed />
        <Deep />
      </div>
    );
  }
});


React.render(<App />, document.body);
