import React, { Component } from 'react';

class TextToCipher extends Component {
  state = {
    input: {
      //////////  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25
      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      shifalph: ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c"],
      shiftedAlphabet: []
    }
  }

  // warning! some lifecycle methods are going to be renamed very soon
  componentWillMount() {
    this.pivotArray();
  }


  pivotArray = () => {
    const { alphabet } = this.state.input;
    const slice1 = alphabet.slice(0, 3);
    const slice2 = alphabet.slice(3, 26);
    this.setState({
      input: {
        ...this.state.input,
        shiftedAlphabet: [...slice2, ...slice1]
      }
    });
  }


  handleChange = (e) => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.name]: e.target.value
      }
    });
  }


  tryCipher = () => {
    const { alphabet, shiftedAlphabet, text } = this.state.input;
    if (text) {
      const textArray = [];
      const textIndexArray = [];
      const cipherArray = [];
      for (let i = 0; i < text.length; i++) {
        textArray.push(text[i]);
        if (alphabet.includes(textArray[i])) {
          textIndexArray.push(alphabet.indexOf(textArray[i]));
          cipherArray.push(shiftedAlphabet[textIndexArray[i]]);
          console.log(cipherArray);
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
