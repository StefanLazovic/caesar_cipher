import React, { Component } from 'react';

class TextToCipher extends Component {
  state = {
    //////////  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    shiftedAlphabet: [],
    encodedText: '',
    decodedText: ''
  }



  componentDidMount() {
    this.pivotArray();
  }



  pivotArray = () => {
    const { alphabet } = this.state;
    const slice1 = alphabet.slice(0, 3);
    const slice2 = alphabet.slice(3, 26);
    this.setState({
      ...this.state,
      shiftedAlphabet: [...slice2, ...slice1]
    });
  }



  tryCipher = (e) => {
    const { alphabet, shiftedAlphabet } = this.state;
    let cipher = '';
    for (const letter of e.target.value) {
      cipher += shiftedAlphabet[alphabet.indexOf(letter)];
    }
    this.setState({
      ...this.state,
      encodedText: cipher
    });
  }



  decodeCipher = (e) => {
    const { alphabet, shiftedAlphabet } = this.state;
    let text = '';
    for (const letter of e.target.value) {
      text += alphabet[shiftedAlphabet.indexOf(letter)];
    }
    this.setState({
      ...this.state,
      decodedText: text
    });
  }



  render() {console.log(this.state);
    return (
      <div>
        <form>
          <label htmlFor="text">Plain Text</label><br/>
          <input type="text" id="text" name="text" onChange={this.tryCipher} /><br/>

          <label htmlFor="encodedText">Ciphered Text</label><br/>
          <input type="text" id="encodedText" name="encodedText" onChange={this.decodeCipher} />
        </form>
      </div>
    );
  }
}

export default TextToCipher;
