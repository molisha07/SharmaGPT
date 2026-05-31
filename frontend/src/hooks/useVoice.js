import { useState, useEffect } from 'react'

export function useVoice() {
  const [isMuted, setIsMuted] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  // Load mute state and sync with global navbar changes
  useEffect(() => {
    const checkMute = () => {
      const muteStatus = localStorage.getItem('sharmagpt_mute') === 'true'
      setIsMuted(muteStatus)
      if (muteStatus) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
      }
    }

    checkMute()
    window.addEventListener('sharmagpt_mute_changed', checkMute)
    
    // Periodically sync speaking state
    const interval = setInterval(() => {
      setSpeaking(window.speechSynthesis.speaking)
    }, 500)

    return () => {
      window.removeEventListener('sharmagpt_mute_changed', checkMute)
      clearInterval(interval)
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = (text) => {
    // 1. Cancel ongoing speeches
    window.speechSynthesis.cancel()
    
    const muteStatus = localStorage.getItem('sharmagpt_mute') === 'true'
    if (muteStatus || !text) return

    try {
      const utterance = new SpeechSynthesisUtterance(text)
      
      // 2. Select en-IN/hi-IN voice if available
      const voices = window.speechSynthesis.getVoices()
      const indianVoice = voices.find(
        (voice) => 
          voice.lang.includes('en-IN') || 
          voice.lang.includes('hi-IN') || 
          voice.name.includes('India') ||
          voice.name.includes('Indian')
      )
      
      if (indianVoice) {
        utterance.voice = indianVoice
      }
      
      // Motherly custom pacing and tone
      utterance.rate = 0.85
      utterance.pitch = 1.1
      
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
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return { speak, stop, speaking, isMuted }
}
