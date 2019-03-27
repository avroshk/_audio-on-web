import React, { Component } from 'react';

const convertRange = (num, [in_min, in_max] , [out_min, out_max]) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Oscillator extends Component {

  render() {
    const {
      freq,
      minFreq,
      maxFreq,
      gain
    } = this.props

    const style = {
      top: '10%',
      opacity: gain,
      left: convertRange(freq , [minFreq, maxFreq], [0, window.innerWidth])
    }

    return (
      <div className="Oscillator" style={style}></div>
    )
  }
}

export default Oscillator;
