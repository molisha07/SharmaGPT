import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white border-t-4 border-dark py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h4 className="font-display text-xl text-secondary">SharmaGPT™</h4>
          <p className="text-gray-400 text-sm mt-1">
            "Because Sharma Ji's Son was too busy working three remote FAANG jobs."
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-sm text-gray-300">
            © 2026 SharmaGPT. Handcrafted with high-tier disappointment.
          </p>
          <p className="text-xs text-secondary font-mono">
            Disclaimer: 100% of emotional damage is purely motivational. Study hard, beta.
          </p>
        </div>
      </div>
    </footer>
  )
}
