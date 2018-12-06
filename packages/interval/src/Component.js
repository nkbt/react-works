import React from 'react';
import PropTypes from 'prop-types';


export class ReactInterval extends React.Component {
  static defaultProps = {
    immediate: false,
    enabled: false,
    timeout: 1000
  };

  static propTypes = {
    callback: PropTypes.func.isRequired,
    immediate: PropTypes.bool,
    enabled: PropTypes.bool,
    timeout: PropTypes.number
  };

  componentDidMount() {
    if (this.props.enabled) {
      if (this.props.immediate) {
        this.props.callback();
      }
      this.start();
    }
  }

  shouldComponentUpdate({timeout, callback, enabled, immediate}) {
    return (
      this.props.timeout !== timeout ||
      this.props.callback !== callback ||
      this.props.enabled !== enabled ||
      this.props.immediate !== immediate
    );
  }

  componentDidUpdate({enabled}) {
    if (this.props.enabled !== enabled) {
      if (this.props.enabled) {
        if (this.props.immediate) {
          this.props.callback();
        }
        this.start();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  callback = () => {
    if (this.timer) {
      this.props.callback();
      this.start();
    }
  };

  start = () => {
    this.stop();
    this.timer = setTimeout(this.callback, this.props.timeout);
  };

  stop = () => {
    clearTimeout(this.timer);
    this.timer = null;
  };

  render = () => false;
}
