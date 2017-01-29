import React from 'react';


const On = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },


  render() {
    const style = {
      borderRadius: '50px',
      width: '100px',
      height: '100px',
      backgroundColor: '#c00',
      color: '#fff',
      lineHeight: '100px',
      textAlign: 'center'
    };

    return (
      <div {...this.props} style={style}>{this.props.children}</div>
    );
  }
});

export default On;
