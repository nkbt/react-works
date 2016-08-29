import React from 'react';
import shallowCompare from 'react/lib/shallowCompare';


export const ReactBulkhead = React.createClass({
  propTypes: {
    element: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    onCreate: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },


  getDefaultProps() {
    return {
      element: 'div'
    };
  },


  componentWillMount() {
    this.ref = null;
  },


  componentDidMount() {
    if (this.ref) {
      const {
        element: _element,
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
      onCreate: _onCreate,
      children: _children,
      ...props
    } = this.props;

    return React.createElement(element, {...props, ref: this.onRef});
  }
});
