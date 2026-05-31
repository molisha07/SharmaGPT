import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import SharmaAunty from '../components/avatar/SharmaAunty'
import { FaUserPlus, FaUserShield, FaEnvelope } from 'react-icons/fa'

export default function Login() {
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const finalName = name.strip || name.trim() || 'Beta'
    const finalEmail = email.strip || email.trim()

    if (!finalEmail) {
      setError('Please provide an email address, beta.')
      return
    }

    // Standard local authentication bypass - extremely fluid and testable!
    loginUser({
      uid: `usr-${Date.now()}`,
      name: finalName,
      email: finalEmail,
      createdAt: new Date().toISOString()
    })
    navigate('/upload')
  }

  const handleGuestLogin = () => {
    // Immediate bypass guest login
    loginUser({
      uid: 'guest-123',
      name: 'Guest Candidate',
      email: 'guest@sharmagpt.com',
      createdAt: new Date().toISOString()
    })
    navigate('/upload')
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Decorative small suspicious avatar */}
        <div className="flex justify-center hover:scale-105 transition-transform duration-300">
          <SharmaAunty emotion="disappointed" size={160} />
        </div>

        <div className="duo-card bg-white p-6 md:p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-display font-black text-dark tracking-tight uppercase">
              Identify Yourself
            </h2>
            <p className="text-gray-500 font-bold text-sm mt-1">
              "Tell me who you are so I can alert your mother."
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-extrabold text-dark uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border-3 border-dark rounded-xl font-bold bg-cream focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-extrabold text-dark uppercase mb-1">Email Address</label>
              <input
                type="email"
                placeholder="e.g. rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border-3 border-dark rounded-xl font-bold bg-cream focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {error && (
              <p className="text-accent text-sm font-bold font-roast">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-display text-lg font-black duo-btn rounded-xl flex items-center justify-center gap-2"
            >
              <FaEnvelope /> {isRegister ? "Create Profile" : "Continue"}
            </button>
          </form>

          {/* Quick toggle login/register */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary font-bold hover:underline"
            >
              {isRegister ? "Already registered? Sign In" : "First time? Create a relative profile"}
            </button>
          </div>

          {/* Direct Guest Access Divider */}
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t-2 border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 font-bold text-xs uppercase">OR</span>
            <div className="flex-grow border-t-2 border-gray-300"></div>
          </div>

          {/* Instant Guest Button */}
          <button
            onClick={handleGuestLogin}
            className="w-full py-3 bg-secondary text-dark border-3 border-dark font-display text-lg font-black duo-btn rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400"
          >
            <FaUserShield /> Enter as Guest (Instant Roast)
          </button>
        </div>
      </div>
    </div>
  )
}
