// Human Design Bodygraph SVG
// 9 centers at correct relative positions with channels and gate labels

interface Center {
  id: string
  label: string
  shape: 'square' | 'triangle-up' | 'triangle-down' | 'diamond'
  x: number
  y: number
  defined: boolean
  gateLabel?: string
}

const CENTERS: Center[] = [
  { id: 'head',   label: 'Head',   shape: 'triangle-up',   x: 160, y: 30,  defined: false },
  { id: 'ajna',   label: 'Ajna',   shape: 'triangle-down', x: 160, y: 100, defined: false },
  { id: 'throat', label: 'Throat', shape: 'square',        x: 160, y: 175, defined: true  },
  { id: 'g',      label: 'G',      shape: 'diamond',       x: 160, y: 255, defined: true  },
  { id: 'heart',  label: 'Heart',  shape: 'triangle-up',   x: 230, y: 240, defined: false },
  { id: 'sacral', label: 'Sacral', shape: 'square',        x: 160, y: 335, defined: true  },
  { id: 'spleen', label: 'Spleen', shape: 'triangle-up',   x: 85,  y: 265, defined: false },
  { id: 'sp',     label: 'S.Plx',  shape: 'triangle-up',   x: 240, y: 305, defined: true  },
  { id: 'root',   label: 'Root',   shape: 'square',        x: 160, y: 415, defined: false },
]

// Channels: [from center id, to center id, label]
const CHANNELS = [
  { from: 'throat', to: 'sacral', label: '20-34' },  // Charisma
  { from: 'spleen', to: 'g',      label: '57-10' },  // Brainwave
  { from: 'sp',     to: 'g',      label: '35-36' },  // Transitoriness (sp = solar plexus → g center, approximation for visual)
]

function getCenterAnchor(c: Center): [number, number] {
  const s = 22
  switch (c.shape) {
    case 'square':        return [c.x, c.y]
    case 'triangle-up':   return [c.x, c.y + s * 0.3]
    case 'triangle-down': return [c.x, c.y - s * 0.3]
    case 'diamond':       return [c.x, c.y]
  }
}

function renderShape(c: Center) {
  const s = 24
  const fill = c.defined ? '#d4956a' : 'none'
  const stroke = c.defined ? '#c17b45' : 'rgba(193,123,69,0.5)'
  const sw = 1.5

  switch (c.shape) {
    case 'square':
      return (
        <rect
          x={c.x - s} y={c.y - s}
          width={s * 2} height={s * 2}
          rx={4}
          fill={fill} stroke={stroke} strokeWidth={sw}
        />
      )
    case 'triangle-up': {
      const pts = `${c.x},${c.y - s} ${c.x + s * 1.1},${c.y + s * 0.7} ${c.x - s * 1.1},${c.y + s * 0.7}`
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
    }
    case 'triangle-down': {
      const pts = `${c.x},${c.y + s} ${c.x + s * 1.1},${c.y - s * 0.7} ${c.x - s * 1.1},${c.y - s * 0.7}`
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
    }
    case 'diamond': {
      const d2 = s * 1.3
      const pts = `${c.x},${c.y - d2} ${c.x + d2},${c.y} ${c.x},${c.y + d2} ${c.x - d2},${c.y}`
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
    }
  }
}

function getCenterById(id: string): Center | undefined {
  return CENTERS.find(c => c.id === id)
}

export default function Bodygraph() {
  const centerMap = Object.fromEntries(CENTERS.map(c => [c.id, c]))

  return (
    <svg
      viewBox="0 0 320 470"
      className="w-full max-w-[280px] mx-auto"
      style={{ filter: 'drop-shadow(0 4px 24px rgba(193,123,69,0.15))' }}
    >
      {/* Channel lines */}
      {CHANNELS.map((ch) => {
        const from = getCenterById(ch.from)
        const to = getCenterById(ch.to)
        if (!from || !to) return null
        const [x1, y1] = getCenterAnchor(from)
        const [x2, y2] = getCenterAnchor(to)
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2
        return (
          <g key={ch.label}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#d4956a" strokeWidth={2.5}
              strokeLinecap="round"
            />
            <text
              x={mx} y={my - 4}
              textAnchor="middle"
              fontSize="8"
              fill="#c17b45"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
            >
              {ch.label}
            </text>
          </g>
        )
      })}

      {/* Centers */}
      {CENTERS.map((c) => (
        <g key={c.id}>
          {renderShape(c)}
          <text
            x={c.x} y={c.y + 4}
            textAnchor="middle"
            fontSize={c.shape === 'diamond' ? '9' : '8'}
            fill={c.defined ? 'rgba(255,255,255,0.95)' : 'rgba(193,123,69,0.8)'}
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* Decorative vertical spine */}
      <line
        x1="160" y1="52" x2="160" y2="160"
        stroke="rgba(212,149,106,0.3)" strokeWidth="1" strokeDasharray="3,4"
      />
      <line
        x1="160" y1="200" x2="160" y2="235"
        stroke="rgba(212,149,106,0.3)" strokeWidth="1" strokeDasharray="3,4"
      />
      <line
        x1="160" y1="278" x2="160" y2="310"
        stroke="rgba(212,149,106,0.3)" strokeWidth="1" strokeDasharray="3,4"
      />
      <line
        x1="160" y1="358" x2="160" y2="390"
        stroke="rgba(212,149,106,0.3)" strokeWidth="1" strokeDasharray="3,4"
      />

      {/* Center map reference (unused variable suppressor) */}
      {Object.keys(centerMap).length === 0 && null}
    </svg>
  )
}
