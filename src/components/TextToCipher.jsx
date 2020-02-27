import React, { Component } from 'react';

class TextToCipher extends Component {
  state = {
    input: {}
  }

  handleChange = (e) => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name="text" onChange={this.handleChange} /><br/>
          <input type="text" name="cipheredText" onChange={this.handleChange} />
        </form>
      </div>
    );
  }

}

export default TextToCipher;
