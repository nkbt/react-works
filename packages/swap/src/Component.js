import PropTypes from 'prop-types';
import React from 'react';


const noop = () => {};


export class ReactSwap extends React.Component {
  static defaultProps = {
    isHover: false,
    isSwapped: false,
    delay: 0,
    dataHandler: 'swapHandler',
    onSwap: noop
  };


  static propTypes = {
    children: PropTypes.node.isRequired,
    isHover: PropTypes.bool,
    isSwapped: PropTypes.bool,
    delay: PropTypes.number,
    dataHandler: PropTypes.string,
    onSwap: PropTypes.func
  };


  constructor(props) {
    super(props);
    const {isSwapped} = props;

    this.state = {isSwapped: Boolean(isSwapped)};
  }


  componentDidUpdate({isSwapped: prevIsSwapped}) {
    const {isSwapped: nextIsSwapped} = this.props;
    if (prevIsSwapped !== nextIsSwapped && typeof nextIsSwapped !== 'undefined') {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({isSwapped: nextIsSwapped});
    }
  }


  componentWillUnmount() {
    this.clearTimer();
  }


  onClick = event => {
    // Should react on click only on [data-swap-handler="1"] elements
    const {dataHandler} = this.props;
    if (!event.target.dataset[dataHandler]) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    this.swap();
  };


  setTimer = (callback, timeout) => {
    if (!timeout) {
      callback();
      return;
    }
    this.timer = setTimeout(callback, timeout);
  };


  change = value => {
    const {onSwap} = this.props;

    this.setState({isSwapped: value}, () => onSwap(value));
  };


  clearTimer = () => {
    const {delay} = this.props;
    if (delay) {
      clearTimeout(this.timer);
    }
  };


  expand = () => {
    this.change(true);
    this.clearTimer();
  };


  hide = () => {
    const {delay} = this.props;
    this.setTimer(() => this.change(false), delay);
  };


  swap = () => {
    const {isSwapped} = this.state;
    if (isSwapped) {
      this.hide();
    } else {
      this.expand();
    }
  };


  render() {
    const {isSwapped} = this.state;
    const {children, isHover} = this.props;
    const content = isSwapped ? children[1] : children[0];
    const props = isHover
      ? {onMouseLeave: this.hide, onMouseEnter: this.expand}
      : {onClick: this.onClick};

    return React.cloneElement(content, props);
  }
}
