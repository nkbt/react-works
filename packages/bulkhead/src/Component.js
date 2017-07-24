import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react/lib/shallowCompare';


export class ReactBulkhead extends React.Component {
  static defaultProps = {
    element: `div`,
    propsWhitelist: [`id`, `className`, `style`],
    children: null
  };

  static propTypes = {
    element: PropTypes.string,
    propsWhitelist: PropTypes.arrayOf(PropTypes.string),
    onCreate: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  componentWillMount() {
    this.ref = null;
  }

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

      if (typeof bulkhead !== `object`) {
        return;
      }

      this.onUpdate = bulkhead.onUpdate;
      this.onDestroy = bulkhead.onDestroy;
    }
  }

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
  }

  shouldComponentUpdate = () => false;

  componentWillUnmount() {
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  onRef = ref => {
    this.ref = ref;
  };

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
}
