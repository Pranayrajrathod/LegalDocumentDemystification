from flask import current_app
from pymongo import DESCENDING

def get_chatbot_response(user_message: str) -> str:
    db = current_app.config["db"]
    message = user_message.lower().strip()
    latest_doc = db.tos_results.find_one(sort=[("createdAt", DESCENDING)])

    if not latest_doc:
        return "Please analyze a document first."

    filename = latest_doc.get('filename', 'the last document')

    if any(k in message for k in ["summary", "overview", "explain"]):
        summary = latest_doc.get('summary', 'No summary was generated.')
        return f"📑 Summary for '{filename}':\n\n{summary}"

    if any(k in message for k in ["risk", "red flag", "issue"]):
        red_flags = latest_doc.get("red_flags", [])
        valid_flags = [flag for flag in red_flags if flag]
        if valid_flags:
            flags_list = "\n- ".join(valid_flags)
            return f"⚠️ Potential risks for '{filename}':\n\n- {flags_list}"
        else:
            return f"✅ No specific red flags were found for '{filename}'."

    return "I can answer questions about the latest document. Try asking 'what are the risks?' or 'give me a summary'."