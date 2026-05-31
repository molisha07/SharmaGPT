import re
import os
import logging
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

# Basic headers mapping for section identification
SECTION_HEADERS = {
    "skills": ["skills", "technical skills", "technologies", "expertise", "core competencies", "tools"],
    "experience": ["experience", "work experience", "employment", "professional experience", "professional background", "internships", "internship"],
    "projects": ["projects", "personal projects", "academic projects", "key projects", "independent projects"],
    "education": ["education", "academic qualification", "academic background", "qualifications", "credentials"],
    "certifications": ["certifications", "certificates", "licenses", "courses", "achievements", "awards"]
}

def extract_metadata_and_sections(raw_text: str) -> Dict[str, Any]:
    """
    Parses raw resume text to extract links, contact details, and split text into structural blocks.
    """
    lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
    
    # 1. Regex search for contact & links
    email_regex = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_regex = r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    github_regex = r'(?:https?://)?(?:www\.)?github\.com/[a-zA-Z0-9_-]+'
    linkedin_regex = r'(?:https?://)?(?:www\.)?linkedin\.com/in/[a-zA-Z0-9_-]+'
    
    emails = re.findall(email_regex, raw_text)
    phones = re.findall(phone_regex, raw_text)
    githubs = re.findall(github_regex, raw_text)
    linkedins = re.findall(linkedin_regex, raw_text)
    
    email = emails[0] if emails else ""
    phone = phones[0] if phones else ""
    github = githubs[0] if githubs else ""
    linkedin = linkedins[0] if linkedins else ""
    
    # Guess candidate name (usually in the first 2 non-empty lines)
    candidate_name = "Candidate"
    for line in lines[:3]:
        # Exclude typical headers/contact info
        if "@" not in line and "phone" not in line.lower() and "resume" not in line.lower() and len(line) < 35:
            candidate_name = line
            break

    # 2. Section segmenter
    sections: Dict[str, List[str]] = {
        "summary": [],
        "skills": [],
        "experience": [],
        "projects": [],
        "education": [],
        "certifications": []
    }
    
    current_section = "summary"
    
    for line in lines:
        lower_line = line.lower().strip(":- ")
        # Check if line matches any section headers
        matched = False
        for sec, synonyms in SECTION_HEADERS.items():
            if lower_line in synonyms or any(lower_line == syn for syn in synonyms):
                current_section = sec
                matched = True
                break
        
        if not matched:
            sections[current_section].append(line)
            
    # Combine sections into raw strings
    structured_data = {
        "name": candidate_name,
        "email": email,
        "phone": phone,
        "github": github,
        "linkedin": linkedin,
        "sections": {k: "\n".join(v).strip() for k, v in sections.items()},
        "raw_text": raw_text
    }
    
    return structured_data
