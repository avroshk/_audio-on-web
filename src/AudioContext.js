import React, { Component } from 'react';

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false
const audioCtx = IS_WEB_AUDIO_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null

class AudioContext extends Component {
  constructor(props) {
    super(props)
    this.audioContext = IS_WEB_AUDIO_SUPPORTED ? new audioCtx() : null
    console.log('Context Created.')
    let oscillatorNode = this.audioContext.createOscillator()
    oscillatorNode
      .connect(this.audioContext.destination)

    oscillatorNode.start()
    console.log('Let us hear it.')
    console.log(this.audioContext.state)
    setTimeout(() => {
      console.log('Okay that is enough.')
      oscillatorNode.stop()
    }, 5000)
  }

  render() {
    return (
      <div className="AudioContext">
          Is Web Audio Supported?
          <div>{IS_WEB_AUDIO_SUPPORTED ? "😊" : "😰"}</div>
          Let's create AudioContext
          <div>{audioCtx ? "😊" : "😰"}</div>
          Status:
          <div>{this.audioContext.state}</div>
      </div>
    );
  }
}

export default AudioContext;
