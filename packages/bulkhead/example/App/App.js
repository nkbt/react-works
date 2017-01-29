import React from 'react';
import {Simple} from './Simple';
import {WithUpdates} from './WithUpdates';
import {WithEvents} from './WithEvents';


import * as css from './App.css';


export const App = () => (
  <div style={css.app}>
    <h1>react-bulkhead</h1>

    <section>
      <h2>1. Simple one-off rendering</h2>
      <Simple />
    </section>

    <section>
      <h2>2. With data updates</h2>
      <WithUpdates />
    </section>

    <section>
      <h2>3. With event listeners and unsubscribe</h2>
      <WithEvents />
    </section>
  </div>
);
