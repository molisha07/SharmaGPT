import React from 'react'
import { motion } from 'framer-motion'
import { FaFlag, FaAward } from 'react-icons/fa'

export default function RedFlagCards({ redFlags = [], tutorialSyndromeDetected = false }) {
  // Safe stubs fallback
  const flags = redFlags.length > 0 ? redFlags : [
    "🚩 No portfolio website listed — Coding in the dark.",
    "🚩 Empty GitHub contributions grid — Hiding code or hiding shame?",
    "🚩 Missing quantified metrics — 'Improved page loading speed' by how much? 1 millisecond?"
  ]

  // Animation variants for bouncing lists
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardItem = {
    hidden: { scale: 0.7, y: 30, opacity: 0 },
    show: { 
      scale: 1, 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* 1. Tutorial Syndrome Warning Card */}
      {tutorialSyndromeDetected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="duo-card border-accent bg-red-50 p-6 md:p-8 text-center animate-pulse-slow relative overflow-hidden"
        >
          {/* Sarcastic Badge decoration */}
          <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-24 h-24 bg-yellow-400 border-4 border-dark rotate-12 flex items-center justify-center font-black text-xs text-dark shadow-md select-none">
            CHAMPION 🩴
          </div>

          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="p-4 bg-accent text-white border-3 border-dark rounded-full animate-bounce">
              <FaAward size={36} />
            </div>
            
            <h3 className="text-3xl font-display font-black text-accent uppercase tracking-wide">
              🏆 Tutorial Syndrome Detected!
            </h3>
          </div>

          <p className="text-xl font-bold font-roast text-dark mb-4">
            "Congratulations, Beta! You are a world-class YouTube playlist watcher!"
          </p>

          <p className="text-gray-600 font-semibold text-sm max-w-xl mx-auto">
            You have loaded certificates from courses, but completed exactly ZERO unique projects. 
            HR bots will look at this and classify you as an 'Expert Video Viewer' rather than a software engineer. 
            Delete your course credentials and write one real database table this week!
          </p>
        </motion.div>
      )}

      {/* 2. List of Detected Red Flags */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-display font-black text-dark uppercase tracking-wider flex items-center justify-center gap-2">
            <FaFlag className="text-accent" /> Resume Red Flags
          </h3>
          <p className="text-gray-500 font-bold text-sm">
            Critical issues detected in your life blueprint:
          </p>
        </div>

        <motion.div 
          variants={listContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {flags.map((flag, idx) => (
            <motion.div
              key={idx}
              variants={cardItem}
              className="duo-card border-accent bg-white p-4 flex items-start gap-3 hover:bg-red-50/10"
            >
              <div className="text-accent text-xl mt-0.5 select-none font-bold">🚩</div>
              <p className="font-bold text-sm sm:text-base text-dark">
                {flag.replace('🚩', '').trim()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
