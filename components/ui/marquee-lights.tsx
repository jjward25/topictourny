interface MarqueeLightsProps {
  count?: number
  className?: string
}

export function MarqueeLights({ count = 16, className = "" }: MarqueeLightsProps) {
  return (
    <div className={`flex justify-between px-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gold shadow-glow-amber animate-twinkle"
          style={{ animationDelay: `${(i % 8) * 0.15}s` }}
        />
      ))}
    </div>
  )
}
