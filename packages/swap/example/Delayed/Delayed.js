import React from 'react';
import {On} from '../On';
import {Off} from '../Off';
import {ReactSwap} from '../../src/Component';

export function Delayed() {
  return (
    <div data-e2e="delayed">
      <h2>Hoverable with delay</h2>
      <ReactSwap delay={200} isHover>
        <Off />
        <On />
      </ReactSwap>
    </div>
  );
}
