import React, { Component } from 'react';

const convertRange = ( value, r1, r2 ) => {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

class Oscillator extends Component {

  render() {
    const {
      freq,
      minFreq,
      maxFreq
    } = this.props
    
    return (
      <div className="Oscillator" style={{
        top: 60,
        left: convertRange(freq , [minFreq, maxFreq], [0, window.innerWidth])
      }}>{freq}</div>
    )
  }
}

export default Oscillator;
