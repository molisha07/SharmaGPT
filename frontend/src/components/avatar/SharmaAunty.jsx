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
      eyeScaleX: 1.0,
      mouth: 'M 130 180 Q 150 205 170 180 Z', // Big smile
      blush: 0.4,
      shake: {},
      eyebrowY: 0,
      faceColor: '#FFE3D1'
    },
    concerned: {
      bg: '#FFD600', // Turmeric yellow
      eyebrowL: 'rotate(-10deg) translateY(-5px)',
      eyebrowR: 'rotate(10deg) translateY(-5px)',
      eyeScaleY: 0.95,
      eyeScaleX: 1.0,
      mouth: 'M 135 185 Q 150 170 165 185', // Slight worried arc
      blush: 0.1,
      shake: {},
      eyebrowY: -4,
      faceColor: '#FFE3D1'
    },
    suspicious: {
      bg: '#FFD600', // Turmeric yellow
      eyebrowL: 'rotate(-5deg) translateY(-8px)', // Left brow raised high
      eyebrowR: 'rotate(15deg) translateY(2px)',  // Right brow low
      eyeScaleY: 0.3, // Squinting
      eyeScaleX: 1.0,
      mouth: 'M 138 185 L 162 182', // Sarcastic flat line
      blush: 0.1,
      shake: {},
      eyebrowY: 0,
      faceColor: '#FFE3D1'
    },
    disappointed: {
      bg: '#FFA856', // Warm pale orange
      eyebrowL: 'rotate(12deg) translateY(-1px)',
      eyebrowR: 'rotate(-12deg) translateY(-1px)',
      eyeScaleY: 0.8,
      eyeScaleX: 1.0,
      mouth: 'M 135 190 Q 150 175 165 190', // Sad mouth
      blush: 0.0,
      shake: {},
      eyebrowY: 2,
      faceColor: '#FFE3D1'
    },
    furious: {
      bg: '#E63946', // Red Alert
      eyebrowL: 'rotate(25deg) translateY(2px)', // Angled sharply down
      eyebrowR: 'rotate(-25deg) translateY(2px)',
      eyeScaleY: 0.7,
      eyeScaleX: 1.0,
      mouth: 'M 130 195 Q 150 170 170 195 Z', // Open yelling mouth
      blush: 0.8,
      shake: {
        x: [0, -4, 4, -4, 4, 0],
        y: [0, 2, -2, 2, -2, 0],
        transition: { repeat: Infinity, duration: 0.3 }
      },
      eyebrowY: 4,
      faceColor: '#FFC4C4' // Reddened skin face
    },
    nuclear: {
      bg: '#9D0208', // Dark blood red
      eyebrowL: 'rotate(35deg) translateY(4px)',
      eyebrowR: 'rotate(-35deg) translateY(4px)',
      eyeScaleY: 0.5,
      eyeScaleX: 1.1,
      mouth: 'M 125 200 Q 150 160 175 200 Z', // Giant furious scream
      blush: 1.0,
      shake: {
        x: [0, -6, 6, -6, 6, 0],
        y: [0, 3, -3, 3, -3, 0],
        scale: [1, 1.02, 0.98, 1.02, 1],
        transition: { repeat: Infinity, duration: 0.2 }
      },
      eyebrowY: 5,
      faceColor: '#FFA3A3'
    },
    shocked: {
      bg: '#FFA856', // Warm orange
      eyebrowL: 'rotate(-20deg) translateY(-8px)', // High arched brows
      eyebrowR: 'rotate(20deg) translateY(-8px)',
      eyeScaleY: 1.5, // Wide open eyes
      eyeScaleX: 1.2,
      mouth: 'M 142 195 C 142 185, 158 185, 158 195 C 158 205, 142 205, 142 195 Z', // Wide open O mouth
      blush: 0.3,
      shake: {
        y: [0, -4, 0],
        transition: { repeat: Infinity, duration: 0.4 }
      },
      eyebrowY: -8,
      faceColor: '#FFE3D1'
    },
    sarcastic: {
      bg: '#FFD600', // Turmeric yellow
      eyebrowL: 'rotate(-15deg) translateY(-6px)', // One raised brow
      eyebrowR: 'rotate(5deg) translateY(2px)', // One flat brow
      eyeScaleY: 0.4, // Smug squint
      eyeScaleX: 1.0,
      mouth: 'M 130 185 Q 160 205 168 180', // Smirk mouth
      blush: 0.2,
      shake: {
        rotate: [0, -2, 2, 0],
        transition: { repeat: Infinity, duration: 0.8 }
      },
      eyebrowY: 0,
      faceColor: '#FFE3D1'
    }
  }

  // Normalize inputs safely
  let activeState = emotion ? emotion.toLowerCase() : 'disappointed'
  if (activeState === 'mild judgment') activeState = 'concerned'
  if (activeState === 'typical sharma aunty') activeState = 'disappointed'
  if (activeState === 'emotional damage') activeState = 'furious'
  if (activeState === 'nuclear sharma aunty mode') activeState = 'nuclear'

  const state = config[activeState] || config.disappointed

  return (
    <div className="flex flex-col items-center select-none" style={{ width: size }}>
      <motion.div
        animate={state.shake}
        className="w-full relative aspect-square rounded-full border-4 border-dark overflow-hidden shadow-lg flex items-center justify-center bg-[#FFF8F0]"
        style={{ backgroundColor: state.bg, transition: 'background-color 0.5s ease' }}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Bun Hair (top scalp bun - drawn first behind) */}
          <circle cx="150" cy="50" r="32" fill="#111111" />
          <circle cx="150" cy="50" r="26" fill="#222222" />
          {/* Gold pins poking from the bun */}
          <line x1="120" y1="40" x2="140" y2="48" stroke="#FFD600" strokeWidth="3.5" />
          <line x1="180" y1="40" x2="160" y2="48" stroke="#FFD600" strokeWidth="3.5" />
          
          {/* 2. Saree Pallu background fold */}
          <path d="M 60 210 Q 30 250 80 300 L 220 300 Q 270 250 240 210 Z" fill="#E63946" stroke="#1A1A2E" strokeWidth="4" />
          <path d="M 80 230 Q 55 265 95 300" fill="none" stroke="#FFD600" strokeWidth="6" />

          {/* 3. Neck */}
          <rect x="135" y="160" width="30" height="40" fill={state.faceColor} stroke="#1A1A2E" strokeWidth="4" rx="5" style={{ transition: 'fill 0.5s' }} />
          
          {/* 4. BALDNESS FIX: Full Scalp Hair Backing (Slightly larger ellipse for thick hair volume) */}
          <ellipse cx="150" cy="118" rx="72" ry="68" fill="#111111" stroke="#1A1A2E" strokeWidth="4" />

          {/* 5. Face Base (Skin tone layered on top of hair backing) */}
          <circle cx="150" cy="122" r="62" fill={state.faceColor} stroke="#1A1A2E" strokeWidth="4" style={{ transition: 'fill 0.5s' }} />

          {/* 6. Traditional Ears with Gold Jhumkas (Matching skin tone, positioned beautifully) */}
          {/* Left Ear */}
          <ellipse cx="86" cy="134" rx="8" ry="12" fill={state.faceColor} stroke="#1A1A2E" strokeWidth="3.5" style={{ transition: 'fill 0.5s' }} />
          {/* Right Ear */}
          <ellipse cx="214" cy="134" rx="8" ry="12" fill={state.faceColor} stroke="#1A1A2E" strokeWidth="3.5" style={{ transition: 'fill 0.5s' }} />

          {/* Golden Jhumka Earrings */}
          {/* Left Earring */}
          <g>
            <circle cx="86" cy="142" r="4" fill="#FFD600" stroke="#1A1A2E" strokeWidth="1.5" />
            <line x1="86" y1="146" x2="86" y2="152" stroke="#FFD600" strokeWidth="2.5" />
            <path d="M 80 162 C 80 152 92 152 92 162 Z" fill="#FFD600" stroke="#1A1A2E" strokeWidth="2" />
            <circle cx="86" cy="165" r="2.5" fill="#FFD600" />
          </g>
          {/* Right Earring */}
          <g>
            <circle cx="214" cy="142" r="4" fill="#FFD600" stroke="#1A1A2E" strokeWidth="1.5" />
            <line x1="214" y1="146" x2="214" y2="152" stroke="#FFD600" strokeWidth="2.5" />
            <path d="M 208 162 C 208 152 220 152 220 162 Z" fill="#FFD600" stroke="#1A1A2E" strokeWidth="2" />
            <circle cx="214" cy="165" r="2.5" fill="#FFD600" />
          </g>

          {/* 7. Middle-Parted Sleek Hair Frame (Drawn ON TOP of face base to cover the top/sides completely) */}
          <path d="M 88 126 C 86 65 214 65 212 126 C 196 90 172 85 150 95 C 128 85 104 90 88 126 Z" fill="#111111" stroke="#1A1A2E" strokeWidth="3" />
          {/* Sideburns/hair strands wrapping the cheeks for a stylish face framing */}
          <path d="M 88 125 C 84 140 92 152 96 156" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 212 125 C 216 140 208 152 204 156" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* 7. Cheeks Blush */}
          <circle cx="110" cy="142" r="12" fill="#FF5C8A" opacity={state.blush} style={{ transition: 'opacity 0.4s' }} />
          <circle cx="190" cy="142" r="12" fill="#FF5C8A" opacity={state.blush} style={{ transition: 'opacity 0.4s' }} />

          {/* 8. Eyes & Exaggerated Pupils */}
          {/* Left Eye */}
          <g>
            <ellipse cx="115" cy="128" rx="14" ry="10" fill="#FFFFFF" stroke="#1A1A2E" strokeWidth="3" />
            <motion.ellipse
              cx="115" 
              cy="128" 
              animate={{ scaleY: state.eyeScaleY, scaleX: state.eyeScaleX }}
              style={{ originY: '128px', transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              rx="6.5" 
              ry="6.5"
              fill="#1A1A2E" 
            />
          </g>
          {/* Right Eye */}
          <g>
            <ellipse cx="185" cy="128" rx="14" ry="10" fill="#FFFFFF" stroke="#1A1A2E" strokeWidth="3" />
            <motion.ellipse 
              cx="185" 
              cy="128" 
              animate={{ scaleY: state.eyeScaleY, scaleX: state.eyeScaleX }}
              style={{ originY: '128px', transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              rx="6.5" 
              ry="6.5"
              fill="#1A1A2E" 
            />
          </g>

          {/* 9. Relatable Glasses */}
          <rect x="92" y="115" width="38" height="26" fill="none" stroke="#E63946" strokeWidth="5.5" rx="6" />
          <rect x="170" y="115" width="38" height="26" fill="none" stroke="#E63946" strokeWidth="5.5" rx="6" />
          <line x1="130" y1="125" x2="170" y2="125" stroke="#E63946" strokeWidth="5.5" />
          <line x1="88" y1="123" x2="92" y2="123" stroke="#E63946" strokeWidth="3.5" />
          <line x1="208" y1="123" x2="212" y2="123" stroke="#E63946" strokeWidth="3.5" />

          {/* 10. Sharp Eyebrows */}
          <motion.path
            d="M 98 102 Q 115 96 130 104"
            fill="none"
            stroke="#111111"
            strokeWidth="4.5"
            strokeLinecap="round"
            animate={{ style: { transform: state.eyebrowL, transformOrigin: '115px 100px' } }}
            style={{ transition: 'transform 0.25s' }}
          />
          <motion.path
            d="M 202 102 Q 185 96 170 104"
            fill="none"
            stroke="#111111"
            strokeWidth="4.5"
            strokeLinecap="round"
            animate={{ style: { transform: state.eyebrowR, transformOrigin: '185px 100px' } }}
            style={{ transition: 'transform 0.25s' }}
          />

          {/* 11. Large Indian Mother Bindi */}
          <circle cx="150" cy="100" r="7.5" fill="#E63946" stroke="#FFD600" strokeWidth="1.5" />

          {/* 12. Nose */}
          <path d="M 147 135 Q 153 151 147 155" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />

          {/* 13. Dynamic Exaggerated Mouth */}
          <motion.path
            d={state.mouth}
            fill={activeState === 'furious' || activeState === 'nuclear' || activeState === 'happy' || activeState === 'shocked' ? '#9D0208' : 'none'}
            stroke="#1A1A2E"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ transition: 'all 0.25s' }}
          />
          
          {/* 14. Saree Pallu fold details */}
          <path d="M 70 230 Q 150 250 230 300" fill="none" stroke="#FFD600" strokeWidth="6" />
          <path d="M 60 210 Q 150 230 240 300" fill="none" stroke="#E63946" strokeWidth="18" strokeLinecap="round" />
        </svg>

        {/* Small badge denoting her active mood */}
        <span className="absolute bottom-3 bg-dark border-2 border-white px-3 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-md">
          {activeState}
        </span>
      </motion.div>
    </div>
  )
}
