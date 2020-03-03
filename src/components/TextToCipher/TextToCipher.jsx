import React, { Component } from 'react';
import './textToCipher.css';
import ShuffleText from 'react-shuffle-text';
import DocumentPreview from '../DocumentPreview/DocumentPreview';



class TextToCipher extends Component {
  state = {
    //////////  0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    shiftedAlphabet: [],
    encodedText: '',
    decodedText: '',
    zoomIn: 'animated zoomIn slower',
    fadeOutDownBig: ''
  }



  componentDidMount() {
    this.pivotArray();
  }


  // alphabet: ['a', 'b', 'c', ...
  // shiftedA: ['d', 'e', 'f', ...
  pivotArray = () => {
    const { alphabet } = this.state;
    const slice1 = alphabet.slice(0, 3);
    const slice2 = alphabet.slice(3, 26);
    this.setState({
      ...this.state,
      shiftedAlphabet: [...slice2, ...slice1]
    });
  }



  tryCipher = e => {
    const { alphabet, shiftedAlphabet } = this.state;
    let cipher = '';
    for (const letter of e.target.value) {
      if (alphabet.indexOf(letter) === -1) {
        if (new RegExp("[A-Z]").test(letter)) {
          cipher += shiftedAlphabet[alphabet.indexOf(letter.toLowerCase())].toUpperCase();
        } else {
          cipher += letter;
        }
      } else {
        cipher += shiftedAlphabet[alphabet.indexOf(letter)];
      }
    }
    this.setState({
      ...this.state,
      encodedText: cipher,
      decodedText: e.target.value
    });
  }



  decodeCipher = e => {
    const { alphabet, shiftedAlphabet } = this.state;
    let text = '';
    for (const letter of e.target.value) {
      if (shiftedAlphabet.indexOf(letter) === -1) {
        if (new RegExp("[A-Z]").test(letter)) {
          text += alphabet[shiftedAlphabet.indexOf(letter.toLowerCase())].toUpperCase();
        } else {
          text += letter;
        }
      } else {
        text += alphabet[shiftedAlphabet.indexOf(letter)];
      }
    }
    this.setState({
      ...this.state,
      decodedText: text,
      encodedText: e.target.value
    });
  }



  hideInputs = () => {
    this.setState({
      ...this.state,
      zoomIn: '',
      fadeOutDownBig: 'animated fadeOutDownBig slow'
    });
  }



  render() {
    const { encodedText, decodedText, zoomIn, fadeOutDownBig } = this.state;
    return (
      <div className="input-position">
        <h1 className={`${fadeOutDownBig}`}>
          <ShuffleText content="CAESAR CIPHER" />
        </h1>
        <form className={`${zoomIn} ${fadeOutDownBig}`}>
          <input type="text" onChange={this.tryCipher} value={decodedText} placeholder="Plain Text" />
          <input type="text" onChange={this.decodeCipher} value={encodedText} placeholder="Ciphered Text" />
        </form>
        <DocumentPreview
          hideInputs={this.hideInputs}
          encodedText={encodedText}
          decodedText={decodedText}
        />
      </div>
    );
  }
}

export default TextToCipher;
