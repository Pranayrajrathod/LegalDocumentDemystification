TOS Analyzer
An AI-powered platform designed to demystify complex legal documents and empower users with digital clarity.

🚀 Live Demo
View the live application here ## Table of Contents

The Problem

Our Solution

Key Features

Technology Stack

System Architecture

Local Setup and Installation

Environment Variables

Running the Application

Future Scope

The Problem
In today's digital world, every service, app, and website requires users to agree to legally binding contracts like Terms of Service (ToS) and Privacy Policies. The core of the problem is a massive information and power imbalance. These documents are intentionally dense, lengthy, and filled with complex legal jargon that is incomprehensible to the average person. As a result, users almost never read them; they simply scroll to the bottom and click "I Agree." By doing so, individuals unknowingly consent to potentially harmful clauses, leaving them vulnerable and unable to make informed decisions about their digital rights and privacy.

Our Solution
TOS Analyzer is an intelligent platform designed to bridge this gap, acting as a personal digital legal assistant that empowers users to understand these complex documents in seconds. It transforms dense legal text into simple, actionable insights. The application leverages Google's Gemini API to provide a multi-faceted analysis, including a plain-English summary, a list of potential red flags with a unique color-coded risk rating, and a context-aware chatbot for interactive, follow-up questions. This fusion of reactive analysis, interactive clarification, and proactive awareness provides a 360-degree solution for navigating the complexities of the digital world with confidence.

Key Features
Universal Document Ingestion: A seamless pipeline accepts any document format (PDF, image, or pasted text), using an integrated OCR engine to ensure all content is analyzable.

Instant AI Summarization: Generates a concise, plain-English summary, providing immediate clarity on complex legal text.

Quantified Risk Analysis: Goes beyond simple detection by assigning a numerical severity score to each red flag, visualized with an intuitive color code for at-a-glance risk assessment.

Context-Aware AI Chatbot: Transforms the static report into an interactive dialogue, allowing users to ask specific follow-up questions about their documents.

Proactive Threat Alerts: Keeps users informed with a live, curated news feed of emerging digital scams, fraud, and document-related security risks.

Persistent Analysis History: Automatically archives every report, creating a secure and searchable personal library of all analyzed digital contracts.

Technology Stack
Category	Technology
Frontend	React, Vite, Bootstrap, React Router, Axios
Backend	Python, Flask
AI & External Services	Google Gemini API
Database	MongoDB (hosted on MongoDB Atlas)
Key Libraries	Pytesseract (OCR), pdfplumber, Feedparser

Export to Sheets
System Architecture
## Local Setup and Installation

Follow these steps to set up and run the project on your local machine.

Prerequisites
Git

Node.js and npm

Python (3.9+) and pip

Tesseract OCR Engine: Must be installed on your system. Installation Guide.

Poppler: Required for PDF processing. Installation Guide for Windows. On macOS/Linux, use a package manager (e.g., brew install poppler or sudo apt-get install poppler-utils).

1. Clone the Repository
Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Backend Setup
Bash

# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# macOS / Linux
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt
3. Frontend Setup
Bash

# Navigate to the frontend directory
cd frontend

# Install the required npm packages
npm install
Environment Variables
You need to create a .env file in the backend directory to store your secret keys.

Navigate to the backend folder.

Copy the .env.example file to a new file named .env.

Fill in the required values.

backend/.env
| Variable | Description |
| :--- | :--- |
| MONGO_URI | Your connection string for the MongoDB Atlas cloud database. |
| DB_NAME | The name of your database (e.g., tos_analyser). |
| UPLOAD_FOLDER | The folder for temporary file uploads (e.g., uploads). |
| GEMINI_API_KEY| Your API key from Google AI Studio for the Gemini API. |

Running the Application
You must have both the backend and frontend servers running simultaneously.

1. Run the Backend Server:
Open a terminal, navigate to the backend directory, and run:

Bash

# Make sure your virtual environment is activated
python app.py
The backend server will be running at http://localhost:5000.

2. Run the Frontend Server:
Open a new, separate terminal, navigate to the frontend directory, and run:

Bash

npm run dev
The frontend application will be available at http://localhost:5173.

Future Scope
Browser Extension: For on-the-fly analysis of websites.

Document Comparison: An AI-powered tool to compare two versions of a document.

Voice-Enabled Chatbot: Integration of speech-to-text for hands-free interaction.

Downloadable PDF Reports: Allowing users to export their analysis.

