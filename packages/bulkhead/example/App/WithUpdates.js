/* eslint no-console:0 */

import React from 'react';
import {ReactBulkhead} from '../..';


const onCreate = ({element, value}) => {
  console.log(`WithUpdates: onCreate`, {element, value});

  const update = val => {
    element.innerHTML = `Set with element.innerHTML${val ? `: "${val}"` : ``}`;
  };

  update(value);

  return {
    onUpdate(next) {
      console.log(`WithUpdates: onUpdate`, {value: next.value});
      update(next.value);
    }
  };
};


export const WithUpdates = React.createClass({
  getInitialState() {
    return {value: ``};
  },


  onChange({target: {value}}) {
    this.setState({value});
  },


  render() {
    return (
      <div>
        <input onChange={this.onChange} type="text" value={this.state.value} />
        <ReactBulkhead onCreate={onCreate} value={this.state.value} />
      </div>
    );
  }
});
