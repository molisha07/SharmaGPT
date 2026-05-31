import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaUserTie, FaCheckDouble, FaCode, FaCertificate, FaBriefcase, FaFolderOpen } from 'react-icons/fa'

// Helper hook for animating counts from 0 to target
function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value, 10) || 0
    if (start === end) return

    const totalMiliseconds = duration * 1000
    const stepTime = Math.abs(Math.floor(totalMiliseconds / end))
    
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) {
        clearInterval(timer)
      }
    }, Math.max(stepTime, 15))

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{count}</span>
}

export default function EmotionalDamageReport({ scores = {}, overallScore = 0 }) {
  // Map scores metadata for nice representations
  const scoreKeys = [
    { key: 'employability', label: 'Employability Score', icon: <FaGraduationCap />, color: 'bg-emerald-500', text: 'text-emerald-500' },
    { key: 'recruiter_interest', label: 'Recruiter Interest', icon: <FaUserTie />, color: 'bg-indigo-500', text: 'text-indigo-500' },
    { key: 'resume_quality', label: 'Resume Quality', icon: <FaCheckDouble />, color: 'bg-blue-500', text: 'text-blue-500' },
    { key: 'project_strength', label: 'Project Strength', icon: <FaCode />, color: 'bg-primary', text: 'text-primary' },
    { key: 'skill_authenticity', label: 'Skill Authenticity', icon: <FaCertificate />, color: 'bg-yellow-500', text: 'text-yellow-600' },
    { key: 'internship_readiness', label: 'Internship Readiness', icon: <FaBriefcase />, color: 'bg-purple-500', text: 'text-purple-500' },
    { key: 'portfolio_strength', label: 'Portfolio Strength', icon: <FaFolderOpen />, color: 'bg-pink-500', text: 'text-pink-500' },
  ]

  // Category labels based on overall score
  const getDisappointmentCategory = (score) => {
    if (score <= 20) return { title: "Failure Detected", description: "Sharma Aunty is booking your counseling session.", bg: "bg-red-600" }
    if (score <= 40) return { title: "Relatives Preparing Questions", description: "Wedding functions will be dangerous for you.", bg: "bg-accent" }
    if (score <= 60) return { title: "Some Hope Remains", description: "Start studying instead of reading memes, beta.", bg: "bg-yellow-600" }
    if (score <= 80) return { title: "Mother Slightly Impressed", description: "Still room for disappointment, but acceptable.", bg: "bg-emerald-500" }
    return { title: "Sharma Ji Sweating", description: "Wait... did you copy this from Sharma Ji's son?", bg: "bg-success" }
  }

  const category = getDisappointmentCategory(overallScore)

  return (
    <div className="space-y-8">
      {/* 1. Main Emotional Damage Meter Gauge */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="duo-card bg-white p-6 md:p-8 text-center"
      >
        <h3 className="text-2xl font-display font-black text-dark mb-4 uppercase tracking-wider">
          Emotional Damage Meter™
        </h3>
        
        {/* Radial gauge representation */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-4">
          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Outer track circle */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="8" />
            {/* Active percentage score circle */}
            <motion.circle 
              cx="50" cy="50" r="40" fill="transparent" 
              stroke={overallScore > 60 ? "#06D6A0" : "#E63946"} 
              strokeWidth="8"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * overallScore) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Inner Counter Text */}
          <div className="text-center z-10">
            <span className="text-5xl font-black text-dark font-mono">
              <AnimatedCounter value={overallScore} />
            </span>
            <span className="text-2xl font-black text-gray-400 font-mono">%</span>
            <p className="text-xs uppercase font-extrabold text-gray-500 mt-0.5 tracking-wider">Overall Score</p>
          </div>
        </div>

        {/* Dynamic Badge Category */}
        <div className="inline-block mt-2">
          <span className={`px-5 py-2 text-white font-display text-lg font-bold rounded-2xl border-3 border-dark shadow-[3px_3px_0px_#1A1A2E] ${category.bg}`}>
            {category.title}
          </span>
        </div>
        <p className="text-gray-500 font-bold mt-4 text-sm max-w-md mx-auto">
          "{category.description}"
        </p>
      </motion.div>

      {/* 2. Grid of 7 Score Cards */}
      <div>
        <h3 className="text-2xl font-display font-black text-dark mb-4 text-center uppercase tracking-wider">
          Emotional Damage Report™
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scoreKeys.map((item, idx) => {
            const scoreVal = scores[item.key] || 0
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="duo-card bg-white p-5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-3 rounded-xl border-2 border-dark text-white ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className={`text-3xl font-black font-mono ${item.text}`}>
                    <AnimatedCounter value={scoreVal} />%
                  </span>
                </div>
                
                <div>
                  <h4 className="text-lg font-display font-bold text-dark">{item.label}</h4>
                  
                  {/* Miniature progress bar */}
                  <div className="w-full bg-cream border-2 border-dark rounded-full h-4 overflow-hidden mt-3 relative p-0.5">
                    <div 
                      className={`h-full border-1 border-dark rounded-full ${item.color}`}
                      style={{ width: `${scoreVal}%`, transition: 'width 1.5s ease-out' }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
