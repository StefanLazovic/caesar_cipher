import React, { Component } from 'react';
import './documentPreview.css';
import Buttons from '../Buttons/Buttons';



class DocumentPreview extends Component {
  state = {
    hidden: 'hidden',
    show: false,
    zoomIn: 'zoomIn',
    fadeOutDownBig: ''
  }



  componentDidMount() {
		setTimeout(() => this.setState({ ...this.state, hidden: '' }), 1000);
	}



  trigger = () => {
    this.setState({
      ...this.state,
      show: true,
      zoomIn: '',
      fadeOutDownBig: 'fadeOutDownBig'
    });
    this.props.hideInputs();
  }



  render() {
    const { encodedText, decodedText } = this.props;
    const { hidden, show, zoomIn, fadeOutDownBig } = this.state;
    return (
      <div>
        {
          this.state.show === true
          ? <div className="modal animated fadeInDownBig slow">
              <img src={require('../../assets/paper.png')} alt="Caesar" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur magnam laborum, quae alias rem, facere distinctio necessitatibus in sequi explicabo unde numquam expedita dicta omnis asperiores delectus hic. At, commodi!</p>
              <Buttons />
            </div>
          : null
        }
        {
          encodedText.length !== 0 || decodedText.length !== 0
          ? <button onClick={() => this.trigger()} className={`preview animated ${zoomIn} ${fadeOutDownBig}`}>Document Preview</button>
          : <button className={`preview animated zoomOut ${hidden}`} disabled>Document Preview</button>
        }
      </div>
    );
  }
}

export default DocumentPreview;
