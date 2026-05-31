import React, { useState, useEffect } from 'react'
import SharmaAunty from '../avatar/SharmaAunty'

const LOADING_MESSAGES = [
  "Contacting Sharma Ji to ask for his son's GPA...",
  "Comparing your career speed to a snail's crawl...",
  "Calculating cumulative emotional damage levels...",
  "Polishing the custom flying chappal...",
  "Alerting your local WhatsApp Aunties group...",
  "Searching for any trace of active Git commits...",
  "Counting how many tutorials you left half-finished...",
  "Consulting the family astrologer on your employability...",
  "Adding 'Wastes time uploading PDFs' to your permanent report card...",
  "Asking relatives what questions they will ask at the next wedding..."
]

export default function LoadingScreen({ progress = 0 }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [currentAuntyEmotion, setCurrentAuntyEmotion] = useState('concerned')

  // Cycle through funny loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
      
      // Cycle through typical aunty expressions to match the suspense
      const emotions = ['concerned', 'suspicious', 'disappointed']
      setCurrentAuntyEmotion(emotions[Math.floor(Math.random() * emotions.length)])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-xl mx-auto text-center">
      {/* Dynamic Suspense Avatar */}
      <div className="mb-8 hover:scale-105 transition-transform duration-300">
        <SharmaAunty emotion={currentAuntyEmotion} size={250} />
      </div>

      <div className="w-full bg-white border-4 border-dark rounded-3xl p-6 md:p-8 shadow-md">
        <h3 className="text-3xl font-display font-extrabold text-dark mb-4 animate-pulse-fast">
          Aunty is Reviewing...
        </h3>

        {/* Dynamic funny quote */}
        <p className="text-lg font-roast font-bold text-primary min-h-[50px] mb-6 px-2">
          "{LOADING_MESSAGES[messageIndex]}"
        </p>

        {/* Bouncy Progress Bar */}
        <div className="w-full bg-cream border-3 border-dark rounded-full h-8 overflow-hidden relative p-1">
          <div
            className="bg-primary border-2 border-dark rounded-full h-full transition-all duration-300 ease-out flex items-center justify-end pr-2"
            style={{ width: `${progress}%` }}
          >
            <span className="text-white text-xs font-black font-mono">
              {progress}%
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-semibold mt-4">
          Do not close this tab. Relatives are already dialing.
        </p>
      </div>
    </div>
  )
}
