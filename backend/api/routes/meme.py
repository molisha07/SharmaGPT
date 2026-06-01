from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List
import random
from backend.services.meme_service import draw_meme_canvas

router = APIRouter()

class MemeRequest(BaseModel):
    top_text: str
    bottom_text: str

class ChaosRequest(BaseModel):
    name: str = "Beta"
    skills: List[str] = []

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
        # Default fallback to custom sharma aunty card
        meme_data_uri = draw_meme_canvas("sharma_aunty_custom", request.top_text, request.bottom_text)
        return {"meme_url": meme_data_uri}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate meme card: {e}"
        )

@router.post("/meme/chaos")
async def generate_chaos_memes(request: ChaosRequest):
    """
    On-demand 'Generate More Chaos' triggers, returning 3 additional
    highly unhinged memes in random templates.
    """
    templates = ["drake", "distracted_boyfriend", "this_is_fine", "galaxy_brain", "coffin_dance", "gru_plan", "woman_cat", "sharma_aunty_custom"]
    
    delusions = [
        "Wrote 'Quick learner, self motivated'",
        "Watched 48 hours of AI tutorials",
        "Created portfolio website in primary colors",
        "Listed HTML as a technical programming skill",
        "Added 'Expert Leader' to top header card",
        "Added every database from Google search"
    ]
    
    realities = [
        "Bhai, 14 half-finished courses beg to differ",
        "Abhi bhi local server running",
        "Recruiter ne screen block kiya instantly",
        "Relative ask: placement kab ho rahi hai",
        "Beta tu toh group chat mein bhi silent hai",
        "Code base is empty folder since 2021"
    ]

    selected_templates = random.sample(templates, 3)
    generated = []

    for i in range(3):
        try:
            top = random.choice(delusions)
            bottom = random.choice(realities)
            template = selected_templates[i]
            
            meme_url = draw_meme_canvas(template, top, bottom)
            
            # Simple damage badge logic
            damage_levels = ["Brutal", "Criminal", "Call Police"]
            
            generated.append({
                "template": template,
                "top_text": top,
                "bottom_text": bottom,
                "meme_url": meme_url,
                "damage_level": damage_levels[i]
            })
        except Exception as e:
            continue
            
    return {"memes": generated}
