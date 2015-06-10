'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactSwap = require('./ReactSwap');

var _ReactSwap2 = _interopRequireDefault(_ReactSwap);

var PropTypes = _react2['default'].PropTypes;

var Off = _react2['default'].createClass({
  displayName: 'Off',

  propTypes: {
    children: PropTypes.arrayOf(PropTypes.element)
  },

  render: function render() {
    var style = {
      width: '100px',
      height: '100px',
      backgroundColor: '#06c',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { style: style }),
      this.props.children
    );
  }
});

var On = _react2['default'].createClass({
  displayName: 'On',

  propTypes: {
    children: PropTypes.arrayOf(PropTypes.element)
  },

  render: function render() {
    var style = {
      borderRadius: '50px',
      width: '100px',
      height: '100px',
      backgroundColor: '#c00',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { style: style }),
      this.props.children
    );
  }
});

var App = _react2['default'].createClass({
  displayName: 'App',

  render: function render() {
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'h2',
        null,
        'Clickable'
      ),
      _react2['default'].createElement(
        _ReactSwap2['default'],
        null,
        _react2['default'].createElement(
          Off,
          { 'data-swap-handler': true },
          'OFF'
        ),
        _react2['default'].createElement(
          On,
          { 'data-swap-handler': true },
          'ON'
        )
      ),
      _react2['default'].createElement(
        'h2',
        null,
        'Hoverable'
      ),
      _react2['default'].createElement(
        _ReactSwap2['default'],
        { isHover: true },
        _react2['default'].createElement(
          Off,
          { 'data-swap-handler': true },
          'OFF'
        ),
        _react2['default'].createElement(
          On,
          null,
          'ON'
        )
      ),
      _react2['default'].createElement(
        'h2',
        null,
        'Hoverable with delay'
      ),
      _react2['default'].createElement(
        _ReactSwap2['default'],
        { isHover: true, delay: 200 },
        _react2['default'].createElement(
          Off,
          null,
          'OFF'
        ),
        _react2['default'].createElement(
          On,
          null,
          'ON'
        )
      )
    );
  }
});

_react2['default'].render(_react2['default'].createElement(App, null), document.body);
//# sourceMappingURL=example.js.map