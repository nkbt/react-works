import assign from 'lodash/object/assign';
import isFunction from 'lodash/lang/isFunction';


const extendProps = (props, moarProps) => {
  const newProps = assign({}, props);

  Object.keys(moarProps).forEach(prop => {
    if (isFunction(props[prop])) {
      newProps[prop] = (...args) => {
        props[prop](...args);
        moarProps[prop](...args);
      };
    } else {
      newProps[prop] = moarProps[prop];
    }
  });
  return newProps;
};


export default extendProps;
