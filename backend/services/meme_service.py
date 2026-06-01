import io
import base64
import math
import logging
from typing import List, Dict, Any
from PIL import Image, ImageDraw, ImageFont

logger = logging.getLogger(__name__)

def draw_multiline_text(draw, text: str, cx: int, cy: int, font, max_width: int, fill: str, anchor_y: str = "m"):
    """
    Wraps text automatically to prevent it from overflowing the meme panels.
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
            w = len(test_line) * 8 # simple character count fallback
            
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
        
    line_height = 22
    total_height = len(lines) * line_height
    
    start_y = cy - (total_height // 2) if anchor_y == "m" else cy
    
    for idx, line in enumerate(lines):
        draw.text((cx, start_y + idx * line_height), line, font=font, fill=fill, anchor="mm")

def draw_drake_face(draw, cx: int, cy: int, is_happy: bool):
    """
    Draws a stylized vector cartoon of Drake (orange jacket, black hair/beard)
    to represent disapproval (top panel) or approval (bottom panel).
    """
    # 1. Skin tone head
    draw.ellipse([cx - 24, cy - 24, cx + 24, cy + 24], fill="#FFE3D1", outline="#1A1A2E", width=3)
    
    # 2. Sleek black hair and beard
    draw.chord([cx - 25, cy - 10, cx + 25, cy + 25], start=0, end=180, fill="#222222") # beard
    draw.chord([cx - 25, cy - 25, cx + 25, cy - 5], start=180, end=360, fill="#222222") # hair
    
    # 3. Orange puffy jacket shoulders
    draw.rectangle([cx - 30, cy + 22, cx + 30, cy + 30], fill="#FF6B00", outline="#1A1A2E", width=2)
    
    # 4. Sunglasses
    draw.rectangle([cx - 15, cy - 8, cx - 2, cy], fill="#111111")
    draw.rectangle([cx + 2, cy - 8, cx + 15, cy], fill="#111111")
    draw.line([cx - 2, cy - 4, cx + 2, cy - 4], fill="#111111", width=2)
    
    # 5. Mouth & Hand expressions
    if is_happy:
        # Happy smile
        draw.chord([cx - 6, cy + 8, cx + 6, cy + 16], start=0, end=180, fill="#E63946")
        
        # Pointing hand
        draw.ellipse([cx + 28, cy + 8, cx + 38, cy + 18], fill="#FFE3D1", outline="#1A1A2E", width=2)
        draw.rectangle([cx + 36, cy + 11, cx + 46, cy + 15], fill="#FFE3D1", outline="#1A1A2E", width=2)
    else:
        # Sad disappointed mouth
        draw.arc([cx - 6, cy + 10, cx + 6, cy + 16], start=180, end=360, fill="#1A1A2E", width=2)
        
        # Rejection hand raised (stop sign gesture)
        draw.ellipse([cx + 26, cy - 15, cx + 36, cy - 5], fill="#FFE3D1", outline="#1A1A2E", width=2)
        # Finger lines
        draw.line([cx + 28, cy - 15, cx + 28, cy - 22], fill="#1A1A2E", width=2)
        draw.line([cx + 31, cy - 15, cx + 31, cy - 24], fill="#1A1A2E", width=2)
        draw.line([cx + 34, cy - 15, cx + 34, cy - 22], fill="#1A1A2E", width=2)

def draw_meme_canvas(template: str, top: str, bottom: str) -> str:
    """
    Renders one of the 8 unhinged meme templates dynamically using Pillow.
    Uses custom vector illustrations instead of unicode emojis to ensure beautiful rendering.
    Returns the image encoded as a Base64 data URI string.
    """
    width, height = 600, 400
    image = Image.new("RGB", (width, height), color="#1A1A2E") # Deep navy background
    draw = ImageDraw.Draw(image)

    # Resolve default fonts
    try:
        font_title = ImageFont.truetype("arial.ttf", 24)
        font_body = ImageFont.truetype("arial.ttf", 18)
        font_sm = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font_title = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_sm = ImageFont.load_default()

    # Draw outer bright frame
    draw.rectangle([10, 10, width - 10, height - 10], outline="#FF6B00", width=6)

    # 1. Drake Pointing Template
    if template == "drake":
        # Left Panel - Disapproval (Top)
        draw.rectangle([20, 20, 180, 200], fill="#E63946")
        draw_drake_face(draw, 100, 110, is_happy=False)
        
        # Left Panel - Approval (Bottom)
        draw.rectangle([20, 200, 180, 380], fill="#06D6A0")
        draw_drake_face(draw, 100, 290, is_happy=True)

        # Black split lines
        draw.line([180, 20, 180, 380], fill="#1A1A2E", width=8)
        draw.line([20, 200, 580, 200], fill="#1A1A2E", width=8)

        # Right captions (Text wrapped nicely)
        draw_multiline_text(draw, top.upper(), 380, 110, font_body, 360, "#FFFFFF")
        draw_multiline_text(draw, bottom.upper(), 380, 290, font_body, 360, "#FFD600")

    # 2. Distracted Boyfriend Template
    elif template == "distracted_boyfriend":
        # Column 1 (Left): Distraction (Udemy/YouTube playlist)
        draw.rectangle([20, 20, 200, 385], fill="#E63946")
        # Draw Girl looking back (smug face)
        draw.ellipse([110, 130, 110 + 36, 130 + 36], fill="#FFE3D1", outline="#1A1A2E", width=2) # head
        draw.chord([110, 120, 146, 136], start=180, end=360, fill="#222222") # brown hair
        draw.rectangle([115, 166, 141, 195], fill="#0077B6", outline="#1A1A2E", width=2) # dress
        draw.text((110, 50), "📱 PLAYLIST", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw.text((110, 80), "Udemy / YouTube", font=font_sm, fill="#CCCCCC", anchor="mm")
        
        # Column 2 (Center): Boyfriend (User)
        draw.rectangle([200, 20, 390, 385], fill="#111111")
        # Draw Boyfriend looking back shocked
        draw.ellipse([295 - 18, 130, 295 + 18, 130 + 36], fill="#FFE3D1", outline="#1A1A2E", width=2) # head
        draw.chord([277, 120, 313, 136], start=180, end=360, fill="#111111") # hair
        draw.rectangle([282, 166, 308, 195], fill="#0096C7", outline="#1A1A2E", width=2) # blue shirt
        # Shocked eyes and O mouth
        draw.ellipse([285, 142, 291, 148], fill="#FFFFFF", outline="#1A1A2E", width=1)
        draw.ellipse([299, 142, 305, 148], fill="#FFFFFF", outline="#1A1A2E", width=1)
        draw.ellipse([292, 152, 298, 158], fill="#9D0208") # Shocked mouth
        draw.text((295, 50), "👦 USER", font=font_sm, fill="#FFD600", anchor="mm")
        draw.text((295, 80), "Distracted Beta", font=font_sm, fill="#CCCCCC", anchor="mm")
        
        # Column 3 (Right): Jealous Girlfriend (Coding)
        draw.rectangle([390, 20, 580, 385], fill="#06D6A0")
        # Draw Girlfriend looking angry
        draw.ellipse([485 - 18, 130, 485 + 18, 130 + 36], fill="#FFE3D1", outline="#1A1A2E", width=2) # head
        draw.chord([467, 120, 503, 136], start=180, end=360, fill="#FFD600") # blonde hair ponytail
        draw.rectangle([472, 166, 498, 195], fill="#E63946", outline="#1A1A2E", width=2) # red shirt
        # Angry brows
        draw.line([475, 140, 483, 145], fill="#1A1A2E", width=2)
        draw.line([495, 140, 487, 145], fill="#1A1A2E", width=2)
        draw.arc([480, 152, 490, 160], start=180, end=360, fill="#1A1A2E", width=2)
        draw.text((485, 50), "💻 CODING", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw.text((485, 80), "Unique Project", font=font_sm, fill="#CCCCCC", anchor="mm")

        # Dividers
        draw.line([200, 20, 200, 380], fill="#1A1A2E", width=6)
        draw.line([390, 20, 390, 380], fill="#1A1A2E", width=6)

        # Bottom text overlay card
        draw.rectangle([30, 260, 570, 370], fill="#1A1A2E", outline="#FF6B00", width=2)
        draw_multiline_text(draw, top.upper(), width // 2, 290, font_body, 500, "#FFFFFF")
        draw_multiline_text(draw, bottom.upper(), width // 2, 335, font_body, 500, "#FFD600")

    # 3. This Is Fine Template
    elif template == "this_is_fine":
        # Burning orange background
        draw.rectangle([20, 20, 580, 380], fill="#D94E34")
        
        # Draw vector flames (polygons) around the borders
        draw.polygon([(20, 380), (70, 220), (120, 380)], fill="#FF9F1C", outline=None)
        draw.polygon([(80, 380), (140, 260), (200, 380)], fill="#FFD600", outline=None)
        draw.polygon([(400, 380), (460, 240), (520, 380)], fill="#FF9F1C", outline=None)
        draw.polygon([(470, 380), (530, 210), (580, 380)], fill="#FFD600", outline=None)
        
        # Center Dog Card
        draw.rectangle([180, 100, 420, 250], fill="#1A1A2E", outline="#FFFFFF", width=3)
        
        # Draw table
        draw.rectangle([200, 200, 400, 220], fill="#8B5A2B", outline="#1A1A2E", width=2)
        # Red mug
        draw.rectangle([230, 180, 250, 200], fill="#E63946", outline="#1A1A2E", width=2)
        # Draw Dog head
        draw.ellipse([290, 125, 330, 165], fill="#E9C46A", outline="#1A1A2E", width=2) # face
        draw.ellipse([278, 125, 292, 155], fill="#264653") # left floppy ear
        draw.ellipse([328, 125, 342, 155], fill="#264653") # right floppy ear
        draw.ellipse([305, 135, 311, 141], fill="#1A1A2E") # eye L
        draw.ellipse([319, 135, 325, 141], fill="#1A1A2E") # eye R
        draw.ellipse([308, 148, 318, 154], fill="#1A1A2E") # nose
        # Black bowler hat
        draw.rectangle([295, 120, 325, 126], fill="#111111") # hat brim
        draw.rectangle([302, 106, 318, 120], fill="#111111") # hat top
        
        draw.text((300, 235), "🐶 'THIS IS FINE'", font=font_sm, fill="#06D6A0", anchor="mm")
        
        # Text captions
        draw_multiline_text(draw, top.upper(), width // 2, 60, font_body, 500, "#FFFFFF")
        draw_multiline_text(draw, bottom.upper(), width // 2, 320, font_body, 500, "#FFD600")

    # 4. Galaxy Brain Template
    elif template == "galaxy_brain":
        # Panel 1: Simple Brain
        draw.rectangle([20, 20, 580, 130], fill="#111111", outline="#FF6B00", width=2)
        # Brain vector draw (cloud-like shape)
        draw.ellipse([50, 60, 80, 90], fill="#FFA3A3")
        draw.ellipse([65, 50, 95, 80], fill="#FFA3A3")
        draw.ellipse([80, 60, 110, 90], fill="#FFA3A3")
        draw.text((80, 110), "STAGE 1", font=font_sm, fill="#888888", anchor="mm")
        draw_multiline_text(draw, top.upper(), 340, 75, font_sm, 400, "#FFFFFF")
        
        # Panel 2: Glowing Brain
        draw.rectangle([20, 135, 580, 245], fill="#252542", outline="#FFD600", width=2)
        # Glowing Brain vector
        draw.ellipse([50, 175, 80, 205], fill="#FFD600")
        draw.ellipse([65, 165, 95, 195], fill="#FFD600")
        draw.ellipse([80, 175, 110, 205], fill="#FFD600")
        # Glowing yellow ray lines
        for idx in range(8):
            angle = idx * 45
            rx = int(80 + 35 * math.cos(math.radians(angle)))
            ry = int(185 + 35 * math.sin(math.radians(angle)))
            draw.line([80, 185, rx, ry], fill="#FFD600", width=2)
        draw.text((80, 225), "STAGE 2", font=font_sm, fill="#FFD600", anchor="mm")
        
        mid_txt = "Claims 5 Years ML Experience" if len(top) < 10 else f"CLAIM: {top[:30]}..."
        draw_multiline_text(draw, mid_txt.upper(), 340, 190, font_sm, 400, "#FFFFFF")
        
        # Panel 3: Cosmic Brain
        draw.rectangle([20, 250, 580, 380], fill="#1A1A2E", outline="#06D6A0", width=2)
        # Cosmic glowing brain with multi rings
        draw.ellipse([50, 295, 110, 355], outline="#06D6A0", width=2)
        draw.ellipse([40, 285, 120, 365], outline="#FFD600", width=1)
        draw.ellipse([60, 305, 90, 335], fill="#FFFFFF")
        draw.ellipse([75, 295, 105, 325], fill="#FFFFFF")
        draw.text((80, 362), "STAGE 3", font=font_sm, fill="#06D6A0", anchor="mm")
        
        draw_multiline_text(draw, bottom.upper(), 340, 315, font_body, 400, "#06D6A0")

    # 5. Coffin Dance Template
    elif template == "coffin_dance":
        # Black elegant background with gold border
        draw.rectangle([20, 20, 580, 380], fill="#111111", outline="#FFD600", width=6)
        
        # Draw Coffin in center
        draw.polygon([(240, 130), (270, 95), (330, 95), (360, 130), (330, 165), (270, 165)], fill="#8B5A2B", outline="#FFD600")
        # Golden Cross on casket
        draw.line([290, 130, 320, 130], fill="#FFD600", width=3)
        draw.line([305, 115, 305, 145], fill="#FFD600", width=3)
        
        # 4 Dancing Pallbearers stick figures with black top hats
        # Top-Left dancer
        draw.ellipse([180, 85, 192, 97], fill="#FFE3D1")
        draw.rectangle([181, 75, 191, 85], fill="#111111") # top hat
        draw.line([186, 97, 186, 130], fill="#FFFFFF", width=3) # body
        draw.line([186, 110, 166, 95], fill="#FFFFFF", width=2) # arm up
        draw.line([186, 130, 176, 150], fill="#FFFFFF", width=2) # leg
        
        # Top-Right dancer
        draw.ellipse([410, 85, 422, 97], fill="#FFE3D1")
        draw.rectangle([411, 75, 421, 85], fill="#111111") # top hat
        draw.line([416, 97, 416, 130], fill="#FFFFFF", width=3) # body
        draw.line([416, 110, 436, 95], fill="#FFFFFF", width=2) # arm up
        draw.line([416, 130, 426, 150], fill="#FFFFFF", width=2) # leg
        
        # Bottom-Left dancer
        draw.ellipse([180, 165, 192, 177], fill="#FFE3D1")
        draw.rectangle([181, 155, 191, 165], fill="#111111") # top hat
        draw.line([186, 177, 186, 210], fill="#FFFFFF", width=3)
        draw.line([186, 190, 166, 175], fill="#FFFFFF", width=2)
        draw.line([186, 210, 176, 230], fill="#FFFFFF", width=2)
        
        # Bottom-Right dancer
        draw.ellipse([410, 165, 422, 177], fill="#FFE3D1")
        draw.rectangle([411, 155, 421, 165], fill="#111111") # top hat
        draw.line([416, 177, 416, 210], fill="#FFFFFF", width=3)
        draw.line([416, 190, 436, 175], fill="#FFFFFF", width=2)
        draw.line([416, 210, 426, 230], fill="#FFFFFF", width=2)

        draw.text((width // 2, 60), "🕺 COFFIN DANCERS READY 🕺", font=font_sm, fill="#FF6B00", anchor="mm")
        
        # Text captions
        draw_multiline_text(draw, top.upper(), width // 2, 265, font_body, 500, "#FFFFFF")
        draw_multiline_text(draw, bottom.upper(), width // 2, 325, font_body, 500, "#FFD600")

    # 6. Gru's Plan Template
    elif template == "gru_plan":
        # 4 Quadrants
        # Top-Left
        draw.rectangle([20, 20, 295, 195], fill="#252542")
        draw.text((157, 45), "STEP 1: SKILLS", font=font_sm, fill="#FFD600", anchor="mm")
        draw_multiline_text(draw, "Write a generic list of tech keywords", 157, 110, font_sm, 250, "#CCCCCC")
        
        # Top-Right
        draw.rectangle([305, 20, 580, 195], fill="#252542")
        draw.text((442, 45), "STEP 2: RECRUIT", font=font_sm, fill="#FFD600", anchor="mm")
        draw_multiline_text(draw, "Apply to FAANG internships", 442, 110, font_sm, 250, "#CCCCCC")

        # Bottom-Left
        draw.rectangle([20, 205, 295, 380], fill="#252542")
        draw.text((157, 230), "STEP 3: TRUTH", font=font_sm, fill="#FFD600", anchor="mm")
        draw_multiline_text(draw, top.upper(), 157, 300, font_sm, 250, "#FFFFFF")
        
        # Bottom-Right
        draw.rectangle([305, 205, 580, 380], fill="#E63946") # Error panel!
        draw.text((442, 230), "STEP 4: SHAME 😕", font=font_sm, fill="#FFFFFF", anchor="mm")
        draw_multiline_text(draw, bottom.upper(), 442, 300, font_sm, 250, "#FFFFFF")

        # Grid lines
        draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)
        draw.line([20, 200, 580, 200], fill="#1A1A2E", width=10)
        
        # Mini Gru in the exact center holding a stick
        draw.ellipse([285, 185, 315, 215], fill="#FFE3D1", outline="#1A1A2E", width=2) # Gru bald head
        draw.line([300, 200, 300, 240], fill="#222222", width=4) # scarf/neck
        # Pointer stick pointing to Step 4 (bottom-right)
        draw.line([300, 210, 340, 235], fill="#8B5A2B", width=3)

    # 7. Woman Yelling At Cat Template
    elif template == "woman_cat":
        # Split Panels
        # Left Panel (Recruiter woman yelling)
        draw.rectangle([20, 20, 295, 380], fill="#252542")
        # Draw Screaming Woman
        draw.ellipse([120, 110, 160, 150], fill="#FFE3D1", outline="#1A1A2E", width=2) # head
        draw.chord([110, 100, 170, 130], start=180, end=360, fill="#FFD600") # blonde hair
        # Crying eyes & yelling mouth
        draw.line([125, 125, 135, 130], fill="#E63946", width=2) # weeping eyes
        draw.line([155, 125, 145, 130], fill="#E63946", width=2)
        draw.ellipse([135, 135, 147, 145], fill="#9D0208") # open yelling mouth
        # Friend holding her shoulder
        draw.ellipse([180, 130, 210, 160], fill="#FFE3D1", outline="#1A1A2E", width=2) # friend head
        draw.chord([175, 120, 215, 145], start=180, end=360, fill="#8B5A2B") # brown hair
        
        draw.text((157, 50), "👩‍💼 RECRUITER YELLS:", font=font_sm, fill="#FF6B00", anchor="mm")
        draw_multiline_text(draw, top.upper(), 157, 270, font_sm, 250, "#FFFFFF")
        
        # Right Panel (Smug White Cat)
        draw.rectangle([305, 20, 580, 380], fill="#06D6A0")
        # Draw White Cat head
        draw.ellipse([420, 100, 464, 144], fill="#FFFFFF", outline="#1A1A2E", width=2) # face
        draw.polygon([(415, 105), (425, 80), (435, 102)], fill="#FFFFFF", outline="#1A1A2E") # Left Ear
        draw.polygon([(469, 105), (459, 80), (449, 102)], fill="#FFFFFF", outline="#1A1A2E") # Right Ear
        # Closed smug eyes
        draw.line([428, 120, 436, 124], fill="#1A1A2E", width=2)
        draw.line([456, 120, 448, 124], fill="#1A1A2E", width=2)
        draw.polygon([(440, 126), (444, 126), (442, 130)], fill="#FFA3A3") # nose
        # Table in front
        draw.rectangle([340, 160, 545, 190], fill="#FFFFFF", outline="#1A1A2E", width=2) # plate/table
        draw.ellipse([410, 165, 474, 185], fill="#E9C46A") # plate of vegetables
        
        draw.text((442, 50), "🐱 SMUG BETA CAT:", font=font_sm, fill="#1A1A2E", anchor="mm")
        draw_multiline_text(draw, bottom.upper(), 442, 270, font_sm, 250, "#1A1A2E")

        # Center line divider
        draw.line([300, 20, 300, 380], fill="#1A1A2E", width=10)

    # 8. Sharma Aunty Custom Template
    else:
        # Traditional Aunty with colorful boarder
        draw.rectangle([20, 20, 580, 380], fill="#FFF8F0", outline="#E63946", width=6)
        
        # Draw Saree drape
        draw.polygon([(180, 380), (300, 230), (420, 380)], fill="#E63946", outline="#1A1A2E")
        draw.polygon([(210, 380), (300, 250), (390, 380)], fill="#FFD600") # Saree border
        
        # Face base
        draw.ellipse([260, 170, 340, 250], fill="#FFE3D1", outline="#1A1A2E", width=3) # head
        # Large Red Bindi
        draw.ellipse([296, 188, 304, 196], fill="#E63946")
        # Round Black Glasses
        draw.ellipse([272, 202, 296, 222], outline="#111111", width=3)
        draw.ellipse([304, 202, 328, 222], outline="#111111", width=3)
        draw.line([296, 212, 304, 212], fill="#111111", width=3) # nose bridge
        # Black Bun hair
        draw.ellipse([285, 145, 315, 175], fill="#111111")
        # Gold Hair pin
        draw.line([270, 150, 290, 160], fill="#FFD600", width=3)
        
        # Flying slipper (Chappal) coming right at screen
        draw.ellipse([140, 150, 185, 230], fill="#E63946", outline="#1A1A2E", width=3) # red sole
        draw.ellipse([145, 155, 180, 225], fill="#FFD600") # yellow inner
        # Straps of slipper
        draw.line([145, 180, 162, 165], fill="#1A1A2E", width=5)
        draw.line([180, 180, 162, 165], fill="#1A1A2E", width=5)
        # Motion speed lines
        draw.line([100, 160, 130, 170], fill="#888888", width=2)
        draw.line([95, 190, 125, 195], fill="#888888", width=2)
        draw.line([100, 220, 130, 215], fill="#888888", width=2)
        
        # Text captions
        draw_multiline_text(draw, top.upper(), width // 2, 70, font_title, 500, "#E63946")
        draw_multiline_text(draw, bottom.upper(), width // 2, 330, font_title, 500, "#FF6B00")

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
