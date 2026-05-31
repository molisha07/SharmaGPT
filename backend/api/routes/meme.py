from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from backend.services.meme_service import generate_dynamic_meme

router = APIRouter()

class MemeRequest(BaseModel):
    top_text: str
    bottom_text: str

@router.post("/meme")
async def create_custom_meme(request: MemeRequest):
    """
    Generate a dynamic Pillow meme with custom top and bottom captions.
    """
    if not request.top_text.strip() or not request.bottom_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Meme text fields cannot be empty."
        )
    try:
        meme_data_uri = generate_dynamic_meme(request.top_text, request.bottom_text)
        return {"meme_url": meme_data_uri}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate meme card: {e}"
        )
