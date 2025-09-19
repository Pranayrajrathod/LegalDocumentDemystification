from flask import current_app
from pymongo import DESCENDING
from . import gemini_service

def get_chatbot_response(user_message: str) -> str:
    """
    Fetches user history, formats it into a structured context,
    and gets a response from the Gemini service.
    """
    db = current_app.config["db"]
    
    # Fetch the last 3 analyzed documents to provide as context
    history_cursor = db.tos_results.find({}).sort("createdAt", DESCENDING).limit(3)
    
    # Format the history into a structured, XML-like string for the prompt
    history_context = ""
    for doc in history_cursor:
        flags = [f"- {flag['clause']} (Risk: {flag['risk_factor']})" for flag in doc.get("red_flags", []) if flag]
        flag_summary = "\n".join(flags) if flags else "No red flags found."
        
        history_context += (
            "<document>\n"
            f"  <filename>{doc.get('filename', 'N/A')}</filename>\n"
            f"  <summary>{doc.get('summary', 'N/A')}</summary>\n"
            f"  <red_flags>\n{flag_summary}\n</red_flags>\n"
            "</document>\n\n"
        )
        
    # Get the response from the Gemini service
    gemini_response = gemini_service.get_gemini_chat_response(user_message, history_context)
    
    return gemini_response