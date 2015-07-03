import extendProps from './extendProps.js';
import React from 'react';


const ReactSwap = React.createClass({
  propTypes: {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    isHover: React.PropTypes.bool,
    isSwapped: React.PropTypes.bool,
    delay: React.PropTypes.number,
    dataHandler: React.PropTypes.string
  },


  getDefaultProps() {
    return {
      isHover: false,
      isSwapped: false,
      delay: 0,
      dataHandler: 'swapHandler'
    };
  },


  getInitialState() {
    return {
      isSwapped: !!this.props.isSwapped
    };
  },


  expand() {
    this.setState({isSwapped: true});
    this.clearTimer();
  },


  setTimer(callback, timeout) {
    if (timeout) {
      this.timer = setTimeout(callback, timeout);
    } else {
      callback();
    }
  },


  clearTimer() {
    if (this.props.delay) {
      clearTimeout(this.timer);
    }
  },


  hide() {
    this.setTimer(() => this.setState({isSwapped: false}), this.props.delay);
  },


  swap(event) {
    // Should react on click only on [data-swap-handler="1"] elements
    if (!event.target.dataset[this.props.dataHandler]) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.state.isSwapped) {
      this.hide();
    } else {
      this.expand();
    }
  },


  componentWillUnmount() {
    this.clearTimer();
  },


  render() {
    const content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    const props = this.props.isHover ?
      extendProps(content.props, {onMouseOut: this.hide, onMouseOver: this.expand}) :
      extendProps(content.props, {onClick: this.swap});

    return React.createElement(content.type, props);
  }
});


export default ReactSwap;
