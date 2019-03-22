import React, { Component } from 'react';
import './App.css';

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Is Web Audio Supported?
            <div>{IS_WEB_AUDIO_SUPPORTED ? "😊" : "☹️"}</div>
        </header>
      </div>
    );
  }
}

export default App;
