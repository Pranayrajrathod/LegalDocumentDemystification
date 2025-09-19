import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "tos_analyser")

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    app.config["db"] = db
    print("MongoDB connected successfully.")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

# --- Register API Routes (Blueprints) ---
from routes.api_routes import api_bp
from routes.news_routes import news_bp # <-- ADD THIS IMPORT

app.register_blueprint(api_bp, url_prefix="/api")
app.register_blueprint(news_bp, url_prefix="/api") # <-- ADD THIS LINE

@app.route("/ping", methods=["GET"])
def ping():
    return {"status": "✅ Backend running"}, 200

if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 5000))
    debug = os.getenv("FLASK_ENV") == "development"
    app.run(host=host, port=port, debug=debug)