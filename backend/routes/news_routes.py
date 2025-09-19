from flask import Blueprint, jsonify, request
from services.news_service import get_live_news

news_bp = Blueprint("news", __name__)

@news_bp.route("/news", methods=["GET"])
def get_news_route():
    """
    Gets live news from the service and returns it.
    Accepts an optional 'limit' query parameter.
    """
    try:
        limit = int(request.args.get('limit', 30))
        all_news = get_live_news()
        return jsonify(all_news[:limit])
    except Exception as e:
        return jsonify({"error": str(e)}), 500