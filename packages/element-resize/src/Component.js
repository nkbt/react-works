import React from 'react';


export const ReactElementResize = React.createClass({
  propTypes: {
    callback: React.PropTypes.func.isRequired,
    enabled: React.PropTypes.bool,
    timeout: React.PropTypes.number
  },


  getDefaultProps() {
    return {
      enabled: false,
      timeout: 1000
    };
  },


  componentDidMount() {
    if (this.props.enabled) {
      this.start();
    }
  },


  shouldComponentUpdate({timeout, callback, enabled}) {
    return (
      this.props.timeout !== timeout ||
      this.props.callback !== callback ||
      this.props.enabled !== enabled
    );
  },


  componentDidUpdate({enabled}) {
    if (this.props.enabled !== enabled) {
      if (this.props.enabled) {
        this.start();
      } else {
        this.stop();
      }
    }
  },


  componentWillUnmount() {
    this.stop();
  },


  callback() {
    if (this.timer) {
      this.props.callback();
      this.start();
    }
  },


  start() {
    this.stop();
    this.timer = setTimeout(this.callback, this.props.timeout);
  },


  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  },


  render() {
    return false;
  }
});
