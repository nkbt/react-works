import React, {useState} from 'react';
import {On} from '../On';
import {Off} from '../Off';
import {ReactSwap} from '../../src/Component';

export function WithCallback() {
  const [opened, setOpened] = useState(false);

  return (
    <div data-e2e="with-callback">
      <h2>With callback (opened: {opened ? 'yes' : 'no'})</h2>
      <ReactSwap onSwap={() => setOpened(!opened)}>
        <Off data-swap-handler={1} />
        <On data-swap-handler={1} />
      </ReactSwap>
    </div>
  );
}
