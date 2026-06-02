import { useState, useEffect } from 'react'

export function useVoice() {
  const [isMuted, setIsMuted] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const hasSpeechSupport = typeof window !== 'undefined' && !!window.speechSynthesis

  // Load mute state and sync with global navbar changes
  useEffect(() => {
    if (!hasSpeechSupport) return

    // Force preloading of voices for speech synthesis (essential for Chrome/Safari/Edge)
    const loadVoices = () => {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.getVoices()
        } catch (e) {
          console.warn("Failed to get voices:", e)
        }
      }
    }
    loadVoices()
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    const checkMute = () => {
      const muteStatus = localStorage.getItem('sharmagpt_mute') === 'true'
      setIsMuted(muteStatus)
      if (muteStatus && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel()
        } catch (e) {}
        setSpeaking(false)
      }
    }

    checkMute()
    window.addEventListener('sharmagpt_mute_changed', checkMute)
    
    // Periodically sync speaking state
    const interval = setInterval(() => {
      if (window.speechSynthesis) {
        try {
          setSpeaking(window.speechSynthesis.speaking)
        } catch (e) {
          setSpeaking(false)
        }
      }
    }, 500)

    return () => {
      window.removeEventListener('sharmagpt_mute_changed', checkMute)
      clearInterval(interval)
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel()
        } catch (e) {}
      }
    }
  }, [hasSpeechSupport])

  const speak = (text) => {
    if (!hasSpeechSupport || !text) return

    try {
      // 1. Cancel ongoing speeches safely
      window.speechSynthesis.cancel()
      
      const muteStatus = localStorage.getItem('sharmagpt_mute') === 'true'
      if (muteStatus) return

      const utterance = new SpeechSynthesisUtterance(text)
      
      // 2. Select en-IN/hi-IN voice if available (case-insensitive and highly tolerant)
      const voices = window.speechSynthesis.getVoices() || []
      const indianVoice = voices.find((voice) => {
        const lang = (voice.lang || '').toLowerCase()
        const name = (voice.name || '').toLowerCase()
        return (
          lang.includes('en-in') || 
          lang.includes('hi-in') || 
          name.includes('india') ||
          name.includes('indian') ||
          name.includes('heera') ||
          name.includes('ravi')
        )
      })
      
      if (indianVoice) {
        utterance.voice = indianVoice
      }
      
      // Motherly custom pacing and tone
      utterance.rate = 0.82 // Slightly slower for clear motherly diction
      utterance.pitch = 1.15 // Slightly higher pitch for aunty expression
      
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    } catch (e) {
      console.warn("Speech synthesis error:", e)
      setSpeaking(false)
    }
  }

  const stop = () => {
    if (hasSpeechSupport && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch (e) {}
    }
    setSpeaking(false)
  }

  return { speak, stop, speaking, isMuted }
}


