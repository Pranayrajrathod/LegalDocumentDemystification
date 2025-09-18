# routes/chatbot_routes.py
from flask import Blueprint, request, jsonify
from services.chatbot_service import chatbot_response

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chatbot", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    reply = chatbot_response(user_message)
    return jsonify({"reply": reply})  