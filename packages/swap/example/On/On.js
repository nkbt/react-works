import React from 'react';
import PropTypes from 'prop-types';

export function On({children, ...rest}) {
  return (
    <div data-e2e="on" className="on" {...rest}>
      {children}
    </div>
  );
}
On.propTypes = {
  children: PropTypes.node
};
On.defaultProps = {
  children: 'ON'
};
