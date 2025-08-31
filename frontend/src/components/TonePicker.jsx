import React from 'react';
import ToneMatrix from './ToneMatrix';

function TonePicker({ onToneChange, onUndo, onRedo, onReset, canUndo, canRedo, isLoading, error }) {
  return (
    <div className="controls-card">
      <div className="header">
        <h4>Adjust tone</h4>
      </div>
      
      <ToneMatrix 
        onToneChange={onToneChange} 
        isLoading={isLoading} 
      />
      
      <div className="action-buttons">
        <button onClick={onUndo} disabled={!canUndo || isLoading}>Undo</button>
        <button onClick={onRedo} disabled={!canRedo || isLoading}>Redo</button>
        <button onClick={onReset} disabled={isLoading}>Reset</button>
      </div>

      <div className="feedback-container">
  {error && <p className="error-text">{error}</p>}
</div>
    </div>
  );
}

export default TonePicker;