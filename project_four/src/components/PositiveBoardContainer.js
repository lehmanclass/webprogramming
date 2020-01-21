import React from 'react';
import '../css/PositiveBoardContainer.css';
import PositiveBoard from './PositiveBoard';

export default function PositiveBoardContainer() {
  return (
    <div className="PositiveBoardContainer">
      <div className="top-container">
        <div className="title">POSITIVE BOARD</div>
        <div className="container-message">
          The main purpose of an positive or affirmation board is to help you maintain a higher level of self awareness and focus on positive thoughts that reinforce your desires
        </div>
      </div>
      <PositiveBoard/>
    </div>
  );
}