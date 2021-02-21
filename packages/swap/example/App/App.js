import React from 'react';
import {Clickable} from '../Clickable';
import {Hoverable} from '../Hoverable';
import {Delayed} from '../Delayed';
import {Deep} from '../Deep';
import {WithCallback} from '../WithCallback';
import {ToggleFromOutside} from '../ToggleFromOutside';


export function App() {
  return (
    <div className="app">
      <h1>react-swap</h1>
      <Clickable />
      <Hoverable />
      <Delayed />
      <Deep />
      <WithCallback />
      <ToggleFromOutside />
    </div>
  );
}
