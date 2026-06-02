import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaShareAlt, FaBolt, FaRegCopy } from 'react-icons/fa'
import confetti from 'canvas-confetti'

export default function MemeDisplay({ memeUrls = [], initialMemes = [] }) {
  // Support both flat URLs and the new structured memes array from AI results
  const [memesList, setMemesList] = useState([])
  const [loadingChaos, setLoadingChaos] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)

  // Initialize memes list on mount
  useEffect(() => {
    // If we have the new detailed memes list, use it
    if (initialMemes && initialMemes.length > 0) {
      setMemesList(initialMemes)
    } else if (memeUrls && memeUrls.length > 0) {
      // Fallback: convert flat URLs list to structured items
      const damageOptions = ["Mild", "Brutal", "Criminal", "Call Police"]
      const formatted = memeUrls.map((url, idx) => ({
        template: "sharma_aunty_custom",
        top_text: "delusion",
        bottom_text: "reality",
        meme_url: url,
        damage_level: damageOptions[idx % damageOptions.length]
      }))
      setMemesList(formatted)
    }
  }, [memeUrls, initialMemes])

  const handleDownload = (memeUrl, idx) => {
    // Create temporary download anchor
    const link = document.createElement('a')
    link.href = memeUrl
    link.download = `sharmagpt_unhinged_meme_${idx + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (memeUrl, idx) => {
    if (navigator.share) {
      try {
        const res = await fetch(memeUrl)
        const blob = await res.blob()
        const file = new File([blob], `sharmagpt_meme_${idx+1}.png`, { type: 'image/png' })
        
        await navigator.share({
          files: [file],
          title: 'SharmaGPT Resume Roast Meme',
          text: 'Look how brutally Sharma Aunty roasted my resume! Visit sharmagpt.vercel.app to face your judgment.'
        })
      } catch (err) {
        console.warn("Share failed:", err)
      }
    } else {
      navigator.clipboard.writeText("Compare your resume against Sharma Ji's Son at https://sharmagpt.vercel.app! Total emotional damage!")
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    }
  }

  // "Generate More Chaos" - POST request to backend /meme/chaos endpoint
  const handleGenerateChaos = async () => {
    setLoadingChaos(true)
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
      const response = await fetch(`${backendUrl}/meme/chaos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Beta",
          skills: []
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.memes && data.memes.length > 0) {
          // Append new memes to the list
          setMemesList(prev => [...prev, ...data.memes])
          
          // Trigger chaotic screen celebration!
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.8 },
            colors: ['#E63946', '#FFD600', '#FF6B00']
          })
        }
      }
    } catch (err) {
      console.error("Failed to generate chaos memes:", err)
    } finally {
      setLoadingChaos(false)
    }
  }

  // Badge color mapping
  const getBadgeStyle = (level) => {
    const maps = {
      Mild: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      Brutal: 'bg-orange-100 text-primary border-orange-300',
      Criminal: 'bg-red-100 text-accent border-accent',
      'Call Police': 'bg-dark text-white border-dark animate-pulse'
    }
    return maps[level] || maps.Brutal
  }

  // Pre-generate random entrance offsets for wiggling/flying effects
  const getEntranceMotion = (idx) => {
    const directionsX = [-300, 300, -200, 200]
    const directionsY = [200, -200, 150, -150]
    const rotations = [-12, 12, -6, 6, -8, 8]
    
    return {
      hidden: { 
        x: directionsX[idx % directionsX.length], 
        y: directionsY[idx % directionsY.length],
        rotate: rotations[idx % rotations.length],
        opacity: 0 
      },
      show: { 
        x: 0, 
        y: 0, 
        rotate: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 70, damping: 12, delay: idx * 0.1 }
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-3xl sm:text-4xl font-display font-black text-dark uppercase tracking-wider flex items-center justify-center gap-2">
          🖼️ Sarcastic Memes — Unhinged Edition
        </h3>
        <p className="text-gray-500 font-bold text-sm max-w-lg mx-auto">
          Your career plans compiled as pure, unadulterated neighborhood disappointment. Share these to spread the emotional damage!
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <motion.div 
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <AnimatePresence>
          {memesList.map((item, idx) => {
            const motionProps = getEntranceMotion(idx)
            return (
              <motion.div
                key={`${item.template}-${idx}`}
                variants={motionProps}
                initial="hidden"
                animate="show"
                whileHover={{ rotate: 2, scale: 1.02 }}
                className="duo-card bg-white p-4 relative group cursor-pointer bouncy-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Sandal Icon floating on corner hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-3xl transform rotate-12 select-none pointer-events-none">
                  🩴
                </div>

                <div className="space-y-3 flex-grow">
                  {/* Visual Header card info */}
                  <div className="flex justify-between items-center border-b-2 border-dark pb-2">
                    <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                      Template: {(item.template || 'sharma_aunty_custom').replace('_', ' ')}
                    </span>
                    
                    <span className={`px-2.5 py-0.5 border text-[10px] font-black uppercase rounded-full ${getBadgeStyle(item.damage_level)}`}>
                      💀 {item.damage_level} Damage
                    </span>
                  </div>

                  {/* Rendered Canvas Image Block */}
                  <div className="border-3 border-dark rounded-2xl overflow-hidden aspect-[3/2] bg-dark flex items-center justify-center shadow-inner relative">
                    <img 
                      src={item.meme_url} 
                      alt={`Roast Meme ${idx + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t-2 border-dark pt-3">
                  <button
                    onClick={() => handleDownload(item.meme_url, idx)}
                    className="py-2.5 bg-primary text-white border-2 border-dark font-display font-bold text-xs sm:text-sm rounded-xl duo-btn hover:bg-orange-600 flex items-center justify-center gap-1.5"
                  >
                    <FaDownload size={12} /> Save PNG
                  </button>

                  <button
                    onClick={() => handleShare(item.meme_url, idx)}
                    className="py-2.5 bg-secondary text-dark border-2 border-dark font-display font-bold text-xs sm:text-sm rounded-xl duo-btn hover:bg-yellow-400 flex items-center justify-center gap-1.5"
                  >
                    <FaShareAlt size={12} /> {copiedIdx === idx ? "Copied Link!" : "Share Roast"}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* "Generate More Chaos" Trigger */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleGenerateChaos}
          disabled={loadingChaos}
          className={`px-8 py-4 bg-[#1A1A2E] text-white border-4 border-dark font-display text-xl font-black rounded-3xl duo-btn flex items-center gap-2 hover:bg-black
            ${loadingChaos ? 'animate-pulse opacity-75' : ''}
          `}
        >
          <FaBolt className={loadingChaos ? 'animate-spin' : 'text-secondary'} />
          {loadingChaos ? 'Generating More Disappointment...' : 'Generate More Chaos 🩴'}
        </button>
      </div>
    </div>
  )
}
