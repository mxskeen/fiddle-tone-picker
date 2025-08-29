import os
from fastapi import FastAPI
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# Pydantic model for validation
class ToneRequest(BaseModel):
    text: str
    tone: dict

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/change-tone")
async def change_tone(request: ToneRequest):
    print(f"Received text: {request.text}")
    # Placeholder logic for now
    return {"modifiedText": f"Modified: '{request.text}'"}