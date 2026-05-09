// Accurate Human Design Bodygraph — Maksim's real chart data

const CHART = {
  definedCenters: ['Ego', 'G', 'Root', 'Sacral', 'SolarPlexus', 'Spleen'],
  personalityGates: [9, 16, 49, 4, 26, 61, 1],
  designGates: [40, 37, 30, 29, 6, 18, 57, 47, 58, 44],
  bothGates: [52, 38, 10],
}

const allActiveGates = new Set([
  ...CHART.personalityGates,
  ...CHART.designGates,
  ...CHART.bothGates,
])

function gateColor(gate: number): string {
  if (CHART.bothGates.includes(gate)) return '#8B5CF6'
  if (CHART.personalityGates.includes(gate)) return '#1a1a1a'
  if (CHART.designGates.includes(gate)) return '#ef4444'
  return 'transparent'
}

function channelColor(g1: number, g2: number): string {
  const isBoth = (g: number) => CHART.bothGates.includes(g)
  const isPers = (g: number) => CHART.personalityGates.includes(g)
  const isDes  = (g: number) => CHART.designGates.includes(g)
  if (isBoth(g1) || isBoth(g2)) return '#8B5CF6'
  if (isPers(g1) && isPers(g2)) return '#1a1a1a'
  if (isDes(g1) || isDes(g2)) return '#ef4444'
  return '#8B5CF6'
}

type CenterDef = {
  id: string
  label: string
  shape: 'square' | 'triangle-up' | 'triangle-down' | 'diamond'
  cx: number
  cy: number
  w?: number
  h?: number
  size?: number
  defined: boolean
}

const CENTERS: CenterDef[] = [
  { id: 'Head',        label: 'Head',  shape: 'triangle-up',   cx: 200, cy: 45,  size: 46, defined: false },
  { id: 'Ajna',        label: 'Ajna',  shape: 'triangle-down', cx: 200, cy: 115, size: 46, defined: false },
  { id: 'Throat',      label: 'Throat',shape: 'square',        cx: 200, cy: 195, w: 70, h: 44, defined: false },
  { id: 'G',           label: 'G',     shape: 'diamond',       cx: 200, cy: 275, size: 56, defined: true  },
  { id: 'Ego',         label: 'Heart', shape: 'triangle-up',   cx: 278, cy: 248, size: 36, defined: true  },
  { id: 'Sacral',      label: 'Sacral',shape: 'square',        cx: 200, cy: 360, w: 88, h: 50, defined: true  },
  { id: 'SolarPlexus', label: 'S.Plx', shape: 'triangle-down', cx: 278, cy: 340, size: 52, defined: true  },
  { id: 'Spleen',      label: 'Spleen',shape: 'triangle-up',   cx: 122, cy: 310, size: 52, defined: true  },
  { id: 'Root',        label: 'Root',  shape: 'square',        cx: 200, cy: 450, w: 70, h: 44, defined: true  },
]

// [gate, cx, cy] — positions on the bodygraph
const GATE_POSITIONS: [number, number, number][] = [
  // Head-Ajna
  [64, 175, 62], [61, 200, 62], [63, 225, 62],
  [47, 178, 98], [24, 200, 98], [4,  222, 98],
  // Ajna-Throat
  [17, 174, 148], [11, 187, 148], [43, 200, 143], [23, 213, 148], [62, 226, 148],
  [16, 178, 175],
  // Throat
  [31, 168, 193], [8,  184, 193], [33, 200, 193], [45, 216, 193], [12, 232, 193],
  [35, 168, 212], [56, 184, 212], [20, 216, 212],
  // Throat-G
  [7,  175, 245], [1,  200, 245], [13, 225, 245],
  // G Center
  [2,  185, 268], [46, 200, 268], [15, 215, 268],
  [10, 175, 290], [25, 200, 290],
  // Ego/Heart
  [26, 261, 240], [51, 295, 248], [40, 278, 220],
  // G-Sacral
  [5,  184, 320], [14, 200, 315], [29, 216, 320],
  [34, 184, 345], [27, 200, 345], [59, 216, 345],
  // Sacral
  [9,  173, 365], [3,  188, 365], [42, 204, 365], [60, 220, 365],
  // Root
  [58, 172, 438], [38, 188, 438], [54, 204, 438], [53, 220, 438], [52, 236, 438],
  // Solar Plexus
  [36, 256, 320], [22, 294, 320],
  [30, 261, 340], [55, 295, 340],
  [49, 261, 358], [19, 295, 358],
  [37, 294, 376], [6,  261, 376],
  // Spleen
  [57, 108, 295], [44, 90,  310],
  [50, 108, 325], [32, 108, 342],
  [28, 90,  350], [18, 108, 362],
]

// Deduplicate — keep first occurrence
const gateMap = new Map<number, [number, number]>()
for (const [gate, cx, cy] of GATE_POSITIONS) {
  if (!gateMap.has(gate)) gateMap.set(gate, [cx, cy])
}

const ACTIVE_CHANNELS: [number, number][] = [
  [10, 57],
  [18, 58],
  [26, 44],
  [37, 40],
  [9,  52],
]

function renderCenter(c: CenterDef) {
  const fill     = c.defined ? 'rgba(217,149,100,0.85)' : 'none'
  const stroke   = c.defined ? 'rgba(193,123,69,0.9)' : 'rgba(255,255,255,0.5)'
  const sw       = 2
  const textFill = c.defined ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)'

  if (c.shape === 'square') {
    const hw = (c.w ?? 70) / 2
    const hh = (c.h ?? 44) / 2
    return (
      <g key={c.id}>
        <rect x={c.cx - hw} y={c.cy - hh} width={c.w ?? 70} height={c.h ?? 44}
          rx={4} fill={fill} stroke={stroke} strokeWidth={sw} />
        <text x={c.cx} y={c.cy + 4} textAnchor="middle" fontSize="9"
          fill={textFill} fontFamily="monospace" fontWeight="700">{c.label}</text>
      </g>
    )
  }
  if (c.shape === 'triangle-up') {
    const s = c.size ?? 46
    const pts = `${c.cx},${c.cy - s * 0.67} ${c.cx + s * 0.78},${c.cy + s * 0.45} ${c.cx - s * 0.78},${c.cy + s * 0.45}`
    return (
      <g key={c.id}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
        <text x={c.cx} y={c.cy + s * 0.22} textAnchor="middle" fontSize="8"
          fill={textFill} fontFamily="monospace" fontWeight="700">{c.label}</text>
      </g>
    )
  }
  if (c.shape === 'triangle-down') {
    const s = c.size ?? 46
    const pts = `${c.cx},${c.cy + s * 0.67} ${c.cx + s * 0.78},${c.cy - s * 0.45} ${c.cx - s * 0.78},${c.cy - s * 0.45}`
    return (
      <g key={c.id}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
        <text x={c.cx} y={c.cy + s * 0.1} textAnchor="middle" fontSize="8"
          fill={textFill} fontFamily="monospace" fontWeight="700">{c.label}</text>
      </g>
    )
  }
  if (c.shape === 'diamond') {
    const s = c.size ?? 56
    const pts = `${c.cx},${c.cy - s} ${c.cx + s},${c.cy} ${c.cx},${c.cy + s} ${c.cx - s},${c.cy}`
    return (
      <g key={c.id}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
        <text x={c.cx} y={c.cy + 4} textAnchor="middle" fontSize="9"
          fill={textFill} fontFamily="monospace" fontWeight="700">{c.label}</text>
      </g>
    )
  }
  return null
}

export default function Bodygraph() {
  return (
    <svg
      viewBox="0 0 400 510"
      className="w-full max-w-[340px] mx-auto"
      style={{ filter: 'drop-shadow(0 4px 24px rgba(139,92,246,0.12))' }}
    >
      {/* Channel lines — drawn first so centers appear on top */}
      {ACTIVE_CHANNELS.map(([g1, g2]) => {
        const p1 = gateMap.get(g1)
        const p2 = gateMap.get(g2)
        if (!p1 || !p2) return null
        const color = channelColor(g1, g2)
        return (
          <line
            key={`ch-${g1}-${g2}`}
            x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
            stroke={color} strokeWidth={4} strokeLinecap="round"
            opacity={0.85}
          />
        )
      })}

      {/* Centers */}
      {CENTERS.map(renderCenter)}

      {/* Gate dots + labels for active gates only */}
      {Array.from(gateMap.entries()).map(([gate, [cx, cy]]) => {
        if (!allActiveGates.has(gate)) return null
        const color = gateColor(gate)
        return (
          <g key={`gate-${gate}`}>
            <circle cx={cx} cy={cy} r={5.5} fill={color} stroke="#fff" strokeWidth={1.2} />
            <text x={cx + 8} y={cy + 3} fontSize="7" fill={color}
              fontFamily="monospace" fontWeight="700">{gate}</text>
          </g>
        )
      })}

      {/* Legend */}
      <g transform="translate(10, 492)">
        <circle cx={6} cy={6} r={5} fill="#1a1a1a" stroke="#fff" strokeWidth={1} />
        <text x={14} y={10} fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="monospace">Conscious</text>
        <circle cx={86} cy={6} r={5} fill="#ef4444" stroke="#fff" strokeWidth={1} />
        <text x={94} y={10} fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="monospace">Unconscious</text>
        <circle cx={186} cy={6} r={5} fill="#8B5CF6" stroke="#fff" strokeWidth={1} />
        <text x={194} y={10} fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="monospace">Both</text>
      </g>
    </svg>
  )
}
