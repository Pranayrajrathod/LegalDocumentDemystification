import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

try:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    print("OpenAI client initialized successfully.")
except Exception as e:
    print(f"Error initializing OpenAI: {e}")
    client = None

# Using a cost-effective and fast model. Can be swapped for 'gpt-4o' for more power.
ANALYSIS_MODEL = "gpt-3.5-turbo"
CHAT_MODEL = "gpt-3.5-turbo"

def analyze_text_with_openai(text: str) -> dict:
    """
    Analyzes a document using the OpenAI API to get a summary and
    a structured list of red flags with risk factors using JSON mode.
    """
    if not client:
        return {"error": "OpenAI API not configured."}

    system_prompt = """
    You are a helpful legal assistant. Analyze the provided Terms of Service document.
    Provide a concise, one-paragraph summary. Identify up to 5 potential red flags.
    For each red flag, provide a brief 'clause' description and a numerical 'risk_factor' from 0.0 (low risk) to 1.0 (high risk).
    You must return a valid JSON object in the specified format.
    """
    
    user_prompt = f"""
    DOCUMENT TEXT:
    ---
    {text[:15000]} 
    ---
    """
    
    try:
        response = client.chat.completions.create(
            model=ANALYSIS_MODEL,
            response_format={"type": "json_object"}, # Use OpenAI's JSON Mode
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )
        result_json = json.loads(response.choices[0].message.content)
        return result_json
        
    except Exception as e:
        print(f"Error calling OpenAI API for analysis: {e}")
        return {"summary": "An error occurred while communicating with the AI.", "red_flags": []}

def get_openai_chat_response(user_message: str, history_context: str) -> str:
    """Gets a contextual chat response from the OpenAI API."""
    if not client:
        return "OpenAI API is not configured correctly."

    system_prompt = f"""
    You are a helpful AI assistant for a document analysis application called "TOS Analyzer".
    You have access to the user's most recently analyzed documents, provided below.
    Based ONLY on this context and your general knowledge, answer the user's question concisely.
    
    CONTEXT:
    {history_context if history_context else "No documents have been analyzed yet."}
    """
    
    try:
        response = client.chat.completions.create(
            model=CHAT_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API for chat: {e}")
        return "Sorry, I encountered an error while trying to respond."