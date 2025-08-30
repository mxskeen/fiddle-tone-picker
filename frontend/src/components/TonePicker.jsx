import React from 'react';
import ToneMatrix from './ToneMatrix'; 

function TonePicker({ onToneChange, onUndo, onRedo, onReset, canUndo, canRedo, isLoading }) {
  return (
    <div className="picker-container">
      <h4>Adjust Tone</h4>
      
      <ToneMatrix 
        onToneChange={onToneChange} 
        isLoading={isLoading} 
      />
      
      <div className="action-buttons">
        <button onClick={onUndo} disabled={!canUndo || isLoading}>Undo</button>
        <button onClick={onRedo} disabled={!canRedo || isLoading}>Redo</button>
        <button onClick={onReset} disabled={isLoading}>Reset</button>
      </div>

      {isLoading && <p>Changing tone...</p>}
    </div>
  );
}

export default TonePicker;