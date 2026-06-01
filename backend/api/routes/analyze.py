from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
import shutil
import os
import uuid
import logging
from typing import Optional
from backend.parsers.pdf_parser import parse_pdf
from backend.parsers.docx_parser import parse_docx
from backend.parsers.resume_extractor import extract_metadata_and_sections
from backend.services.gemini_service import analyze_resume_with_ai
from backend.services.meme_service import select_and_generate_memes

router = APIRouter()
logger = logging.getLogger(__name__)

TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "temp")
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None)
):
    """
    Upload resume file, parse it, run the Sharma Aunty roast generator,
    generate dynamic Pillow memes, and return the full structural JSON report.
    """
    # 1. Validate File Extension
    file_ext = os.path.splitext(file.filename)[1].lower() if file.filename else ""
    if file_ext not in [".pdf", ".docx"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Disappointment! Only PDF and DOCX resume formats are accepted by Sharma Aunty."
        )

    # 2. Save file temporarily
    temp_file_name = f"{uuid.uuid4()}{file_ext}"
    temp_file_path = os.path.join(TEMP_DIR, temp_file_name)
    
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 3. Parse File content
        if file_ext == ".pdf":
            raw_text = parse_pdf(temp_file_path)
        else:
            raw_text = parse_docx(temp_file_path)
            
        if not raw_text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Resume is empty! Sharma Aunty cannot roast a blank canvas. Write something, beta."
            )
            
        # 4. Extract structured details (skills, projects, etc.)
        resume_data = extract_metadata_and_sections(raw_text)
        
        # 5. Run the AI Roaster
        roast_report = analyze_resume_with_ai(resume_data)
        
        # 6. Generate Pillow Memes on the fly based on the structured meme data
        # Ensure we have a memes list
        if "memes" not in roast_report:
            # Fallback mock generator returns memes inside results already, but double-check
            roast_report["memes"] = []
            
        # Draw and inject the Pillow images
        from backend.services.meme_service import draw_meme_canvas
        flat_urls = []
        for item in roast_report["memes"]:
            try:
                top = item.get("top_text", "Delusion")
                bottom = item.get("bottom_text", "Reality")
                tpl = item.get("template", "sharma_aunty_custom")
                img_url = draw_meme_canvas(tpl, top, bottom)
                item["meme_url"] = img_url
                flat_urls.append(img_url)
            except Exception as ex:
                logger.error(f"Error drawing meme: {ex}")
                
        roast_report["meme_urls"] = flat_urls
        roast_report["fileName"] = file.filename
        
        return roast_report

    except Exception as e:
        logger.error(f"Analysis error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Even the AI gave up on your resume: {str(e)}"
        )
        
    finally:
        # Clean up the temporary file safely
        if os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
            except Exception as e:
                logger.warning(f"Could not remove temp file: {e}")
