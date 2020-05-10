import React, { Component } from 'react';
import '../App.css';

class Popup extends Component {
  /** */
  callParentFunction = () => {
    this.props.closePopup();
    this.props.resetGame();
  };
  render() {
    let { text } = this.props;
    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>{text}</h2>
          <button className="pop-close" onClick={this.callParentFunction}>
            Close me
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
