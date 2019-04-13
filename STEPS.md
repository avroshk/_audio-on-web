# Session 1

1. `yarn create react-app audio-on-web`
2. `yarn start`
3. Remove jargon on App.js
4. Check if Web Audio is Supported (https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Browser_compatibility)
5. Initialize the context and play something
6. Refresh and No sound! Check debugger (The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.) (https://goo.gl/7K7WLu)
  - Check the state of the AudioContext. It is suspended.
7. The REACT way!
  - We need to control when the Context is created.
  - Play the oscillator on click
  - Set stop after 1 sec
  - Discover that you can play multiple oscillators (log oscillatorNode) -> (https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
  - Add Envelopes

# Session 2

1. Render oscillator count
  - Add oscillators to state
2. Create Oscillator render component
  - Add style
  - Point out the problem (the rendered component is not always up-to-date with the playing audio. Render is only triggered at the start and end of the audio.)
3. Draw Waveform
  - Add scriptProcessorNode
  - Add process function and wrote buffer to state
  - yarn add recharts
  - Create Waveform Component (Waveform renders but pretty quickly audio starts crackling and UI blows up and freezes. This is because we are letting React re-render the Waveform on state change.)
  - !!!!! FLAW! We have multiple ScriptProcessorNodes! :(  For every oscillator
  - Restructure the Web Audio Graph so that ScriptProcessor Node is only created once

--------
4. Draw FFT
  - yarn add meyda
  - write FFT to a buffer
  - Use Waveform component to display Freq Spectrum

# Session 3
1. Introduction to AudioWorkers
 - Why?
2. Create AudioWorker component

# Session 4
1. Recording Audio
 - Create inputStream Node
 - Makes sense to make AudioContext Component very specific for AudioContext and ScriptProcessorNode
 - Move Oscillator code to oscillator component
 - Maybe create a Graph component to orchestrate the playing
 - demonstration of audio packet loss
2. Playback audio

# Session 5
1. Using Redux to manage state across the application and making re-using of context easier
