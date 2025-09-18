import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

# --- Flask app setup ---
app = Flask(__name__)
CORS(app)

# --- MongoDB setup ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/tos_analyser")
client = MongoClient(MONGO_URI)
db = client.get_database("tos_analyser")
app.config["db"] = db


# --- Health check route ---
@app.route("/ping", methods=["GET"])
def ping():
    return {"status": "✅ Backend is running"}, 200


# --- Import and register routes AFTER db is ready ---
from routes.tos_routes import tos_bp
from routes.chatbot_routes import chatbot_bp  # new chatbot route

app.register_blueprint(tos_bp, url_prefix="/")
app.register_blueprint(chatbot_bp, url_prefix="/")


# --- Run the app ---
if __name__ == "__main__":
    app.run(
        host=os.getenv("FLASK_HOST", "0.0.0.0"),
        port=int(os.getenv("FLASK_PORT", 5000)),
        debug=os.getenv("FLASK_ENV") == "development",
    )
