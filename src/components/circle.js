import React, { Component } from 'react';
import Popup from './popup';
import '../App.css';
import Cell from './Cell';

class Circle extends Component {
  constructor(props) {
    super(props);
    const { defaultData, circles, selectedCircle } = this.init();
    this.state = {
      userCount: 0,
      circles, // [1,2,3,4,....36]
      selectedCircle,
      gameData: defaultData, //{1: 0, 2: 0... 36: 0}// 0 -default 1-selected/highlighted  2-correct 3-wrong
      startGame: false,
      correctCount: 0,
      showPopup: false,
      gameStartWarn: false,
      timer: null,
    };
  }
  /**
   *  Function init to no of circles.
   */
  init = () => {
    const gameSize = 36;
    let defaultData = {};
    let tempCircles = [];
    for (let i = 1; i <= gameSize; i++) {
      defaultData[i] = 0;
      tempCircles.push(i);
    }
    return {
      defaultData,
      circles: shuffleArray(tempCircles),
      selectedCircle: -1,
    };
  };

  generateNewPoint = () => {
    const { gameData, circles } = this.state;
    let newSelectedCircle = circles.pop();
    gameData[newSelectedCircle] = 1;
    this.setState({
      gameData,
      selectedCircle: newSelectedCircle,
      circles,
    });
  };
  /**
   * playStart function this is called when we click on play button
   * Changing state of startGame to true
   * Changing state of gameStartWarn to false
   */
  playStart = () => {
    this.setState({
      startGame: true,
      gameStartWarn: false,
    });
    this.generateNewPoint();
    this.randomHighlight();
  };
  randomHighlight = () => {
    console.log('Status', this.state.startGame);
    let timer = setTimeout(this.playStart, 5000);
    this.setState({
      timer: timer,
    });
  };
  /**
   * playStop function is when we click on stop button
   * Changes the curent score  to 0 (zero)
   * Changes the startGame state to false
   */
  playStop = () => {
    let timer = this.state.timer;
    clearTimeout(timer);
    this.setState({
      userCount: 0,
      startGame: false,
      correctCount: 0,
    });
  };
  /**
   * Function to check if the highlighted circle is clicked or not
   * If the highlighted circle is clicked it will increase the score count with one point
   * If the unhighlighted circle is clicked it will decrease the score count with one point
   */
  checkCorrectness = (ele) => {
    let { gameData, circles, startGame } = this.state;

    if (startGame) {
      let random = 5; //less than length of circles array
      let selectedCircle = circles[random]; //
      gameData[selectedCircle] = 1;

      if (this.state.selectedCircle == ele) {
        this.setState({
          userCount: this.state.userCount + 1,
        });
      } else {
        this.setState({
          userCount: this.state.userCount - 1,
        });
      }
    } else {
      this.setState({
        gameStartWarn: true,
      });
    }
  };

  /** Function to change the state of showPopup to true to display the popup */
  showPopup = () => {
    const { defaultData, circles, selectedCircle } = this.init();
    this.setState({
      showPopup: true,
      score: 10,
      gameData: defaultData,
      circles,
      selectedCircle,
      startGame: false,
    });
  };
  /** Function to change to state of showPopup to false, using this function we are closing the popup */
  closePopup = () => {
    this.setState({
      startGame: false,
      showPopup: false,
    });
  };

  computeStatus = (pos) => {
    let { gameData, selectedCircle } = this.state;
    if (parseInt(pos, 10) === selectedCircle) return 'selected';
    else if (gameData[pos] === 2) return 'hit';
    else if (gameData[pos] === 3) return 'miss';
  };

  render() {
    let { userCount, gameData, gameStartWarn, selectedCircle } = this.state;
    return (
      <div className="full-area">
        <h3>Hit the circle</h3>
        <h5>Test your skill how many circles you can hit</h5>
        <div className="score">
          Score<span className="score-count">{userCount}</span>
        </div>
        {gameStartWarn ? <div className="warn-text">First click the play button</div> : ''}
        <hr />
        <div className="outer-area">
          {Object.keys(gameData).map((ele) => {
            return (
              <Cell
                selectedCircle={selectedCircle}
                val={ele}
                status={this.computeStatus(ele)}
                onClick={() => this.checkCorrectness(ele)}
              />
            );
          })}
        </div>
        <hr />
        <div className="buttons">
          <button className="play" onClick={this.playStart}>
            Play
          </button>
          <button className="stop" onClick={this.showPopup}>
            Stop
          </button>
        </div>
        {/** Code for the popup,   */}
        {this.state.showPopup ? (
          <Popup
            text={`Your final score is ${userCount}`}
            closePopup={this.closePopup}
            resetGame={this.playStop}
          />
        ) : null}
      </div>
    );
  }
}

export default Circle;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
