import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://fiddle-tonepicker.vercel.app", # vercel origin to connect with backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ToneRequest(BaseModel):
    text: str
    tone: dict

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/change-tone")
async def change_tone(request: ToneRequest):
    api_key = os.getenv("MISTRAL_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail="Mistral API key not found.")

    if not request.text.strip():
        return {"modifiedText": ""}

    prompt = f"""You are a text tone adjuster. Your task is to rewrite the following text to be more {request.tone.get('x')} and {request.tone.get('y')}.
    Respond ONLY with the rewritten text and nothing else.

    Original text: "{request.text}"

    Rewritten text:"""

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    data = {
        "model": "mistral-small-latest",
        "messages": [{"role": "user", "content": prompt}],
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post("https://api.mistral.ai/v1/chat/completions", json=data, headers=headers, timeout=30.0)
            response.raise_for_status()

            result = response.json()
            modified_text = result["choices"][0]["message"]["content"]

            return {"modifiedText": modified_text.strip()}

        except httpx.HTTPStatusError as e:
            print(f"Error from Mistral API: {e.response.text}")
            raise HTTPException(status_code=500, detail="Failed to get a response from the AI model.")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            raise HTTPException(status_code=500, detail="An internal server error occurred.")