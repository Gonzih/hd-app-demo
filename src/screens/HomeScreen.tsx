import BottomNav from '../components/BottomNav'
import Bodygraph from '../components/Bodygraph'
import { useNavigate } from 'react-router-dom'

const infoCards = [
  { label: 'Type', value: 'Generator' },
  { label: 'Strategy', value: 'To Respond' },
  { label: 'Authority', value: 'Sacral' },
  { label: 'Profile', value: '2/4' },
  { label: 'Signature', value: 'Satisfaction' },
  { label: 'Not-Self', value: 'Frustration' },
]

const shortcuts = [
  {
    id: 'chat',
    path: '/chat',
    label: 'Inner Guidance',
    sublabel: 'Ask your AI guide',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'journal',
    path: '/journal',
    label: 'Soul Journal',
    sublabel: 'Reflect & record',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <line x1="8" y1="7" x2="16" y2="7"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    id: 'dreams',
    path: '/dreams',
    label: 'Dream Portal',
    sublabel: 'Track your visions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
  {
    id: 'quests',
    path: '/quests',
    label: 'Sacred Quests',
    sublabel: 'Live your design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

export default function HomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen warm-gradient-subtle pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <p className="font-inter text-amber-700 text-sm font-medium mb-0.5">Good morning</p>
        <h1 className="font-playfair text-3xl font-bold text-amber-900 leading-tight">Sarah Chen</h1>
        <p className="font-inter text-amber-800/60 text-sm mt-1">Generator · 2/4 · Split Definition</p>
      </div>

      {/* Bodygraph */}
      <div className="mx-5 mb-5">
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-playfair text-amber-900 font-semibold text-lg">Your Bodygraph</span>
            <span className="font-inter text-xs text-amber-700 bg-amber-100/60 px-2.5 py-1 rounded-full">
              Right Angle Cross of Tension
            </span>
          </div>
          <Bodygraph />
          <div className="mt-3 flex gap-4 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-amber-500" />
              <span className="font-inter text-xs text-amber-800/70">Defined</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border border-amber-400/60" />
              <span className="font-inter text-xs text-amber-800/70">Undefined</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards horizontal scroll */}
      <div className="mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-5" style={{ width: 'max-content' }}>
          {infoCards.map((card) => (
            <div key={card.label} className="glass-sm px-4 py-3 min-w-[110px]">
              <p className="font-inter text-[10px] text-amber-700 uppercase tracking-wider font-semibold mb-1">{card.label}</p>
              <p className="font-playfair text-amber-900 font-semibold text-sm leading-tight">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Experiment */}
      <div className="mx-5 mb-5">
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-inter text-xs text-amber-700 uppercase tracking-wider font-semibold mb-0.5">Today's Experiment</p>
              <p className="font-playfair text-amber-900 font-semibold">Responding to Life</p>
            </div>
            <span className="font-inter text-amber-700 text-sm font-semibold">3 / 5</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-amber-200/50">
            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: '60%' }} />
          </div>
          <p className="font-inter text-xs text-amber-800/60 mt-2">interactions used today</p>
        </div>
      </div>

      {/* Quick access grid */}
      <div className="mx-5">
        <p className="font-inter text-xs text-amber-700 uppercase tracking-wider font-semibold mb-3">Quick Access</p>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.path)}
              className="glass p-4 text-left active:scale-[0.97] transition-transform duration-150"
            >
              <span className="text-amber-700 mb-2 block">{s.icon}</span>
              <p className="font-playfair text-amber-900 font-semibold text-sm">{s.label}</p>
              <p className="font-inter text-xs text-amber-800/50 mt-0.5">{s.sublabel}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
