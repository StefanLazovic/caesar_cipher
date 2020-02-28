import React, { Component } from 'react';

class TextToCipher extends Component {
  state = {
    input: {
      //////////  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25
      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      shifalph: ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c"],
      shiftedAlphabet: [],
      encodedText: '',
      decodedText: ''
    }
  }


  componentDidMount() {
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



  tryCipher = (e) => {
    const { alphabet, shiftedAlphabet, text, encodedText } = this.state.input;
    const eventText = e.target.value;
    const textArray = [];
    const textIndexArray = [];
    const cipherArray = [];
    let cipher = '';
    for (let i = 0; i < eventText.length; i++) {
      textArray.push(eventText[i]);
      if (alphabet.includes(textArray[i])) {
        textIndexArray.push(alphabet.indexOf(textArray[i]));
        cipherArray.push(shiftedAlphabet[textIndexArray[i]]);
        cipher = cipherArray.join('');
      }
    }
    this.setState({
      input: {
        ...this.state.input,
        encodedText: cipher
      }
    });
  }


  decodeCipher = (e) => {
    const { alphabet, shiftedAlphabet, encodedText } = this.state.input;
    const eventText = e.target.value;
    const cipherArray = [];
    const cipherIndexArray = [];
    const textArray = [];
    let text = '';
    for (let i = 0; i < eventText.length; i++) {
      cipherArray.push(eventText[i]);
      if (shiftedAlphabet.includes(cipherArray[i])) {
        cipherIndexArray.push(shiftedAlphabet.indexOf(cipherArray[i]));
        textArray.push(alphabet[cipherIndexArray[i]]);
        text = textArray.join('');
      }
    }
    this.setState({
      input: {
        ...this.state.input,
        decodedText: text
      }
    });
  }


  render() {console.log(this.state.input);
    const { encodedText, decodedText } = this.state.input;
    return (
      <div>
        <form>
          <label htmlFor="text">Plain Text</label><br/>
          <input type="text" id="text" name="text" onChange={this.tryCipher} /><br/>

          <label htmlFor="encodedText">Ciphered Text</label><br/>
          <input type="text" id="encodedText" name="encodedText" onChange={this.decodeCipher} />
          <p>{decodedText}</p>
        </form>
      </div>
    );
  }


}

export default TextToCipher;
