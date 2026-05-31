import React from 'react'
import { motion } from 'framer-motion'
import { FaUserAlt, FaAward } from 'react-icons/fa'

export default function SharmaJiComparison({ comparisonPoints = [] }) {
  // If empty, supply high-quality funny stubs
  const points = comparisonPoints.length > 0 ? comparisonPoints : [
    { user: "Wrote 'HTML' in skills section", sharma_son: "Constructed custom browser engine in assembly" },
    { user: "Watched 48 Udemy tutorial videos at 2x speed", sharma_son: "Contributed core optimizations to Node.js" },
    { user: "Created VS Code folder, left it empty for 3 weeks", sharma_son: "Active open source maintainer with 40k stars" }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-display font-black text-dark uppercase tracking-wider">
          Sharma Ji's Son Comparison™
        </h3>
        <p className="text-gray-500 font-bold text-sm">
          "Beta, learn something from him. Look at these standards!"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Left Column: YOU */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="duo-card bg-orange-100/50 p-5 border-primary"
        >
          <div className="flex items-center gap-3 border-b-4 border-dark pb-3 mb-4">
            <div className="p-2.5 bg-primary text-white border-2 border-dark rounded-xl">
              <FaUserAlt size={18} />
            </div>
            <h4 className="text-xl font-display font-black text-primary uppercase">
              YOU (Beta)
            </h4>
          </div>
          
          <ul className="space-y-4">
            {points.map((point, idx) => (
              <li 
                key={idx}
                className="p-3 bg-white border-2 border-dark rounded-xl font-bold font-roast text-dark text-sm sm:text-base hover:scale-[1.01] transition-transform"
              >
                🔴 {point.user}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column: SHARMA JI'S SON */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="duo-card bg-emerald-100/50 p-5 border-success"
        >
          <div className="flex items-center gap-3 border-b-4 border-dark pb-3 mb-4">
            <div className="p-2.5 bg-success text-white border-2 border-dark rounded-xl">
              <FaAward size={18} />
            </div>
            <h4 className="text-xl font-display font-black text-success uppercase">
              SHARMA JI'S SON
            </h4>
          </div>

          <ul className="space-y-4">
            {points.map((point, idx) => (
              <li 
                key={idx}
                className="p-3 bg-white border-2 border-dark rounded-xl font-bold text-dark text-sm sm:text-base hover:scale-[1.01] transition-transform shadow-[2px_2px_0px_rgba(6,214,160,0.2)]"
              >
                🟢 {point.sharma_son}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
