import React, { Component } from 'react';

import Oscillator from './Oscillator.js';
import Waveform from './Waveform.js';

let buffer = null;

const IS_WEB_AUDIO_SUPPORTED = window.AudioContext || window.webkitAudioContext ? true : false
const audioCtx = IS_WEB_AUDIO_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null

const playTime = 1
const maxAmplitude = 0.8
const minFreq = 200
const maxFreq = 660

const randomIntFromInterval = (min,max) => Math.floor(Math.random()*(max-min+1)+min)

class AudioContext extends Component {

  state = {
    audioContext: IS_WEB_AUDIO_SUPPORTED ? new audioCtx() : null,
    oscillators: [],
    scriptProcessorNode: null
  }

  addOscillator = (oscillatorNode, gainNode) => {
    this.setState({
      oscillators: this.state.oscillators.concat([[oscillatorNode, gainNode]])
    })
    console.log('New oscillator created.')
  }

  removeOscillator = () => {
    let [
      oscillatorNode,
      gainNode
    ] = this.state.oscillators[0]

    gainNode.disconnect();

    this.state.oscillators.shift()
    const oscillators = this.state.oscillators.slice(0)
    this.setState({
      oscillators: oscillators ? oscillators : []
    })
  }

  updateWaveform = () => {
    return buffer;
  }

  process = (audioProcessingEvent) => {
    let inputBuffer = audioProcessingEvent.inputBuffer;
    let outputBuffer = audioProcessingEvent.outputBuffer;

    // Loop through the output channels (in this case there is only one)
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      if (channel === 0) {
        buffer = inputData
      }

      outputData.set(inputData)
    }
  }

  componentDidMount () {
    let scriptProcessorNode = this.state.audioContext.createScriptProcessor(4096, 1, 1)
    scriptProcessorNode.onaudioprocess = this.process

    scriptProcessorNode
      .connect(this.state.audioContext.destination)

    this.setState({
      scriptProcessorNode: scriptProcessorNode
    })
  }

  play = (e) => {
    let oscillatorNode = this.state.audioContext.createOscillator()
    let gainNode = this.state.audioContext.createGain()

    this.addOscillator(oscillatorNode, gainNode)

    oscillatorNode
      .connect(gainNode)
      .connect(this.state.scriptProcessorNode)

    let here = this
    oscillatorNode.onended = () => {
      here.removeOscillator()
      console.log('Okay that is enough. Stop it!')
    }

    oscillatorNode.type = 'sine'
    // value in hertz and seconds
    let freq = randomIntFromInterval(minFreq, maxFreq)
    console.log('freq', freq)
    oscillatorNode.frequency.value = freq

    gainNode.gain.setValueAtTime(0, this.state.audioContext.currentTime)

    let amp = maxAmplitude
    if (this.state.oscillators.length > 0) {
      amp = maxAmplitude/this.state.oscillators.length
    }
    console.log('amplitude',  amp)
    gainNode.gain.linearRampToValueAtTime(amp, this.state.audioContext.currentTime+playTime/2)

    oscillatorNode.start()
    console.log(oscillatorNode)
    console.log('Let us hear it.')

    // Stop after two seconds
    gainNode.gain.linearRampToValueAtTime(0, this.state.audioContext.currentTime+playTime)
    oscillatorNode.stop(this.state.audioContext.currentTime+playTime)

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
          Oscillators:
          <div>{this.state.oscillators.length}</div>
          {this.state.oscillators.map(([oscillatorNode, gainNode]) =>
            <Oscillator
              minFreq={minFreq}
              maxFreq={maxFreq}
              key={oscillatorNode.__resource_id__}
              freq={oscillatorNode.frequency.value}
              gain={gainNode.gain.value}
              />
          )}
          <Waveform updateWaveform={this.updateWaveform} />
      </div>
    );
  }
}

export default AudioContext;
