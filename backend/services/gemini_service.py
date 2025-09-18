import os, json
import google.generativeai as genai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY missing in .env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


def _parse_json_text(s: str):
    """Try to parse JSON safely, even if Gemini returns extra text."""
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


def analyze_text_with_gemini(text: str):
    """Analyze ToS text: summarize + detect red flags"""
    CHUNK_SIZE = 6000
    summaries = []

    # Split into chunks to avoid token limits
    for i in range(0, min(len(text), 50000), CHUNK_SIZE):
        chunk = text[i:i+CHUNK_SIZE]
        prompt = f"Summarize this ToS in 1 paragraph:\n\n{chunk}"
        resp = model.generate_content(prompt)
        if resp.text:
            summaries.append(resp.text.strip())

    combined = "\n".join(summaries)

    # Final structured request
    final_prompt = f"""
Return valid JSON only:

{{
  "summary": "One short paragraph summarizing the ToS",
  "red_flags": ["five risky clauses, concise"],
  "green_flags": ["five favourable clauses, concise"],
}}

Content:
{combined}
"""
    resp = model.generate_content(final_prompt)
    parsed = _parse_json_text(resp.text if resp.text else "")

    if parsed:
        rf = parsed.get("red_flags", [])
        if isinstance(rf, list):
            rf = rf[:5] + [""] * (5 - len(rf))
        else:
            rf = [str(rf)]
        return {"summary": parsed.get("summary", ""), "red_flags": rf}

    return {"summary": combined[:500], "red_flags": []}
