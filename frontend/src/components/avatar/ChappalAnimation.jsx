import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChappalAnimation() {
  const [isStriking, setIsStriking] = useState(false)

  useEffect(() => {
    const handleStrike = () => {
      if (!isStriking) {
        setIsStriking(true)
        // Reset after animation completes (1.5 seconds)
        setTimeout(() => {
          setIsStriking(false)
        }, 1500)
      }
    }

    window.addEventListener('sharmagpt_chappal_strike', handleStrike)
    return () => {
      window.removeEventListener('sharmagpt_chappal_strike', handleStrike)
    }
  }, [isStriking])

  return (
    <AnimatePresence>
      {isStriking && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Sarcastic WARNING indicator on screen border */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-accent text-white border-4 border-dark px-6 py-2 rounded-xl shadow-lg flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wider animate-bounce"
          >
            ⚠️ INCOMING CHAPPAL DETECTED! TAKE SHELTER! ⚠️
          </motion.div>

          {/* The flying chappal itself (drawn beautifully using pure CSS & SVG) */}
          <motion.div
            initial={{ 
              x: '-20vw', 
              y: '100vh', 
              rotate: 0,
              scale: 0.8
            }}
            animate={{ 
              x: '120vw', 
              y: '-20vh', 
              rotate: 1440,
              scale: [0.8, 1.5, 1.2, 0.7]
            }}
            transition={{ 
              duration: 1.4, 
              ease: 'easeOut'
            }}
            className="absolute w-32 h-48 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]"
          >
            {/* SVG Sandal/Chappal representation */}
            <svg viewBox="0 0 100 150" className="w-full h-full">
              {/* Sole (Brown base) */}
              <ellipse cx="50" cy="85" rx="32" ry="60" fill="#8B4513" stroke="#1A1A2E" strokeWidth="4" />
              {/* Inner padding layer */}
              <ellipse cx="50" cy="85" rx="27" ry="54" fill="#CD853F" />
              {/* Strap (Y-shape) */}
              <path d="M 50 65 L 20 120 M 50 65 L 80 120 M 50 65 L 50 25" stroke="#8B0000" strokeWidth="10" strokeLinecap="round" />
              <circle cx="50" cy="65" r="8" fill="#FFD600" stroke="#1A1A2E" strokeWidth="2" />
              {/* Sarcastic branding */}
              <text x="50" y="95" fontSize="10" fill="#8B0000" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                AUNTY-CLASS
              </text>
            </svg>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
