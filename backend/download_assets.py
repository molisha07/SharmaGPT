import os
import urllib.request
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Direct URLs to original blank meme images on Imgflip (dynamically verified)
MEME_ASSETS = {
    "drake.jpg": "https://i.imgflip.com/30b1gx.jpg",
    "distracted_boyfriend.jpg": "https://i.imgflip.com/1ur9b0.jpg",
    "this_is_fine.jpg": "https://i.imgflip.com/wxica.jpg",
    "galaxy_brain.jpg": "https://i.imgflip.com/1jwhww.jpg",
    "coffin_dance.jpg": "https://i.imgflip.com/3v1jvn.png",
    "gru_plan.jpg": "https://i.imgflip.com/26jxvz.jpg",
    "woman_cat.jpg": "https://i.imgflip.com/345v97.jpg"
}

def download_meme_assets():
    assets_dir = os.path.join(os.path.dirname(__file__), "assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    
    for filename, url in MEME_ASSETS.items():
        dest_path = os.path.join(assets_dir, filename)
        # Force overwrite to ensure we get the correct files
        logger.info(f"Downloading {filename} from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                with open(dest_path, 'wb') as out_file:
                    out_file.write(response.read())
            logger.info(f"Successfully downloaded {filename}.")
        except Exception as e:
            logger.error(f"Failed to download {filename}: {e}")

if __name__ == "__main__":
    download_meme_assets()
