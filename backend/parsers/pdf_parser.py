try:
    import fitz  # PyMuPDF
    HAS_FITZ = True
except ImportError:
    HAS_FITZ = False

import pdfplumber
import os
import logging

logger = logging.getLogger(__name__)

def parse_pdf(file_path: str) -> str:
    """
    Extracts text from a PDF file using PyMuPDF (fitz) with a fallback to pdfplumber.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found at: {file_path}")

    text_content = []
    
    # Try PyMuPDF (fitz) first as it is extremely fast and robust
    if HAS_FITZ:
        try:
            doc = fitz.open(file_path)
            for page in doc:
                page_text = page.get_text()
                if page_text.strip():
                    text_content.append(page_text)
            doc.close()
        except Exception as e:
            logger.warning(f"PyMuPDF failed to parse PDF: {e}. Trying pdfplumber fallback.")
    else:
        logger.info("PyMuPDF (fitz) not installed. Bypassing and using pure-Python pdfplumber.")

    # Fallback to pdfplumber if PyMuPDF returned no text or failed
    full_text = "\n".join(text_content).strip()
    if not full_text:
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text and page_text.strip():
                        text_content.append(page_text)
            full_text = "\n".join(text_content).strip()
        except Exception as e:
            logger.error(f"pdfplumber also failed to parse PDF: {e}")
            raise RuntimeError(f"Failed to parse PDF document: {e}")

    return full_text
