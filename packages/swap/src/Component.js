import React from 'react';


const noop = () => {};


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
      dataHandler: `swapHandler`,
      onSwap: noop
    };
  },


  getInitialState() {
    const {isSwapped} = this.props;

    return {isSwapped: Boolean(isSwapped)};
  },


  componentWillReceiveProps({isSwapped}) {
    if (typeof isSwapped !== `undefined` && this.state.isSwapped !== isSwapped) {
      this.setState({isSwapped});
    }
  },


  componentWillUnmount() {
    this.clearTimer();
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


  change(value) {
    const {onSwap} = this.props;

    this.setState({isSwapped: value}, () => onSwap(value));
  },


  expand() {
    this.change(true);
    this.clearTimer();
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


  render() {
    const content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    const props = this.props.isHover ?
      {onMouseLeave: this.hide, onMouseEnter: this.expand} :
      {onClick: this.onClick};

    return React.cloneElement(content, props);
  }
});
