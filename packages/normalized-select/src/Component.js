import React from 'react';
import PropTypes from 'prop-types';


export class NormalizedSelect extends React.PureComponent {
  static propTypes = {
    multiple: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    multiple: false,
    onChange: undefined
  };

  onChange = event => {
    const {multiple, onChange: onChange1} = this.props;
    if (!multiple) {
      onChange1(event);
      return;
    }
    onChange1({
      ...event,
      target: {
        ...event.target,
        value: Array.prototype.slice.call(event.target.options, 0)
          .filter(o => o.selected)
          .map(o => o.value)
      }
    });
  };

  render() {
    const {onChange, ...props} = this.props;

    return onChange ? <select {...props} onChange={this.onChange} /> : <select {...props} />;
  }
}
