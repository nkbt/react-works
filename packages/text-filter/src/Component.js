import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';


export class TextFilter extends React.PureComponent {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
    minLength: PropTypes.number,
    debounceTimeout: PropTypes.number
  };

  static defaultProps = {
    minLength: 2,
    debounceTimeout: 300
  };

  render() {
    const {onFilter, filter, ...props} = this.props;

    return (
      <DebounceInput placeholder="Filter"
        // Pass props through
        {...props}
        onChange={onFilter}
        value={filter} />
    );
  }
}
