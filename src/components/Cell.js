import React from 'react';

const states = {
  selected: '#017ACE',
  hit: 'green',
  miss: 'red',
};

// status - state of the button
const Cell = function ({ status, val, onClick }) {
  return (
    <div
      className="circle"
      onClick={() => onClick(val)}
      style={{ backgroundColor: states[status] }}
    />
  );
};
export default Cell;
