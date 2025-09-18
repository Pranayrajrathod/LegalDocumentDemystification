import os
from pymongo import MongoClient

# --- MongoDB setup ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/tos_analyser")
client = MongoClient(MONGO_URI)
db = client.get_database("tos_analyser")


def chatbot_response(user_message: str) -> str:
    message = user_message.lower().strip()

    # --- 1) Get the latest uploaded document ---
    doc = db.tos_results.find_one(sort=[("_id", -1)])  # latest entry

    if doc:
        # User asks for a summary
        if any(k in message for k in ["summary", "overview", "explain", "what is this"]):
            return f"📑 Here’s a summary of your last document:\n\n{doc.get('summary', 'No summary available.')}"

        # User asks for risks / red flags
        if any(k in message for k in ["risk", "red flag", "issues", "problems", "warning"]):
            red_flags = doc.get("red_flags", [])
            if red_flags:
                return "⚠️ Key risks I found:\n- " + "\n- ".join(red_flags)
            else:
                return "✅ No major risks were flagged in the last document."

        # User asks about rights, obligations, license
        if any(k in message for k in ["rights", "obligations", "responsibilities", "license"]):
            return (
                "From the analyzed document, you have certain responsibilities (like following the platform’s rules) "
                "and limited rights (like using their services under their terms). Companies usually grant themselves "
                "a license to use your content — check carefully if this applies."
            )

    # --- 2) Rule-based answers (no document needed) ---
    context_keywords = [
        "terms", "service", "privacy", "agreement", "policy",
        "contract", "tos", "clauses", "conditions"
    ]
    if any(keyword in message for keyword in context_keywords):
        return (
            "📌 This looks like a Terms of Service question. These documents usually explain:\n"
            "- ✅ What rights you have as a user\n"
            "- ⚠️ What risks or limitations you accept\n"
            "- 📑 How your data may be used (Privacy Policy)\n\n"
            "Try asking me: 'Show me risks in my last upload' or 'Give me a summary'."
        )

    # --- 3) Default response (out of context) ---
    return (
        "🤖 I’m here to help explain Terms of Service, Privacy Policies, and Agreements.\n"
        "Please ask something like:\n"
        "- 'What risks are there?'\n"
        "- 'What rights do I have?'\n"
    )
