import React, { useState } from 'react'
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaTrashAlt } from 'react-icons/fa'

export default function ResumeDropzone({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateAndSetFile = (selectedFile) => {
    setError('')
    if (!selectedFile) return

    const ext = selectedFile.name.split('.').pop().lowerCase || selectedFile.name.split('.').pop().toLowerCase()
    if (ext !== 'pdf' && ext !== 'docx') {
      setError('Sigh! Sharma Aunty only accepts PDF or DOCX resume formats.')
      return
    }

    // 10MB limit (10 * 1024 * 1024 bytes)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Aiyyo! Your resume is heavier than your achievements. Maximum limit is 10MB.')
      return
    }

    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
    onFileSelect(null)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative p-8 md:p-12 border-4 border-dashed rounded-3xl transition-all duration-300 text-center cursor-pointer select-none
          ${dragActive ? 'border-primary bg-orange-50 scale-[1.02]' : 'border-dark bg-cream hover:bg-orange-50/30'}
          ${file ? 'border-success bg-emerald-50/10' : ''}
        `}
      >
        <input
          type="file"
          id="resume-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.docx"
          onChange={handleChange}
        />

        {!file ? (
          <div className="flex flex-col items-center gap-4">
            {/* Massive Upload Cloud Icon */}
            <div className="p-4 bg-orange-100 rounded-full border-3 border-dark text-primary animate-bounce-slow">
              <FaCloudUploadAlt size={48} />
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-extrabold text-dark">
                Drag & Drop Your Resume
              </h3>
              <p className="text-gray-500 font-semibold text-sm mt-1">
                Supports PDF and DOCX (Max 10MB)
              </p>
            </div>

            <button 
              type="button" 
              className="mt-2 px-6 py-2.5 bg-secondary text-dark border-3 border-dark font-display font-bold rounded-2xl duo-btn hover:bg-yellow-400"
            >
              Browse Files
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* File Selected Preview Card */}
            <div className="flex items-center gap-3 p-4 bg-white border-3 border-dark rounded-2xl shadow-sm w-full max-w-sm">
              <div className={`p-3 rounded-xl border-2 border-dark text-white ${file.name.endsWith('.pdf') ? 'bg-accent' : 'bg-blue-600'}`}>
                {file.name.endsWith('.pdf') ? <FaFilePdf size={24} /> : <FaFileWord size={24} />}
              </div>
              <div className="flex-1 text-left truncate">
                <p className="font-bold text-dark truncate">{file.name}</p>
                <p className="text-xs text-gray-500 font-semibold">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="p-3 bg-red-100 text-accent border-2 border-dark rounded-xl hover:bg-red-200 transition-colors"
                title="Remove file"
              >
                <FaTrashAlt size={14} />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-success">
                Resume Selected Beta!
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Click "Get Judged" below to face the consequences.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-accent border-3 border-accent rounded-2xl text-center font-bold font-roast text-lg">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
