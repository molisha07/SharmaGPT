from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "SharmaGPT backend is active. Relatives are ready to criticize.",
        "timestamp": "2026-05-31T18:00:00+05:30"
    }
