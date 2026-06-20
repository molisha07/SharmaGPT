import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SharmaAunty from '../components/avatar/SharmaAunty'
import { FaGraduationCap, FaPlay, FaRegComments, FaBolt } from 'react-icons/fa'

// Fictional hilarious reviews from relatives
const REVIEWS = [
  { name: "Pinky Aunty", relation: "Neighbor / Spy", text: "Sharma Ji's son already has a 95% employability score on SharmaGPT. This candidate? Better apply for government form filling.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Ramesh Mamu", relation: "Career Advisor (Unsolicited)", text: "I looked at the code this child wrote. My third-grade nephew draws better shapes on MS Paint. Sarcasm is 10/10.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Chintu", relation: "Cousin / Rival", text: "I scored higher than my elder brother. Now my mom has officially stopped giving him pocket money. SharmaGPT is the ultimate family divider!", rating: "⭐⭐⭐⭐⭐" }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      {/* 1. Scrolling Warning Ticker Banner */}
      <div className="bg-accent border-b-4 border-dark py-2 text-white overflow-hidden whitespace-nowrap font-display text-sm sm:text-base font-extrabold select-none uppercase tracking-wider relative flex">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-8 shrink-0">
          <span>⚠️ WARNING: HIGH DOSES OF MOTHERLY DISAPPOINTMENT INBOUND ⚠️</span>
          <span>🩴 FLYING CHAPPALS ARE FULLY ACTIVE 🩴</span>
          <span>⚠️ ACCORDING TO RECENT METRICS SHARMA JI'S SON HAS COMPLETED 4 EXTRA INTERNSHIPS TODAY ⚠️</span>
          <span>🩴 SHARMA AUNTY IS ACTIVELY PREPARING CRITICISMS 🩴</span>
        </div>
        <div className="animate-[marquee_20s_linear_infinite] flex gap-8 shrink-0" aria-hidden="true">
          <span>⚠️ WARNING: HIGH DOSES OF MOTHERLY DISAPPOINTMENT INBOUND ⚠️</span>
          <span>🩴 FLYING CHAPPALS ARE FULLY ACTIVE 🩴</span>
          <span>⚠️ ACCORDING TO RECENT METRICS SHARMA JI'S SON HAS COMPLETED 4 EXTRA INTERNSHIPS TODAY ⚠️</span>
          <span>🩴 SHARMA AUNTY IS ACTIVELY PREPARING CRITICISMS 🩴</span>
        </div>
      </div>

      {/* Adding Keyframe styles directly for the marquee animation loop */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* 2. Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column text details */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border-2 border-dark rounded-2xl text-primary font-bold text-sm uppercase tracking-wide shadow-[2px_2px_0px_#1A1A2E]"
          >
            <FaBolt className="animate-pulse" /> AI Character Experience
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black leading-tight tracking-tight text-dark">
            Upload Your Resume.<br />
            Face The <span className="text-primary underline decoration-yellow-400 decoration-8">Disappointment.</span>
          </h1>

          <p className="text-lg sm:text-xl font-bold text-gray-500 max-w-xl mx-auto lg:mx-0">
            Get brutally roasted by **Sharma Aunty™** — the animated Indian mother who values GPA more than oxygen. Survived the roast? Download your Damage Certificate and 30-Day Recovery Blueprint!
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
            <Link
              to="/upload"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-display text-xl font-black rounded-2xl duo-btn text-center hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              Get Judged <FaPlay size={14} className="mt-0.5" />
            </Link>
            
            <a
              href="#testimonials"
              className="w-full sm:w-auto px-6 py-4 bg-white text-dark border-3 border-dark font-display text-lg font-bold rounded-2xl hover:bg-orange-50/20 text-center"
            >
              See Relatives' Feedback
            </a>
          </div>
        </div>

        {/* Right column: Dynamic interactive avatar element */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Decorative wiggling items in background */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute -top-6 -left-6 bg-yellow-300 border-2 border-dark p-3 rounded-2xl text-2xl shadow-[3px_3px_0px_#1A1A2E] z-10 hidden sm:block select-none"
            title="Sandal"
          >
            🩴
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-6 -right-6 bg-emerald-300 border-2 border-dark p-3 rounded-2xl text-2xl shadow-[3px_3px_0px_#1A1A2E] z-10 hidden sm:block select-none"
            title="Degree Certificate"
          >
            📜
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
            className="relative"
          >
            <SharmaAunty emotion="suspicious" size={320} />
          </motion.div>

          <p className="font-roast text-lg font-bold text-accent mt-6 text-center italic">
            "Sharma Ji's son wasn't available to review it... so you are stuck with me."
          </p>
        </div>
      </div>

      {/* 3. Features Banner */}
      <section className="bg-dark text-white border-t-4 border-b-4 border-dark py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#252542] border-3 border-secondary rounded-2xl shadow-md">
            <h3 className="font-display text-2xl text-secondary mb-2 flex items-center gap-2">
              🔥 Savage Roast Engine
            </h3>
            <p className="text-gray-300 text-sm font-semibold">
              Brutal section-by-section breakdown of buzzword overload, tutorial syndrome, and lack of Git commits.
            </p>
          </div>
          <div className="p-6 bg-[#252542] border-3 border-secondary rounded-2xl shadow-md">
            <h3 className="font-display text-2xl text-secondary mb-2 flex items-center gap-2">
              🩴 Chappal Threat Radar
            </h3>
            <p className="text-gray-300 text-sm font-semibold">
              Live reaction tracking of motherly disappointment score meters, launching physical wiggling sandals.
            </p>
          </div>
          <div className="p-6 bg-[#252542] border-3 border-secondary rounded-2xl shadow-md">
            <h3 className="font-display text-2xl text-secondary mb-2 flex items-center gap-2">
              📈 30-Day Recovery Plan
            </h3>
            <p className="text-gray-300 text-sm font-semibold">
              Savage criticism followed by actual, concrete roadmap advice to get you hired and escape relative comments.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Testimonials / Relatives Review Grid */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-dark uppercase tracking-wider flex items-center justify-center gap-2">
            <FaRegComments className="text-primary" /> Neighborhood WhatsApp Feedback
          </h2>
          <p className="text-gray-500 font-bold text-sm">
            What the neighborhood WhatsApp group is saying about candidate scores:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="duo-card bg-white p-6 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-yellow-400 text-lg">{review.rating}</span>
                <p className="text-dark font-roast font-bold text-lg mt-3 min-h-[90px]">
                  "{review.text}"
                </p>
              </div>

              <div className="border-t-2 border-dark pt-3 mt-6 flex justify-between items-center">
                <span className="font-display font-extrabold text-dark">{review.name}</span>
                <span className="text-xs bg-orange-100 border border-dark rounded-full px-2.5 py-0.5 text-primary font-black uppercase">
                  {review.relation}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
