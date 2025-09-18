import os
import io
import pdfplumber
from PIL import Image, ImageOps
import pytesseract
from pdf2image import convert_from_path, convert_from_bytes

def clean_image_for_ocr(pil_img: Image.Image) -> Image.Image:
    img = pil_img.convert("L")
    img = ImageOps.autocontrast(img)
    return img

def ocr_image_with_tesseract(pil_img: Image.Image) -> str:
    img = clean_image_for_ocr(pil_img)
    text = pytesseract.image_to_string(img)
    return text.strip()

def extract_text_from_pdf_path(path: str) -> str:
    full_text = []
    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                txt = page.extract_text()
                if txt and txt.strip():
                    full_text.append(txt.strip())
    except Exception:
        pass

    combined = "\n".join(full_text).strip()
    if combined:
        return combined

    try:
        pages = convert_from_path(path, dpi=300)
    except Exception:
        with open(path, "rb") as f:
            pages = convert_from_bytes(f.read(), dpi=300)

    page_texts = [ocr_image_with_tesseract(page_img) for page_img in pages]
    return "\n".join(page_texts).strip()

def extract_text_from_file_or_bytes(path_or_bytes) -> str:
    if isinstance(path_or_bytes, str) and os.path.isfile(path_or_bytes):
        ext = os.path.splitext(path_or_bytes)[1].lower()
        if ext == ".pdf":
            return extract_text_from_pdf_path(path_or_bytes)
        elif ext in ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff']:
            img = Image.open(path_or_bytes)
            return ocr_image_with_tesseract(img)
    raise ValueError("Unsupported input to OCR service. Provide a valid file path.")