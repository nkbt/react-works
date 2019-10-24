/* eslint no-console:0 */

import React from 'react';
import {ReactBulkhead} from '../src/Component';


const onCreate = ({element, value}) => {
  console.log('WithUpdates: onCreate', {element, value});

  const update = val => {
    Object.assign(element, {
      innerHTML: `Set with element.innerHTML${val ? `: "${val}"` : ''}`
    });
  };

  update(value);

  return {
    onUpdate(next) {
      console.log('WithUpdates: onUpdate', {value: next.value});
      update(next.value);
    }
  };
};


export class WithUpdates extends React.Component {
  state = {value: ''};

  onChange = ({target: {value}}) => {
    this.setState({value});
  };

  render() {
    return (
      <div>
        <input onChange={this.onChange} type="text" value={this.state.value} />
        <ReactBulkhead onCreate={onCreate} value={this.state.value} />
      </div>
    );
  }
}
