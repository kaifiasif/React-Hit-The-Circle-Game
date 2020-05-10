import React, { Component } from 'react';
import Popup from './popup';
import '../App.css';

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      obj: {},
      startGame: false,
      correctCount: 0,
      showPopup: false,
      gameStartWarn: false,
    };
  }

  componentDidMount() {
    this.generateCircle();
  }
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
  };

  /**
   * playStop function is when we click on stop button
   * Changes the curent score  to 0 (zero)
   * Changes the startGame state to false
   */
  playStop = () => {
    this.setState(
      {
        userCount: 0,
        startGame: false,
        correctCount: 0,
      },
      () => {
        this.generateCircle();
      }
    );
  };

  /**
   * function to generate circle
   */

  generateCircle = () => {
    let obj = {};
    let correctCount = 0;
    for (let i = 1; i <= 36; i++) {
      var randomNumber = Math.random() >= 0.5;
      if (randomNumber) {
        correctCount++;
      }
      obj[i] = randomNumber;
    }
    this.setState({
      obj,
      correctCount,
    });
  };

  checkCorrectness = (ele) => {
    let { obj, startGame } = this.state;
    if (startGame) {
      if (obj[ele]) {
        this.setState(
          {
            userCount: this.state.userCount + 1,
          },
          this.correct(ele)
        );
      } else {
        this.setState(
          {
            userCount: this.state.userCount - 1,
          },
          this.wrong(ele)
        );
      }
    } else {
      this.setState({
        gameStartWarn: true,
      });
    }
  };

  correct = (ele) => {
    let { obj } = this.state;
    obj[ele] = 'correct';
  };

  wrong = (ele) => {
    let { obj } = this.state;
    obj[ele] = 'wrong';
  };

  showPopup = () => {
    this.setState({
      showPopup: true,
    });
  };

  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  render() {
    let { userCount, obj, startGame, correctCount, gameStartWarn } = this.state;
    return (
      <div className="full-area">
        <h3>Hit the circle</h3>
        <h5>Test your skill how many circles you can hit</h5>
        <div className="score">
          Score<span className="score-count">{userCount}</span>
        </div>
        {gameStartWarn ? <div className="warn-text">First click the play button</div> : ''}
        <hr></hr>
        <div className="outer-area">
          {Object.keys(obj).map((ele) => {
            let val = obj[ele];
            return val === 'wrong' ? (
              <div className="circle">W</div>
            ) : val === 'correct' ? (
              <div className="circle">C</div>
            ) : (
              <div key={ele} className="circle" onClick={() => this.checkCorrectness(ele)}></div>
            );
          })}
        </div>
        <hr></hr>
        <div className="buttons">
          <button className="play" onClick={this.playStart}>
            Play
          </button>
          <button className="stop" onClick={this.showPopup}>
            Stop
          </button>
        </div>
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
