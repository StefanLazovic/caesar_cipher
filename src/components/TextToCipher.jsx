import React, { Component } from 'react';

class TextToCipher extends Component {
  state = {
    input: {
      //////////  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25
      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      shifalph: ['d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c']
    }
  }


  handleChange = (e) => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.name]: e.target.value
      }
    })
  }

  tryCipher = () => {
    const { alphabet, text } = this.state.input;
    if (text) {
      let textArray = [];
      for (let i = 0; i < text.length; i++) {
        textArray.push(text[i]);
        if (alphabet.includes(textArray[i])) {
          console.log(alphabet.indexOf(textArray[i]));
        }
      }
    }
  }

  render() {console.log(this.state);
    const { text, cipheredText } = this.state.input;
    return (
      <div>
        <form>
          <label htmlFor="text">Plain Text</label><br/>
          <input type="text" id="text" name="text" onChange={this.handleChange} /><br/>

          <label htmlFor="cipheredText">Ciphered Text</label><br/>
          <input type="text" id="cipheredText" name="cipheredText" onChange={this.handleChange} />
        </form>
        <p>{this.tryCipher()}</p>
        <p>{cipheredText}</p>
      </div>
    );
  }

}

export default TextToCipher;
