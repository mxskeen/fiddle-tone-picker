import React from 'react';

function TextEditor({ text, onTextChange, disabled }) {
  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        disabled={disabled} // disabled textarea during API calls
        placeholder="Type here something..."
      />
    </div>
  );
}

export default TextEditor;