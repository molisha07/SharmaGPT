import io
import base64
from PIL import Image, ImageDraw, ImageFont, ImageColor
import logging
from typing import List, Dict

logger = logging.getLogger(__name__)

def generate_dynamic_meme(top_text: str, bottom_text: str) -> str:
    """
    Generates a meme image dynamically using Pillow.
    Draws a colorful card with funny emojis and bold captions.
    Returns the image encoded as a Base64 data URI string (data:image/png;base64,...).
    """
    width, height = 600, 400
    
    # 1. Create base image with a bright, dramatic gradient/background
    # SharmaGPT theme: Primary `#FF6B00` (Orange), Secondary `#FFD600` (Yellow), Background `#1A1A2E` (Dark Navy)
    image = Image.new("RGB", (width, height), color="#1A1A2E")
    draw = ImageDraw.Draw(image)
    
    # Draw a stylized bright orange border
    draw.rectangle([15, 15, width - 15, height - 15], outline="#FF6B00", width=8)
    
    # Draw a colored banner for the title
    draw.rectangle([30, 30, width - 30, 80], fill="#FFD600")
    
    # Try to load a clean font, fallback to default if not found
    try:
        # On Windows, Arial is usually present
        font_large = ImageFont.truetype("arial.ttf", 26)
        font_medium = ImageFont.truetype("arial.ttf", 20)
        font_header = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_header = ImageFont.load_default()
        
    # Draw a funny header
    draw.text((width // 2, 55), "SHARMAGPT™ OFFICIAL MEME", fill="#1A1A2E", font=font_header, anchor="mm")
    
    # Top text (The setup)
    draw.text((width // 2, 140), top_text.upper(), fill="#FFFFFF", font=font_large, anchor="mm")
    
    # Add a funny divider/emoji in the middle
    draw.text((width // 2, 210), "🩴   💔   🩴", fill="#E63946", font=font_large, anchor="mm")
    
    # Bottom text (The disappointment / punchline)
    draw.text((width // 2, 290), bottom_text.upper(), fill="#FFD600", font=font_large, anchor="mm")
    
    # Draw watermark
    draw.text((width - 45, height - 35), "sharmagpt.com", fill="#888888", font=font_medium, anchor="rm")
    
    # Convert image to PNG bytes
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    img_bytes = buffer.getvalue()
    
    # Encode to Base64
    base64_str = base64.b64encode(img_bytes).decode("utf-8")
    return f"data:image/png;base64,{base64_str}"


def select_and_generate_memes(analysis_results: Dict[str, Any]) -> List[str]:
    """
    Selects the funniest roasts or weaknesses from the analysis
    and generates 2-3 dynamic memes for the frontend.
    """
    overall_score = analysis_results.get("overall_score", 50)
    red_flags = analysis_results.get("red_flags", [])
    sections = analysis_results.get("sections", [])
    
    memes_to_make = []
    
    # Pick weak points based on parsed red flags or sections
    if any("GitHub" in flag for flag in red_flags):
        memes_to_make.append({
            "top": "Adding 'GitHub Profile' to contact info",
            "bottom": "404: PROFILE NOT FOUND"
        })
    else:
        memes_to_make.append({
            "top": "Pushing one commit in 2024",
            "bottom": "I AM AN OPEN SOURCE CONTRIBUTOR"
        })
        
    if analysis_results.get("tutorial_syndrome_detected", False):
        memes_to_make.append({
            "top": "Completed 48 Udemy courses on Machine Learning",
            "bottom": "Model accuracy: 3% (including errors)"
        })
    elif len(sections) > 1:
        # Roast based on first section
        first_sec = sections[0]
        memes_to_make.append({
            "top": f"Listed {first_sec.get('name', 'Skills')} on Resume",
            "bottom": "Copy-pasted straight from ChatGPT"
        })
    else:
        memes_to_make.append({
            "top": "Listing 'Proficient in English' as core skill",
            "bottom": "Still cannot write a clean commit message"
        })
        
    # Always add a classic Sharma Ji's Son comparison meme
    memes_to_make.append({
        "top": "You: Wrote 'Hello World' in 4 languages",
        "bottom": "Sharma Ji's Son: Wrote custom OS in primary school"
    })
    
    generated_memes = []
    for item in memes_to_make[:3]:  # Generate max 3 memes
        try:
            meme_data_uri = generate_dynamic_meme(item["top"], item["bottom"])
            generated_memes.append(meme_data_uri)
        except Exception as e:
            logger.error(f"Failed to generate meme for {item}: {e}")
            
    return generated_memes
