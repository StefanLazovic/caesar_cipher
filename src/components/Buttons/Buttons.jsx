import React, { Component } from 'react';
import './buttons.css';

class Buttons extends Component {
  state = {
    buttonName: 'Text'
  }



  changeButtonName = () => {
    const { toggle } = this.props;
    const { buttonName } = this.state;
    toggle();
    if (buttonName === 'Text') {
      this.setState({
        ...this.state,
        buttonName: 'Cipher'
      });
    } else if (buttonName === 'Cipher') {
      this.setState({
        ...this.state,
        buttonName: 'Text'
      });
    }
  }



  close = () => {
    const { closeModal } = this.props;
    closeModal();
  }


  delete = () => {
    const { deleteAll, closeModal } = this.props;
    closeModal();
    deleteAll();
  }



  render() {
    const { buttonName } = this.state;
    return (
      <div>
        <button onClick={this.changeButtonName} id="text_cipher" className="buttons">{buttonName}</button>
        <button onClick={this.close} id="close" className="buttons">Change</button>
        <button onClick={this.delete} id="delete" className="buttons">Delete</button>
      </div>
    );
  }

}

export default Buttons;
