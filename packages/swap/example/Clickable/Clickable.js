import React from 'react';
import {On} from '../On';
import {Off} from '../Off';
import {ReactSwap} from '../../src/Component';

export function Clickable() {
  return (
    <div data-e2e="clickable">
      <h2>Clickable</h2>
      <ReactSwap>
        <Off data-swap-handler={1} />
        <On data-swap-handler={1} />
      </ReactSwap>
    </div>
  );
}
