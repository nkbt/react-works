import React from 'react';
import {Modal} from './Modal';


export class App extends React.Component {
  state = {
    showModal: false,
    showLazyModal: false
  };

  hideLazyModal = () => {
    this.setState({showLazyModal: false});
  };

  hideModal = () => {
    this.setState({showModal: false});
  };

  showLazyModal = () => {
    this.setState({showLazyModal: true});
  };

  showModal = () => {
    this.setState({showModal: true});
  };

  render() {
    const {showModal, showLazyModal} = this.state;

    return (
      <div className="app">
        <h1>react-page-click</h1>

        <button onClick={this.showModal}>
          Open Modal
        </button>
        &nbsp;Closes on mouse down or touch start events

        <br />

        <button onClick={this.showLazyModal}>
          Open Lazy Model
        </button>
        &nbsp;Closes on mouse down or touch end events

        {showModal
          ? (
            <Modal onClose={this.hideModal}>
              Modal content
            </Modal>
          ) : null}

        {showLazyModal
          ? (
            <Modal onClose={this.hideLazyModal} notifyOnTouchEnd>
              Lazy Modal content
            </Modal>
          ) : null}
      </div>
    );
  }
}
