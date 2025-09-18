import os
import uuid
import traceback
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId

from services.ocr_service import extract_text_from_file_or_bytes
from services.analysis_service import summarize_text, find_red_flags
from services.chatbot_service import get_chatbot_response

api_bp = Blueprint("api", __name__)

def serialize_doc(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc

@api_bp.route("/analyze", methods=["POST"])
def analyze():
    try:
        db = current_app.config["db"]
        text, filename = "", "pasted_text.txt"
        
        if request.is_json:
            data = request.get_json()
            text = data.get("text", "").strip()
            if not text: return jsonify({"error": "Text payload was empty"}), 400
        else:
            if "file" not in request.files: return jsonify({"error": "No file provided"}), 400
            file = request.files["file"]
            if file.filename == "": return jsonify({"error": "Filename cannot be empty"}), 400
            
            filename = file.filename
            upload_folder = current_app.config["UPLOAD_FOLDER"]
            filepath = os.path.join(upload_folder, f"{uuid.uuid4().hex}_{filename}")
            file.save(filepath)
            text = extract_text_from_file_or_bytes(filepath)
            os.remove(filepath)
            if not text.strip(): return jsonify({"error": "No text extracted from file"}), 400

        summary = summarize_text(text)
        red_flags = find_red_flags(text)

        doc = {"filename": filename, "summary": summary, "red_flags": red_flags, "createdAt": datetime.utcnow()}
        result = db.tos_results.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
        return jsonify(serialize_doc(doc)), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"An unexpected server error: {str(e)}"}), 500

@api_bp.route("/history", methods=["GET"])
def get_history():
    try:
        db = current_app.config["db"]
        results = list(db.tos_results.find({}).sort("createdAt", -1))
        return jsonify([serialize_doc(r) for r in results]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route("/chatbot", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    reply = get_chatbot_response(user_message)
    return jsonify({"reply": reply})