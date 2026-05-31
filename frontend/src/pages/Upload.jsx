import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnalysisContext, AuthContext } from '../App'
import ResumeDropzone from '../components/upload/ResumeDropzone'
import LoadingScreen from '../components/loading/LoadingScreen'
import { FaGraduationCap } from 'react-icons/fa'

export default function Upload() {
  const { user } = useContext(AuthContext)
  const { setAnalysisResult } = useContext(AnalysisContext)
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [apiError, setApiError] = useState('')

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setApiError('')
  }

  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      setApiError('Aiyyo! Select a PDF/DOCX file first, beta.')
      return
    }

    setLoading(true)
    setProgress(5)
    setApiError('')

    // Start fake progress ticks to animate the loading bars smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        // Jump progress in random small steps
        return prev + Math.floor(Math.random() * 8) + 2
      })
    }, 450)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
      
      const formData = new FormData()
      formData.append('file', selectedFile)
      if (user?.uid) {
        formData.append('user_id', user.uid)
      }

      const response = await fetch(`${backendUrl}/analyze`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || 'Severe server disappointment.')
      }

      const data = await response.json()
      
      // Clear progress interval and complete to 100%
      clearInterval(progressInterval)
      setProgress(100)

      // Small delay for psychological impact of completion
      setTimeout(() => {
        setAnalysisResult(data)
        
        // Save to mock history in LocalStorage so the Dashboard can populate it!
        const existingHistory = JSON.parse(localStorage.getItem('sharmagpt_history') || '[]')
        const newRecord = {
          id: `an-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          fileName: selectedFile.name,
          overall_score: data.overall_score,
          chappal_threat_level: data.chappal_threat_level,
          emotion_state: data.emotion_state
        }
        localStorage.setItem('sharmagpt_history', JSON.stringify([newRecord, ...existingHistory]))

        navigate('/results')
      }, 500)

    } catch (err) {
      clearInterval(progressInterval)
      setLoading(false)
      setProgress(0)
      setApiError(err.message || 'FastAPI offline or failed. Please run uvicorn main:app --reload in the backend folder.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <LoadingScreen progress={progress} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl sm:text-5xl font-display font-black text-dark tracking-tight uppercase">
            Upload & Get Judged
          </h2>
          <p className="text-gray-500 font-bold text-base max-w-md mx-auto">
            "Submit your lifetime document. Prepare for the emotional damage of a thousand aunts."
          </p>
        </div>

        <div className="duo-card bg-white p-6 md:p-8 shadow-md">
          {/* Main Dropzone wrapper */}
          <ResumeDropzone onFileSelect={handleFileSelect} />

          {selectedFile && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartAnalysis}
                className="w-full max-w-sm py-4 bg-primary text-white font-display text-xl font-black rounded-2xl duo-btn flex items-center justify-center gap-2 hover:bg-orange-600"
              >
                🩴 Submit & Face Roast 🩴
              </button>
            </div>
          )}

          {apiError && (
            <div className="mt-6 p-4 bg-red-100 text-accent border-3 border-accent rounded-2xl font-bold font-roast text-center">
              ⚠️ AI API Failure: {apiError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
