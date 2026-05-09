import { useState } from 'react'
import BottomNav from '../components/BottomNav'

interface Quest {
  id: number
  title: string
  duration: string
  premium: boolean
  status: 'not-started' | 'completed' | 'in-progress' | 'locked'
  description: string
  practice: string
  reflection?: string
}

const quests: Quest[] = [
  {
    id: 1,
    title: 'The Sacral Audit',
    duration: '3 days',
    premium: false,
    status: 'not-started',
    description: 'A structured exploration of what your Sacral center is truly responding to — and what it has been silently rejecting. You will catalog your responses over 3 days and begin to distinguish genuine gut response from conditioned obligation.',
    practice: 'Each evening for 3 days, review your day and list 3 moments where you felt your Sacral respond. Note whether it was an "uh-huh" (expansion) or "unh-uh" (contraction). Look for patterns. What themes keep appearing in your yes responses? What keeps appearing in your no responses?',
  },
  {
    id: 2,
    title: 'The Yes Inventory',
    duration: '1 day',
    premium: false,
    status: 'completed',
    description: 'A single-day practice of noticing and cataloging every genuine Sacral yes — the things that genuinely lit you up today, however small.',
    practice: 'From the moment you wake, carry a small notebook. Every time you feel that upward, expansive gut feeling — the spontaneous "yes" — write it down. At the end of the day, read your list and notice the through-line.',
    reflection: "My list surprised me. The pattern that emerged: I light up for creative problems, unexpected conversations, and anything involving water or movement. I don't light up for performance reviews, group planning meetings, or scrolling. My Sacral clearly knows what it wants. I've just been ignoring it for 'practical' reasons.",
  },
  {
    id: 3,
    title: 'The Response Journal',
    duration: '7 days',
    premium: false,
    status: 'in-progress',
    description: 'A week-long practice of tracking how often you initiate versus respond — and what each feels like in your body. Generators are here to respond to life, not initiate. This journal helps you find the difference.',
    practice: 'Each morning, set an intention: "Today I will notice when something comes to me and wait for my Sacral to respond." Each evening, write: What came to me today? How did I respond? What did initiation feel like vs response? By Day 4, most Generators report a noticeable shift in their energy levels.',
  },
  {
    id: 4,
    title: 'Sacral Deconditioning',
    duration: '21 days',
    premium: true,
    status: 'locked',
    description: 'A deep 21-day process for unwinding years of Sacral suppression — learning to hear your gut response before your mind overwrites it.',
    practice: 'Daily audio meditations, body scans, and journaling prompts guide you through the layers of conditioning that have silenced your Sacral authority.',
  },
  {
    id: 5,
    title: 'Full Moon Tracking',
    duration: '28 days',
    premium: true,
    status: 'locked',
    description: 'Track your Sacral energy, emotional peaks, and response patterns across a full lunar cycle to discover your natural Generator rhythm.',
    practice: 'Daily moon phase tracking, energy ratings, and HD-aligned intentions synced to the lunar calendar.',
  },
]

export default function QuestsScreen() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [reflectionText, setReflectionText] = useState('')

  const completed = quests.filter(q => q.status === 'completed').length
  const total = quests.length

  return (
    <div className="min-h-screen warm-gradient-subtle pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-amber-900">Sacred Quests</h1>
            <p className="font-inter text-xs text-amber-700/60 mt-0.5">Generator path · {completed} of {total} complete</p>
          </div>
          <div className="text-right">
            <span className="font-playfair text-2xl font-bold text-amber-700">{completed}</span>
            <span className="font-inter text-amber-700/60 text-sm"> / {total}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 w-full h-2 rounded-full bg-amber-200/50">
          <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(completed / total) * 100}%` }} />
        </div>
      </div>

      {/* Quest cards */}
      <div className="px-4 space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`overflow-hidden transition-all duration-200 ${
              quest.status === 'locked' ? 'opacity-70' : ''
            } glass`}
          >
            <button
              className="w-full text-left px-4 py-4"
              onClick={() => quest.status !== 'locked' && setExpanded(expanded === quest.id ? null : quest.id)}
              disabled={quest.status === 'locked'}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {/* Status badge */}
                    {quest.status === 'completed' && (
                      <span className="flex items-center gap-1 text-[10px] font-inter font-medium text-green-700 bg-green-100/80 px-2 py-0.5 rounded-full">
                        ✓ Completed
                      </span>
                    )}
                    {quest.status === 'in-progress' && (
                      <span className="flex items-center gap-1 text-[10px] font-inter font-medium text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                        ◐ In Progress
                      </span>
                    )}
                    {quest.status === 'not-started' && (
                      <span className="flex items-center gap-1 text-[10px] font-inter font-medium text-amber-800/60 bg-amber-50/60 px-2 py-0.5 rounded-full">
                        ○ Not Started
                      </span>
                    )}
                    {quest.premium && (
                      <span className="flex items-center gap-1 text-[10px] font-inter font-medium text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded-full">
                        🔒 Premium
                      </span>
                    )}
                    <span className="text-[10px] font-inter text-amber-700/50">{quest.duration}</span>
                  </div>
                  <p className="font-playfair text-amber-900 font-semibold text-base">{quest.title}</p>
                </div>
                {quest.status !== 'locked' && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 text-amber-700/50 flex-shrink-0 mt-2 transition-transform duration-200 ${expanded === quest.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                )}
                {quest.status === 'locked' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-amber-700/40 flex-shrink-0 mt-2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                )}
              </div>
            </button>

            {/* Expanded content */}
            {expanded === quest.id && (
              <div className="px-4 pb-4 border-t border-white/30">
                <p className="font-inter text-sm text-amber-900/80 leading-relaxed mt-3 mb-4">
                  {quest.description}
                </p>

                {/* Practice section */}
                <div className="mb-4 bg-amber-50/40 rounded-2xl p-4 border border-amber-200/40">
                  <p className="font-inter text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-2">The Practice</p>
                  <p className="font-inter text-sm text-amber-900/80 leading-relaxed">{quest.practice}</p>
                </div>

                {/* Completed reflection */}
                {quest.status === 'completed' && quest.reflection && (
                  <div className="glass-amber p-4 mb-4">
                    <p className="font-inter text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-2">Your Reflection</p>
                    <p className="font-inter text-sm text-amber-900/90 leading-relaxed italic">"{quest.reflection}"</p>
                  </div>
                )}

                {/* In-progress: reflection textarea + complete button */}
                {quest.status === 'in-progress' && (
                  <div className="space-y-3">
                    <div className="glass-sm p-3">
                      <p className="font-inter text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-2">Your Reflection (Day 4 of 7)</p>
                      <textarea
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="Write your observations here..."
                        rows={4}
                        className="w-full bg-transparent font-inter text-sm text-amber-900 placeholder-amber-800/40 outline-none resize-none leading-relaxed"
                      />
                    </div>
                    <button className="w-full bg-amber-500/80 hover:bg-amber-500 text-white font-inter text-sm font-medium rounded-full py-3 transition-colors">
                      Mark Complete
                    </button>
                  </div>
                )}

                {/* Not started: begin button */}
                {quest.status === 'not-started' && (
                  <button className="w-full bg-white/80 hover:bg-white text-amber-900 font-inter text-sm font-medium rounded-full py-3 border border-amber-300/40 transition-colors">
                    Begin Quest →
                  </button>
                )}

                {/* Locked: premium CTA */}
                {quest.status === 'locked' && (
                  <div className="text-center py-2">
                    <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-inter text-sm font-medium rounded-full py-3 transition-colors shadow-lg shadow-amber-500/30">
                      Unlock with Premium ✦
                    </button>
                    <p className="font-inter text-xs text-amber-700/50 mt-2">Full access to all quests · $12/month</p>
                  </div>
                )}
              </div>
            )}

            {/* Locked overlay CTA (inline) */}
            {quest.status === 'locked' && (
              <div className="px-4 pb-4">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-inter text-sm font-medium rounded-full py-3 transition-colors shadow-lg shadow-amber-500/20">
                  Unlock with Premium ✦
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
