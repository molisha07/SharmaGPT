import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaShareAlt, FaChevronLeft, FaChevronRight, FaRegCopy } from 'react-icons/fa'

export default function MemeDisplay({ memeUrls = [] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  // Standard safe fallbacks in case no memes were generated
  const memes = memeUrls.length > 0 ? memeUrls : [
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='%231a1a2e'/><text x='300' y='200' fill='white' font-size='20' text-anchor='middle'>Disappointment Meme Not Loaded</text></svg>"
  ]

  const nextMeme = () => {
    setActiveIdx((prev) => (prev + 1) % memes.length)
    setCopied(false)
  }

  const prevMeme = () => {
    setActiveIdx((prev) => (prev - 1 + memes.length) % memes.length)
    setCopied(false)
  }

  const handleShare = async () => {
    const memeData = memes[activeIdx]
    
    // Fallback to copy if Web Share isn't supported
    if (navigator.share) {
      try {
        // Convert Base64 data URI to file to share it natively!
        const res = await fetch(memeData)
        const blob = await res.blob()
        const file = new File([blob], 'sharmagpt_meme.png', { type: 'image/png' })
        
        await navigator.share({
          files: [file],
          title: 'SharmaGPT Resume Roast Meme',
          text: 'Look how brutally Sharma Aunty roasted my resume! Upload yours and face the disappointment.'
        })
      } catch (err) {
        console.warn("Share failed:", err)
      }
    } else {
      // Copy generic text to clipboard
      navigator.clipboard.writeText("Compare yourself against Sharma Ji's Son at https://sharmagpt.com! You won't survive the roast!")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-display font-black text-dark uppercase tracking-wider">
          Aunty's Meme Generator™
        </h3>
        <p className="text-gray-500 font-bold text-sm">
          "Your career weaknesses, compiled as downloadable, shareable art."
        </p>
      </div>

      <div className="relative group">
        {/* Main Meme Image Box */}
        <div className="duo-card overflow-hidden bg-dark aspect-[3/2] flex items-center justify-center relative shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              src={memes[activeIdx]}
              alt={`SharmaGPT Roast Meme ${activeIdx + 1}`}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
          
          {/* Sarcastic Watermark overlay */}
          <div className="absolute top-4 left-4 bg-dark/70 text-secondary border border-dark rounded-md px-2 py-0.5 text-[9px] font-mono select-none">
            SHARMAGPT™ MEME #{activeIdx + 1}
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        {memes.length > 1 && (
          <>
            <button
              onClick={prevMeme}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-3 bg-secondary text-dark border-3 border-dark rounded-full hover:bg-yellow-400 duo-btn shadow-md"
              title="Previous Meme"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={nextMeme}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-secondary text-dark border-3 border-dark rounded-full hover:bg-yellow-400 duo-btn shadow-md"
              title="Next Meme"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Action triggers */}
      <div className="flex justify-center items-center gap-4">
        {/* Direct Download Link */}
        <a
          href={memes[activeIdx]}
          download={`sharmagpt_roast_meme_${activeIdx + 1}.png`}
          className="px-5 py-2.5 bg-primary text-white border-3 border-dark font-display font-bold rounded-2xl duo-btn hover:bg-orange-600 flex items-center gap-2"
        >
          <FaDownload /> Download PNG
        </a>

        {/* Share trigger */}
        <button
          onClick={handleShare}
          className="px-5 py-2.5 bg-secondary text-dark border-3 border-dark font-display font-bold rounded-2xl duo-btn hover:bg-yellow-400 flex items-center gap-2"
        >
          {copied ? <FaRegCopy /> : <FaShareAlt />}
          {copied ? "Copied Link!" : "Share Roast"}
        </button>
      </div>
    </div>
  )
}
