import { useState } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import TonePicker from './components/TonePicker';
import { changeTextTone } from './services/api';

const INITIAL_TEXT = 'type here anything..';

function App() {
  const [history, setHistory] = useState({
    past: [],
    present: INITIAL_TEXT,
    future: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // creating new histry timeline
  const handleTextChange = (newText) => {
    setHistory({
      past: [...history.past, history.present],
      present: newText,
      future: [], // basically typing clears redo history
    });
  };

  const handleToneChange = async (tone) => {
    setIsLoading(true);
    try {
      const response = await changeTextTone(history.present, tone);
      // changing current text to past and new as current
      setHistory({
        past: [...history.past, history.present],
        present: response.modifiedText,
        future: [], // A new tone change also clears the "redo" history
      });
    } catch (error) {
      alert("Could not change tone. Please check the console for errors.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    if (history.past.length === 0) return; // Nothing to undo

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future],
    });
  };

  const handleRedo = () => {
    if (history.future.length === 0) return; // Nothing to redo

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture,
    });
  };

  const handleReset = () => {
    setHistory({
      past: [],
      present: INITIAL_TEXT,
      future: [],
    });
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
      />
    </div>
  );
}

export default App;