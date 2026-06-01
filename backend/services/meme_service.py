import io
import base64
from PIL import Image, ImageDraw, ImageFont
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

def draw_meme_canvas(template: str, top: str, bottom: str) -> str:
    """
    Renders one of the 8 unhinged meme templates dynamically using Pillow.
    Returns the image encoded as a Base64 data URI string.
    """
    width, height = 600, 400
    image = Image.new("RGB", (width, height), color="#1A1A2E") # Deep navy background
    draw = ImageDraw.Draw(image)

    # Resolve default fonts
    try:
        font_title = ImageFont.truetype("arial.ttf", 26)
        font_body = ImageFont.truetype("arial.ttf", 20)
        font_sm = ImageFont.truetype("arial.ttf", 15)
    except Exception:
        font_title = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_sm = ImageFont.load_default()

    # Draw outer frame
    draw.rectangle([10, 10, width - 10, height - 10], outline="#FF6B00", width=6)

    # 1. Drake Pointing Template
    if template == "drake":
        # Draw 2 vertical panels split in half
        # Top panel: Red (rejects)
        draw.rectangle([20, 20, 180, 200], fill="#E63946")
        draw.text((100, 110), "😠 🩴", font=font_title, fill="#FFFFFF", anchor="mm")
        
        # Bottom panel: Green (approves)
        draw.rectangle([20, 200, 180, 380], fill="#06D6A0")
        draw.text((100, 290), "😊 👍", font=font_title, fill="#FFFFFF", anchor="mm")

        # Dividers
        draw.line([180, 20, 180, 380], fill="#1A1A2E", width=8)
        draw.line([20, 200, 580, 200], fill="#1A1A2E", width=8)

        # Right captions
        draw.text((380, 110), top.upper(), font=font_body, fill="#FFFFFF", anchor="mm")
        draw.text((380, 290), bottom.upper(), font=font_body, fill="#FFD600", anchor="mm")

    # 2. Distracted Boyfriend Template
    elif template == "distracted_boyfriend":
        # 3 horizontal columns representing distracted boyfriend comparison
        draw.rectangle([20, 20, 200, 385], fill="#E63946") # Other woman (YouTube playlists)
        draw.text((110, 120), "📱 PLAYLIST", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw.text((110, 200), "Udemy / YouTube", font=font_sm, fill="#CCCCCC", anchor="mm")
        
        draw.rectangle([200, 20, 390, 385], fill="#111111") # The Boyfriend (User)
        draw.text((295, 120), "👦 USER", font=font_sm, fill="#FFD600", anchor="mm")
        draw.text((295, 200), "Distracted beta", font=font_sm, fill="#CCCCCC", anchor="mm")
        
        draw.rectangle([390, 20, 580, 385], fill="#06D6A0") # Disappointed GF (Actual building)
        draw.text((485, 120), "💻 CODING", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw.text((485, 200), "Unique Project", font=font_sm, fill="#CCCCCC", anchor="mm")

        # Dividers
        draw.line([200, 20, 200, 380], fill="#1A1A2E", width=6)
        draw.line([390, 20, 390, 380], fill="#1A1A2E", width=6)

        # Bottom black overlay card for texts
        draw.rectangle([30, 260, 570, 370], fill="#1A1A2E", outline="#FF6B00", width=2)
        draw.text((width // 2, 295), top.upper(), font=font_body, fill="#FFFFFF", anchor="mm")
        draw.text((width // 2, 335), bottom.upper(), font=font_body, fill="#FFD600", anchor="mm")

    # 3. This Is Fine Template
    elif template == "this_is_fine":
        # Glowing orange burning background
        draw.rectangle([20, 20, 580, 380], fill="#D94E34")
        # Draw some fire emoji vector representations
        draw.text((120, 150), "🔥", font=font_title, anchor="mm")
        draw.text((480, 150), "🔥", font=font_title, anchor="mm")
        
        # Center card (Dog / user saying fine)
        draw.rectangle([200, 100, 400, 250], fill="#1A1A2E", outline="#FFFFFF", width=3)
        draw.text((300, 175), "🐶 'THIS IS FINE'", font=font_body, fill="#FFFFFF", anchor="mm")
        
        # Text captions
        draw.text((width // 2, 60), top.upper(), font=font_body, fill="#FFFFFF", anchor="mm")
        draw.text((width // 2, 320), bottom.upper(), font=font_body, fill="#FFD600", anchor="mm")

    # 4. Galaxy Brain Template
    elif template == "galaxy_brain":
        # 3 horizontal boxes representing brain stages
        draw.rectangle([20, 20, 580, 130], fill="#111111", outline="#FF6B00", width=2)
        draw.text((60, 75), "🧠", font=font_title, anchor="mm")
        draw.text((320, 75), top.upper(), font=font_sm, fill="#FFFFFF", anchor="mm")
        
        draw.rectangle([20, 135, 580, 245], fill="#252542", outline="#FFD600", width=2)
        draw.text((60, 190), "💡", font=font_title, anchor="mm")
        
        # Midpoint split caption
        mid_txt = "Claims 5 Years ML Experience" if len(top) < 10 else f"CLAIM: {top[:25]}..."
        draw.text((320, 190), mid_txt.upper(), font=font_sm, fill="#FFFFFF", anchor="mm")
        
        draw.rectangle([20, 250, 580, 380], fill="#1A1A2E", outline="#06D6A0", width=2)
        draw.text((60, 315), "🌌", font=font_title, anchor="mm")
        draw.text((320, 315), bottom.upper(), font=font_body, fill="#06D6A0", anchor="mm")

    # 5. Coffin Dance Template
    elif template == "coffin_dance":
        # Black and gold elegant casket border
        draw.rectangle([20, 20, 580, 380], fill="#111111", outline="#FFD600", width=6)
        
        # Dancing pallbearers emojis
        draw.text((width // 2, 130), "🕺   ⚰️   🕺", font=font_title, anchor="mm")
        draw.text((width // 2, 195), "COFFIN DANCERS READY", font=font_sm, fill="#888888", anchor="mm")
        
        # Captions
        draw.text((width // 2, 260), top.upper(), font=font_body, fill="#FFFFFF", anchor="mm")
        draw.text((width // 2, 320), bottom.upper(), font=font_body, fill="#FF6B00", anchor="mm")

    # 6. Gru's Plan Template
    elif template == "gru_plan":
        # 4 Quadrants
        draw.rectangle([20, 20, 295, 195], fill="#252542")
        draw.text((157, 50), "STEP 1: SKILLS", font=font_sm, fill="#FFD600", anchor="mm")
        draw.text((157, 110), "Write list of tools", font=font_sm, fill="#CCCCCC", anchor="mm")
        
        draw.rectangle([305, 20, 580, 195], fill="#252542")
        draw.text((442, 50), "STEP 2: RECRUIT", font=font_sm, fill="#FFD600", anchor="mm")
        draw.text((442, 110), "Apply to FAANG", font=font_sm, fill="#CCCCCC", anchor="mm")

        draw.rectangle([20, 205, 295, 380], fill="#252542")
        draw.text((157, 235), "STEP 3: TRUTH", font=font_sm, fill="#FFD600", anchor="mm")
        draw.text((157, 300), top[:20].upper(), font=font_sm, fill="#FFFFFF", anchor="mm")
        
        draw.rectangle([305, 205, 580, 380], fill="#E63946") # Error panel!
        draw.text((442, 235), "STEP 4: SHAME 😕", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw.text((442, 300), bottom[:20].upper(), font=font_sm, fill="#FFFFFF", anchor="mm")

        # Grid lines
        draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)
        draw.line([20, 200, 580, 200], fill="#1A1A2E", width=10)

    # 7. Woman Yelling At Cat Template
    elif template == "woman_cat":
        # 2 columns split
        # Left: Recruiter
        draw.rectangle([20, 20, 295, 380], fill="#252542")
        draw.text((157, 100), "👩‍💼 RECRUITER:", font=font_sm, fill="#FF6B00", anchor="mm")
        draw.text((157, 220), top.upper(), font=font_sm, fill="#FFFFFF", anchor="mm")
        
        # Right: Smug Cat
        draw.rectangle([305, 20, 580, 380], fill="#06D6A0")
        draw.text((442, 100), "🐱 SMUG CAT:", font=font_sm, fill="#1A1A2E", anchor="mm")
        draw.text((442, 220), bottom.upper(), font=font_sm, fill="#1A1A2E", anchor="mm")

        draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)

    # 8. Sharma Aunty Custom Template
    else:
        # Traditional Aunty emoji with big bold impact fonts
        draw.rectangle([20, 20, 580, 380], fill="#FFF8F0", outline="#FF6B00", width=4)
        
        # Aunty avatar representation
        draw.text((width // 2, 200), "🩴  👩🏽‍🏫  🩴", font=font_title, anchor="mm")
        
        # High impact top & bottom text
        draw.text((width // 2, 70), top.upper(), font=font_title, fill="#E63946", anchor="mm")
        draw.text((width // 2, 330), bottom.upper(), font=font_title, fill="#FF6B00", anchor="mm")

    # Draw small branding footer
    draw.text((width - 30, height - 25), "sharmagpt.com", fill="#888888", font=font_sm, anchor="rm")

    # Convert to Base64
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    img_bytes = buffer.getvalue()
    return f"data:image/png;base64,{base64.b64encode(img_bytes).decode('utf-8')}"


def select_and_generate_memes(analysis_results: Dict[str, Any]) -> List[str]:
    """
    Reads the memes array from Gemini analysis and compiles
    exactly the 8 requested unhinged templates into visual PNG Base64s.
    """
    memes_data = analysis_results.get("memes", [])
    
    # Fallback to standard 8 stubs if the array is missing or incomplete
    if len(memes_data) < 8:
        memes_data = [
            {"template": "drake", "top_text": "4 Udemy course certificates", "bottom_text": "Bhai tera unique project kahan hai"},
            {"template": "distracted_boyfriend", "top_text": "Watching 100th coding playlist", "bottom_text": "Instead of building real-world tables"},
            {"template": "this_is_fine", "top_text": "No projects listed, zero commits", "bottom_text": "Writing 'Quick Learner' on resume"},
            {"template": "galaxy_brain", "top_text": "Added 'Expert AI Engineer' to bio", "bottom_text": "Bhai نے load ki API key bas"},
            {"template": "coffin_dance", "top_text": "Recruiter asks for internship proof", "bottom_text": "Aiyyo! Clean blank page in resume"},
            {"template": "gru_plan", "top_text": "Listed 'Team player with leadership'", "bottom_text": "Beta tu toh WhatsApp group mein mute hai"},
            {"template": "woman_cat", "top_text": "Recruiter: Show me deployed link", "bottom_text": "Candidate: Runs on my localhost"},
            {"template": "sharma_aunty_custom", "top_text": "Says 'Highly motivated to study'", "bottom_text": "Beta tu toh video games khelta hai"}
        ]

    compiled_memes = []
    for item in memes_data[:8]: # Limit strictly to 8 memes
        try:
            top = item.get("top_text", "Delusion")
            bottom = item.get("bottom_text", "Reality")
            template = item.get("template", "sharma_aunty_custom")
            
            meme_url = draw_meme_canvas(template, top, bottom)
            compiled_memes.append(meme_url)
        except Exception as e:
            logger.error(f"Failed to compile meme {item}: {e}")
            
    return compiled_memes
