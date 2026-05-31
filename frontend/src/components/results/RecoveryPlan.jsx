import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import confetti from 'canvas-confetti'

export default function RecoveryPlan({ recoveryPlan = {} }) {
  const [activeWeek, setActiveWeek] = useState(1)
  const [completedTasks, setCompletedTasks] = useState({})

  // Format plan weeks
  const weeks = [
    { id: 1, label: "Week 1: Resume Cleansing", key: "week1", color: "border-primary text-primary" },
    { id: 2, label: "Week 2: Heavy Building", key: "week2", color: "border-success text-success" },
    { id: 3, label: "Week 3: GitHub Polishing", key: "week3", color: "border-blue-500 text-blue-500" },
    { id: 4, label: "Week 4: Recruiter Baiting", key: "week4", color: "border-purple-500 text-purple-500" }
  ]

  // Default tasks fallback
  const plan = {
    week1: recoveryPlan.week1 || [
      "Purge words like 'passionate' and 'expert' from your profile introduction.",
      "Convert double-column formats to a clean single-column ATS structure.",
      "Plug links for both active GitHub and LinkedIn cards next to your name.",
      "Revise project summaries starting each with a strong active verb.",
      "Introduce 3 quantified metrics (percentages, lines processed, or loads)."
    ],
    week2: recoveryPlan.week2 || [
      "Draft a complete database schema for a multi-user API system.",
      "Write a backend in Node or Python, supporting JWT authentication.",
      "Deploy the fully configured API to Render or Vercel safely."
    ],
    week3: recoveryPlan.week3 || [
      "Upload all your active project folders as public git repositories.",
      "Draft a comprehensive, detailed README.md complete with run guides.",
      "Pin your best 3 repositories and clear out dummy project files."
    ],
    week4: recoveryPlan.week4 || [
      "Update your LinkedIn avatar (no casual crop photos) and banner.",
      "Write a short post detailing your Week 2 full-stack API deployment.",
      "Connect with 5 local industry creators and review their posts.",
      "Direct message 5 recruiters with a brief, friendly, 3-sentence summary.",
      "Run 2 mock coding interviews using online simulator templates."
    ]
  }

  const toggleTask = (weekKey, idx) => {
    const taskKey = `${weekKey}-${idx}`
    const isNowCompleted = !completedTasks[taskKey]
    
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: isNowCompleted
    }))

    // Celebrate with confetti if completed!
    if (isNowCompleted) {
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#FF6B00', '#FFD600', '#06D6A0']
      })
    }
  }

  // Calculate total completed percentage
  const totalTasks = Object.keys(plan).reduce((acc, k) => acc + plan[k].length, 0)
  const completedCount = Object.keys(completedTasks).filter(k => completedTasks[k]).length
  const progressPercent = Math.round((completedCount / totalTasks) * 100) || 0

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-display font-black text-dark uppercase tracking-wider">
          30-Day Resume Recovery Mode™
        </h3>
        <p className="text-gray-500 font-bold text-sm">
          "Aunty's prescriptive blueprint. Follow this or face eternal wedding function shame."
        </p>
      </div>

      {/* Progress tracking banner */}
      <div className="duo-card bg-white p-5 flex items-center justify-between gap-4">
        <div>
          <h4 className="font-display text-xl text-dark">Plan Completion Progress</h4>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">
            {completedCount} of {totalTasks} tasks completed
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-black font-mono text-success">
            {progressPercent}%
          </span>
          <div className="w-24 bg-cream border-2 border-dark rounded-full h-3 overflow-hidden p-0.5 relative mt-1">
            <div className="bg-success h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Accordion weeks tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {weeks.map(week => (
          <button
            key={week.id}
            onClick={() => setActiveWeek(week.id)}
            className={`px-4 py-2 text-sm sm:text-base border-3 border-dark rounded-xl font-display font-bold transition-all shadow-[2px_2px_0px_#1A1A2E] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1A1A2E]
              ${activeWeek === week.id ? 'bg-dark text-white' : 'bg-white text-dark hover:bg-orange-50/20'}
            `}
          >
            Week {week.id}
          </button>
        ))}
      </div>

      {/* Tasks listing area */}
      <div className="duo-card bg-white p-5 min-h-[300px]">
        {weeks.map(week => {
          if (week.id !== activeWeek) return null
          const taskList = plan[week.key]
          
          return (
            <motion.div
              key={week.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h4 className={`text-xl font-display font-black border-b-3 border-dark pb-2 mb-4 flex items-center justify-between`}>
                <span>{week.label}</span>
                <span className="text-xs bg-cream border-2 border-dark px-2.5 py-0.5 rounded-full text-dark font-black">
                  {taskList.length} Days
                </span>
              </h4>

              <div className="space-y-3">
                {taskList.map((task, idx) => {
                  const isDone = completedTasks[`${week.key}-${idx}`]
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTask(week.key, idx)}
                      className={`flex items-start gap-4 p-4 border-2 border-dark rounded-2xl cursor-pointer select-none transition-all hover:translate-x-0.5
                        ${isDone ? 'bg-emerald-50/20 border-success opacity-85' : 'bg-cream hover:bg-orange-50/10'}
                      `}
                    >
                      <button className={`mt-0.5 text-xl transition-colors ${isDone ? 'text-success' : 'text-gray-400'}`}>
                        {isDone ? <FaCheckCircle /> : <FaRegCircle />}
                      </button>
                      <span className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-gray-400 font-semibold' : 'text-dark'}`}>
                        {task}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
