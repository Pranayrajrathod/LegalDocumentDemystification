import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-flash')
    print("Gemini model initialized successfully.")
except Exception as e:
    print(f"Error initializing Gemini: {e}")
    model = None

def _parse_json_from_gemini(text: str) -> dict:
    """Safely extracts a JSON object from a string that might have markdown."""
    try:
        # Find the start and end of the JSON block
        start_index = text.find('{')
        end_index = text.rfind('}') + 1
        if start_index != -1 and end_index != -1:
            json_str = text[start_index:end_index]
            return json.loads(json_str)
    except (json.JSONDecodeError, IndexError):
        print(f"Failed to parse JSON from Gemini response: {text}")
        return None
    return None

def analyze_text_with_gemini(text: str) -> dict:
    """
    Analyzes a long document using the Gemini API to get a summary and
    a structured list of red flags with risk factors.
    """
    if not model:
        return {"error": "Gemini API not configured."}

    # A powerful prompt that asks for a specific JSON structure
    prompt = f"""
    Analyze the following Terms of Service document. Provide a concise, one-paragraph summary.
    Then, identify up to 5 potential red flags for the user.
    For each red flag, provide a brief description of the clause and a numerical 'risk_factor' from 0.0 (low risk, informational) to 1.0 (high risk, critical).

    Return ONLY a valid JSON object in the following format. Do not include any other text or markdown formatting.
    {{
      "summary": "<one-paragraph summary here>",
      "red_flags": [
        {{ "clause": "<description of the first red flag>", "risk_factor": 0.8 }},
        {{ "clause": "<description of the second red flag>", "risk_factor": 0.5 }}
      ]
    }}

    DOCUMENT TEXT:
    ---
    {text[:200000]} 
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        parsed_json = _parse_json_from_gemini(response.text)
        
        if not parsed_json or "summary" not in parsed_json:
            return {
                "summary": "Analysis failed to produce a valid result.",
                "red_flags": []
            }
        return parsed_json
        
    except Exception as e:
        print(f"Error calling Gemini API for analysis: {e}")
        return {"summary": "An error occurred while communicating with the AI.", "red_flags": []}

def get_gemini_chat_response(user_message: str, history_context: str) -> str:
    """Gets a contextual chat response from the Gemini API using a structured prompt."""
    if not model:
        return "Gemini API is not configured correctly. Please check your API key."

    # A more advanced prompt that uses the structured context
    prompt = f"""
    You are a helpful AI assistant for a document analysis application called "TOS Analyzer".
    You have access to the user's most recently analyzed documents, provided below in XML format.

    <CONTEXT>
    {history_context if history_context else "No documents have been analyzed yet."}
    </CONTEXT>

    Based ONLY on the context provided above and your general knowledge about terms of service,
    answer the user's question concisely. If the question is about a specific document,
    refer to it by its filename.

    User's Question: "{user_message}"
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API for chat: {e}")
        return "Sorry, I encountered an error while trying to respond."