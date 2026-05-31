# 🚀 SharmaGPT™ Deployment Guide

This guide details how to deploy the **SharmaGPT™** full-stack application for 100% free using **Render** (for the FastAPI backend) and **Vercel** (for the Vite + React frontend).

---

## 🐍 1. Deploy the Backend (Render)

Render is a modern cloud platform that provides a generous free tier for Python web services.

### Steps:
1. Log in to [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository `molisha07/SharmaGPT`.
4. Configure the Web Service settings:
   - **Name:** `sharmagpt-backend`
   - **Region:** Select closest to you (e.g., `Singapore` or `Oregon`)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free`

5. Click **Advanced** to add **Environment Variables**:
   - `GEMINI_API_KEY`: *Your Google Gemini API Key* (optional, mock fallback active if blank!)
   - `ALLOWED_ORIGINS`: `https://your-sharmagpt-frontend.vercel.app` (Set this to your Vercel URL once deployed)

6. Click **Create Web Service**. 
   *Note: On Render's free tier, the backend will spin down after 15 minutes of inactivity. When a user lands on the site, it may take 30-50 seconds to complete a "cold start" — this is expected free tier behavior.*

---

## ⚛️ 2. Deploy the Frontend (Vercel)

Vercel provides instant static hosting and SPA routing with automated deployments on git pushes.

### Steps:
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** and select **Project**.
3. Import your GitHub repository `molisha07/SharmaGPT`.
4. Configure the project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Edit and select `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Expand the **Environment Variables** section and add:
   - `VITE_BACKEND_URL`: `https://sharmagpt-backend.onrender.com` (Set this to your live Render Web Service URL)
   - `VITE_FIREBASE_API_KEY`: *Your Firebase credentials (if using)*

6. Click **Deploy**. Vercel will build the React app and give you a live production link (e.g., `https://sharmagpt.vercel.app`) in under 2 minutes!

---

## 🔄 3. Update Cross-Origin CORS

Once both sites are live:
- Go back to your Render Web Service dashboard.
- Update `ALLOWED_ORIGINS` under environment variables to include your official Vercel live URL.
- This ensures secure browser handshakes between your frontend and backend!
