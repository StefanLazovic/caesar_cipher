import React from 'react';
import './App.css';
import TextToCipher from './components/TextToCipher/TextToCipher';


function App() {
  return (
    <div className="App">
      <div className="dark-overlay">
        <div className="center-components">
          <TextToCipher />
        </div>
      </div>
    </div>
  );
}

export default App;
