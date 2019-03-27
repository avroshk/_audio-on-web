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
