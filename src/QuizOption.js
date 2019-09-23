import React, { Component } from 'react';


class QuizOption extends Component {
  callParent = () => {
    this.props.checkResult(this.props.option)
  }
  render() {
    return (
      <div className='fields animated zoomIn' onClick={this.callParent}>
        <div className='field-block'>{this.props.option}</div>
      </div>
    )
  }
}

// const QuizOption = (props) => {
//   return (
//     <div className='fields' onClick={props.checkResult(props.option)}>
//       <div className='field-block'>{props.option}</div>
//     </div>
//   )
// }

export default QuizOption;