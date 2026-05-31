import React from 'react'
import { motion } from 'framer-motion'

export default function FamilyFunctionSimulator({ questions = [] }) {
  // Safe stubs fallback
  const items = questions.length > 0 ? questions : [
    { question: "Beta package kitna mila?", probability: 96 },
    { question: "Placement ho gayi kya?", probability: 92 },
    { question: "Government job form bhara?", probability: 74 },
    { question: "MBA karne ka plan hai?", probability: 68 }
  ]

  // Color selection based on probability danger
  const getProbabilityColor = (prob) => {
    if (prob >= 90) return 'bg-accent border-accent'
    if (prob >= 70) return 'bg-primary border-primary'
    return 'bg-yellow-500 border-yellow-500'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="duo-card bg-white p-6 md:p-8 max-w-xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-black text-dark uppercase tracking-wider">
          Family Function Simulator™
        </h3>
        <p className="text-gray-500 font-bold text-sm">
          Predicted wedding/function interrogation probability:
        </p>
      </div>

      <div className="space-y-5">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-sm sm:text-base font-bold text-dark font-display">
              <span className="font-roast text-lg">" {item.question} "</span>
              <span className="font-mono text-accent font-black">{item.probability}%</span>
            </div>
            
            {/* Probability slider container */}
            <div className="w-full bg-cream border-2 border-dark rounded-full h-5 overflow-hidden p-0.5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.probability}%` }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
                className={`h-full border-1 rounded-full ${getProbabilityColor(item.probability)}`}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 font-bold mt-6">
        Recommendation: Stay near the dessert counter to avoid direct eye contact.
      </p>
    </motion.div>
  )
}
