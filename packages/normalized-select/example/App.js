import React from 'react';
import {NormalizedSelect} from '../src/Component';


export class App extends React.PureComponent {
  state = {
    single: 'apples',
    multi: ['apples']
  };

  renderOptions = () => ['apples', 'oranges', 'bananas', 'kiwis']
    .map(option => <option key={option} value={option}>{option}</option>);

  render() {
    return (
      <div className="app">
        <h1>react-normalized-select</h1>
        <div>
          <h2>Single choice select</h2>
          <p>(drop-in replacement)</p>
          <label htmlFor="single">
            <NormalizedSelect
              id="single"
              value={this.state.single}
              onChange={e => this.setState({single: e.target.value})}>
              {this.renderOptions()}
            </NormalizedSelect>
          </label>

          <pre>this.state.single = {JSON.stringify(this.state.single, null, '  ')}</pre>
        </div>

        <div>
          <h2>Multi-choice select</h2>
          <label htmlFor="multi">
            <NormalizedSelect
              id="multi"
              multiple
              size={5}
              value={this.state.multi}
              onChange={e => this.setState({multi: e.target.value})}>
              {this.renderOptions()}
            </NormalizedSelect>
          </label>

          <pre>this.state.multi = {JSON.stringify(this.state.multi, null, '  ')}</pre>
        </div>
      </div>
    );
  }
}
