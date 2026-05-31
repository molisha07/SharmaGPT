import React, { useEffect, useState } from 'react'
import { FaDownload, FaCertificate } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function CertificateView({ name = 'Beta', scores = {}, chappalLevel = 1, overallScore = 0 }) {
  const [certUrl, setCertUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch Pillow-drawn certificate from backend on mount
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
        const response = await fetch(`${backendUrl}/certificate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            scores,
            chappal_level: chappalLevel,
            overall_score: overallScore
          })
        })
        if (response.ok) {
          const data = await response.json()
          setCertUrl(data.certificate_url)
        }
      } catch (err) {
        console.error("Failed to retrieve certificate image:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificate()
  }, [name, scores, chappalLevel, overallScore])

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-display font-black text-dark uppercase tracking-wider flex items-center justify-center gap-2">
          <FaCertificate className="text-secondary" /> Disappointment Certificate
        </h3>
        <p className="text-gray-500 font-bold text-sm">
          "Hang this on your LinkedIn profile to scare away potential recruiters."
        </p>
      </div>

      {loading ? (
        <div className="duo-card aspect-[4/3] bg-dark flex flex-col items-center justify-center text-white gap-3 select-none">
          <div className="w-10 h-10 border-4 border-t-secondary border-dark rounded-full animate-spin" />
          <p className="font-display text-lg font-bold tracking-wide">
            Drafting your certificate of shame...
          </p>
        </div>
      ) : certUrl ? (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Framed Certificate View */}
          <div className="duo-card bg-white p-2 sm:p-4 shadow-xl overflow-hidden aspect-[4/3]">
            <img 
              src={certUrl} 
              alt="Official SharmaGPT Certificate of Disappointment" 
              className="w-full h-full object-contain select-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center">
            <a
              href={certUrl}
              download="sharmagpt_emotional_damage_certificate.png"
              className="px-6 py-3 bg-secondary text-dark border-3 border-dark font-display text-lg font-bold rounded-2xl duo-btn hover:bg-yellow-400 flex items-center gap-2"
            >
              <FaDownload /> Download Certificate PNG
            </a>
          </div>
        </motion.div>
      ) : (
        <div className="duo-card p-8 bg-red-100 border-accent text-accent text-center font-bold font-roast">
          ⚠️ Oops! Could not draft the certificate. Sharma Aunty is too disappointed to sign it.
        </div>
      )}
    </div>
  )
}
