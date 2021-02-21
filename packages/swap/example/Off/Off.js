import React from 'react';
import PropTypes from 'prop-types';

export function Off({children, ...rest}) {
  return (
    <div data-e2e="off" className="off" {...rest}>
      {children}
    </div>
  );
}
Off.propTypes = {
  children: PropTypes.node
};
Off.defaultProps = {
  children: 'OFF'
};
