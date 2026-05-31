import os
import sys

# Ensure parent directory is in sys.path so it can be run from any folder
backend_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(backend_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Initialize logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import routers
from backend.api.routes.health import router as health_router
from backend.api.routes.analyze import router as analyze_router
from backend.api.routes.meme import router as meme_router
from backend.api.routes.certificate import router as cert_router

app = FastAPI(
    title="SharmaGPT™ Backend Service",
    description="Brutal resume roasting powered by Sharma Aunty and Gemini.",
    version="1.0.0"
)

# Set up CORS allowance origins
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins + ["*"], # Ensure local flexibility for local preview/development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health_router)
app.include_router(analyze_router)
app.include_router(meme_router)
app.include_router(cert_router)

@app.get("/")
async def root():
    return {
        "app": "SharmaGPT™",
        "description": "Welcome to SharmaGPT! Relatives are preparing their judgments.",
        "endpoints": {
            "health": "/health",
            "analyze": "/analyze (POST)",
            "meme": "/meme (POST)",
            "certificate": "/certificate (POST)"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
