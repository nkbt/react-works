/* eslint no-console:0 */

import React from 'react';
import {ReactBulkhead} from '../src/Component';


const onCreate = ({element}) => {
  console.log(`WithEvents: onCreate`, {element});

  Object.assign(element, {
    innerHTML: `Hover me!`
  });

  const mouseover = () => {
    Object.assign(element, {
      innerHTML: `HOVERED`
    });
  };

  const mouseout = () => {
    Object.assign(element, {
      innerHTML: `Hover me!`
    });
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


export class WithEvents extends React.Component {
  state = {isDestroyed: false};

  onDestroy = ({target: {checked}}) => {
    this.setState({isDestroyed: checked});
  };

  render() {
    return (
      <div>
        <label htmlFor="onDestroy">
          Destroy!&nbsp;
          <input
            id="onDestroy"
            onChange={this.onDestroy}
            type="checkbox"
            value={this.state.isDestroyed} />
        </label>
        {this.state.isDestroyed ?
          null :
          <ReactBulkhead onCreate={onCreate} value={this.state.value} />}
      </div>
    );
  }
}
