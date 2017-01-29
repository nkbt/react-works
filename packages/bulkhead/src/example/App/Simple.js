/* eslint no-console:0 */

import React from 'react';
import {ReactBulkhead} from '../..';


const onCreate = ({element}) => {
  console.log('Simple: onCreate', {element});
  element.innerHTML = 'Gotcha! Mutable DOM here';
};


export const Simple = () => (
  <ReactBulkhead onCreate={onCreate} />
);
