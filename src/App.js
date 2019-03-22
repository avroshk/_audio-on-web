import React, { Component } from 'react';
import './App.css';

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false
const audioCtx = IS_WEB_AUDIO_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null

if (audioCtx) {
  let ctx = new audioCtx()
  console.log('Context Created.')
  let oscillatorNode = ctx.createOscillator()
  oscillatorNode
    .connect(ctx.destination)
  console.log('Let us hear it.')
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Is Web Audio Supported?
            <div>{IS_WEB_AUDIO_SUPPORTED ? "😊" : "😰"}</div>
            Let's create AudioContext
            <div>{audioCtx ? "😊" : "😰"}</div>
            Let's hear it!
        </header>
      </div>
    );
  }
}

export default App;
