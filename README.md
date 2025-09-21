# Legal Document Demystification: An AI-Powered TOS Analyzer

An intelligent platform that uses AI to translate complex legal jargon into simple, actionable insights, empowering users to understand the terms they are agreeing to.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E77F0?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

---

## 🌍 Problem Statement
In today's digital world, every online service requires users to agree to Terms of Service (ToS) and Privacy Policies. These legally binding contracts are designed to be complex and confusing, leading to a significant power imbalance:
- ❌ **Dense & Incomprehensible** – Documents are filled with legal jargon that the average person cannot understand.
- ❌ **Excessively Long** – Reading every document is impractical and time-consuming.
- ❌ **Hidden Risks** – Users unknowingly agree to harmful clauses regarding data privacy, automatic renewals, and waiver of rights.
- ❌ **Lack of Transparency** – Consumers are left vulnerable, unable to make informed decisions about their digital safety.


And We generally accept these without any proper understanding

---

## ✅ The Solution
Our application is an **AI-driven platform** that makes understanding legal documents seamless and instantaneous.

### Workflow
1.  **User Provides Document**
    - Users upload a file (PDF, PNG, JPG), or paste text directly.
    - A powerful **OCR engine** extracts clean text from any document format.

2.  **AI Analysis (Gemini)**
    - **Google's Gemini API** analyzes the full text of the document.
    - It generates a concise, plain-English **summary**.
    - It identifies potential **red flags** and assigns a numerical **risk factor** to each.

3.  **Instant Insights & Storage**
    - The frontend displays the summary and a list of red flags, color-coded by severity.
    - The complete analysis is saved to a **MongoDB Atlas** database for the user's history.

4.  **Interactive Follow-up**
    - The user can ask follow-up questions to the **context-aware AI chatbot**.
    - The chatbot uses the analysis history to provide intelligent, relevant answers.

5.  **Proactive Awareness**
    - The platform fetches and displays **real-time news alerts** about digital fraud, scams, and security threats.

---

## ✨ Key Features

### For Analysis & Understanding
- 📥 **Multi-Format Input** – Upload PDFs, images, or paste text.
- 🤖 **AI-Powered Summary** – Get the gist of any document in seconds.
- 🚦 **Color-Coded Risk Rating** – Instantly see the severity of red flags (from yellow to dark red).
- 🔍 **Precise Clause Identification** – Pinpoints the exact text that poses a potential risk.

### For Deeper Engagement
- 💬 **Context-Aware Chatbot** – Ask follow-up questions about your specific documents.
- 📚 **Persistent History** – All your past analyses are saved and can be revisited anytime.
- 📰 **Live News Alerts** – Stay informed about emerging digital threats and scams.

---

## 🛠️ Technology Stack

| Category                 | Technology / Service                                     |
| ------------------------ | -------------------------------------------------------- |
| **Frontend** | React (Vite), Axios, Bootstrap, React Router             |
| **Backend** | Python 3, Flask, Flask-CORS                              |
| **Database** | MongoDB Atlas (via PyMongo)                              |
| **AI Integration** | Google Gemini API                                        |
| **Data Processing** | Pytesseract (OCR), pdfplumber, pdf2image, Feedparser      |

---

### \#\# ⚙️ Setup & Installation

#### **1. Clone the Repository**

```bash
git clone https://github.com/Pranayrajrathod/LegalDocumentDemystification.git
cd LegalDocumentDemystification
```

#### **2. Backend Setup**

```bash
cd backend
python -m venv venv
# On Windows PowerShell
.\venv\Scripts\Activate.ps1
# On macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

#### **3. Environment File (.env) Setup**

You need to create **two separate** `.env` files: one for the backend and one for the frontend.

**3a. Backend `.env` Setup**

Create a `.env` file in the `backend/` directory and add your secret keys:

```
MONGO_URI=your_mongodb_atlas_connection_string
DB_NAME=tos_analyser
UPLOAD_FOLDER=uploads
GEMINI_API_KEY=your_google_gemini_api_key
```

**3b. Frontend `.env` Setup (The Missing Step)**

Create a `.env` file in the `frontend/` directory and add the URL of your backend:

```
VITE_BACKEND_URL=http://localhost:5000
```

#### **4. Run Backend**

Navigate to the `backend/` directory and start the Flask server:

```bash
# Make sure your virtual environment is activated
python app.py
```

#### **5. Run Frontend**

Open a new terminal, navigate to the `frontend/` directory, and start the React app:

```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.
