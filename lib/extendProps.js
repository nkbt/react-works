'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashLangIsFunction = require('lodash/lang/isFunction');

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var extendProps = function extendProps(props, moarProps) {
  var newProps = (0, _lodashObjectAssign2['default'])({}, props);
  Object.keys(moarProps).forEach(function (prop) {
    if ((0, _lodashLangIsFunction2['default'])(props[prop])) {
      newProps[prop] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        props[prop].apply(props, args);
        moarProps[prop].apply(moarProps, args);
      };
    } else {
      newProps[prop] = moarProps[prop];
    }
  });
  return newProps;
};

exports['default'] = extendProps;
module.exports = exports['default'];
//# sourceMappingURL=extendProps.js.map