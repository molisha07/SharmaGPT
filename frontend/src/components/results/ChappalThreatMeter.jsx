import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const THREAT_LABELS = [
  "Safe (For now...)",
  "Mild Concern (Aunty is reaching out)",
  "Chappal Equipped (Danger zone)",
  "Flying Chappal Detected (Inbound trajectory)",
  "Seek Immediate Shelter (Nuclear impact imminent)"
]

export default function ChappalThreatMeter({ level = 1 }) {
  // Safe bounds check
  const activeLevel = Math.min(Math.max(1, level), 5)

  // Trigger strike event automatically on load if level is dangerous
  useEffect(() => {
    if (activeLevel >= 4) {
      const timer = setTimeout(() => {
        // Dispatch the flying chappal custom event
        window.dispatchEvent(new Event('sharmagpt_chappal_strike'))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [activeLevel])

  const triggerManualStrike = () => {
    window.dispatchEvent(new Event('sharmagpt_chappal_strike'))
  }

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="duo-card bg-white p-6 text-center max-w-md mx-auto"
    >
      <h3 className="text-2xl font-display font-black text-dark mb-4 uppercase tracking-wider">
        Chappal Threat Meter™
      </h3>

      {/* Grid of 5 Sandals */}
      <div className="flex justify-center items-center gap-3 mb-5">
        {[1, 2, 3, 4, 5].map((idx) => {
          const isActive = idx <= activeLevel
          const isExtreme = idx >= 4 && activeLevel >= 4
          
          return (
            <motion.div
              key={idx}
              animate={isExtreme ? { 
                rotate: [0, -10, 10, -10, 10, 0],
                y: [0, -2, 2, -2, 2, 0]
              } : {}}
              transition={isExtreme ? { repeat: Infinity, duration: 0.4 } : {}}
              className={`w-12 h-20 rounded-2xl border-3 border-dark flex items-center justify-center relative cursor-pointer select-none
                ${isActive ? 'bg-accent text-white shadow-[2px_2px_0px_#1A1A2E]' : 'bg-cream text-gray-300 opacity-60'}
              `}
              title={`Level ${idx}: ${THREAT_LABELS[idx-1]}`}
              onClick={triggerManualStrike}
            >
              {/* Sarcastic sandal representation */}
              <svg viewBox="0 0 40 70" className="w-8 h-16">
                <ellipse cx="20" cy="35" rx="14" ry="28" fill={isActive ? "#FFD600" : "#E5E7EB"} stroke="#1A1A2E" strokeWidth="2" />
                <path d="M 20 28 L 8 48 M 20 28 L 32 48" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="20" cy="28" r="4.5" fill="#E63946" />
              </svg>
              
              <span className="absolute bottom-1 right-1.5 font-mono text-[9px] font-black text-dark">
                L{idx}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Text Label */}
      <div className="p-3 border-3 border-dark rounded-xl bg-orange-50 inline-block max-w-full">
        <p className="font-display text-lg font-bold text-accent truncate">
          ⚠️ Level {activeLevel}: {THREAT_LABELS[activeLevel - 1]}
        </p>
      </div>

      {activeLevel >= 4 && (
        <div className="mt-4">
          <button
            onClick={triggerManualStrike}
            className="px-5 py-2.5 bg-accent text-white font-display font-bold duo-btn rounded-xl text-sm"
          >
            Launch Chappal Strike 🩴
          </button>
        </div>
      )}
    </motion.div>
  )
}
