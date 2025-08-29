// frontend/src/components/TextEditor.jsx

import React from 'react';

function TextEditor({ text, onTextChange }) {
  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        placeholder="Start typing here..."
        value={text} 
        onChange={(e) => onTextChange(e.target.value)}
      />
    </div>
  );
}

export default TextEditor;