# Fiddle Tone Picker (Assignment)

Live Link :- https://fiddle-tonepicker.vercel.app/

Demo Video :- https://www.loom.com/share/a599707694064b858c01dd4f527454b1?sid=49f1ee51-776b-4463-8e79-3843693ef457

## Stack
- **Backend**: Python, FastAPI
- **Frontend**: React, Vite
- **Styling**: Plain CSS with CSS Variables
- **LLM**: Mistral AI (`mistral-small-latest`)
- **Package Management**: Poetry (Backend), NPM (Frontend)

## Core Features
- **Text Editor**: A real-time text editor for user input.
- **Tone Adjustment Matrix**: A 2D draggable picker to modify text tone across two axes:
  - Professional ↔ Casual
  - Concise ↔ Expanded
- **Undo/Redo**: Full history management for all text modifications.
- **Reset**: Instantly revert the text to its original state.
- **Loading States**: A full-screen blur and spinner provide clear visual feedback during API calls.
- **Error Handling**: Gracefully shows API or network errors to the user.
- **Light/Dark Theme**: A theme toggler.

## Environment (`.env`)
The /backend requires a `.env` file to store Mistral API key.

```env
MISTRAL_API_KEY="your_mistral_api_key"
```

## Quick Start

#### 1. Backend Setup
```bash
cd backend

# Install dependencies using Poetry
poetry install

# poetry install will install all the necessary dependencies
# then change the venv
poetry shell

poetry run uvicorn index:app --reload
```

#### 2. Frontend Setup
```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend dev server on http://localhost:5173
npm run dev
```

## API Endpoints

### POST /api/change-tone
Rewrites the provided text based on the selected tone.

Request Body:

JSON

```json
{
  "text": "The original text from the editor.",
  "tone": {
    "x": "Concise | Balanced | Expanded",
    "y": "Professional | Neutral | Casual"
  }
}
```

Response Body:

JSON

```json
{
  "modifiedText": "The rewritten text from the Mistral AI."
}
```

### GET /api/health
A simple health check endpoint to confirm the server is running.

Response Body:

JSON

```json
{
  "status": "ok"
}
```

## Technical Architecture Decisions & Trade-offs

### Monorepo structure
For this project I used a monorepo layout with two main directories: frontend (React + Vite) and backend (FastAPI + Python). This felt logical and scalable for the assignment as it keeps related code together, making api calls easier to coordinate, and simplifies local development while still separating client and server-side concerns.

### Backend choice: FastAPI
I chose FastAPI because i have worked with Python and FastAPI alot and also considering the need for a lightweight, fast backend. FastAPI gives excellent developer friendly features (async support, clear typing, automatic docs) and made it straightforward to implement a secure server-side proxy for Mistral AI. and made sure that mistral api key is stored server side and backend handles all ai related things securely and returns only the required results to the frontend.

### Frontend choice: React + Vite and plain CSS
React with Vite helped me with fast development. For styling I intentionally used plain CSS with CSS variables instead of a UI library (like Material-UI) or utility framework (like Tailwind). The trade-off: writing more CSS by hand, but with benefits of a smaller bundle size, full control over styling, and the opportunity to demonstrate core CSS skills (e.g., Flexbox and theme variables for dark/light mode). For this scope, that trade-off felt okay.

---

## State Management (Undo/Redo Functionality)

State for undo/redo is managed with a simple in-memory history object in the main App.jsx component. It keeps the implementation lightweight and easy to reason about without introducing an external state library.

JavaScript

```javascript
const [history, setHistory] = useState({
  past: [],      // Array of previous text states
  present: '',   // The current, active text
  future: [],    // Array of states for potential 'redo' actions
});
```

How it works:
- On any text change (user typing or AI rewrite): push the current present into past, set the new text as present, and clear future. This guarantees a clean redo stack when new edits occur.
- Undo: pop the last state from past, make it the new present, and push the former present onto future.
- Redo: take the first state from future, set it as present, and push the old present onto past.

This approach is simple, predictable, and well-suited for sequential text-editing actions, avoiding overheads too.

---

## Error Handling & Edge Cases

The error-handling strategy is in this way :- the backend handles and tries to normalizes errors, while the frontend provides clear user feedback and ensuring the UI never becomes stuck.

Backend :
- All calls to the Mistral AI API are wrapped in try except blocks. If the Mistral API returns an error or any network error happens. the backend will catches it, logs details for debugging, and raises a httpexception (500) with a error response being displayed on the frontend.

Frontend :
- Service calls (changeTextTone) check response.ok and throw an error for non-ok responses.
- The top-level handler (handleToneChange) wraps calls in try catch, sets isLoading back to false on errors, and shows Failed to change tone. Please try again.
- The TonePicker component receives the error state and the users are immediately aware of issues.

additional cases handling:
- Loading state safety: the loading spinner and blurred background are always cleared on both success and failure, preventing the UI from getting stuck in a loading state.
- Empty text: the backend also checks for (if not request.text.strip(): return {"modifiedText": ""}) this checks for empty texts and that helps to avoid unnecessary API calls.