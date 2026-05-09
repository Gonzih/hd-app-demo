import { useState } from 'react'
import BottomNav from '../components/BottomNav'

interface JournalEntry {
  id: number
  date: string
  mood: string
  moodColor: string
  preview: string
  full: string
  reflection: string
}

const entries: JournalEntry[] = [
  {
    id: 1,
    date: 'May 9, 2026',
    mood: 'electric',
    moodColor: 'bg-yellow-400/80',
    preview: "Woke up with this restless energy I couldn't name. The kind that makes you rearrange furniture at 7am.",
    full: "Woke up with this restless energy I couldn't name. The kind that makes you rearrange furniture at 7am. I moved the desk to face the window and suddenly felt like I could breathe. Spent the morning deep in a new project idea — something about connecting local artists with spaces. My Sacral was humming the entire time. Felt fully alive. Is this what satisfaction feels like when it's clean and unforced?",
    reflection: "This 'rearranging furniture' energy is your Sacral coming online. Generators often feel their life force as a physical restlessness that needs a worthy channel. Your instinct to follow that energy — without explaining it — is your design working perfectly. The artist-space idea emerged from response, not initiation. Notice that distinction: it came to you, and your gut responded.",
  },
  {
    id: 2,
    date: 'May 7, 2026',
    mood: 'heavy',
    moodColor: 'bg-slate-400/80',
    preview: "The meeting ran three hours and I said yes to leading the Q3 report. I don't know why I said yes.",
    full: "The meeting ran three hours and I said yes to leading the Q3 report. I don't know why I said yes. David suggested it and everyone looked at me and the silence felt like an obligation. I drove home feeling hollowed out. Not tired — emptied. There's a difference. Ate cereal for dinner. Couldn't even decide what to watch.",
    reflection: "What you described — saying yes from silence and obligation, then feeling hollowed out — is the signature of your Not-Self in action. Frustration is the Generator's signal that something was initiated incorrectly. You weren't responding to a genuine Sacral pull; you were responding to social pressure. The cereal-and-hollowness evening is data. Next time, notice what that silence before speaking feels like in your body.",
  },
  {
    id: 3,
    date: 'May 4, 2026',
    mood: 'calm',
    moodColor: 'bg-blue-300/80',
    preview: "Long walk in the park. No podcast. Just the sound of water and leaves.",
    full: "Long walk in the park. No podcast. Just the sound of water and leaves. I've been trying this thing where I don't fill every silence with content. It feels uncomfortable at first and then something softens. Saw a heron standing in the pond for a full seven minutes without moving. I kept thinking: that's what presence looks like. No agenda. Just being ready to respond.",
    reflection: "The heron metaphor is more accurate than you know. Generators do their best work in a state of receptive readiness — not striving, not pushing, but fully present and available to respond. Your instinct to remove the podcasts is you listening to your design. Undefined Head and Ajna means mental noise isn't yours; it's amplified from the collective. The softening you felt in silence? That's your natural state.",
  },
  {
    id: 4,
    date: 'April 30, 2026',
    mood: 'scattered',
    moodColor: 'bg-orange-400/80',
    preview: "Started four things. Finished zero. The tab situation on my laptop is getting unhinged.",
    full: "Started four things. Finished zero. The tab situation on my laptop is getting unhinged. Tried to write the proposal, ended up researching studio rental costs in three cities. Tried to meditate, wrote a grocery list instead. I think I need sleep but also feel wired and anxious in this low hum way that won't stop. Deadline energy without a deadline.",
    reflection: "Scattered energy in a Generator often points to something initiated rather than responded to — projects started from 'should' rather than Sacral pull. The background low hum of anxiety is your undefined Root under pressure; it can amplify urgency that isn't truly yours. A simple reset: list the four things you started and ask your body, with eyes closed, which one feels alive right now. Do only that one.",
  },
]

const moodEmoji: Record<string, string> = {
  calm: '○',
  electric: '⚡',
  heavy: '◆',
  open: '◇',
  scattered: '✧',
}

export default function JournalScreen() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen warm-gradient-subtle pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-amber-900">Soul Journal</h1>
          <p className="font-inter text-xs text-amber-700/60 mt-0.5">{entries.length} entries</p>
        </div>
        <button className="bg-amber-500/80 hover:bg-amber-500 text-white font-inter text-sm font-medium rounded-full px-4 py-2 transition-colors">
          + New Entry
        </button>
      </div>

      {/* Entries */}
      <div className="px-4 space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="glass overflow-hidden">
            <button
              className="w-full text-left px-4 py-4"
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-inter text-xs text-amber-700/60">{entry.date}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-inter font-medium text-white px-2 py-0.5 rounded-full ${entry.moodColor}`}>
                      <span>{moodEmoji[entry.mood]}</span>
                      {entry.mood}
                    </span>
                  </div>
                  <p className="font-inter text-sm text-amber-900/80 leading-relaxed line-clamp-2">
                    {entry.preview}
                  </p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`w-4 h-4 text-amber-700/50 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded === entry.id ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </button>

            {/* Expanded content */}
            {expanded === entry.id && (
              <div className="px-4 pb-4 border-t border-white/30">
                <p className="font-inter text-sm text-amber-900/80 leading-relaxed mt-3 mb-4">
                  {entry.full}
                </p>
                <div className="glass-amber p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span className="font-inter text-xs text-amber-800 font-semibold uppercase tracking-wider">Through Your Design</span>
                  </div>
                  <p className="font-inter text-sm text-amber-900/90 leading-relaxed">
                    {entry.reflection}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
