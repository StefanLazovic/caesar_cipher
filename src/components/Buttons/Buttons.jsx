import React, { Component } from 'react';
import './buttons.css';

class Buttons extends Component {
  state = {
    buttonName: 'Cipher'
  }



  changeButtonName = () => {
    const { buttonName } = this.state;
    if (buttonName === 'Cipher') {
      this.setState({
        ...this.state,
        buttonName: 'Text'
      });
    } else if (buttonName === 'Text') {
      this.setState({
        ...this.state,
        buttonName: 'Cipher'
      });
    }
  }



  render() {
    const { buttonName } = this.state;
    return (
      <div>
        <button onClick={this.changeButtonName} id="text_cipher" className="buttons">{buttonName}</button>
        <button id="close" className="buttons">Close</button>
        <button id="delete" className="buttons">Delete</button>
      </div>
    );
  }

}

export default Buttons;
