import React from 'react'
import { motion } from 'framer-motion'

export default function SharmaAunty({ emotion = 'disappointed', size = 300 }) {
  // Map emotional states to specific color accents, expressions, and animations
  const config = {
    happy: {
      bg: '#06D6A0', // Mint green background
      eyebrowL: 'rotate(5deg) translateY(-2px)',
      eyebrowR: 'rotate(-5deg) translateY(-2px)',
      eyeScaleY: 1.0,
      mouth: 'M 130 180 Q 150 205 170 180 Z', // Big smile
      blush: 0.4,
      shake: {},
      eyebrowY: 0
    },
    concerned: {
      bg: '#FFD600', // Turmeric yellow
      eyebrowL: 'rotate(-10deg) translateY(-5px)',
      eyebrowR: 'rotate(10deg) translateY(-5px)',
      eyeScaleY: 0.95,
      mouth: 'M 135 185 Q 150 170 165 185', // Slight worried arc
      blush: 0.1,
      shake: {},
      eyebrowY: -4
    },
    suspicious: {
      bg: '#FFD600', // Turmeric yellow
      eyebrowL: 'rotate(-5deg) translateY(-8px)', // Left brow raised high
      eyebrowR: 'rotate(15deg) translateY(2px)',  // Right brow standard/low
      eyeScaleY: 0.3, // Squinting
      mouth: 'M 138 185 L 162 182', // Sarcastic flat line
      blush: 0.1,
      shake: {},
      eyebrowY: 0
    },
    disappointed: {
      bg: '#FFA856', // Warm pale orange
      eyebrowL: 'rotate(12deg) translateY(-1px)',
      eyebrowR: 'rotate(-12deg) translateY(-1px)',
      eyeScaleY: 0.8,
      mouth: 'M 135 190 Q 150 175 165 190', // Sad mouth
      blush: 0.0,
      shake: {},
      eyebrowY: 2
    },
    furious: {
      bg: '#E63946', // Red Alert
      eyebrowL: 'rotate(25deg) translateY(2px)', // Angled sharply down
      eyebrowR: 'rotate(-25deg) translateY(2px)',
      eyeScaleY: 0.7,
      mouth: 'M 130 195 Q 150 170 170 195 Z', // Open yelling mouth
      blush: 0.8,
      shake: {
        x: [0, -4, 4, -4, 4, 0],
        y: [0, 2, -2, 2, -2, 0],
        transition: { repeat: Infinity, duration: 0.3 }
      },
      eyebrowY: 4
    },
    nuclear: {
      bg: '#9D0208', // Dark blood red
      eyebrowL: 'rotate(35deg) translateY(4px)',
      eyebrowR: 'rotate(-35deg) translateY(4px)',
      eyeScaleY: 0.5,
      mouth: 'M 125 200 Q 150 160 175 200 Z', // Giant furious scream
      blush: 1.0,
      shake: {
        x: [0, -6, 6, -6, 6, 0],
        y: [0, 3, -3, 3, -3, 0],
        scale: [1, 1.02, 0.98, 1.02, 1],
        transition: { repeat: Infinity, duration: 0.2 }
      },
      eyebrowY: 5
    }
  }

  const state = config[emotion] || config.disappointed

  return (
    <div className="flex flex-col items-center select-none" style={{ width: size }}>
      <motion.div
        animate={state.shake}
        className="w-full relative aspect-square rounded-full border-4 border-dark overflow-hidden shadow-lg flex items-center justify-center"
        style={{ backgroundColor: state.bg, transition: 'background-color 0.5s ease' }}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Bun Hair (top) */}
          <circle cx="150" cy="50" r="30" fill="#111111" />
          <circle cx="150" cy="50" r="24" fill="#222222" />
          
          {/* 2. Saree Pallu background loop */}
          <path d="M 60 210 Q 30 250 80 300 L 220 300 Q 270 250 240 210 Z" fill="#E63946" stroke="#1A1A2E" strokeWidth="4" />
          <path d="M 80 230 Q 55 265 95 300" fill="none" stroke="#FFD600" strokeWidth="6" />

          {/* 3. Neck */}
          <rect x="135" y="160" width="30" height="40" fill="#FCD5B5" stroke="#1A1A2E" strokeWidth="4" rx="5" />
          
          {/* 4. Face Base */}
          <circle cx="150" cy="120" r="65" fill="#FFE3D1" stroke="#1A1A2E" strokeWidth="4" />
          
          {/* 5. Hair Outline (Front) */}
          <path d="M 85 110 C 85 70 215 70 215 110 C 215 90 85 90 85 110 Z" fill="#111111" stroke="#1A1A2E" strokeWidth="2" />
          
          {/* 6. Cheeks Blush */}
          <circle cx="110" cy="140" r="12" fill="#FF5C8A" opacity={state.blush} style={{ transition: 'opacity 0.4s' }} />
          <circle cx="190" cy="140" r="12" fill="#FF5C8A" opacity={state.blush} style={{ transition: 'opacity 0.4s' }} />

          {/* 7. Eyes (White part + Pupils) */}
          {/* Left Eye */}
          <g>
            <ellipse cx="115" cy="125" rx="14" ry="10" fill="#FFFFFF" stroke="#1A1A2E" strokeWidth="3" />
            <motion.ellipse
              cx="115" 
              cy="125" 
              rx="6" 
              animate={{ scaleY: state.eyeScaleY }}
              style={{ originY: '125px', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              fill="#1A1A2E" 
            />
          </g>
          {/* Right Eye */}
          <g>
            <ellipse cx="185" cy="125" rx="14" ry="10" fill="#FFFFFF" stroke="#1A1A2E" strokeWidth="3" />
            <motion.ellipse 
              cx="185" 
              cy="125" 
              rx="6" 
              animate={{ scaleY: state.eyeScaleY }}
              style={{ originY: '125px', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              fill="#1A1A2E" 
            />
          </g>

          {/* 8. Sassy Glasses */}
          <rect x="92" y="112" width="38" height="26" fill="none" stroke="#E63946" strokeWidth="5" rx="6" />
          <rect x="170" y="112" width="38" height="26" fill="none" stroke="#E63946" strokeWidth="5" rx="6" />
          <line x1="130" y1="122" x2="170" y2="122" stroke="#E63946" strokeWidth="5" />
          <line x1="88" y1="120" x2="92" y2="120" stroke="#E63946" strokeWidth="3" />
          <line x1="208" y1="120" x2="212" y2="120" stroke="#E63946" strokeWidth="3" />

          {/* 9. Reactive Eyebrows */}
          <motion.path
            d="M 98 100 Q 115 95 130 102"
            fill="none"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ style: { transform: state.eyebrowL, transformOrigin: '115px 98px' } }}
            style={{ transition: 'transform 0.3s' }}
          />
          <motion.path
            d="M 202 100 Q 185 95 170 102"
            fill="none"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ style: { transform: state.eyebrowR, transformOrigin: '185px 98px' } }}
            style={{ transition: 'transform 0.3s' }}
          />

          {/* 10. Indian Mother Bindi */}
          <circle cx="150" cy="98" r="6" fill="#E63946" stroke="#FFD600" strokeWidth="1" />

          {/* 11. Nose (curved line) */}
          <path d="M 147 132 Q 153 148 147 152" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />

          {/* 12. Dynamic Mouth */}
          <motion.path
            d={state.mouth}
            fill={emotion === 'furious' || emotion === 'nuclear' || emotion === 'happy' ? '#9D0208' : 'none'}
            stroke="#1A1A2E"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ transition: 'all 0.3s' }}
          />
          
          {/* 13. Saree Pallu crossing the chest */}
          <path d="M 70 230 Q 150 250 230 300" fill="none" stroke="#FFD600" strokeWidth="6" />
          <path d="M 60 210 Q 150 230 240 300" fill="none" stroke="#E63946" strokeWidth="18" strokeLinecap="round" />
        </svg>

        {/* Small badge denoting her current mood */}
        <span className="absolute bottom-3 bg-dark border-2 border-white px-2.5 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wider">
          {emotion} mood
        </span>
      </motion.div>
    </div>
  )
}
