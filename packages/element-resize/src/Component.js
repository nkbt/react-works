/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';


const iframeStyle = {
  display: `block`,
  position: `absolute`,
  top: 0,
  left: 0,
  width: `100%`,
  height: `100%`,
  overflow: `hidden`,
  border: `none`,
  background: `transparent`,
  pointerEvents: `none`,
  zIndex: -1
};


export class ReactElementResize extends React.Component {
  static defaultProps = {
    onResize: undefined,
    onScroll: undefined,
    debounceTimeout: -1,
    debounceOptions: undefined,
    style: {},
    children: () => null
  };

  static propTypes = {
    onResize: PropTypes.func,
    onScroll: PropTypes.func,
    debounceTimeout: PropTypes.number,
    debounceOptions: PropTypes.shape({
      leading: PropTypes.bool,
      trailing: PropTypes.bool,
      maxWait: PropTypes.number
    }),
    style: PropTypes.object,
    children: PropTypes.func
  };

  state = {
    width: -1,
    height: -1,
    offsetLeft: -1,
    offsetTop: -1,
    scrollLeft: -1,
    scrollTop: -1
  };

  componentWillMount() {
    const {debounceTimeout, debounceOptions, onResize, onScroll} = this.props;

    if (onResize) {
      this.onResizeDebounced = debounceTimeout > -1 ?
        debounce(this.onResize, debounceTimeout, debounceOptions) :
        this.onResize;
    }

    if (onScroll) {
      this.onScrollDebounced = debounceTimeout > -1 ?
        debounce(this.onScroll, debounceTimeout, debounceOptions) :
        this.onScroll;
    }
  }

  componentDidMount() {
    const {onResize, onScroll} = this.props;

    if (onResize) {
      this.sensor.contentWindow.addEventListener(`resize`, this.onResizeDebounced, false);
      this.rafOnResize = window.requestAnimationFrame(this.onResize);
    }

    if (onScroll) {
      this.container.addEventListener(`scroll`, this.onScrollDebounced, false);
      this.rafOnScroll = window.requestAnimationFrame(this.onScroll);
    }
  }

  componentWillUnmount() {
    const {onResize, onScroll} = this.props;

    if (onResize) {
      window.cancelAnimationFrame(this.rafOnResize);
      this.sensor.contentWindow.removeEventListener(`resize`, this.onResizeDebounced, false);
      if (this.onResizeDebounced.cancel) {
        this.onResizeDebounced.cancel();
      }
    }

    if (onScroll) {
      window.cancelAnimationFrame(this.rafOnScroll);
      this.container.removeEventListener(`scroll`, this.onScrollDebounced, false);
      if (this.onScrollDebounced.cancel) {
        this.onScrollDebounced.cancel();
      }
    }
  }

  onContainerRef = ref => {
    this.container = ref;
  };

  onResize = () => {
    const {innerWidth: width, innerHeight: height} = this.sensor.contentWindow;
    const {onResize} = this.props;
    onResize({width, height});
    this.setState({width, height});
  };

  onScroll = () => {
    const {offsetLeft, offsetTop, scrollLeft, scrollTop} = this.container;
    const {onScroll} = this.props;
    onScroll({offsetLeft, offsetTop, scrollLeft, scrollTop});
    this.setState({offsetLeft, offsetTop, scrollLeft, scrollTop});
  };

  onSensorRef = ref => {
    this.sensor = ref;
  };

  render() {
    const {
      onResize,
      onScroll,
      debounceTimeout: _debounceTimeout,
      debounceOptions: _debounceOptions,
      style,
      children: render,
      ...props
    } = this.props;
    const {width, height, offsetLeft, offsetTop, scrollLeft, scrollTop} = this.state;
    const shouldRender = (onResize && width > -1 && height > -1) ||
      (onScroll && offsetLeft > -1 && offsetTop > -1 && scrollLeft > -1 && scrollTop > -1);

    return (
      <div ref={this.onContainerRef} style={{position: `relative`, ...style}} {...props}>
        {onResize ?
          <iframe ref={this.onSensorRef} title="Element resize sensor" style={iframeStyle} /> : null}
        {shouldRender ?
          render({width, height, offsetLeft, offsetTop, scrollLeft, scrollTop}) : null}
      </div>
    );
  }
}
