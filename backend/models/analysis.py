from pydantic import BaseModel, Field
from typing import List, Dict, Any

class ScoreBreakdown(BaseModel):
    employability: int
    recruiter_interest: int
    resume_quality: int
    project_strength: int
    skill_authenticity: int
    internship_readiness: int
    portfolio_strength: int

class SectionAnalysis(BaseModel):
    name: str = Field(description="Name of the section e.g. Skills, Projects, Experience, etc.")
    roast: str = Field(description="🔥 Savage, specific, funny criticism of this section")
    damage: str = Field(description="💀 Dramatic one-liner consequence or emotional damage")
    fix: str = Field(description="📈 Concrete, actionable step to fix this week")
    potential: str = Field(description="🏆 What this section could become if optimized")

class ComparisonPoint(BaseModel):
    user: str = Field(description="User's stat or action e.g., '1 half-finished project'")
    sharma_son: str = Field(description="Sharma Ji's Son's superior stat e.g., '3 open-source contributions'")

class ComparisonData(BaseModel):
    items: List[ComparisonPoint]

class FamilyQuestion(BaseModel):
    question: str = Field(description="A typical dynamic question e.g., 'Beta package kitna hai?'")
    probability: int = Field(description="Percentage probability (0-100) of being asked")

class MemeItem(BaseModel):
    template: str = Field(description="Meme template name: drake | distracted_boyfriend | this_is_fine | galaxy_brain | coffin_dance | gru_plan | woman_cat | sharma_aunty_custom")
    top_text: str = Field(description="Setup delusion caption")
    bottom_text: str = Field(description="Brutal reality punchline caption")
    damage_level: str = Field(description="💀 Damage level rating: Mild | Brutal | Criminal | Call Police")

class RecoveryPlan(BaseModel):
    week1: List[str] = Field(description="Week 1: Resume cleanup daily tasks (5 items)")
    week2: List[str] = Field(description="Week 2: Project building checklist (3 items)")
    week3: List[str] = Field(description="Week 3: GitHub improvement guide (3 items)")
    week4: List[str] = Field(description="Week 4: LinkedIn & portfolio optimization (5 items)")

class AnalysisResult(BaseModel):
    overall_score: int
    roast_intensity: str = Field(description="'Mild Judgment' | 'Typical Sharma Aunty' | 'Emotional Damage' | 'Nuclear Sharma Aunty Mode'")
    emotion_state: str = Field(description="'happy' | 'concerned' | 'suspicious' | 'disappointed' | 'furious' | 'nuclear'")
    opening_line: str
    sections: List[SectionAnalysis]
    sharma_ji_son_comparison: List[ComparisonPoint]
    family_function_questions: List[FamilyQuestion]
    red_flags: List[str]
    tutorial_syndrome_detected: bool
    chappal_threat_level: int = Field(description="1 to 5 level of threat")
    scores: ScoreBreakdown
    memes: List[MemeItem]
    recovery_plan: RecoveryPlan
    closing_line: str
