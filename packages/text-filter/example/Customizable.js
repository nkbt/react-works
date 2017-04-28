import React from 'react';
import PropTypes from 'prop-types';
import {TextFilter} from '../src/Component';


const Item = ({item}) => <li>{item}</li>;

Item.propTypes = {
  item: PropTypes.string.isRequired
};


const List = ({items}) => <ul>{items.map(item => <Item key={item} item={item} />)}</ul>;

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};


const fruits = [
  `apple`,
  `orange`,
  `banana`,
  `kiwi`,
  `pineapple`,
  `golden kiwi`,
  `green apple`
];


const fruitFilter = filter => fruit => fruit.toLowerCase().indexOf(filter.toLowerCase()) !== -1;


export class Customizable extends React.PureComponent {
  state = {
    filter: ``,
    minLength: 2,
    debounceTimeout: 300
  };

  onChangeDebounceTimeout = ({target: {value}}) => {
    this.setState({debounceTimeout: parseInt(value, 10)});
  };

  onChangeMinLength = ({target: {value}}) => {
    this.setState({minLength: parseInt(value, 10)});
  };

  onFilter = ({target: {value: filter}}) => {
    this.setState({filter});
  };

  render() {
    const {minLength, indefinite, debounceTimeout, filter} = this.state;

    const filteredFruits = filter ?
      fruits.filter(fruitFilter(filter)) :
      fruits.slice(0);

    return (
      <div>
        <h2>Customizable</h2>
        <label htmlFor="minLength">
          Min length [{minLength}]:&nbsp;
          <input
            id="minLength"
            type="range"
            step={1}
            min={0}
            max={10}
            value={minLength}
            onChange={this.onChangeMinLength} />&nbsp;
        </label>&nbsp;

        <label htmlFor="timeout">
          Debounce timeout [{debounceTimeout}ms]:&nbsp;
          <input
            id="timeout"
            disabled={indefinite}
            type="range"
            step={100}
            min={0}
            max={1000}
            value={debounceTimeout}
            onChange={this.onChangeDebounceTimeout} />&nbsp;
        </label>&nbsp;

        <h3>Test</h3>
        <TextFilter
          filter={filter}
          minLength={minLength}
          debounceTimeout={debounceTimeout}
          onFilter={this.onFilter} />

        <List items={filteredFruits} />
      </div>
    );
  }
}
