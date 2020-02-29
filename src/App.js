import React from 'react';
import './App.css';
import TextToCipher from './components/TextToCipher/TextToCipher';
import DocumentPreview from './components/DocumentPreview/DocumentPreview';

function App() {
  return (
    <div className="App">
      <div className="dark-overlay">
        <div className="center-components">
          <TextToCipher />
          <DocumentPreview />
        </div>
      </div>
    </div>
  );
}

export default App;
