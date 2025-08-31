import { useState, useEffect } from 'react';
import './App.css';
import TextEditor from './components/TextEditor';
import TonePicker from './components/TonePicker';
import ThemeToggle from './components/ThemeToggle';
import { changeTextTone } from './services/api';

const INITIAL_TEXT = '';

function App() {
  const [history, setHistory] = useState({
    past: [],
    present: INITIAL_TEXT,
    future: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleTextChange = (newText) => {
    setError(null);
    setHistory({
      past: [...history.past, history.present],
      present: newText,
      future: [],
    });
  };

  const handleToneChange = async (tone) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await changeTextTone(history.present, tone);
      setHistory({
        past: [...history.past, history.present],
        present: response.modifiedText,
        future: [],
      });
    } catch (err) {
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
  <>
    <div className={`app-wrapper ${isLoading ? 'loading' : ''}`}>
      <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      <h1 className="app-title">fiddle tone picker</h1>
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
          error={error}
        />
      </div>
    </div>

    {/* The overlay is now outside the wrapper, so it won't get blurred */}
    {isLoading && (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    )}
  </>
);
}

export default App;