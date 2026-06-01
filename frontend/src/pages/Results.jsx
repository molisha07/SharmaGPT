import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnalysisContext, AuthContext } from '../App'
import { useVoice } from '../hooks/useVoice'
import SharmaAunty from '../components/avatar/SharmaAunty'
import ChappalAnimation from '../components/avatar/ChappalAnimation'
import EmotionalDamageReport from '../components/results/EmotionalDamageReport'
import ChappalThreatMeter from '../components/results/ChappalThreatMeter'
import SharmaJiComparison from '../components/results/SharmaJiComparison'
import FamilyFunctionSimulator from '../components/results/FamilyFunctionSimulator'
import RedFlagCards from '../components/results/RedFlagCards'
import MemeDisplay from '../components/results/MemeDisplay'
import CertificateView from '../components/results/CertificateView'
import RecoveryPlan from '../components/results/RecoveryPlan'
import { FaVolumeUp, FaVolumeMute, FaAward, FaCalendarCheck, FaFlag, FaImage } from 'react-icons/fa'

export default function Results() {
  const { user } = useContext(AuthContext)
  const { analysisResult } = useContext(AnalysisContext)
  const navigate = useNavigate()
  const { speak, stop, speaking, isMuted } = useVoice()

  const [activeTab, setActiveTab] = useState('scores')

  // Safely grab data or mock fallback for local developer review
  const report = analysisResult || JSON.parse(localStorage.getItem('sharmagpt_last_report') || 'null')

  useEffect(() => {
    if (!report) {
      navigate('/upload')
      return
    }
    // Save report to cache for reload stability
    localStorage.setItem('sharmagpt_last_report', JSON.stringify(report))
    
    // Automatically speak the Aunty's opening line on load!
    const timer = setTimeout(() => {
      speak(report.opening_line)
    }, 800)

    return () => stop()
  }, [report, navigate])

  if (!report) return null

  // Tabs mapping for layout neatness
  const tabItems = [
    { id: 'scores', label: 'Report & Scores', icon: '📈' },
    { id: 'comparison', label: 'Sharma Ji\'s Son', icon: '👦' },
    { id: 'flags', label: 'Red Flags', icon: '🚩' },
    { id: 'recovery', label: 'Recovery Plan', icon: '📅' },
    { id: 'memes', label: 'Sarcastic Memes', icon: '🖼️' },
    { id: 'certificate', label: 'Certificate', icon: '📜' },
  ]

  return (
    <div className="min-h-screen bg-cream py-6 sm:py-10 px-4 sm:px-6">
      {/* 1. Incoming Chappal Animation Layer */}
      <ChappalAnimation />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Sticky Aunty Avatar & Dramatic dialogue bubble */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 w-full">
          <div className="duo-card bg-white p-6 flex flex-col items-center text-center">
            {/* The SVG Reactant Avatar */}
            <div className="hover:scale-102 transition-transform duration-300">
              <SharmaAunty emotion={report.emotion_state} size={260} />
            </div>

            {/* Speach control */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => speak(report.opening_line)}
                className={`px-4 py-2 rounded-xl border-3 border-dark font-display font-black text-sm flex items-center gap-2 duo-btn
                  ${speaking ? 'bg-accent text-white animate-pulse' : 'bg-secondary text-dark hover:bg-yellow-400'}
                `}
              >
                {speaking ? 'Aunty Speaking...' : 'Hear Aunty Roast 🔊'}
              </button>
            </div>

            {/* Sarcastic Mother Dialog Box */}
            <div className="mt-6 p-4 bg-orange-100/50 border-3 border-dashed border-primary rounded-2xl relative w-full">
              {/* Arrow decoration */}
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-orange-100" />
              <p className="font-roast text-lg font-black text-dark leading-relaxed">
                "{report.opening_line}"
              </p>
            </div>
          </div>
          
          {/* Dynamic Sandal Threat Level Card */}
          <ChappalThreatMeter level={report.chappal_threat_level} />
        </div>

        {/* RIGHT COLUMN: Scrolling Tabs & Visual Report Widgets */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tab Navigation header */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide select-none border-b-4 border-dark">
            {tabItems.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  stop() // Stop speaking on tab change
                }}
                className={`px-4 py-2.5 font-display font-extrabold text-sm sm:text-base border-3 border-dark rounded-xl shrink-0 transition-all shadow-[2px_2px_0px_#1A1A2E] active:translate-y-0.5
                  ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-orange-50/20'}
                `}
              >
                <span className="mr-1.5">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel Render */}
          <div className="space-y-8">
            {activeTab === 'scores' && (
              <div className="space-y-8">
                <EmotionalDamageReport scores={report.scores} overallScore={report.overall_score} />
                <FamilyFunctionSimulator questions={report.family_function_questions} />
                
                {/* Section-by-section breakdown roasts */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-black text-dark uppercase tracking-wider text-center">
                    Section Roast Analysis
                  </h3>
                  
                  <div className="space-y-6">
                    {report.sections.map((sec, idx) => (
                      <div key={idx} className="duo-card bg-white p-6 relative">
                        <div className="flex items-center justify-between border-b-2 border-dark pb-2 mb-4">
                          <h4 className="text-xl font-display font-black text-dark uppercase">
                            🔍 {sec.name} section
                          </h4>
                          <span className="text-xs bg-orange-100 border border-dark rounded-full px-2.5 py-0.5 text-primary font-black uppercase">
                            criticized
                          </span>
                        </div>
                        
                        <div className="space-y-3 font-bold">
                          <p className="font-roast text-lg text-accent">
                            {sec.roast}
                          </p>
                          <p className="text-sm text-gray-500 font-mono italic">
                            {sec.damage}
                          </p>
                          <div className="mt-4 p-3 bg-cream border-2 border-dark rounded-xl text-sm">
                            <span className="text-success font-black mr-1">Fix It:</span> {sec.fix}
                          </div>
                          <div className="p-3 bg-emerald-50/10 border-2 border-dark rounded-xl text-sm">
                            <span className="text-primary font-black mr-1">Future Potential:</span> {sec.potential}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comparison' && (
              <SharmaJiComparison comparisonPoints={report.sharma_ji_son_comparison} />
            )}

            {activeTab === 'flags' && (
              <RedFlagCards 
                redFlags={report.red_flags} 
                tutorialSyndromeDetected={report.tutorial_syndrome_detected} 
              />
            )}

            {activeTab === 'recovery' && (
              <RecoveryPlan recoveryPlan={report.recovery_plan} />
            )}

            {activeTab === 'memes' && (
              <MemeDisplay memeUrls={report.meme_urls} initialMemes={report.memes} />
            )}

            {activeTab === 'certificate' && (
              <CertificateView 
                name={user?.name || 'Beta'} 
                scores={report.scores}
                chappalLevel={report.chappal_threat_level}
                overallScore={report.overall_score}
              />
            )}
          </div>

          {/* Sarcastic Supportive Closing Banner */}
          <div className="duo-card border-success bg-emerald-50/10 p-6 text-center">
            <h4 className="text-2xl font-display font-black text-success uppercase">
              Aunty's Final Note 🩴
            </h4>
            <p className="font-roast text-lg font-bold text-dark mt-2">
              "{report.closing_line}"
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
