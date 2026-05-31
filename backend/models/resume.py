from pydantic import BaseModel
from typing import Dict, Optional

class ResumeData(BaseModel):
    name: str
    email: str
    phone: str
    github: str
    linkedin: str
    sections: Dict[str, str]
    raw_text: str
