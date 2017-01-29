/* eslint no-console:0 */

import React from 'react';
import {ReactBulkhead} from '../..';


const onCreate = ({element}) => {
  console.log(`WithEvents: onCreate`, {element});

  element.innerHTML = `Hover me!`;

  const mouseover = () => {
    element.innerHTML = `HOVERED`;
  };

  const mouseout = () => {
    element.innerHTML = `Hover me!`;
  };

  element.addEventListener(`mouseover`, mouseover, false);
  element.addEventListener(`mouseout`, mouseout, false);

  return {
    onDestroy() {
      console.log(`WithEvents: onDestroy`);
      element.removeEventListener(`mouseover`, mouseover, false);
      element.removeEventListener(`mouseout`, mouseout, false);
    }
  };
};


export const WithEvents = React.createClass({
  getInitialState() {
    return {isDestroyed: false};
  },


  onDestroy({target: {checked}}) {
    this.setState({isDestroyed: checked});
  },


  render() {
    return (
      <div>
        <label>
          Destroy!&nbsp;
          <input onChange={this.onDestroy} type="checkbox" value={this.state.isDestroyed} />
        </label>
        {this.state.isDestroyed ?
          null :
          <ReactBulkhead onCreate={onCreate} value={this.state.value} />}
      </div>
    );
  }
});
