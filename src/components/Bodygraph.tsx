import { BodyGraph, type ChartData } from '@gonzih/hd-bodygraph'

const CHART_DATA: ChartData = {
  definedCenters: ['Ego', 'G', 'Root', 'Sacral', 'SolarPlexus', 'Spleen'],
  channels: [
    [10, 57],
    [18, 58],
    [26, 44],
    [37, 40],
    [9,  52],
  ],
  gates: [
    // personality (conscious)
    ...[9, 16, 49, 4, 26, 61, 1].map(gate => ({ gate, coloring: 'personality' as const })),
    // design (unconscious)
    ...[40, 37, 30, 29, 6, 18, 57, 47, 58, 44].map(gate => ({ gate, coloring: 'design' as const })),
    // both
    ...[52, 38, 10].map(gate => ({ gate, coloring: 'both' as const })),
  ],
}

export default function Bodygraph() {
  return (
    <BodyGraph
      chart={CHART_DATA}
      style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}
    />
  )
}
