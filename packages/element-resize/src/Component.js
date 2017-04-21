import React from 'react';
import debounce from 'lodash.debounce';


const iframeStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  border: 'none',
  background: 'transparent',
  pointerEvents: 'none',
  zIndex: -1
};


export const ReactElementResize = React.createClass({
  propTypes: {
    onResize: React.PropTypes.func,
    onScroll: React.PropTypes.func,
    debounceTimeout: React.PropTypes.number,
    debounceOptions: React.PropTypes.shape({
      leading: React.PropTypes.bool,
      trailing: React.PropTypes.bool,
      maxWait: React.PropTypes.number
    }),
    style: React.PropTypes.object,
    children: React.PropTypes.func
  },


  getDefaultProps() {
    return {
      style: {},
      debounceTimeout: -1,
      children: () => null
    };
  },


  getInitialState() {
    return {
      width: -1,
      height: -1,
      offsetLeft: -1,
      offsetTop: -1,
      scrollLeft: -1,
      scrollTop: -1
    };
  },


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
  },


  componentDidMount() {
    const {onResize, onScroll} = this.props;

    if (onResize) {
      this.sensor.contentWindow.addEventListener('resize', this.onResizeDebounced, false);
      this.rafOnResize = requestAnimationFrame(this.onResize);
    }

    if (onScroll) {
      this.container.addEventListener('scroll', this.onScrollDebounced, false);
      this.rafOnScroll = requestAnimationFrame(this.onScroll);
    }
  },


  componentWillUnmount() {
    const {onResize, onScroll} = this.props;

    if (onResize) {
      cancelAnimationFrame(this.rafOnResize);
      this.sensor.contentWindow.removeEventListener('resize', this.onResizeDebounced, false);
      if (this.onResizeDebounced.cancel) {
        this.onResizeDebounced.cancel();
      }
    }

    if (onScroll) {
      cancelAnimationFrame(this.rafOnScroll);
      this.container.removeEventListener('scroll', this.onScrollDebounced, false);
      if (this.onScrollDebounced.cancel) {
        this.onScrollDebounced.cancel();
      }
    }
  },


  onResize() {
    const {innerWidth: width, innerHeight: height} = this.sensor.contentWindow;
    const {onResize} = this.props;
    onResize({width, height});
    this.setState({width, height});
  },


  onScroll() {
    const {offsetLeft, offsetTop, scrollLeft, scrollTop} = this.container;
    const {onScroll} = this.props;
    onScroll({offsetLeft, offsetTop, scrollLeft, scrollTop});
    this.setState({offsetLeft, offsetTop, scrollLeft, scrollTop});
  },


  onContainerRef(ref) {
    this.container = ref;
  },


  onSensorRef(ref) {
    this.sensor = ref;
  },


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
    const shouldRender = onResize && width > -1 && height > -1 ||
      onScroll && offsetLeft > -1 && offsetTop > -1 && scrollLeft > -1 && scrollTop > -1;

    return (
      <div ref={this.onContainerRef} style={{position: 'relative', ...style}} {...props}>
        {onResize ?
          <iframe ref={this.onSensorRef} style={iframeStyle} /> : null}
        {shouldRender ?
          render({width, height, offsetLeft, offsetTop, scrollLeft, scrollTop}) : null}
      </div>
    );
  }
});
