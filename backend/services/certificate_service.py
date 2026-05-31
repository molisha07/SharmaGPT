import io
import base64
import uuid
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

def generate_sharma_certificate(name: str, scores: Dict[str, int], chappal_level: int, overall_score: int) -> str:
    """
    Generates a high-quality Emotional Damage Certificate dynamically using Pillow.
    Returns the image encoded as a Base64 data URI string.
    """
    # 800 x 600 certificate size
    width, height = 800, 600
    
    # Elegant warm cream background (#FFF8F0)
    image = Image.new("RGB", (width, height), color="#FFF8F0")
    draw = ImageDraw.Draw(image)
    
    # Double border: outer thick orange, inner thin gold
    draw.rectangle([20, 20, width - 20, height - 20], outline="#FF6B00", width=6)
    draw.rectangle([30, 30, width - 30, height - 30], outline="#FFD600", width=2)
    
    # Try to load clean fonts
    try:
        font_title = ImageFont.truetype("arial.ttf", 36)
        font_subtitle = ImageFont.truetype("arial.ttf", 18)
        font_name = ImageFont.truetype("arial.ttf", 28)
        font_body = ImageFont.truetype("arial.ttf", 20)
        font_stat = ImageFont.truetype("arial.ttf", 16)
        font_signature = ImageFont.truetype("arial.ttf", 24)
    except Exception:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_name = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_stat = ImageFont.load_default()
        font_signature = ImageFont.load_default()

    # 1. Header Title
    draw.text((width // 2, 80), "OFFICIAL SHARMAGPT™ CERTIFICATE", fill="#FF6B00", font=font_title, anchor="mm")
    draw.text((width // 2, 120), "OF EXTREME EMOTIONAL DAMAGE & DISAPPOINTMENT", fill="#1A1A2E", font=font_subtitle, anchor="mm")
    
    # 2. Main Body
    draw.text((width // 2, 180), "This is to solemnly certify that", fill="#555555", font=font_subtitle, anchor="mm")
    draw.text((width // 2, 220), name.upper(), fill="#1A1A2E", font=font_name, anchor="mm")
    
    body_text = "has uploaded their resume and successfully survived a brutal roasting by Sharma Aunty.\nThe candidate's credentials have been weighed against Sharma Ji's Son and found extremely lacking."
    
    # Draw multiline body text
    y_offset = 270
    for line in body_text.split("\n"):
        draw.text((width // 2, y_offset), line, fill="#333333", font=font_body, anchor="mm")
        y_offset += 30

    # 3. Score Grid / Stats
    stat_y = 380
    box_w, box_h = 160, 80
    x_coords = [100, 320, 540]
    
    stats = [
        {"label": "Overall Score", "value": f"{overall_score}/100", "color": "#E63946"},
        {"label": "Chappal Threat", "value": f"Level {chappal_level}/5", "color": "#FF6B00"},
        {"label": "Employability", "value": f"{scores.get('employability', 50)}%", "color": "#06D6A0"}
    ]
    
    for i, stat in enumerate(stats):
        x = x_coords[i]
        # Draw background card for stats
        draw.rectangle([x, stat_y, x + box_w, stat_y + box_h], fill="#1A1A2E", outline="#FFD600", width=2)
        # Label
        draw.text((x + box_w // 2, stat_y + 20), stat["label"], fill="#CCCCCC", font=font_stat, anchor="mm")
        # Value
        draw.text((x + box_w // 2, stat_y + 50), stat["value"], fill=stat["color"], font=font_signature, anchor="mm")

    # 4. Signatures and Date
    # Date of analysis
    current_date = datetime.now().strftime("%B %d, %Y")
    draw.text((150, 510), "DATE OF JUDGMENT", fill="#888888", font=font_stat, anchor="mm")
    draw.text((150, 540), current_date, fill="#1A1A2E", font=font_body, anchor="mm")
    
    # Signature
    draw.text((width - 150, 510), "SHARMA AUNTY SIGNATURE", fill="#888888", font=font_stat, anchor="mm")
    draw.text((width - 150, 540), "Sharma Aunty 🩴", fill="#FF6B00", font=font_signature, anchor="mm")
    
    # Unique ID
    cert_id = f"SG-{uuid.uuid4().hex[:8].upper()}"
    draw.text((width // 2, 550), f"Verification ID: {cert_id}", fill="#888888", font=font_stat, anchor="mm")
    
    # Convert image to PNG bytes
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    img_bytes = buffer.getvalue()
    
    # Encode to Base64
    base64_str = base64.b64encode(img_bytes).decode("utf-8")
    return f"data:image/png;base64,{base64_str}"
