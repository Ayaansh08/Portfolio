import { useEffect, useState } from 'react'

function randomInRange(min, max, decimals = 2) {
  const value = Math.random() * (max - min) + min
  return value.toFixed(decimals)
}

function createCoordinates(section) {
  return {
    section: section?.toUpperCase() ?? 'UNKNOWN',
    x: randomInRange(-980.0, 980.0, 2),
    y: randomInRange(-420.0, 420.0, 2),
    z: randomInRange(-1600.0, 1600.0, 2),
  }
}

function CoordinatesReadout({ focusedSection }) {
  const [coords, setCoords] = useState(() => createCoordinates(focusedSection))

  useEffect(() => {
    setCoords(createCoordinates(focusedSection))
  }, [focusedSection])

  return (
    <aside
      style={{
        position: 'fixed',
        left: '28px',
        bottom: '78px',
        zIndex: 95,
        pointerEvents: 'none',
        border: '1px solid rgba(203,214,255,0.2)',
        background: 'rgba(6, 10, 22, 0.66)',
        backdropFilter: 'blur(8px)',
        padding: '8px 10px',
        minWidth: '210px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.18em',
          color: 'rgba(203,214,255,0.68)',
          marginBottom: '6px',
        }}
      >
        COORDINATES // {coords.section}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.1em',
          color: '#8dffbf',
          lineHeight: 1.5,
        }}
      >
        X: {coords.x}
        <br />
        Y: {coords.y}
        <br />
        Z: {coords.z}
      </div>
    </aside>
  )
}

export default CoordinatesReadout
