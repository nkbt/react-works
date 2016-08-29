import React from 'react';
import shallowCompare from 'react/lib/shallowCompare';


export const ReactBulkhead = React.createClass({
  propTypes: {
    element: React.PropTypes.string,
    propsWhitelist: React.PropTypes.arrayOf(React.PropTypes.string),
    onCreate: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },


  getDefaultProps() {
    return {
      element: 'div',
      propsWhitelist: ['id', 'className', 'style']
    };
  },


  componentWillMount() {
    this.ref = null;
  },


  componentDidMount() {
    if (this.ref) {
      const {
        element: _element,
        propsWhitelist: _propsWhitelist,
        onCreate,
        children: _children,
        ...props
      } = this.props;
      const bulkhead = onCreate({element: this.ref, ...props});

      if (typeof bulkhead !== 'object') {
        return;
      }

      this.onUpdate = bulkhead.onUpdate;
      this.onDestroy = bulkhead.onDestroy;
    }
  },


  componentWillReceiveProps({
    element: _element,
    propsWhitelist: _propsWhitelist,
    onCreate: _onCreate,
    children: _children,
    ...newProps
  }) {
    if (!this.ref) {
      return;
    }

    if (this.onUpdate && shallowCompare(this, newProps)) {
      this.onUpdate(newProps);
    }
  },


  shouldComponentUpdate() {
    return false;
  },


  componentWillUnmount() {
    if (this.onDestroy) {
      this.onDestroy();
    }
  },


  onRef(ref) {
    this.ref = ref;
  },


  render() {
    const {
      element,
      propsWhitelist,
      onCreate: _onCreate,
      children: _children,
      ...rest
    } = this.props;
    const elementProps = Object.keys(rest)
      .filter(key => propsWhitelist.indexOf(key) > -1)
      .reduce((props, key) => Object.assign(props, {[key]: rest[key]}), {});

    return React.createElement(element, {...elementProps, ref: this.onRef});
  }
});
