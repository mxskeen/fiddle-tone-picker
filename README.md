# Fiddle Tone Picker (Assignment)

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
- **Error Handling**: Gracefully surfaces API or network errors to the user.
- **Light/Dark Theme**: A theme toggle for user comfort.

## Environment (`.env`)
The backend requires a `.env` file to store Mistral API key.

```env
MISTRAL_API_KEY="your_mistral_api_key_here"
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
  "modifiedText": "The rewritten text from the Mistral API."
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