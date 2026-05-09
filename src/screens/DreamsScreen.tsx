import { useState } from 'react'
import BottomNav from '../components/BottomNav'

interface Dream {
  id: number
  title: string
  date: string
  emotions: string[]
  emotionColors: string[]
  full: string
  symbols: string[]
  interpretation: string
}

const dreams: Dream[] = [
  {
    id: 1,
    title: 'The House With Infinite Rooms',
    date: 'May 8, 2026',
    emotions: ['wonder', 'unease', 'curious'],
    emotionColors: ['bg-purple-400/70', 'bg-slate-400/70', 'bg-teal-400/70'],
    full: "I was in a house — familiar but not mine. Each room I entered led to another I hadn't noticed before. Some rooms were filled with things I recognized from childhood. One room was entirely underwater, silent and blue-green, and I could breathe perfectly. In the deepest room there was a door made of light, and behind it I could hear voices that sounded like my own voice at different ages. I didn't go through. I woke up before I decided.",
    symbols: ['house', 'infinite rooms', 'underwater room', 'door of light', 'multiple voices'],
    interpretation: "The infinite house is the psyche — you're in an active phase of inner exploration, which aligns with your 2/4 profile. The Hermit (line 2) needs to go inward to discover what's natural to them. The underwater room where you could breathe perfectly signals that your emotions (Solar Plexus defined) are a realm of strength, not danger — you're at home in depth. The door of light with many voices of yourself suggests a coming integration: different aspects of your identity are ready to be acknowledged. Your 2/4 profile often 'knows' things before consciously deciding — the fact you stopped at the threshold is your design working, not avoidance.",
  },
  {
    id: 2,
    title: 'Running Through Water',
    date: 'May 3, 2026',
    emotions: ['urgency', 'frustration', 'relief'],
    emotionColors: ['bg-red-400/70', 'bg-orange-400/70', 'bg-green-400/70'],
    full: "I was running to catch something — a train, I think, or maybe a person. Every step felt like moving through thick water. My legs knew the motion but the world resisted. I was so frustrated I wanted to scream. Then I stopped running. The moment I stopped, everything around me went still — the water-resistance dissolved and I could move freely, but there was nothing left to chase. I stood in an open field and felt okay about that.",
    symbols: ['running', 'water resistance', 'missed train/person', 'open field', 'stopping'],
    interpretation: "Water resistance in dreams is classic Generator not-self — the frustration of pushing and initiating rather than responding. You running to catch something you didn't quite see is the mind overriding the body's wisdom. The pivotal moment: when you stopped, freedom returned. This dream is rehearsing your experiment. The open field after the chase ends is satisfaction without an external target — pure Generator energy with nowhere to be but present. Your design is reminding you in sleep: stop chasing, start responding.",
  },
  {
    id: 3,
    title: 'The Red Thread',
    date: 'April 28, 2026',
    emotions: ['calm', 'connected', 'bittersweet'],
    emotionColors: ['bg-blue-300/70', 'bg-pink-400/70', 'bg-amber-400/70'],
    full: "A red thread was tied around my left wrist. I followed it — it wound through a garden, into a forest, across a river. It connected to other people: some I knew, some strangers. One end was tied to an older version of myself sitting under a tree, writing. She looked up and smiled like she wasn't surprised to see me. The thread didn't feel like a trap. It felt like a map.",
    symbols: ['red thread', 'wrist', 'garden and forest', 'river crossing', 'future self', 'writing'],
    interpretation: "The red thread across many traditions represents fate and connection — in HD terms, this maps to your defined channels, the 'wires' that connect your centers. Your active channels (20-34 Charisma, 57-10 Brainwave, 35-36 Transitoriness) are all about communication, intuitive knowing, and the richness of experience. The older self writing under the tree is your G Center's true direction emerging — the self following its unique trajectory. The thread as a map rather than a trap is exactly right for your profile: the 2/4 is meant to be found, to be networked, to follow the thread of their own nature.",
  },
]

export default function DreamsScreen() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="min-h-screen warm-gradient-subtle pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-amber-900">Dream Portal</h1>
          <p className="font-inter text-xs text-amber-700/60 mt-0.5">{dreams.length} recorded dreams</p>
        </div>
        <button className="bg-amber-500/80 hover:bg-amber-500 text-white font-inter text-sm font-medium rounded-full px-4 py-2 transition-colors">
          + Log Dream
        </button>
      </div>

      {/* Dream list */}
      <div className="px-4 space-y-3">
        {dreams.map((dream) => (
          <div key={dream.id} className="glass overflow-hidden">
            <button
              className="w-full text-left px-4 py-4"
              onClick={() => setExpanded(expanded === dream.id ? null : dream.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-amber-600/60">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    <span className="font-inter text-xs text-amber-700/60">{dream.date}</span>
                  </div>
                  <p className="font-playfair text-amber-900 font-semibold text-base mb-2">{dream.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dream.emotions.map((em, i) => (
                      <span key={em} className={`text-[10px] font-inter font-medium text-white px-2 py-0.5 rounded-full ${dream.emotionColors[i]}`}>
                        {em}
                      </span>
                    ))}
                  </div>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`w-4 h-4 text-amber-700/50 flex-shrink-0 mt-2 transition-transform duration-200 ${expanded === dream.id ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </button>

            {/* Expanded */}
            {expanded === dream.id && (
              <div className="px-4 pb-4 border-t border-white/30">
                <p className="font-inter text-sm text-amber-900/80 leading-relaxed mt-3 mb-3">
                  {dream.full}
                </p>

                {/* Symbols */}
                <div className="mb-4">
                  <p className="font-inter text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-2">Symbols & Objects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dream.symbols.map((sym) => (
                      <span key={sym} className="text-xs font-inter text-amber-800 bg-white/40 border border-amber-300/40 px-2.5 py-1 rounded-full">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HD Interpretation */}
                <div className="glass-amber p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span className="font-inter text-xs text-amber-800 font-semibold uppercase tracking-wider">HD Interpretation</span>
                  </div>
                  <p className="font-inter text-sm text-amber-900/90 leading-relaxed">
                    {dream.interpretation}
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
