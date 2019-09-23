import React, { Component } from 'react';
import QuizOption from './QuizOption';
import classNames from 'classnames'

class Quiz extends Component {
  constructor() {
    super()
    this.renderMessage = this.renderMessage.bind(this);
    let riddle = this.playGame();
    this.state = {
      riddle,
      correct: false,
      gameOver: false,
      score: 0
    }   
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateOptions = (sum) => {
    let resultsArray = [];
    let randomNumberArray = [];

    while(randomNumberArray.length <= 3) {
      let randomNumber = this.randomNumber(1,19);
      if(randomNumberArray.indexOf(randomNumber) > -1) continue;
      randomNumberArray.push(randomNumber);
    }

    for(let i = 0; i < 3; i++) {
      let addSubtract = this.randomNumber(0,1);
      let result = sum;
      if(addSubtract === 1) {
        result += randomNumberArray[i];
        resultsArray.push(result);
      } else {
        result -= randomNumberArray[i];
        resultsArray.push(result);
      }
    }

    return resultsArray;
  }

  playGame = () => {
    let field1 = this.randomNumber(20, 50);
    let field2 = this.randomNumber(20, 50);
    let result = field1 + field2;
    let resultsArray = this.generateOptions(result);
    resultsArray.push(result);
    resultsArray.sort((a,b) => { return 0.5 - Math.random() })
    
    let riddle = {
      resultsArray: resultsArray,
      field1: field1,
      field2: field2,
      answer: result
    }

    if(this.state && this.state.gameOver) {
      this.setState({riddle})
    } else {
      return riddle;
    }
  }

  play = () => {
    if(this.state.correct) {
      let newScore = this.state.score + 1;
      this.setState({score: newScore})
    } else {
      this.setState({score: 0})
    }
    this.setState({
      correct: false,
      gameOver: false
    });
    this.playGame();
  }

  checkResult = (option) => {
    if(this.state.riddle.answer === option) {
      this.setState({
        correct: true,
        gameOver: true
      })
      console.log("Correct Answer");
    } else {
      this.setState({
        correct: false,
        gameOver: true
      })
      console.log("Wrong Answer");
    }
  }

  renderMessage = () => {
      if(this.state.correct) {
        return (
          <div>
            <h1>Score: {this.state.score + 1}</h1><br />
            <h3>Good job! Hit the button below to play again.</h3>
          </div>
        )
      } else {
        return <h3>ohhh ohhh! Hit the button below to play again.</h3>
      }
  }

  renderOptions = () => {
    return(
      <div className='options'>
        {this.state.riddle.resultsArray.map((option,i) => {
            return(
              <QuizOption option={option} key={i} checkResult={(option) => {this.checkResult(option)}}/>
            )
      })}
      </div>
    )
  }

  render() {
    return (
      <div className='quiz'>
        <div className='quize-content'>
          <p className='question'>What is the sum of <span className='text-info'>{this.state.riddle.field1}</span> and <span className='text-info'>{this.state.riddle.field2}</span> ?</p>
          {this.renderOptions()}
        </div>
        <div className={classNames("after animated zoomIn",{'hide': !this.state.gameOver}, {'correct': this.state.correct}, {'wrong': !this.state.correct})}>
          {this.renderMessage()}
        </div>
        <div>
          Score: {this.state.score}
        </div>
        <div className='play-again'>
          <a className='button' onClick={this.play}>Play Again</a>
        </div>
      </div>
    )
  }
}

export default Quiz;