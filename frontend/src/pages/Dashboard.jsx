import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, AnalysisContext } from '../App'
import { FaGraduationCap, FaHistory, FaTrophy, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'
import confetti from 'canvas-confetti'

const BADGES = [
  { id: 'first_roast', title: "Roast Survivor", desc: "Successfully survived your first brutal roast.", icon: "🏅", condition: "Completed 1 analysis" },
  { id: 'chappal_avoided', title: "Chappal Avoided", desc: "Scored above 60% and dodged the flying sandal.", icon: "🩴", condition: "Score > 60%" },
  { id: 'sharma_approved', title: "Sharma Ji Approved", desc: "Scored above 80%. Relatives are completely silent.", icon: "👑", condition: "Score > 80%" },
  { id: 'recruiter_ready', title: "Recruiter Ready", desc: "Employability index surpassed 75%.", icon: "💼", condition: "Employability > 75%" },
  { id: 'family_safe', title: "Family Function Safe", desc: "Family function survival score > 70%.", icon: "🛡️", condition: "Survival > 70%" }
]

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const { setAnalysisResult } = useContext(AnalysisContext)
  const [history, setHistory] = useState([])
  const [unlockedBadges, setUnlockedBadges] = useState([])

  useEffect(() => {
    // Load history from local storage
    const storedHistory = JSON.parse(localStorage.getItem('sharmagpt_history') || '[]')
    setHistory(storedHistory)

    // Calculate badges based on history
    const unlocked = []
    if (storedHistory.length > 0) {
      unlocked.push('first_roast')
      
      const highestScore = Math.max(...storedHistory.map(h => h.overall_score))
      if (highestScore > 60) unlocked.push('chappal_avoided')
      if (highestScore > 80) unlocked.push('sharma_approved')
      
      // Look at cached details for secondary scores if any
      const lastReport = JSON.parse(localStorage.getItem('sharmagpt_last_report') || '{}')
      if (lastReport.scores?.employability > 75) unlocked.push('recruiter_ready')
      
      const lastSurvival = lastReport.family_function_questions?.[0]?.probability || 0
      if (lastSurvival < 30) unlocked.push('family_safe') // Safe if probability of packages questions is low
    }
    setUnlockedBadges(unlocked)

    // Surprise trigger celebrate if multiple badges unlocked
    if (unlocked.length >= 3) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      })
    }
  }, [])

  const loadPastReport = (recordId) => {
    // If they click on a past roast, restore from cache and view it!
    const lastReport = JSON.parse(localStorage.getItem('sharmagpt_last_report') || '{}')
    setAnalysisResult(lastReport)
  }

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      {/* 1. Header Profile Banner */}
      <div className="duo-card bg-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-4xl font-display font-black text-dark tracking-tight uppercase">
            Beta {user?.name || 'Candidate'}'s Profile
          </h2>
          <p className="text-gray-500 font-bold text-sm">
            Registered: {user?.email || 'guest@sharmagpt.com'} • Total roasts parsed: {history.length}
          </p>
        </div>

        <Link
          to="/upload"
          className="px-6 py-3.5 bg-primary text-white font-display text-lg font-black duo-btn rounded-2xl"
        >
          Re-Analyze Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 2. Unlocked Achievements / Badges Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="duo-card bg-white p-6">
            <h3 className="text-2xl font-display font-black text-dark mb-4 uppercase tracking-wider flex items-center gap-2">
              <FaTrophy className="text-secondary" /> Unlocked Achievements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES.map(badge => {
                const isUnlocked = unlockedBadges.includes(badge.id)
                return (
                  <div
                    key={badge.id}
                    className={`p-4 border-2 border-dark rounded-2xl flex gap-3 transition-all select-none
                      ${isUnlocked ? 'bg-orange-50/10 border-primary' : 'bg-cream opacity-55 border-dashed'}
                    `}
                  >
                    <span className="text-4xl">{isUnlocked ? badge.icon : "🔒"}</span>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-dark">{badge.title}</h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {badge.desc}
                      </p>
                      <span className="text-[10px] text-primary font-mono font-black uppercase mt-1 inline-block">
                        {badge.condition}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 3. Historical Reports Grid */}
        <div className="lg:col-span-5 space-y-6">
          <div className="duo-card bg-white p-6">
            <h3 className="text-2xl font-display font-black text-dark mb-4 uppercase tracking-wider flex items-center gap-2">
              <FaHistory className="text-primary" /> Past Damage Reports
            </h3>

            {history.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-bold font-roast">
                "No past roasts. You have avoided disappointment so far... suspicious."
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((record) => (
                  <Link
                    key={record.id}
                    to="/results"
                    onClick={() => loadPastReport(record.id)}
                    className="flex justify-between items-center p-4 bg-cream border-2 border-dark rounded-2xl hover:bg-orange-50/20 hover:translate-x-0.5 transition-all group"
                  >
                    <div className="space-y-0.5 text-left">
                      <h4 className="font-bold text-dark truncate max-w-[200px]">
                        📄 {record.fileName}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                        <FaCalendarAlt size={10} /> {record.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-lg font-black text-dark font-mono">
                          {record.overall_score}%
                        </span>
                        <p className="text-[9px] uppercase font-extrabold text-accent">
                          Disappointment
                        </p>
                      </div>
                      <FaChevronRight className="text-gray-400 group-hover:text-primary transition-colors" size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
