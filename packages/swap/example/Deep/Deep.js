import React from 'react';

import {Clickable} from '../Clickable';
import {ReactSwap} from '../../src/Component';

export function Deep() {
  return (
    <div data-e2e="deep">
      <h2>Deep Swap</h2>
      <ReactSwap>
        <div>
          <h3 data-swap-handler={1} style={{marginLeft: 20, cursor: 'pointer'}}>
            Click me
          </h3>
        </div>
        <div>
          <h3 data-swap-handler={1} style={{marginLeft: 20, cursor: 'pointer'}}>
            Unclick me
          </h3>
          <div style={{marginLeft: 50}}>
            <Clickable />
          </div>
        </div>
      </ReactSwap>
    </div>
  );
}
