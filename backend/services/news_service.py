import feedparser
from datetime import datetime

# --- Default static news reports ---
DEFAULT_ARTICLES = [
    {
        "title": "FTC Warns of Rise in Real Estate Document Forgery Scams",
        "link": "https://www.consumer.ftc.gov/features/scam-alerts/real-estate-fraud",
        "summary": "The Federal Trade Commission has issued a new alert regarding a surge in sophisticated real estate scams involving forged documents and identity theft...",
        "published": {"$date": datetime(2025, 9, 18).isoformat() + "Z"},
    },
    {
        "title": "New Phishing Scam Uses Fake Legal Subpoenas to Steal Data",
        "link": "https://www.bleepingcomputer.com/news/security/phishing-scam-uses-fake-legal-subpoenas/",
        "summary": "A widespread phishing campaign is targeting businesses with emails containing fake legal subpoenas. The attached documents are malicious and designed to steal corporate credentials...",
        "published": {"$date": datetime(2025, 9, 15).isoformat() + "Z"},
    },
    {
        "title": "How AI is Being Used to Create 'Deepfake' Identity Documents",
        "link": "https://www.wired.com/story/ai-deepfake-identity-documents/",
        "summary": "Experts are raising alarms about the use of generative AI to create highly convincing fake identity documents, posing a new challenge for fraud detection systems...",
        "published": {"$date": datetime(2025, 9, 12).isoformat() + "Z"},
    }
]

RSS_SOURCES = [
    "https://www.ftc.gov/news-events/stay-connected/rss/consumer-protection-press-releases",
    "https://legal.economictimes.indiatimes.com/rss/all",
    "https://www.wired.com/feed/tag/law/latest/rss",
]

def get_live_news():
    """
    Fetches news live from RSS feeds. If no relevant articles are found,
    returns a default list of static articles.
    """
    live_articles = []
    keywords = ["fraud", "scam", "phishing", "forgery", "identity theft", "cybercrime", "data breach"]

    for url in RSS_SOURCES:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            title = entry.get("title", "")
            summary = entry.get("summary", "")

            if any(kw.lower() in (title + summary).lower() for kw in keywords):
                published_parsed = entry.get("published_parsed")
                published_dt = datetime(*published_parsed[:6]) if published_parsed else datetime.utcnow()
                
                live_articles.append({
                    "title": title,
                    "link": entry.get("link", ""),
                    "summary": summary,
                    "published": {"$date": published_dt.isoformat() + "Z"}, 
                })

    if live_articles:
        live_articles.sort(key=lambda x: x['published']['$date'], reverse=True)
        return live_articles
    
    return DEFAULT_ARTICLES