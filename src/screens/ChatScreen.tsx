import { useState } from 'react'
import BottomNav from '../components/BottomNav'

interface Message {
  id: number
  role: 'ai' | 'user'
  text: string
  time: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: "Good morning, Sarah. I'm here to guide you from your Sacral authority. You mentioned feeling uncertain about the job offer — let's explore what your Sacral is telling you.",
    time: '9:14 AM',
  },
  {
    id: 2,
    role: 'user',
    text: "Yes, I got the offer yesterday. On paper it's perfect — better pay, remote work. But something feels off and I can't explain it.",
    time: '9:15 AM',
  },
  {
    id: 3,
    role: 'ai',
    text: "That 'something feels off' is exactly your Sacral speaking. As a Generator with Sacral authority, your gut response — that immediate, pre-verbal feeling — is your most reliable guide. Did you notice a physical sensation when you first read the offer?",
    time: '9:15 AM',
  },
  {
    id: 4,
    role: 'user',
    text: "There was a kind of tightness in my stomach. But I thought that was just nerves.",
    time: '9:16 AM',
  },
  {
    id: 5,
    role: 'ai',
    text: "That tightness is data, not nerves. Your Sacral communicates through the body before the mind can rationalize. The 'uh-huh' (yes) response feels like an upward, expanding energy — the 'unh-uh' (no) is often that contracting, tight feeling you described. Your Solar Plexus is also defined, so give yourself 24 hours before deciding. Don't let mental pressure override what your body already knows.",
    time: '9:16 AM',
  },
  {
    id: 6,
    role: 'user',
    text: "That actually makes so much sense. I've been trying to logic my way to an answer. What should I do while I wait?",
    time: '9:17 AM',
  },
  {
    id: 7,
    role: 'ai',
    text: "Notice what brings you satisfaction today — that's your Generator signature. Try this: close your eyes and imagine starting work at this new company on Monday. Don't think. Just feel. What is your Sacral's first response? That gut-level reaction, before any story forms around it, is your truth.",
    time: '9:17 AM',
  },
  {
    id: 8,
    role: 'user',
    text: "I tried it just now... there was a dull feeling. Not excited, not scared. Just... flat.",
    time: '9:18 AM',
  },
  {
    id: 9,
    role: 'ai',
    text: "Flatness is the Sacral's quiet 'no.' Generators thrive on work that lights them up — that sacral lit-up feeling is not optional, it's the fuel for your life force. A flat response to a 'perfect on paper' opportunity is your design protecting you from burnout. Trust it.",
    time: '9:18 AM',
  },
]

export default function ChatScreen() {
  const [messages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState('')

  return (
    <div className="min-h-screen warm-gradient-subtle flex flex-col pb-20">
      {/* Header */}
      <div className="glass-nav px-5 pt-12 pb-4 sticky top-0 z-10">
        <h1 className="font-playfair text-2xl font-bold text-amber-900">Inner Guidance</h1>
        <p className="font-inter text-xs text-amber-700/70 mt-0.5">Sacral Authority · Generator</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-amber-400/60 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="rgba(193,123,69,0.9)" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
            )}
            <div className="max-w-[78%]">
              <div
                className={`px-4 py-3 rounded-2xl text-sm font-inter leading-relaxed ${
                  msg.role === 'ai'
                    ? 'glass text-amber-900'
                    : 'bg-amber-500/80 text-white rounded-br-sm'
                }`}
                style={msg.role === 'user' ? {
                  background: 'rgba(193,123,69,0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(193,123,69,0.5)',
                  borderRadius: '18px 18px 4px 18px',
                } : {}}
              >
                {msg.text}
              </div>
              <p className={`font-inter text-[10px] text-amber-800/40 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-3">
        <p className="font-inter text-[11px] text-amber-700/60 text-center mb-2">2 interactions remaining today</p>
        <div className="glass-sm flex items-center gap-2 px-4 py-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your inner guide..."
            className="flex-1 bg-transparent font-inter text-sm text-amber-900 placeholder-amber-800/40 outline-none"
          />
          <button className="text-amber-700/60 hover:text-amber-700 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0 hover:bg-amber-600 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
