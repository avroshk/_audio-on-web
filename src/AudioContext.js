import React, { Component } from 'react';

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false
const audioCtx = IS_WEB_AUDIO_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null

class AudioContext extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioContext: IS_WEB_AUDIO_SUPPORTED ? new audioCtx() : null
    }
  }

  play = (e) => {
    let oscillatorNode = this.state.audioContext.createOscillator()
    let gainNode = this.state.audioContext.createGain()

    console.log('New oscillator created.')

    oscillatorNode
      .connect(gainNode)
      .connect(this.state.audioContext.destination)

    oscillatorNode.onended = () => {
      console.log('Okay that is enough. Stop it!')
    }

    oscillatorNode.type = 'sine'
    // value in hertz and seconds
    oscillatorNode.frequency.setValueAtTime(620, this.state.audioContext.currentTime+0.5)

    gainNode.gain.setValueAtTime(0, this.state.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.8, this.state.audioContext.currentTime+0.5)

    oscillatorNode.start()
    console.log(oscillatorNode)
    console.log('Let us hear it.')

    // Stop after two seconds
    gainNode.gain.linearRampToValueAtTime(0, this.state.audioContext.currentTime+1)
    oscillatorNode.stop(this.state.audioContext.currentTime+1)

    /* https://medium.com/@wisecobbler/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1 */
    this.setState((prevState, props) => {
      return {
        audioContext: prevState.audioContext
      }
    })
  }

  render() {
    return (
      <div className="AudioContext"
        onClick={(e) => this.play(e)}>
          Is Web Audio Supported?
          <div>{IS_WEB_AUDIO_SUPPORTED ? "😊" : "😰"}</div>
          AudioContext is available?
          <div>{audioCtx ? "😊" : "😰"}</div>
          AudioContext Status:
          <div>{this.state.audioContext ? this.state.audioContext.state : "Not Initialized"}</div>
      </div>
    );
  }
}

export default AudioContext;
