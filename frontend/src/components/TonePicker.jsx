import React from 'react';

function TonePicker({ onToneChange }) {
  return (
    <div className="picker-container">
      <div className="picker-grid">
        {/* Each button uses an arrow function for its onClick event */}
        <button onClick={() => onToneChange({ x: 'Formal', y: 'Neutral' })}>Formal</button>
        <button onClick={() => onToneChange({ x: 'Casual', y: 'Neutral' })}>Casual</button>
        <button onClick={() => onToneChange({ x: 'Neutral', y: 'Friendly' })}>Friendly</button>
        <button onClick={() => onToneChange({ x: 'Neutral', y: 'Direct' })}>Direct</button>
      </div>
      <div className="action-buttons">
        <button>Undo</button>
        <button>Redo</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default TonePicker;