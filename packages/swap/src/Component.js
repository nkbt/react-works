import React from 'react';


export const ReactSwap = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    isHover: React.PropTypes.bool,
    isSwapped: React.PropTypes.bool,
    delay: React.PropTypes.number,
    dataHandler: React.PropTypes.string,
    onSwap: React.PropTypes.func
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
      isSwapped: Boolean(this.props.isSwapped)
    };
  },


  componentWillReceiveProps({isSwapped}) {
    if (typeof isSwapped !== 'undefined' && this.state.isSwapped !== isSwapped) {
      this.replaceState({isSwapped});
    }
  },


  componentWillUnmount() {
    this.clearTimer();
  },


  change(value) {
    this.replaceState({isSwapped: value});
    if (this.props.onSwap) {
      this.props.onSwap(value);
    }
  },


  expand() {
    this.change(true);
    this.clearTimer();
  },


  setTimer(callback, timeout) {
    if (!timeout) {
      callback();
      return;
    }
    this.timer = setTimeout(callback, timeout);
  },


  clearTimer() {
    if (this.props.delay) {
      clearTimeout(this.timer);
    }
  },


  hide() {
    this.setTimer(() => this.change(false), this.props.delay);
  },


  swap() {
    if (this.state.isSwapped) {
      this.hide();
    } else {
      this.expand();
    }
  },


  onClick(event) {
    // Should react on click only on [data-swap-handler="1"] elements
    if (!event.target.dataset[this.props.dataHandler]) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    this.swap();
  },


  render() {
    const content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    const props = this.props.isHover ?
    {onMouseLeave: this.hide, onMouseEnter: this.expand} :
    {onClick: this.onClick};

    return React.cloneElement(content, props);
  }
});
