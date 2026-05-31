import React, { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// 1. Auth Context for managing mock/guest or Firebase user credentials
export const AuthContext = createContext(null)

// 2. Analysis Context to carry roast output from Upload -> Results
export const AnalysisContext = createContext(null)

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analysisResult, setAnalysisResult] = useState(null)

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sharmagpt_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('sharmagpt_user')
      }
    }
    setLoading(false)
  }, [])

  const loginUser = (userData) => {
    setUser(userData)
    localStorage.setItem('sharmagpt_user', JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('sharmagpt_user')
  }

  // Simple Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (loading) return (
      <div className="min-h-screen bg-cream flex justify-center items-center font-display text-2xl text-primary animate-pulse-fast">
        Loading...
      </div>
    )
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      <AnalysisContext.Provider value={{ analysisResult, setAnalysisResult }}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col justify-between bg-cream text-dark">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } />
                <Route path="/results" element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                {/* Catch-all route redirects home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AnalysisContext.Provider>
    </AuthContext.Provider>
  )
}
