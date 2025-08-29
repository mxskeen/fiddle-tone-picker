import { useState } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import TonePicker from './components/TonePicker';
import { changeTextTone } from './services/api';

function App() {
  const [text, setText] = useState('Hello world. This is a test.');

  const handleToneChange = async (tone) => {
    console.log(`Calling API for tone: ${tone.x}, ${tone.y}`);

    try {
      const response = await changeTextTone(text, tone);
      
      setText(response.modifiedText);

    } catch (error) {
      console.error("Failed to change tone:", error);
      alert("Could not change tone. Please check the console for errors.");
    }
  };

  return (
    <div className="main-container">
      <TextEditor text={text} onTextChange={setText} />
      <TonePicker onToneChange={handleToneChange} />
    </div>
  );
}

export default App;