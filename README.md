# SharmaGPT™

> "Because Sharma Ji's Son Wasn't Available."
> **Subtitle:** "Upload your resume. Face the disappointment."

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.110.0-emerald?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Gemini-2.5%20Flash-orange?style=for-the-badge&logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/Firestore-Free%20Tier-yellow?style=for-the-badge&logo=firebase" alt="Firestore" />
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-blueviolet?style=for-the-badge" alt="Deploy" />
</div>

---

### 🩴 "Beta, upload your resume. I have things to say."
— **Sharma Aunty™** • *AI-powered • Always disappointed • Savagely smart*

---

## ℹ️ About

**SharmaGPT™** is a character-driven, AI-powered resume roasting web application. Users upload their resume (PDF or DOCX) and receive a brutally funny, deeply theatrical judgment from **Sharma Aunty™** — an animated Indian mother avatar powered by Google Gemini 2.5 Flash. 

She roasts your career choices, compares your achievements to **Sharma Ji's Son**, predicts your family function survival probability, and ultimately provides a highly practical **30-Day Resume Recovery Plan**.

---

## 🚀 Key Features

* **🔥 Emotional Damage Report™:** Seven animated score cards grading Employability, Recruiter Interest, Resume Quality, Project Strength, Skill Authenticity, Internship Readiness, and Portfolio Strength.
* **🩴 Chappal Threat Meter™:** A 1-to-5 level metric tracking aunty's disappointment. At levels 4 and 5, watch a flying chappal spin and fly across your screen!
* **👦 Sharma Ji's Son Analysis™:** A side-by-side card grid comparing your resume items directly with the neighborhood standard's god-tier achievements.
* **👪 Family Function Simulator™:** Calculates percentage probability bars for typical dynamic relative wedding interrogations (e.g. *"Beta, package kitna laga?"*).
* **📚 Tutorial Syndrome Detector™:** Detects if you have compiled 48 course certificates but completed exactly 0 unique projects, calling out "Udemy Champions."
* **🔊 Voice System:** Uses the Browser Web Speech API to read aloud Sharma Aunty's custom opening reaction and roasts in a motherly Indian English cadence.
* **🖼️ Meme Generator:** Pillow dynamically generates customized, captioned memes on the server based on your weakest resume points, ready to download.
* **📅 30-Day Recovery Plan:** An interactive calendar roadmap containing daily checklist items to fix your resume, complete with success confetti!
* **📜 Damage Certificate:** Generates a downloadable, high-res PDF/PNG "Official Certificate of Extreme Emotional Damage" signed by Sharma Aunty.

---

## 🎭 Sharma Aunty's Moods

| STATE | TRIGGER | HER SIGNATURE LINE |
|---|---|---|
| 🟢 **Happy** | Strong resume section | *"Accha beta... this is actually good."* |
| 🟡 **Concerned** | Minor issue detected | *"Hmm. One eyebrow raised."* |
| 🟠 **Suspicious** | Buzzword overload | *"Interesting. Very interesting..."* |
| 🔵 **Disappointed** | Weak achievements | *"Beta... *sighs*"* |
| 🔴 **Furious** | No projects / no GitHub | *"WHAT HAVE YOU BEEN DOING FOR 4 YEARS?!"* |
| 💀 **Nuclear** | Multiple critical failures | *"Security is being informed. Chappal equipped."* |

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, Tailwind CSS v3, Framer Motion, Recharts, Canvas Confetti.
* **Backend:** Python, FastAPI, Uvicorn, Pillow, PyMuPDF, python-docx, Google Generative AI (Gemini 2.5 Flash).
* **Services:** Firebase (Auth, Firestore DB, Cloud Storage).

---

## 📁 Project Structure

```
sharmagpt/
├── backend/                        # FastAPI Python application
│   ├── main.py                     # Server entry point
│   ├── requirements.txt            # Python dependencies
│   ├── api/
│   │   └── routes/                 # Endpoint routers (/analyze, /meme, /certificate)
│   ├── parsers/                    # PDF/DOCX extractors & metadata segmenters
│   ├── services/                   # Gemini AI connection, Pillow meme & cert engines
│   ├── prompts/                    # Savage prompt files
│   └── models/                     # Pydantic schema validation structures
│
└── frontend/                       # Vite React frontend application
    ├── package.json                # Node dependencies
    ├── tailwind.config.js          # Playful Duolingo-style tokens & styling
    ├── index.html                  # SEO metatags & typography loaders
    └── src/
        ├── App.jsx                 # Routing core & auth providers
        ├── components/             # SVG SharmaAunty, Flying Chappal, & charts
        └── pages/                  # Home, Login, Upload, Results, & Dashboard
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/molisha07/SharmaGPT.git
cd SharmaGPT
```

### 2. Set up Backend
```bash
cd backend
# 1. Install dependencies
pip install -r requirements.txt

# 2. Add your Gemini API key inside .env (optional, mock fallbacks are fully supported!)
# GEMINI_API_KEY=your_key_here

# 3. Boot server on port 8080 (resolves default port 8000 conflicts)
python -m uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

### 3. Set up Frontend
```bash
cd ../frontend
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

### Frontend (`frontend/.env.local`)
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_google_gemini_key
ALLOWED_ORIGINS=http://localhost:5173
```

---

<div align="center">
  <p><b>Built with chai, disappointment, and Gemini 2.5 Flash 🩴</b></p>
  <p><i>Sharma Aunty is watching you. Study hard, beta.</i></p>
</div>
