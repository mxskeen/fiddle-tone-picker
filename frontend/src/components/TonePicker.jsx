import React from 'react';

function TonePicker({ onToneChange, onUndo, onRedo, onReset, canUndo, canRedo, isLoading }) {
  return (
    <div className="picker-container">
      <h4>Adjust Tone</h4>
      <div className="picker-grid">
        <button onClick={() => onToneChange({ x: 'Formal', y: 'Friendly' })} disabled={isLoading}>
          Formal & Friendly
        </button>
        <button onClick={() => onToneChange({ x: 'Formal', y: 'Direct' })} disabled={isLoading}>
          Formal & Direct
        </button>
        <button onClick={() => onToneChange({ x: 'Casual', y: 'Friendly' })} disabled={isLoading}>
          Casual & Friendly
        </button>
        <button onClick={() => onToneChange({ x: 'Casual', y: 'Direct' })} disabled={isLoading}>
          Casual & Direct
        </button>
      </div>
      <div className="action-buttons">
        <button onClick={onUndo} disabled={!canUndo || isLoading}>Undo</button>
        <button onClick={onRedo} disabled={!canRedo || isLoading}>Redo</button>
        <button onClick={onReset} disabled={isLoading}>Reset</button>
      </div>
      {/*loading indicator */}
      {isLoading && <p>Changing tone...</p>}
    </div>
  );
}

export default TonePicker;