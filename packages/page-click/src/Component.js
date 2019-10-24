import React from 'react';
import PropTypes from 'prop-types';


const MAX_MOVE = 20;


const extractCoordinates = ({changedTouches}) => ({
  x: changedTouches[0].screenX,
  y: changedTouches[0].screenY
});


export class ReactPageClick extends React.PureComponent {
  static defaultProps = {
    onMouseDown: undefined,
    onTouchStart: undefined,
    outsideOnly: true,
    notifyOnTouchEnd: false
  };


  static propTypes = {
    children: PropTypes.node.isRequired,
    notify: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    outsideOnly: PropTypes.bool,
    notifyOnTouchEnd: PropTypes.bool
  };


  insideClick = false;


  touchStart = null;


  componentDidMount() {
    global.window.addEventListener('mousedown', this.onDocumentMouseDown, false);
    global.window.addEventListener('mouseup', this.onDocumentMouseUp, false);
    global.window.addEventListener('touchstart', this.onDocumentTouchStart, false);
    global.window.addEventListener('touchend', this.onDocumentTouchEnd, false);
  }

  componentWillUnmount() {
    global.window.removeEventListener('mousedown', this.onDocumentMouseDown, false);
    global.window.removeEventListener('mouseup', this.onDocumentMouseUp, false);
    global.window.removeEventListener('touchstart', this.onDocumentTouchStart, false);
    global.window.removeEventListener('touchend', this.onDocumentTouchEnd, false);
  }

  onDocumentMouseDown = (...args) => {
    if (this.insideClick) {
      return;
    }
    const {notify} = this.props;
    notify(...args);
  };

  onDocumentMouseUp = () => {
    this.insideClick = false;
  };

  onDocumentTouchEnd = (event, ...args) => {
    // on mobile safari click events are not bubbled up to the document unless the target has the
    // css `cursor: pointer;` http://www.quirksmode.org/blog/archives/2010/10/click_event_del_1.html
    // so try and work out if we should call the notify prop
    const {notifyOnTouchEnd, notify} = this.props;
    if (notifyOnTouchEnd && this.touchStart && !this.insideClick) {
      const {x, y} = extractCoordinates(event);
      const dx = Math.abs(x - this.touchStart.x);
      const dy = Math.abs(y - this.touchStart.y);

      if (dx < MAX_MOVE && dy < MAX_MOVE) {
        notify(event, ...args);
      }
    }
    this.touchStart = null;
    this.insideClick = false;
  };

  onDocumentTouchStart = (event, ...args) => {
    if (this.insideClick) {
      return;
    }
    const {notifyOnTouchEnd, notify} = this.props;
    if (notifyOnTouchEnd) {
      this.touchStart = extractCoordinates(event);
    } else {
      notify(event, ...args);
    }
  };

  onMouseDown = (...args) => {
    this.insideClick = true;
    const {onMouseDown} = this.props;
    if (onMouseDown) {
      onMouseDown(...args);
    }
  };

  onTouchStart = (...args) => {
    this.insideClick = true;
    const {onTouchStart} = this.props;
    if (onTouchStart) {
      onTouchStart(...args);
    }
  };

  render() {
    const {children, outsideOnly} = this.props;
    const props = outsideOnly ? {
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart
    } : {};

    return React.cloneElement(React.Children.only(children), props);
  }
}
