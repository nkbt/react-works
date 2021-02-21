import React, {useState} from 'react';
import {On} from '../On';
import {Off} from '../Off';
import {ReactSwap} from '../../src/Component';

export function ToggleFromOutside() {
  const [opened, setOpened] = useState(false);

  return (
    <div data-e2e="toggle-from-outside">
      <h2>
        Toggle from outside &nbsp;
        <button type="button" onClick={() => setOpened(!opened)}>
          toggle (opened: {opened ? 'yes' : 'no'})
        </button>
      </h2>
      <ReactSwap isSwapped={opened}>
        <Off />
        <On />
      </ReactSwap>
    </div>
  );
}
