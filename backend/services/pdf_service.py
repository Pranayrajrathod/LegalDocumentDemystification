import pdfplumber

def extract_text_from_file(path: str) -> str:
    """Extract all text from a PDF file using pdfplumber."""
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            p = page.extract_text()
            if p:
                text += p + "\n"
    return text
