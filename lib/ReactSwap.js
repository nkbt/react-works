'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extendPropsJs = require('./extendProps.js');

var _extendPropsJs2 = _interopRequireDefault(_extendPropsJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PropTypes = _react2['default'].PropTypes;

var ReactSwap = _react2['default'].createClass({
  displayName: 'ReactSwap',

  propTypes: {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    isHover: PropTypes.bool,
    isSwapped: PropTypes.bool,
    delay: PropTypes.number,
    dataHandler: PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isHover: false,
      isSwapped: false,
      delay: 0,
      dataHandler: 'swapHandler'
    };
  },

  getInitialState: function getInitialState() {
    return {
      isSwapped: !!this.props.isSwapped
    };
  },

  expand: function expand() {
    this.setState({ isSwapped: true });
    this.clearTimer();
  },

  setTimer: function setTimer(callback, timeout) {
    if (timeout) {
      this.timer = setTimeout(callback, timeout);
    } else {
      callback();
    }
  },

  clearTimer: function clearTimer() {
    if (this.props.delay) {
      clearTimeout(this.timer);
    }
  },

  hide: function hide() {
    var _this = this;

    this.setTimer(function () {
      return _this.setState({ isSwapped: false });
    }, this.props.delay);
  },

  swap: function swap(e) {
    // Should react on click only on [data-swap-handler="1"] elements
    if (!e.target.dataset[this.props.dataHandler]) {
      return;
    }
    if (this.state.isSwapped) {
      this.hide();
    } else {
      this.expand();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.clearTimer();
  },

  render: function render() {
    var content = this.state.isSwapped ? this.props.children[1] : this.props.children[0];
    var props = this.props.isHover ? (0, _extendPropsJs2['default'])(content.props, { onMouseOut: this.hide, onMouseOver: this.expand }) : (0, _extendPropsJs2['default'])(content.props, { onClick: this.swap });

    return _react2['default'].createElement(content.type, props);
  }
});

exports['default'] = ReactSwap;
module.exports = exports['default'];
//# sourceMappingURL=ReactSwap.js.map