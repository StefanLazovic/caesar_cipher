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
  }



  componentDidMount() {
		setTimeout(() => this.setState({ ...this.state, hidden: '' }), 1000);
	}



  trigger = () => {
    this.setState({
      ...this.state,
      show: true,
      zoomIn: '',
      fadeOutUpBig: '',
      fadeInUpBig: '',
      fadeOutDownBig: 'animated fadeOutDownBig',
      fadeInDownBig: 'animated fadeInDownBig slow'
    });
    this.props.hideInputs();
  }


  toggle = () => {
    const { showEncoded, showDecoded } = this.state;
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


  closeModal = () => {
    this.props.showInputs();
    this.setState({
      ...this.state,
      fadeOutDownBig: '',
      fadeInDownBig: '',
      fadeOutUpBig: 'animated fadeOutUpBig',
      fadeInUpBig: 'animated fadeInUpBig slower'
    });
    setTimeout(() => this.setState({
      ...this.state,
      show: false,
      fadeOutUpBig: '',
      fadeInUpBig: '',
    }), 3500);
  }

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
    const { hidden, show, zoomIn, fadeOutDownBig, fadeInDownBig, fadeOutUpBig, fadeInUpBig, showEncoded, showDecoded } = this.state;
    return (
      <div>
        {
          this.state.show === true
          ? <div className={`modal ${fadeInDownBig} ${fadeOutUpBig}`}>
              <img src={require('../../assets/paper.png')} alt="Caesar" />
              <p id={`${showEncoded}`}>{encodedText}</p>
              <p id={`${showDecoded}`}>{decodedText}</p>
              <Buttons toggle={this.toggle} closeModal={this.closeModal} deleteAll={deleteAll} />
            </div>
          : null
        }
        {
          encodedText.length !== 0 || decodedText.length !== 0
          ? <button onClick={this.trigger} className={`preview ${zoomIn} ${fadeOutDownBig} ${fadeInUpBig}`}>Document Preview</button>
          : <button className={`preview animated zoomOut ${hidden}`} disabled>Document Preview</button>
        }
      </div>
    );
  }
}

export default DocumentPreview;
