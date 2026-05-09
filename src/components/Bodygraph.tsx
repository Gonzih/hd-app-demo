// Accurate Human Design Bodygraph — Maksim's real chart data
// ViewBox: 500×560 — canonical HD center geometry with exact vertices

const CHART = {
  definedCenters: new Set(['Ego', 'G', 'Root', 'Sacral', 'SolarPlexus', 'Spleen']),
  personalityGates: new Set([9, 16, 49, 4, 26, 61, 1]),
  designGates:      new Set([40, 37, 30, 29, 6, 18, 57, 47, 58, 44]),
  bothGates:        new Set([52, 38, 10]),
}

const allActiveGates = new Set([
  ...CHART.personalityGates,
  ...CHART.designGates,
  ...CHART.bothGates,
])

function gateColor(gate: number): string {
  if (CHART.bothGates.has(gate))        return '#7c3aed'
  if (CHART.personalityGates.has(gate)) return '#1a1a1a'
  if (CHART.designGates.has(gate))      return '#ef4444'
  return 'none'
}

function channelColor(g1: number, g2: number): string {
  if (CHART.bothGates.has(g1) || CHART.bothGates.has(g2))               return '#7c3aed'
  if (CHART.personalityGates.has(g1) && CHART.personalityGates.has(g2)) return '#1a1a1a'
  return '#ef4444'
}

// One position per gate — placed at or just outside the center boundary port.
// Centers are drawn ON TOP of channels; gate dots drawn last (on top of centers).
// Straight channel lines that cross a center are correctly hidden behind it — this
// matches how official HD bodygraph charts render (standard practice).
const GATE_POS: Record<number, [number, number]> = {
  // HEAD — triangle-up (250,20 / 210,80 / 290,80): ports on bottom edge y≈78
  64: [235, 78],  61: [250, 78],  63: [265, 78],

  // AJNA — triangle-down (210,95 / 290,95 / 250,155): ports on bottom edge y≈153
  47: [232, 153], 24: [250, 153], 4:  [268, 153],

  // THROAT — rect (185,170 w=130 h=50): top edge, sides, bottom edge
  17: [210, 172], 11: [224, 172], 43: [238, 172],
  23: [262, 172], 62: [278, 172], 56: [292, 172],
  16: [188, 193],                                   // left side
  12: [313, 185], 45: [313, 200],                   // right side → Ego
  8:  [205, 218], 33: [222, 218], 20: [240, 218],   // bottom edge
  35: [260, 218], 31: [278, 218],

  // G CENTER — diamond (250,235 / 315,300 / 250,365 / 185,300)
  1:  [250, 237],                   // top port → Throat
  7:  [183, 292], 10: [183, 308],   // left ports → Spleen
  25: [317, 292],                   // right port → Ego
  2:  [242, 362], 46: [258, 362],   // bottom ports → Sacral
  13: [252, 355], 15: [250, 300],

  // EGO/HEART — triangle-up (295,210 / 345,210 / 320,260)
  26: [297, 220], 51: [337, 220],
  21: [327, 252], 40: [307, 254],

  // SACRAL — rect (185,385 w=130 h=55): top edge, left side, bottom edge
  5:  [207, 387], 14: [228, 387], 29: [250, 387],
  34: [272, 387], 9:  [183, 412],
  27: [222, 438], 59: [245, 438], 3:  [268, 438], 42: [290, 438],

  // ROOT — rect (200,460 w=100 h=40): top edge y≈462
  58: [215, 462], 38: [230, 462], 54: [248, 462],
  53: [265, 462], 52: [280, 462],

  // SOLAR PLEXUS — triangle-down (295,345 / 390,345 / 342,415): left-side ports
  36: [298, 350], 22: [318, 358],
  30: [300, 365], 55: [320, 374],
  49: [300, 380], 19: [318, 390],
  37: [293, 400],  6: [302, 410],

  // SPLEEN — triangle-up (110,330 / 200,330 / 155,405): right-edge ports
  57: [198, 338], 44: [193, 355],
  50: [185, 372], 32: [175, 388],
  28: [162, 402], 18: [152, 412],
  48: [158, 420],
}

// Active channels — straight lines; centers rendered on top cover any crossing
const ACTIVE_CHANNELS: [number, number][] = [
  [10, 57],  // G-left ↔ Spleen-right  (purple — gate 10 is both)
  [18, 58],  // Spleen-bottom ↔ Root   (red — both design)
  [26, 44],  // Ego ↔ Spleen           (red — gate 44 design)
  [37, 40],  // SolarPlexus ↔ Ego      (red — both design)
  [9,  52],  // Sacral-left ↔ Root     (purple — gate 52 is both)
]

const FILL_DEF     = 'rgba(212,149,106,0.88)'
const STROKE_DEF   = 'rgba(185,115,65,0.9)'
const STROKE_UNDEF = 'rgba(255,255,255,0.25)'
const SW           = 2.5
const TEXT_DEF     = 'rgba(255,255,255,0.95)'
const TEXT_UNDEF   = 'rgba(255,255,255,0.35)'

function cf(id: string) { return CHART.definedCenters.has(id) ? FILL_DEF    : 'none' }
function cs(id: string) { return CHART.definedCenters.has(id) ? STROKE_DEF  : STROKE_UNDEF }
function ct(id: string) { return CHART.definedCenters.has(id) ? TEXT_DEF    : TEXT_UNDEF }

export default function Bodygraph() {
  return (
    <svg
      viewBox="0 0 500 560"
      width="100%"
      style={{
        maxWidth: 400,
        display: 'block',
        margin: '0 auto',
        filter: 'drop-shadow(0 4px 24px rgba(139,92,246,0.12))',
      }}
    >
      {/* ── 1. CHANNEL LINES — drawn first; center shapes render on top ── */}
      {ACTIVE_CHANNELS.map(([g1, g2]) => {
        const p1 = GATE_POS[g1]
        const p2 = GATE_POS[g2]
        if (!p1 || !p2) return null
        return (
          <line
            key={`ch-${g1}-${g2}`}
            x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]}
            stroke={channelColor(g1, g2)}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={0.9}
          />
        )
      })}

      {/* ── 2. CENTER SHAPES — cover channel lines where paths cross ── */}

      {/* HEAD — triangle-up */}
      <polygon points="250,20 210,80 290,80"
        fill={cf('Head')} stroke={cs('Head')} strokeWidth={SW} />
      <text x="250" y="60" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('Head')}>HEAD</text>

      {/* AJNA — triangle-down */}
      <polygon points="210,95 290,95 250,155"
        fill={cf('Ajna')} stroke={cs('Ajna')} strokeWidth={SW} />
      <text x="250" y="122" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('Ajna')}>AJNA</text>

      {/* THROAT — rectangle */}
      <rect x="185" y="170" width="130" height="50" rx="3"
        fill={cf('Throat')} stroke={cs('Throat')} strokeWidth={SW} />
      <text x="250" y="199" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('Throat')}>THROAT</text>

      {/* G CENTER — diamond */}
      <polygon points="250,235 315,300 250,365 185,300"
        fill={cf('G')} stroke={cs('G')} strokeWidth={SW} />
      <text x="250" y="304" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('G')}>G</text>

      {/* EGO/HEART — triangle-up */}
      <polygon points="295,210 345,210 320,260"
        fill={cf('Ego')} stroke={cs('Ego')} strokeWidth={SW} />
      <text x="320" y="238" textAnchor="middle" fontSize="8" fontWeight="700"
        fontFamily="monospace" fill={ct('Ego')}>EGO</text>

      {/* SACRAL — rectangle */}
      <rect x="185" y="385" width="130" height="55" rx="3"
        fill={cf('Sacral')} stroke={cs('Sacral')} strokeWidth={SW} />
      <text x="250" y="417" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('Sacral')}>SACRAL</text>

      {/* SOLAR PLEXUS — triangle-down */}
      <polygon points="295,345 390,345 342,415"
        fill={cf('SolarPlexus')} stroke={cs('SolarPlexus')} strokeWidth={SW} />
      <text x="342" y="382" textAnchor="middle" fontSize="8" fontWeight="700"
        fontFamily="monospace" fill={ct('SolarPlexus')}>S.PLX</text>

      {/* SPLEEN — triangle-up */}
      <polygon points="110,330 200,330 155,405"
        fill={cf('Spleen')} stroke={cs('Spleen')} strokeWidth={SW} />
      <text x="155" y="366" textAnchor="middle" fontSize="8" fontWeight="700"
        fontFamily="monospace" fill={ct('Spleen')}>SPLEEN</text>

      {/* ROOT — rectangle */}
      <rect x="200" y="460" width="100" height="40" rx="3"
        fill={cf('Root')} stroke={cs('Root')} strokeWidth={SW} />
      <text x="250" y="485" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="monospace" fill={ct('Root')}>ROOT</text>

      {/* ── 3. GATE DOTS — active gates only, drawn last (top layer) ── */}
      {Object.entries(GATE_POS).map(([gStr, [cx, cy]]) => {
        const gate = Number(gStr)
        if (!allActiveGates.has(gate)) return null
        const col = gateColor(gate)
        const labelLeft = cx < 220
        return (
          <g key={`gate-${gate}`}>
            <circle cx={cx} cy={cy} r={5.5}
              fill={col} stroke="#fff" strokeWidth={1.5} opacity={0.95} />
            <text
              x={labelLeft ? cx - 8 : cx + 8}
              y={cy + 4}
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="700"
              fill={col}
              textAnchor={labelLeft ? 'end' : 'start'}
            >{gate}</text>
          </g>
        )
      })}

      {/* ── 4. LEGEND ── */}
      <g transform="translate(40, 510)">
        <circle cx={8} cy={8} r={5.5} fill="#1a1a1a" stroke="#fff" strokeWidth={1.5} />
        <text x={18} y={13} fontSize="9" fontFamily="monospace"
          fill="rgba(255,255,255,0.55)">Conscious</text>

        <circle cx={118} cy={8} r={5.5} fill="#ef4444" stroke="#fff" strokeWidth={1.5} />
        <text x={128} y={13} fontSize="9" fontFamily="monospace"
          fill="rgba(255,255,255,0.55)">Unconscious</text>

        <circle cx={248} cy={8} r={5.5} fill="#7c3aed" stroke="#fff" strokeWidth={1.5} />
        <text x={258} y={13} fontSize="9" fontFamily="monospace"
          fill="rgba(255,255,255,0.55)">Both</text>
      </g>
    </svg>
  )
}
