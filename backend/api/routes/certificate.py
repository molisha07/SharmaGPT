from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Dict
from backend.services.certificate_service import generate_sharma_certificate

router = APIRouter()

class CertificateRequest(BaseModel):
    name: str
    scores: Dict[str, int]
    chappal_level: int
    overall_score: int

@router.post("/certificate")
async def create_certificate(request: CertificateRequest):
    """
    Generates a personalized, downloadable PNG Certificate of Disappointment in Base64 data format.
    """
    if not request.name.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Candidate name is required to issue a certificate."
        )
    try:
        cert_data_uri = generate_sharma_certificate(
            name=request.name,
            scores=request.scores,
            chappal_level=request.chappal_level,
            overall_score=request.overall_score
        )
        return {"certificate_url": cert_data_uri}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate digital certificate: {e}"
        )
