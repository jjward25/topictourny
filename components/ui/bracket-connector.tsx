interface BracketConnectorProps {
  pairs: number
}

export function BracketConnector({ pairs }: BracketConnectorProps) {
  const total = pairs * 2
  const connectors = Array.from({ length: pairs }, (_, j) => {
    const topY = ((2 * j + 0.5) / total) * 100
    const botY = ((2 * j + 1.5) / total) * 100
    const midY = (topY + botY) / 2
    return { topY, botY, midY }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full overflow-visible"
    >
      {connectors.map(({ topY, botY, midY }, i) => (
        <g key={i} stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} fill="none">
          <path d={`M0,${topY} L50,${topY} L50,${botY} L0,${botY}`} vectorEffect="non-scaling-stroke" />
          <line x1={50} y1={midY} x2={100} y2={midY} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  )
}
