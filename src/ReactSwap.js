import extendProps from './extendProps';
import React from 'react';


const ReactSwap = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
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


  componentWillUnmount() {
    this.clearTimer();
  },


  render() {
    const content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    const props = this.props.isHover ?
      {onMouseLeave: this.hide, onMouseEnter: this.expand} :
      {onClick: this.onClick};

    return React.cloneElement(content, props);
  }
});


export default ReactSwap;
