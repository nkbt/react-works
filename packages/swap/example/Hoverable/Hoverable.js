import React from 'react';
import {On} from '../On';
import {Off} from '../Off';
import {ReactSwap} from '../../src/Component';

export function Hoverable() {
  return (
    <div data-e2e="hoverable">
      <h2>Hoverable</h2>
      <ReactSwap isHover>
        <Off data-swap-handler={1} />
        <On />
      </ReactSwap>
    </div>
  );
}
