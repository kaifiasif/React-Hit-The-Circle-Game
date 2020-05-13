import React, { Component } from 'react';
import '../App.css';

class Popup extends Component {
  /** function to pass the data to the parent
   * resetGamefunction received as props to reset the score on click of close popup
   * close popup function is used to pass the showpopup flag to the parent, to close the poup
   */
  callParentFunction = () => {
    this.props.closePopup();
    this.props.resetGame();
  };
  /**
   * In this popup page we are displaying the your final score which is being passed as props from circle.js
   * Also a close me button to close the popup when it close me button is triggered, it will pass showModal as false to the parent (circle)
   */
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
