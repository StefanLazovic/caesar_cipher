import React, { Component } from 'react';
import './documentPreview.css';
import Buttons from '../Buttons/Buttons';



class DocumentPreview extends Component {
  state = {
    hidden: 'hidden',
    show: false,
    zoomIn: 'animated zoomIn',
    fadeOutDownBig: '',
    fadeInDownBig: '',
    fadeOutUpBig: '',
    fadeInUpBig: '',
    showEncoded: '',
    showDecoded: 'hideDecoded',
    disabled: false
  }


  // have to hide the Document Preview button for some time,
  // because of unexpected animation during page loading
  componentDidMount() {
		setTimeout(() => this.setState({ ...this.state, hidden: '' }), 1000);
	}



  showDocument = () => {
    this.setState({
      ...this.state,
      show: true,
      zoomIn: '',
      fadeOutUpBig: '',
      fadeInUpBig: '',
      fadeOutDownBig: 'animated fadeOutDownBig',
      fadeInDownBig: 'animated fadeInDownBig slow'
    });
    // trigger hideInputs() method from the TextToCipher parent component (animation purpose)
    this.props.hideInputs();
  }


  // fired from Buttons child component, toggles between text and cipher
  toggle = () => {
    const { showEncoded } = this.state;
    if (showEncoded === '') {
      this.setState({
        ...this.state,
        showEncoded: 'hideEncoded',
        showDecoded: ''
      });
    } else if (showEncoded === 'hideEncoded') {
      this.setState({
        ...this.state,
        showEncoded: '',
        showDecoded: 'hideDecoded'
      });
    }
  }


  // fired from Buttons child component
  closeModal = () => {
    // trigger showInputs() method from the TextToCipher parent component (animation purpose)
    this.props.showInputs();
    this.setState({
      ...this.state,
      fadeOutDownBig: '',
      fadeInDownBig: '',
      fadeOutUpBig: 'animated fadeOutUpBig',
      fadeInUpBig: 'animated fadeInUpBig slower',
      disabled: true
    });
    // application needs to wait animation is finished,
    // in order to prepare state management for the next circle
    setTimeout(() => this.setState({
      ...this.state,
      show: false,
      fadeOutUpBig: '',
      fadeInUpBig: '',
      disabled: false
    }), 3000);
  }


  // fired from TextToCipher parent component (animation purpose)
  setZoomIn = () => {
    const { encodedText, decodedText } = this.props;
    if (encodedText.length === 0 || decodedText.length === 0) {
      this.setState({
        ...this.state,
        zoomIn: 'animated zoomIn'
      });
    }
  }



  render() {
    const { encodedText, decodedText, deleteAll } = this.props;
    const {
      hidden,
      show,
      zoomIn,
      fadeOutDownBig,
      fadeInDownBig,
      fadeOutUpBig,
      fadeInUpBig,
      showEncoded,
      showDecoded,
      disabled
    } = this.state;

    return (
      <div>
        {
          show === true
          ? <div className={`modal ${fadeInDownBig} ${fadeOutUpBig} min-width`}>
              <img src={require('../../assets/paper.png')} alt="Caesar" />
              <p id={`${showEncoded}`}>{encodedText}</p>
              <p id={`${showDecoded}`}>{decodedText}</p>
              <Buttons toggle={this.toggle} closeModal={this.closeModal} deleteAll={deleteAll} />
            </div>
          : null
        }
        {
          encodedText.length !== 0 || decodedText.length !== 0
          ? <button
              onClick={this.showDocument}
              className={`preview ${zoomIn} ${fadeOutDownBig} ${fadeInUpBig}`}
              disabled={disabled}>
              Document Preview
            </button>
          : <button className={`preview animated zoomOut ${hidden}`} disabled>Document Preview</button>
        }
      </div>
    );
  }
}

export default DocumentPreview;
