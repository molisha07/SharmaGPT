import io
import base64
import os
import math
import logging
from typing import List, Dict, Any
from PIL import Image, ImageDraw, ImageFont

logger = logging.getLogger(__name__)

def draw_impact_text(draw, text: str, cx: int, cy: int, font, max_width: int, fill: str = "#FFFFFF", outline: str = "#000000", outline_width: int = 2):
    """
    Draws text with a thick black outline, mimicking standard internet meme text.
    Automatically wraps long lines to avoid text bleeding out of bounds.
    """
    words = text.split(' ')
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        try:
            bbox = draw.textbbox((0, 0), test_line, font=font)
            w = bbox[2] - bbox[0]
        except Exception:
            w = len(test_line) * 9
            
        if w <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
    if current_line:
        lines.append(' '.join(current_line))
        
    line_height = 24
    total_height = len(lines) * line_height
    start_y = cy - (total_height // 2)
    
    for idx, line in enumerate(lines):
        lx, ly = cx, start_y + idx * line_height
        if outline and outline_width > 0:
            # Render outline in 8 directions
            for dx in range(-outline_width, outline_width + 1):
                for dy in range(-outline_width, outline_width + 1):
                    if dx != 0 or dy != 0:
                        draw.text((lx + dx, ly + dy), line, font=font, fill=outline, anchor="mm")
        # Render primary text
        draw.text((lx, ly), line, font=font, fill=fill, anchor="mm")

def draw_drake_face(draw, cx: int, cy: int, is_happy: bool):
    """Fallback vector illustration for Drake."""
    draw.ellipse([cx - 24, cy - 24, cx + 24, cy + 24], fill="#FFE3D1", outline="#1A1A2E", width=3)
    draw.chord([cx - 25, cy - 10, cx + 25, cy + 25], start=0, end=180, fill="#222222") # beard
    draw.chord([cx - 25, cy - 25, cx + 25, cy - 5], start=180, end=360, fill="#222222") # hair
    draw.rectangle([cx - 30, cy + 22, cx + 30, cy + 30], fill="#FF6B00", outline="#1A1A2E", width=2)
    draw.rectangle([cx - 15, cy - 8, cx - 2, cy], fill="#111111")
    draw.rectangle([cx + 2, cy - 8, cx + 15, cy], fill="#111111")
    draw.line([cx - 2, cy - 4, cx + 2, cy - 4], fill="#111111", width=2)
    if is_happy:
        draw.chord([cx - 6, cy + 8, cx + 6, cy + 16], start=0, end=180, fill="#E63946")
        draw.ellipse([cx + 28, cy + 8, cx + 38, cy + 18], fill="#FFE3D1", outline="#1A1A2E", width=2)
        draw.rectangle([cx + 36, cy + 11, cx + 46, cy + 15], fill="#FFE3D1", outline="#1A1A2E", width=2)
    else:
        draw.arc([cx - 6, cy + 10, cx + 6, cy + 16], start=180, end=360, fill="#1A1A2E", width=2)
        draw.ellipse([cx + 26, cy - 15, cx + 36, cy - 5], fill="#FFE3D1", outline="#1A1A2E", width=2)
        draw.line([cx + 28, cy - 15, cx + 28, cy - 22], fill="#1A1A2E", width=2)
        draw.line([cx + 31, cy - 15, cx + 31, cy - 24], fill="#1A1A2E", width=2)
        draw.line([cx + 34, cy - 15, cx + 34, cy - 22], fill="#1A1A2E", width=2)

def draw_meme_canvas(template: str, top: str, bottom: str) -> str:
    """
    Renders one of the 8 unhinged meme templates dynamically.
    Loads real blank internet meme JPG assets if available on disk.
    If assets are missing, falls back cleanly to custom PIL flat vector illustrations.
    Returns the image encoded as a Base64 data URI string.
    """
    assets_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
    
    # Resolve bold fonts for impact titles and bodies
    font_paths = ["impact.ttf", "arialbd.ttf", "arial.ttf"]
    font_bold = None
    font_normal = None
    font_small = None
    
    for fp in font_paths:
        try:
            font_bold = ImageFont.truetype(fp, 22)
            font_normal = ImageFont.truetype(fp, 18)
            font_small = ImageFont.truetype(fp, 13)
            break
        except Exception:
            continue
            
    if not font_bold:
        font_bold = ImageFont.load_default()
        font_normal = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # 1. Drake Hotline Bling
    if template == "drake":
        image_path = os.path.join(assets_dir, "drake.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 600))
            draw = ImageDraw.Draw(image)
            # Standard Drake has a clean white right panel: draw solid black text (no outline)
            draw_impact_text(draw, top.upper(), 450, 150, font_bold, 270, fill="#000000", outline=None)
            draw_impact_text(draw, bottom.upper(), 450, 450, font_bold, 270, fill="#000000", outline=None)
        else:
            # Fallback
            image = Image.new("RGB", (600, 400), color="#1A1A2E")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FF6B00", width=6)
            draw.rectangle([20, 20, 180, 200], fill="#E63946")
            draw_drake_face(draw, 100, 110, is_happy=False)
            draw.rectangle([20, 200, 180, 380], fill="#06D6A0")
            draw_drake_face(draw, 100, 290, is_happy=True)
            draw.line([180, 20, 180, 380], fill="#1A1A2E", width=8)
            draw.line([20, 200, 580, 200], fill="#1A1A2E", width=8)
            draw_impact_text(draw, top.upper(), 380, 110, font_normal, 360, fill="#FFFFFF", outline="#000000")
            draw_impact_text(draw, bottom.upper(), 380, 290, font_normal, 360, fill="#FFD600", outline="#000000")

    # 2. Distracted Boyfriend
    elif template == "distracted_boyfriend":
        image_path = os.path.join(assets_dir, "distracted_boyfriend.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 400))
            draw = ImageDraw.Draw(image)
            # Overlay white text on characters
            draw_impact_text(draw, "PLAYLIST", 160, 290, font_small, 120, fill="#FFFFFF", outline="#000000", outline_width=2)
            draw_impact_text(draw, "ME / USER", 350, 200, font_small, 120, fill="#FFFFFF", outline="#000000", outline_width=2)
            draw_impact_text(draw, "CODING", 480, 230, font_small, 120, fill="#FFFFFF", outline="#000000", outline_width=2)
            # Top & Bottom caption
            draw_impact_text(draw, top.upper(), 300, 45, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
            draw_impact_text(draw, bottom.upper(), 300, 355, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
        else:
            image = Image.new("RGB", (600, 400), color="#1A1A2E")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FF6B00", width=6)
            draw.rectangle([20, 20, 200, 385], fill="#E63946")
            draw.text((110, 50), "📱 PLAYLIST", font=font_small, fill="#FFFFFF", anchor="mm")
            draw.rectangle([200, 20, 390, 385], fill="#111111")
            draw.text((295, 50), "👦 USER", font=font_small, fill="#FFD600", anchor="mm")
            draw.rectangle([390, 20, 580, 385], fill="#06D6A0")
            draw.text((485, 50), "💻 CODING", font=font_small, fill="#FFFFFF", anchor="mm")
            draw.line([200, 20, 200, 380], fill="#1A1A2E", width=6)
            draw.line([390, 20, 390, 380], fill="#1A1A2E", width=6)
            draw.rectangle([30, 260, 570, 370], fill="#1A1A2E", outline="#FF6B00", width=2)
            draw_impact_text(draw, top.upper(), 300, 290, font_normal, 500, fill="#FFFFFF", outline=None)
            draw_impact_text(draw, bottom.upper(), 300, 335, font_normal, 500, fill="#FFD600", outline=None)

    # 3. This Is Fine
    elif template == "this_is_fine":
        image_path = os.path.join(assets_dir, "this_is_fine.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 400))
            draw = ImageDraw.Draw(image)
            # Overlay classic top & bottom captions in standard white impact font with black outline
            draw_impact_text(draw, top.upper(), 300, 50, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
            draw_impact_text(draw, bottom.upper(), 300, 350, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
        else:
            image = Image.new("RGB", (600, 400), color="#D94E34")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FF6B00", width=6)
            draw.polygon([(20, 380), (70, 220), (120, 380)], fill="#FF9F1C")
            draw.polygon([(80, 380), (140, 260), (200, 380)], fill="#FFD600")
            draw.polygon([(400, 380), (460, 240), (520, 380)], fill="#FF9F1C")
            draw.polygon([(470, 380), (530, 210), (580, 380)], fill="#FFD600")
            draw.rectangle([180, 100, 420, 250], fill="#1A1A2E", outline="#FFFFFF", width=3)
            draw.text((300, 235), "🐶 'THIS IS FINE'", font=font_small, fill="#06D6A0", anchor="mm")
            draw_impact_text(draw, top.upper(), 300, 60, font_normal, 500, fill="#FFFFFF", outline="#000000")
            draw_impact_text(draw, bottom.upper(), 300, 320, font_normal, 500, fill="#FFD600", outline="#000000")

    # 4. Galaxy Brain (Expanding Brain)
    elif template == "galaxy_brain":
        image_path = os.path.join(assets_dir, "galaxy_brain.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 600))
            draw = ImageDraw.Draw(image)
            # The Expanding Brain template has 4 solid black panels on the left to write text
            # We will split the text nicely over the 4 panels
            draw_impact_text(draw, "LISTING 'HTML/CSS' AS CORE SKILLS", 150, 75, font_small, 260, fill="#FFFFFF", outline=None)
            draw_impact_text(draw, "CREATING PROFILE WEBSITE ON LOCALHOST", 150, 225, font_small, 260, fill="#FFFFFF", outline=None)
            draw_impact_text(draw, top.upper(), 150, 375, font_small, 260, fill="#FFFFFF", outline=None)
            draw_impact_text(draw, bottom.upper(), 150, 525, font_normal, 260, fill="#06D6A0", outline=None)
        else:
            image = Image.new("RGB", (600, 400), color="#1A1A2E")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FF6B00", width=6)
            draw.rectangle([20, 20, 580, 130], fill="#111111", outline="#FF6B00", width=2)
            draw.text((60, 75), "🧠", font=font_bold, anchor="mm")
            draw_impact_text(draw, top.upper(), 340, 75, font_small, 400, fill="#FFFFFF", outline=None)
            draw.rectangle([20, 135, 580, 245], fill="#252542", outline="#FFD600", width=2)
            draw.text((60, 190), "💡", font=font_bold, anchor="mm")
            draw_impact_text(draw, f"CLAIM: {top[:25]}...".upper(), 340, 190, font_small, 400, fill="#FFFFFF", outline=None)
            draw.rectangle([20, 250, 580, 380], fill="#1A1A2E", outline="#06D6A0", width=2)
            draw.text((60, 315), "🌌", font=font_bold, anchor="mm")
            draw_impact_text(draw, bottom.upper(), 340, 315, font_normal, 400, fill="#06D6A0", outline=None)

    # 5. Coffin Dance
    elif template == "coffin_dance":
        image_path = os.path.join(assets_dir, "coffin_dance.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 400))
            draw = ImageDraw.Draw(image)
            draw_impact_text(draw, top.upper(), 300, 50, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
            draw_impact_text(draw, bottom.upper(), 300, 350, font_bold, 540, fill="#FFFFFF", outline="#000000", outline_width=2)
        else:
            image = Image.new("RGB", (600, 400), color="#111111")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FFD600", width=6)
            draw.polygon([(240, 130), (270, 95), (330, 95), (360, 130), (330, 165), (270, 165)], fill="#8B5A2B", outline="#FFD600")
            draw.line([290, 130, 320, 130], fill="#FFD600", width=3)
            draw.line([305, 115, 305, 145], fill="#FFD600", width=3)
            draw.text((300, 60), "🕺 COFFIN DANCERS READY 🕺", font=font_small, fill="#FF6B00", anchor="mm")
            draw_impact_text(draw, top.upper(), 300, 265, font_normal, 500, fill="#FFFFFF", outline="#000000")
            draw_impact_text(draw, bottom.upper(), 300, 325, font_normal, 500, fill="#FFD600", outline="#000000")

    # 6. Gru's Plan
    elif template == "gru_plan":
        image_path = os.path.join(assets_dir, "gru_plan.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 450))
            draw = ImageDraw.Draw(image)
            # Gru's Plan has 4 clean quadrants: draw solid black hand-written style texts
            draw_impact_text(draw, "WRITE GENERIC KEYWORDS", 145, 85, font_small, 200, fill="#000000", outline=None)
            draw_impact_text(draw, "APPLY FOR FAANG INTERNSHIP", 445, 85, font_small, 200, fill="#000000", outline=None)
            draw_impact_text(draw, top.upper(), 145, 310, font_small, 200, fill="#000000", outline=None)
            # The shocking Step 4 panel repeats the Step 3 delusion in confusion!
            draw_impact_text(draw, bottom.upper(), 445, 310, font_small, 200, fill="#000000", outline=None)
        else:
            image = Image.new("RGB", (600, 400), color="#1A1A2E")
            draw = ImageDraw.Draw(image)
            draw.rectangle([20, 20, 295, 195], fill="#252542")
            draw.text((157, 45), "STEP 1: SKILLS", font=font_small, fill="#FFD600", anchor="mm")
            draw_impact_text(draw, "Write a generic list of tech keywords", 157, 110, font_small, 250, fill="#CCCCCC", outline=None)
            draw.rectangle([305, 20, 580, 195], fill="#252542")
            draw.text((442, 45), "STEP 2: RECRUIT", font=font_small, fill="#FFD600", anchor="mm")
            draw_impact_text(draw, "Apply to FAANG internships", 442, 110, font_small, 250, fill="#CCCCCC", outline=None)
            draw.rectangle([20, 205, 295, 380], fill="#252542")
            draw.text((157, 230), "STEP 3: TRUTH", font=font_small, fill="#FFD600", anchor="mm")
            draw_impact_text(draw, top.upper(), 157, 300, font_small, 250, fill="#FFFFFF", outline=None)
            draw.rectangle([305, 205, 580, 380], fill="#E63946")
            draw.text((442, 230), "STEP 4: SHAME 😕", font=font_small, fill="#FFFFFF", anchor="mm")
            draw_impact_text(draw, bottom.upper(), 442, 300, font_small, 250, fill="#FFFFFF", outline=None)
            draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)
            draw.line([20, 200, 580, 200], fill="#1A1A2E", width=10)

    # 7. Woman Yelling at Cat
    elif template == "woman_cat":
        image_path = os.path.join(assets_dir, "woman_cat.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path).resize((600, 350))
            draw = ImageDraw.Draw(image)
            # Left panel text (yelling recruiter)
            draw_impact_text(draw, top.upper(), 150, 70, font_normal, 260, fill="#FFFFFF", outline="#000000", outline_width=2)
            # Right panel text (smug cat)
            draw_impact_text(draw, bottom.upper(), 450, 70, font_normal, 260, fill="#FFFFFF", outline="#000000", outline_width=2)
        else:
            image = Image.new("RGB", (600, 400), color="#252542")
            draw = ImageDraw.Draw(image)
            draw.rectangle([10, 10, 590, 390], outline="#FF6B00", width=6)
            draw.text((157, 50), "👩‍💼 RECRUITER YELLS:", font=font_small, fill="#FF6B00", anchor="mm")
            draw_impact_text(draw, top.upper(), 157, 270, font_small, 250, fill="#FFFFFF", outline=None)
            draw.rectangle([305, 20, 580, 380], fill="#06D6A0")
            draw.text((442, 50), "🐱 SMUG BETA CAT:", font=font_small, fill="#1A1A2E", anchor="mm")
            draw_impact_text(draw, bottom.upper(), 442, 270, font_small, 250, fill="#1A1A2E", outline=None)
            draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)

    # 8. Sharma Aunty Custom
    else:
        # Traditional Aunty circular caricature poster with colorful traditional boarder
        image = Image.new("RGB", (600, 400), color="#FFF8F0")
        draw = ImageDraw.Draw(image)
        draw.rectangle([10, 10, 590, 390], outline="#E63946", width=6)
        
        # Saree drape
        draw.polygon([(180, 380), (300, 230), (420, 380)], fill="#E63946", outline="#1A1A2E")
        draw.polygon([(210, 380), (300, 250), (390, 380)], fill="#FFD600")
        
        # Face and bun
        draw.ellipse([260, 170, 340, 250], fill="#FFE3D1", outline="#1A1A2E", width=3)
        draw.ellipse([296, 188, 304, 196], fill="#E63946") # Bindi
        draw.ellipse([272, 202, 296, 222], outline="#111111", width=3) # glasses L
        draw.ellipse([304, 202, 328, 222], outline="#111111", width=3) # glasses R
        draw.line([296, 212, 304, 212], fill="#111111", width=3)
        draw.ellipse([285, 145, 315, 175], fill="#111111") # bun
        draw.line([270, 150, 290, 160], fill="#FFD600", width=3) # gold hair pin
        
        # Flying slipper (Chappal) coming right at screen
        draw.ellipse([140, 150, 185, 230], fill="#E63946", outline="#1A1A2E", width=3) # red sole
        draw.ellipse([145, 155, 180, 225], fill="#FFD600") # yellow inner
        draw.line([145, 180, 162, 165], fill="#1A1A2E", width=5)
        draw.line([180, 180, 162, 165], fill="#1A1A2E", width=5)
        
        # Captions
        draw_impact_text(draw, top.upper(), 300, 70, font_bold, 500, fill="#E63946", outline=None)
        draw_impact_text(draw, bottom.upper(), 300, 330, font_bold, 500, fill="#FF6B00", outline=None)

    # Draw small branding footer
    draw.text((600 - 30, 400 - 25 if template != "drake" and template != "galaxy_brain" else 600 - 25), "sharmagpt.com", fill="#888888", font=font_small, anchor="rm")

    # Convert to Base64
    buffer = io.BytesIO()
    # Save as JPEG for templates loaded from disk, or PNG
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
