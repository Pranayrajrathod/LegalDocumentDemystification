import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/"
HF_TOKEN = os.getenv("HF_TOKEN")
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

# Fixed models - these are proven to work with HF Inference API
SUMMARIZER_MODEL_NAME = "facebook/bart-large-cnn"  # Better summarizer
QA_MODEL_NAME = "deepset/roberta-base-squad2"     # Proper QA model

RED_FLAG_QUESTIONS = [
    "What data is collected and how is it used or shared?",
    "Under what conditions can the service or account be terminated?", 
    "What are the company's limitations of liability?",
    "How are disputes and governing law handled?",
    "Are there any clauses about automatic renewals or subscriptions?",
    "What rights does the company claim over user-generated content?",
]

def query_api(payload, model_name):
    try:
        print(f"🔄 Querying model: {model_name}")
        response = requests.post(API_URL + model_name, headers=headers, json=payload, timeout=90)
        
        print(f"📊 Response Status: {response.status_code}")
        
        if response.status_code == 503:
            # Model is loading
            print("⏳ Model is loading, please wait...")
            return {"error": "Model is loading"}
        
        response.raise_for_status()
        result = response.json()
        print(f"✅ API Response: {result}")
        return result
        
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ HTTP Error for model {model_name}: {http_err}")
        try:
            error_details = response.json()
            print(f"🔍 Error Details: {error_details}")
        except:
            error_details = response.text
            print(f"🔍 Raw Error: {error_details}")
        return {"error": f"HTTP Error: {http_err}"}
        
    except requests.exceptions.RequestException as req_err:
        print(f"❌ Request Error for model {model_name}: {req_err}")
        return {"error": f"Request Error: {req_err}"}
    
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return {"error": f"Unexpected Error: {e}"}

def summarize_text(text: str) -> str:
    print(f"📝 Starting summarization for text of length: {len(text)}")
    
    # Truncate text if too long (BART has token limits)
    if len(text) > 3000:
        text = text[:3000]
        print("✂️ Text truncated to 3000 characters for summarization")
    
    payload = {
        "inputs": text,
        "parameters": {
            "min_length": 50,
            "max_length": 200,
            "do_sample": False
        }
    }
    
    result = query_api(payload, SUMMARIZER_MODEL_NAME)
    
    if result is None:
        return "Summary could not be generated - API returned None."
    
    if "error" in result:
        if "Model is loading" in str(result.get("error", "")):
            return "Model is currently loading. Please try again in a few minutes."
        return f"Summary could not be generated - {result['error']}"
    
    # Handle different response formats
    if isinstance(result, list) and len(result) > 0:
        if 'summary_text' in result[0]:
            summary = result[0]['summary_text']
            print(f"✅ Summary generated successfully: {summary[:100]}...")
            return summary
        elif 'generated_text' in result[0]:
            summary = result[0]['generated_text']
            print(f"✅ Summary generated successfully: {summary[:100]}...")
            return summary
    
    print(f"⚠️ Unexpected summary response format: {result}")
    return "Summary could not be generated - unexpected response format."

def find_red_flags(text: str) -> list:
    print(f"🚩 Starting red flag detection for text of length: {len(text)}")
    
    flags = []
    
    # Truncate text if too long for QA
    if len(text) > 2000:
        text = text[:2000]
        print("✂️ Text truncated to 2000 characters for Q&A")
    
    for i, question in enumerate(RED_FLAG_QUESTIONS):
        print(f"❓ Processing question {i+1}/{len(RED_FLAG_QUESTIONS)}: {question}")
        
        payload = {
            "inputs": {
                "question": question,
                "context": text
            }
        }
        
        result = query_api(payload, QA_MODEL_NAME)
        
        if result is None:
            print(f"⚠️ No result for question: {question}")
            continue
            
        if "error" in result:
            print(f"❌ Error for question '{question}': {result['error']}")
            continue
        
        # Handle the response
        answer = ""
        score = 0
        
        if isinstance(result, dict):
            answer = result.get('answer', '').strip()
            score = result.get('score', 0)
        elif isinstance(result, list) and len(result) > 0:
            answer = result[0].get('answer', '').strip()
            score = result[0].get('score', 0)
        
        print(f"📊 Q&A Result - Answer: '{answer}', Score: {score}")
        
        # Only include meaningful answers with decent confidence
        if answer and len(answer) > 3 and score > 0.05:
            flag_text = f"{question.replace('?', ':')} {answer}"
            flags.append(flag_text)
            print(f"🚩 Red flag added: {flag_text[:100]}...")
        else:
            print(f"⏭️ Skipped low-confidence answer for: {question}")
    
    print(f"✅ Red flag detection complete. Found {len(flags)} flags.")
    return flags