import os
import json
import random
import logging
import google.generativeai as genai
from typing import Dict, Any
from backend.prompts.system_prompt import SYSTEM_PROMPT

logger = logging.getLogger(__name__)

# Try to configure the Gemini SDK from environment variables
api_key = os.getenv("GEMINI_API_KEY", "")
if api_key:
    try:
        genai.configure(api_key=api_key)
        logger.info("Google Gemini SDK initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize Google Gemini SDK: {e}")
else:
    logger.warning("No GEMINI_API_KEY found. Running in offline/mock mode by default.")


def analyze_resume_with_ai(resume_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sends resume details to Google Gemini 2.5 Flash and obtains the roasting report.
    Falls back to mock_roaster if API key is missing or an error occurs.
    """
    raw_text = resume_data.get("raw_text", "")
    metadata_summary = f"""
    Candidate Name: {resume_data.get('name', 'Candidate')}
    Email: {resume_data.get('email', '')}
    GitHub: {resume_data.get('github', 'Not Found')}
    LinkedIn: {resume_data.get('linkedin', 'Not Found')}
    
    Parsed Sections:
    {json.dumps(resume_data.get('sections', {}), indent=2)}
    """
    
    if not api_key:
        logger.info("Executing mock roaster (offline mode).")
        return generate_mock_roast(resume_data)

    try:
        # Prompting Gemini
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT,
            generation_config={"response_mime_type": "application/json"}
        )
        
        prompt = f"""
        Here is the candidate's resume information. Please analyze it brutally, compare it to Sharma Ji's Son, identify red flags, and output the required JSON format.
        
        RESUME INFORMATION:
        {metadata_summary}
        """
        
        response = model.generate_content(prompt)
        result_json = json.loads(response.text)
        return result_json

    except Exception as e:
        logger.error(f"AI Roast generation failed: {e}. Falling back to mock roast.")
        return generate_mock_roast(resume_data)


def generate_mock_roast(resume_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    High-fidelity offline fallback roaster. Analyzes keywords in the resume text
    and structures a custom, hilarious, fully conforming JSON roast.
    """
    name = resume_data.get("name", "Beta")
    sections = resume_data.get("sections", {})
    skills_text = sections.get("skills", "").lower()
    projects_text = sections.get("projects", "").lower()
    experience_text = sections.get("experience", "").lower()
    github = resume_data.get("github", "")
    linkedin = resume_data.get("linkedin", "")

    # Calculate some realistic mock scores based on resume signals
    has_github = len(github) > 0
    has_linkedin = len(linkedin) > 0
    has_projects = len(projects_text) > 40
    has_exp = len(experience_text) > 40
    has_skills = len(skills_text) > 20
    
    # Let's assess Red Flags
    red_flags = []
    if not has_github:
        red_flags.append("🚩 Missing GitHub Profile — Coding in secret or hiding shame?")
    if not has_linkedin:
        red_flags.append("🚩 No LinkedIn Profile — How will relatives spy on your salary?")
    if not has_projects:
        red_flags.append("🚩 Empty Projects Section — Master of copy-pasting, builder of nothing.")
    if not has_exp:
        red_flags.append("🚩 Empty Experience Section — Strictly a full-time professional video watcher.")
        
    # Check for buzzword abuse
    buzzwords = ["expert", "passionate", "synergy", "hardworking", "leader", "pioneer", "motivated", "detail-oriented"]
    detected_buzzwords = [b for b in buzzwords if b in skills_text or b in resume_data.get("raw_text", "").lower()]
    if len(detected_buzzwords) >= 3:
        red_flags.append(f"🚩 Buzzword Soup detected ({', '.join(detected_buzzwords)}) — Stop writing dictionary words, show actual code!")
        
    # Tutorial syndrome condition: certificates/courses listed but barely any projects
    has_certs = "certif" in resume_data.get("raw_text", "").lower() or "course" in resume_data.get("raw_text", "").lower()
    tutorial_syndrome = has_certs and not has_projects
    if tutorial_syndrome:
        red_flags.append("🚩 Tutorial Syndrome Detected — 48 Udemy courses, 0 actual applications.")

    # Calculate subscores
    skill_authenticity = random.randint(40, 70) if len(detected_buzzwords) >= 2 else random.randint(70, 95)
    project_strength = random.randint(60, 90) if has_projects else random.randint(10, 30)
    employability = int((project_strength * 0.4) + (skill_authenticity * 0.3) + (60 if has_exp else 20) * 0.3)
    recruiter_interest = max(20, employability - random.randint(5, 15))
    resume_quality = random.randint(50, 85)
    internship_readiness = random.randint(55, 90) if has_exp else random.randint(20, 50)
    portfolio_strength = random.randint(60, 95) if has_github else random.randint(10, 40)
    
    overall_score = int((employability + resume_quality + project_strength) / 3)
    
    # Determine chappal, roast intensity, and emotion state
    if overall_score < 40:
        emotion_state = "nuclear"
        roast_intensity = "Nuclear Sharma Aunty Mode"
        chappal_threat_level = 5
        opening_line = f"Aiyyo, {name}! I opened this PDF and my blood pressure shot up faster than your grade point average! Absolutely nuclear level of disappointment!"
    elif overall_score < 60:
        emotion_state = "furious"
        roast_intensity = "Emotional Damage"
        chappal_threat_level = 4
        opening_line = f"Oh ho, {name}. What have you been doing for four years in college? Watching reels and copying repository URLs? Massive emotional damage!"
    elif overall_score < 75:
        emotion_state = "disappointed"
        roast_intensity = "Typical Sharma Aunty"
        chappal_threat_level = 3
        opening_line = f"Beta {name}, I expected a resume, not an empty grocery shopping list. One eyebrow is raised in typical disappointment."
    else:
        emotion_state = "concerned"
        roast_intensity = "Mild Judgment"
        chappal_threat_level = 2
        opening_line = f"Accha beta, this is actually... not terrible? Let me check if you hired someone else to write this. Mild judgment remains."

    # Dynamic section analysis
    section_analyses = []
    
    # 1. Skills Section
    if has_skills:
        section_analyses.append({
            "name": "Skills",
            "roast": f"You wrote '{skills_text.split(',')[0] if ',' in skills_text else 'Programming'}' but I know you only watched a 10-hour crash course at 2x speed.",
            "damage": "💀 Even local shopkeepers use Excel better than your alleged programming expertise.",
            "fix": "📈 Pick ONE language, delete 8 other buzzwords, and build a system that actually writes data to a database.",
            "potential": "🏆 A streamlined set of 4 core skills backed by concrete GitHub code, not dictionary definitions."
        })
    else:
        section_analyses.append({
            "name": "Skills",
            "roast": "This skills section is emptier than your relatives' compliments on your graduation day.",
            "damage": "💀 Recruiters will skim past this faster than you swipe past YouTube ads.",
            "fix": "📈 List actual frameworks and languages you have compiled code in. Even HTML/CSS counts, beta!",
            "potential": "🏆 A solid block of technologies that shows you actually attended classes."
        })
        
    # 2. Projects Section
    if has_projects:
        section_analyses.append({
            "name": "Projects",
            "roast": "A 'To-Do App' and a 'Weather App'? What next, a Calculator? You are trying to solve problems that were solved in 1995!",
            "damage": "💀 Sharma Ji's Son built an automated drone irrigation system, and you are checking if it is raining in Seattle.",
            "fix": "📈 Merge these minor assignments. Build a real-world system with user authentication and payment mocks.",
            "potential": "🏆 A robust portfolio featuring full-stack applications with active databases and actual deployment links."
        })
    else:
        section_analyses.append({
            "name": "Projects",
            "roast": "No projects listed? What were you doing in the labs? Eating samosas and making reels?",
            "damage": "💀 You have exactly 0 evidence that you can type code without a tutorial showing you what to do.",
            "fix": "📈 Build one fully functional API backend this week using Python or Node.js. Document it in a clean README.",
            "potential": "🏆 Highlight a primary system that solves a real business problem, complete with architecture diagrams."
        })

    # 3. Experience Section
    if has_exp:
        section_analyses.append({
            "name": "Experience",
            "roast": "This internship description is so vague I cannot tell if you worked at a tech firm or did the office tea delivery.",
            "damage": "💀 'Assisted with development' means you sat in the corner and nodded during Zoom calls.",
            "fix": "📈 Use metrics! 'Improved API response speed by 15% using Redis caching' sounds ten times better.",
            "potential": "🏆 Quantified achievements that prove you are a business asset, not an office tourist."
        })
    else:
        section_analyses.append({
            "name": "Experience",
            "roast": "Zero professional experience. You are fresher than the organic vegetables I buy in the morning market.",
            "damage": "💀 HR managers will look at this and wonder why they should pay you to learn basic Git commands.",
            "fix": "📈 Apply for open-source contributions or do unpaid work for local businesses to add real-world items.",
            "potential": "🏆 Clean contract listings showing you have worked under a deadline and pushed code to production."
        })

    # Sharma Ji's Son comparison points
    sharma_ji_son_comparison = [
        {"user": "Added 'AI Expert' after loading a pre-trained model once", "sharma_son": "Authored a custom neural net paper in IEEE journal"},
        {"user": f"{len(red_flags)} critical flags on resume", "sharma_son": "Secured 3 pre-placement offers before final semester"},
        {"user": "Created VS Code folder, watched 48 coding playlists", "sharma_son": "200+ commits, maintains active packages on npm/PyPI"},
        {"user": "Half-finished todo list app with static JSON", "sharma_son": "Contributed core patches to Postgres and Linux kernel"}
    ]
    
    # Family functions predicted questions
    family_function_questions = [
        {"question": "Beta, package kitna laga?", "probability": 98 if overall_score < 70 else 85},
        {"question": "Is there any government exam you are preparing for?", "probability": 90 if overall_score < 80 else 60},
        {"question": "Sharma Ji's son just got a promotion. When is your company giving one?", "probability": 95},
        {"question": "MBA or Masters karne ka plan kab hai?", "probability": 75 if overall_score < 75 else 50}
    ]

    # Generate precisely 8 dynamic, highly specific mock memes tailored to user's flaws
    memes = [
        {
            "template": "drake",
            "top_text": "4 Udemy course certificates",
            "bottom_text": "Bhai tera unique project kahan hai",
            "damage_level": "Criminal"
        },
        {
            "template": "distracted_boyfriend",
            "top_text": "Me: watching 100th coding playlist",
            "bottom_text": "Instead of compiling actual database tables",
            "damage_level": "Brutal"
        },
        {
            "template": "this_is_fine",
            "top_text": "No projects and empty GitHub grid",
            "bottom_text": "Writing 'Quick Learner' on resume",
            "damage_level": "Call Police"
        },
        {
            "template": "galaxy_brain",
            "top_text": "Added 'Expert AI Engineer' to bio",
            "bottom_text": "Bhai ne API key load ki bas",
            "damage_level": "Brutal"
        },
        {
            "template": "coffin_dance",
            "top_text": "Recruiter asks for internship proof",
            "bottom_text": "Aiyyo! Clean blank page in resume",
            "damage_level": "Criminal"
        },
        {
            "template": "gru_plan",
            "top_text": "Listed 'Team player with leadership'",
            "bottom_text": "Beta tu toh WhatsApp group mein mute hai",
            "damage_level": "Mild"
        },
        {
            "template": "woman_cat",
            "top_text": "Recruiter: Show me deployed link",
            "bottom_text": "Candidate: Runs on my localhost",
            "damage_level": "Brutal"
        },
        {
            "template": "sharma_aunty_custom",
            "top_text": "Says 'Highly motivated to study'",
            "bottom_text": "Beta, tu toh video games khelta hai",
            "damage_level": "Brutal"
        }
    ]

    # Daily Recovery checklist
    recovery_plan = {
        "week1": [
            "Purge the word 'passionate' and all vague skills from your resume header.",
            "Format the resume into a clean, single-column ATS-friendly template.",
            "Find and add your active GitHub and LinkedIn profile links to the top contact card.",
            "Rewrite your project bullet points starting each with strong action verbs (Built, Improved, Led).",
            "Add at least 3 quantified metrics (percentages, database sizes, or user load values) to your descriptions."
        ],
        "week2": [
            "Design a database schema for a multi-user marketplace or booking portal.",
            "Code a complete REST API using python-fastapi or node-express with full database integration.",
            "Deploy the project on Render or Vercel, ensuring all environment variables are safely managed."
        ],
        "week3": [
            "Commit all your active projects to public repositories with descriptive git commit messages.",
            "Write a pristine README.md for your top repository, complete with screenshots and quick-start instructions.",
            "Pin your best 3 repositories to your GitHub profile and add a summary bio."
        ],
        "week4": [
            "Optimize your LinkedIn profile photo (no selfies, professional background) and headline.",
            "Write a concise post detailing your newly completed full-stack project, tagging key creators.",
            "Join 3 active developer groups and comment constructive insights on engineering posts.",
            "Send personalized connection requests to 5 recruiters with a 3-sentence message showing your deployed project.",
            "Complete 2 mock technical interviews on free sites to practice coding aloud under pressure."
        ]
    }
    
    closing_line = f"Sigh... I only say all this because I want to see you succeed, beta. Now close this dashboard, delete your social apps, and start compiling some actual code!"

    return {
        "overall_score": overall_score,
        "roast_intensity": roast_intensity,
        "emotion_state": emotion_state,
        "opening_line": opening_line,
        "sections": section_analyses,
        "sharma_ji_son_comparison": sharma_ji_son_comparison,
        "family_function_questions": family_function_questions,
        "red_flags": red_flags,
        "tutorial_syndrome_detected": tutorial_syndrome,
        "chappal_threat_level": chappal_threat_level,
        "scores": {
            "employability": employability,
            "recruiter_interest": recruiter_interest,
            "resume_quality": resume_quality,
            "project_strength": project_strength,
            "skill_authenticity": skill_authenticity,
            "internship_readiness": internship_readiness,
            "portfolio_strength": portfolio_strength
        },
        "memes": memes,
        "recovery_plan": recovery_plan,
        "closing_line": closing_line
    }
