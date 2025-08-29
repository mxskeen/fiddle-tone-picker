// frontend/src/services/api.js

export async function changeTextTone(text, tone) {
  try {
    const response = await fetch('/api/change-tone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling the tone change API:", error);
    throw error;
  }
}