import React, { Component } from 'react';
import './App.css';

import AudioContext from './AudioContext.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AudioContext />
        </header>
      </div>
    );
  }
}

export default App;
