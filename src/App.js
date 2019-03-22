import React, { Component } from 'react';
import './App.css';

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false
const audioCtx = IS_WEB_AUDIO_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Is Web Audio Supported?
            <div>{IS_WEB_AUDIO_SUPPORTED ? "😊" : "😰"}</div>
            Let's create AudioContext
            <div>{audioCtx ? "😊" : "😰"}</div>
        </header>
      </div>
    );
  }
}

export default App;
