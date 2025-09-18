import os
import uuid
import json
import traceback
from datetime import datetime

import pdfplumber
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import google.generativeai as genai
from bson import ObjectId

# --- Blueprint ---
tos_bp = Blueprint("tos", __name__)

# --- Setup Gemini client ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY is missing in .env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# --- File upload folder ---
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def _parse_json_text(s: str):
    """Try to safely extract JSON from Gemini output, even if it includes markdown."""
    try:
        return json.loads(s)
    except Exception:
        start, end = s.find("{"), s.rfind("}")
        if start != -1 and end != -1:
            try:
                return json.loads(s[start:end+1])
            except Exception:
                return None
    return None


def serialize_doc(doc):
    """Convert MongoDB ObjectId to string for JSON serialization."""
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc


# === Route: Upload and Analyze PDF ===
@tos_bp.route("/upload", methods=["POST"])
def upload_pdf():
    try:
        # 1. Validate file upload
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # 2. Securely save the file
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}_{filename}")
        file.save(filepath)

        # 3. Extract text from the PDF
        text = ""
        with pdfplumber.open(filepath) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        if not text.strip():
            return jsonify({"error": "No text could be extracted from the PDF"}), 400

        # 4. Send text to Gemini for analysis
        prompt = f"""
        Summarize the following Terms of Service into a short plain English paragraph.
        Then extract 5 risky clauses (things that may negatively affect the user).

        Respond ONLY in valid JSON with this format:
        {{
          "summary": "short paragraph here",
          "red_flags": ["point1", "point2", "point3", "point4", "point5"]
        }}

        TEXT:
        {text[:10000]}
        """

        response = model.generate_content(prompt)
        parsed = _parse_json_text(response.text if response.text else "")

        if not parsed:
            return jsonify({
                "error": "AI model did not return valid JSON",
                "raw": response.text
            }), 500

        # 5. Save the analysis to MongoDB
        db = current_app.config["db"]
        analysis = {
            "filename": filename,
            "summary": parsed.get("summary", "No summary available."),
            "red_flags": parsed.get("red_flags", []),
            "createdAt": datetime.utcnow()
        }

        result = db.tos_results.insert_one(analysis)
        analysis["_id"] = str(result.inserted_id)

        return jsonify(analysis), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# === Route: Fetch Analysis History ===
@tos_bp.route("/history", methods=["GET"])
def get_history():
    try:
        db = current_app.config["db"]
        results = list(db.tos_results.find({}).sort("createdAt", -1))
        results = [serialize_doc(doc) for doc in results]
        return jsonify(results), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Failed to fetch history: {str(e)}"}), 500
