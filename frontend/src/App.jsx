import { useState } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import TonePicker from './components/TonePicker';
import { changeTextTone } from './services/api';

const INITIAL_TEXT = 'We need to finish this project by Friday.';

function App() {
  const [history, setHistory] = useState({
    past: [],
    present: INITIAL_TEXT,
    future: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for error messages

  const handleTextChange = (newText) => {
    setError(null); // Clear error on new input
    setHistory({
      past: [...history.past, history.present],
      present: newText,
      future: [],
    });
  };

  const handleToneChange = async (tone) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await changeTextTone(history.present, tone);
      setHistory({
        past: [...history.past, history.present],
        present: response.modifiedText,
        future: [],
      });
    } catch (err) {
      // error in ui, if something went wrong
      setError('Failed to change tone. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    if (history.past.length === 0) return;
    setError(null);
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    setHistory({ past: newPast, present: previous, future: [history.present, ...history.future] });
  };

  const handleRedo = () => {
    if (history.future.length === 0) return;
    setError(null);
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    setHistory({ past: [...history.past, history.present], present: next, future: newFuture });
  };

  const handleReset = () => {
    setError(null);
    setHistory({ past: [], present: INITIAL_TEXT, future: [] });
  };

  return (
    <div className="main-container">
      <TextEditor
        text={history.present}
        onTextChange={handleTextChange}
        disabled={isLoading}
      />
      <TonePicker
        onToneChange={handleToneChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
        isLoading={isLoading}
        error={error} // error shown in the picker
      />
    </div>
  );
}

export default App;