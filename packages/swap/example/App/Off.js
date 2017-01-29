import React from 'react';


const Off = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },


  render() {
    const style = {
      width: '100px',
      height: '100px',
      backgroundColor: '#06c',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };

    return (
      <div {...this.props} style={style}>{this.props.children}</div>
    );
  }
});

export default Off;
