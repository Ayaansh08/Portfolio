const MAP_SIZE = 136
const CENTER = MAP_SIZE / 2

const NODES = [
  { key: 'about', label: 'A', x: CENTER, y: 18 },
  { key: 'projects', label: 'P', x: MAP_SIZE - 18, y: CENTER },
  { key: 'skills', label: 'S', x: CENTER, y: MAP_SIZE - 18 },
  { key: 'contact', label: 'C', x: 18, y: CENTER },
]

function SectorMap({ activeSection }) {
  return (
    <aside
      style={{
        position: 'fixed',
        top: '196px',
        left: '28px',
        zIndex: 96,
        width: '184px',
        border: '1px solid rgba(203,214,255,0.16)',
        background: 'rgba(6, 10, 22, 0.68)',
        backdropFilter: 'blur(8px)',
        padding: '10px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(203,214,255,0.72)',
          marginBottom: '8px',
        }}
      >
        SECTOR MAP
      </div>

      <svg width={MAP_SIZE} height={MAP_SIZE} viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}>
        <rect
          x="1"
          y="1"
          width={MAP_SIZE - 2}
          height={MAP_SIZE - 2}
          fill="transparent"
          stroke="rgba(203,214,255,0.16)"
        />

        {NODES.map((node) => (
          <line
            key={`line-${node.key}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke="rgba(203,214,255,0.2)"
            strokeWidth="1"
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r="4" fill="#8fffb8" />

        {NODES.map((node) => {
          const isActive = activeSection === node.key
          return (
            <g key={node.key}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 4.5 : 3}
                fill={isActive ? '#00ff88' : '#CBD6FF'}
                opacity={isActive ? 1 : 0.72}
              />
              <text
                x={node.x + 7}
                y={node.y + 3}
                fill={isActive ? '#00ff88' : 'rgba(203,214,255,0.78)'}
                fontSize="8"
                style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.08em' }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </aside>
  )
}

export default SectorMap
