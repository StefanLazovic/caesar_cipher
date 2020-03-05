import React, { Component } from 'react';
import './textToCipher.css';
import ShuffleText from 'react-shuffle-text';
import DocumentPreview from '../DocumentPreview/DocumentPreview';



class TextToCipher extends Component {
  state = {
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    shiftedAlphabet: [],
    encodedText: '',
    decodedText: '',
    zoomIn: 'animated zoomIn slower',
    fadeOutDownBig: '',
    fadeInUpBig: ''
  }


  // fire pivotArray() method when component mounts
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


  // convert text to cipher
  tryCipher = e => {
    e.preventDefault();
    const { alphabet, shiftedAlphabet } = this.state;
    let cipher = '';
    for (const letter of e.target.value) {
      // if a letter doesn't exist in the alphabet array (punctuation marks), add it anyway (else)
      if (alphabet.indexOf(letter) === -1) {
        // if this letter is uppercase, then lowercase it, cipher it, uppercase it and put it into cipher variable
        if (new RegExp("[A-Z]").test(letter)) {
          cipher += shiftedAlphabet[alphabet.indexOf(letter.toLowerCase())].toUpperCase();
        } else {
          cipher += letter;
        }
      } else {
        // add the ciphered letter which does exist in the alphabet array
        cipher += shiftedAlphabet[alphabet.indexOf(letter)];
      }
    }
    this.setState({
      ...this.state,
      encodedText: cipher,
      decodedText: e.target.value
    });
    // trigger setZoomIn() method from the DocumentPreview child component (animation purpose)
    this.refs.child.setZoomIn();
  }


  // convert cipher to text (a similar logic like from above)
  decodeCipher = e => {
    e.preventDefault();
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
    this.refs.child.setZoomIn();
  }


  // triggered from the DocumentPreview child component (animation purpose)
  hideInputs = () => {
    this.setState({
      ...this.state,
      zoomIn: '',
      fadeInUpBig: '',
      fadeOutDownBig: 'animated fadeOutDownBig slow'
    });
  }


  // triggered from the DocumentPreview child component (animation purpose)
  showInputs = () => {
    this.setState({
      ...this.state,
      fadeOutDownBig: '',
      fadeInUpBig: 'animated fadeInUpBig'
    });
  }


  // drilled method through DocumentPreview component and fired from Buttons component
  deleteAll = () => {
    setTimeout(() => this.setState({
      ...this.state,
      encodedText: '',
      decodedText: '',
    }), 3000);
  }



  render() {
    const { encodedText, decodedText, zoomIn, fadeOutDownBig, fadeInUpBig } = this.state;
    return (
      <div>
        <h1 className={`${fadeOutDownBig} ${fadeInUpBig}`}>
          {/*ShuffleText title animation*/}
          <ShuffleText content="CAESAR CIPHER" />
        </h1>

        <form className={`${zoomIn} ${fadeOutDownBig} ${fadeInUpBig} slow`}>
          <input type="text" onChange={this.tryCipher} value={decodedText} placeholder="Text" maxLength="200" />
          <input type="text" onChange={this.decodeCipher} value={encodedText} placeholder="Cipher" maxLength="200" />
        </form>

        <DocumentPreview
          hideInputs={this.hideInputs}
          showInputs={this.showInputs}
          encodedText={encodedText}
          decodedText={decodedText}
          deleteAll={this.deleteAll}
          ref="child"
        />
      </div>
    );
  }
}

export default TextToCipher;
