import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { FaVolumeUp, FaVolumeMute, FaSignOutAlt, FaBrain } from 'react-icons/fa'

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)

  // Manage mute status globally using localStorage
  useEffect(() => {
    const muteStatus = localStorage.getItem('sharmagpt_mute') === 'true'
    setIsMuted(muteStatus)
  }, [])

  const toggleMute = () => {
    const newStatus = !isMuted
    setIsMuted(newStatus)
    localStorage.setItem('sharmagpt_mute', String(newStatus))
    // Trigger custom event so active speak processes can immediately listen
    window.dispatchEvent(new Event('sharmagpt_mute_changed'))
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-4 border-dark py-3 px-4 sm:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Animated Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl sm:text-4xl select-none group-hover:animate-wiggle inline-block">🩴</span>
          <span className="font-display text-xl sm:text-3xl tracking-tight text-primary font-extrabold group-hover:text-dark transition-colors">
            Sharma<span className="text-dark group-hover:text-primary">GPT</span>™
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Global Voice Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-3 bg-secondary text-dark duo-btn rounded-xl font-bold flex items-center justify-center hover:bg-yellow-400"
            title={isMuted ? "Unmute Sharma Aunty" : "Mute Sharma Aunty"}
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>

          {user ? (
            <>
              {/* Dashboard and Upload links */}
              <Link 
                to="/dashboard" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cream text-dark border-3 border-dark font-bold rounded-xl hover:bg-orange-50 transition-all"
              >
                <FaBrain size={16} /> My Reports
              </Link>
              <Link
                to="/upload"
                className="px-4 py-2 bg-primary text-white font-display font-bold duo-btn rounded-xl text-center"
              >
                Roast Me
              </Link>
              {/* Profile/Logout */}
              <div className="flex items-center gap-2">
                <span className="hidden md:inline font-bold text-sm bg-orange-100 px-3 py-1.5 rounded-lg border-2 border-dark">
                  Beta {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-accent text-white duo-btn rounded-xl hover:bg-red-600 flex items-center justify-center"
                  title="Logout"
                >
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2.5 bg-primary text-white font-display text-lg font-bold duo-btn rounded-xl"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
