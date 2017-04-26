import PropTypes from 'prop-types';
import React from 'react';


const noop = () => {};


export class ReactSwap extends React.Component {
  static defaultProps = {
    isHover: false,
    isSwapped: false,
    delay: 0,
    dataHandler: `swapHandler`,
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

  componentWillReceiveProps({isSwapped}) {
    if (typeof isSwapped !== `undefined` && this.state.isSwapped !== isSwapped) {
      this.setState({isSwapped});
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  onClick = (event) => {
    // Should react on click only on [data-swap-handler="1"] elements
    if (!event.target.dataset[this.props.dataHandler]) {
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

  change = (value) => {
    const {onSwap} = this.props;

    this.setState({isSwapped: value}, () => onSwap(value));
  };

  clearTimer = () => {
    if (this.props.delay) {
      clearTimeout(this.timer);
    }
  };

  expand = () => {
    this.change(true);
    this.clearTimer();
  };

  hide = () => {
    this.setTimer(() => this.change(false), this.props.delay);
  };

  swap = () => {
    if (this.state.isSwapped) {
      this.hide();
    } else {
      this.expand();
    }
  };

  render() {
    const content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    const props = this.props.isHover ?
      {onMouseLeave: this.hide, onMouseEnter: this.expand} :
      {onClick: this.onClick};

    return React.cloneElement(content, props);
  }
}
