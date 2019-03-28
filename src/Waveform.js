import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

const CustomizedDot = () => null

const downSampleForDrawing = (buffer, n=8) => {
  let data = [];
  if (buffer && buffer.length > 0) {
    buffer.forEach((sample, index) => {
      if (index % n === 0) {
        data.push({y: sample})
      }
    });
  }
  return data;
}

class Waveform extends Component {

  render() {
    return (<ResponsiveContainer height={180}>
      <LineChart data={ downSampleForDrawing(this.props.data)}>
        <YAxis width={0} opacity="0" style={{ display: 'none' }} domain={[-1, 1]} />
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={<CustomizedDot />} />
      </LineChart>
    </ResponsiveContainer>)
  }
}

export default Waveform;
