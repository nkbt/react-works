import React from 'react';
import PropTypes from 'prop-types';


import {ReactPageClick} from '../src/Component';


export const Modal = ({onClose, notifyOnTouchEnd, ...rest}) =>
  <div>
    <div className="shade" />
    <ReactPageClick notify={onClose} notifyOnTouchEnd={notifyOnTouchEnd}>
      <div className="popup">
        <div className="content" {...rest} />
      </div>
    </ReactPageClick>
  </div>;
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  notifyOnTouchEnd: PropTypes.bool
};
Modal.defaultProps = {
  notifyOnTouchEnd: undefined
};
