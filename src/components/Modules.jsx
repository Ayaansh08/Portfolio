import { useEffect, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { NODE_LAYOUT } from '../data/nodeLayout'

const POD_LABELS = NODE_LAYOUT.map((node) => ({
  label: node.label,
  sectionKey: node.sectionKey,
  position: [node.position[0], node.position[1] + 1.2, node.position[2]],
}))

function Modules({ hoveredSection, focusedSection }) {
  const labelRefs = useRef([])

  useEffect(() => {
    const styleTagId = 'orbitengine-label-blink-style'
    if (document.getElementById(styleTagId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleTagId
    styleTag.textContent = `
      @keyframes orbitengineHudBlink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .orbitengine-hud-cursor {
        display: inline-block;
        margin-left: 4px;
        animation: orbitengineHudBlink 0.8s steps(1, end) infinite;
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  useFrame(({ clock }) => {
    for (let i = 0; i < POD_LABELS.length; i += 1) {
      const node = labelRefs.current[i]
      if (!node) {
        continue
      }

      const pulse = 0.8 + Math.sin(clock.elapsedTime * ((Math.PI * 2) / 3) + i * 0.8) * 0.2
      const hoverBoost = hoveredSection === POD_LABELS[i].sectionKey ? 0.1 : 0
      node.style.opacity = `${Math.min(1, pulse + hoverBoost)}`
    }
  })

  return (
    <>
      {POD_LABELS.map((pod, index) => (
        pod.sectionKey === focusedSection ? null : (
        <Html
          key={pod.sectionKey}
          position={pod.position}
          center
          distanceFactor={8}
          pointerEvents="none"
        >
          <div
            ref={(element) => {
              labelRefs.current[index] = element
            }}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#CBD6FF',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'rgba(203,214,255,0.4)',
              }}
            />
            <span>
              [ {pod.label} ]
              <span className="orbitengine-hud-cursor">_</span>
            </span>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'rgba(203,214,255,0.4)',
              }}
            />
          </div>
        </Html>
        )
      ))}
    </>
  )
}

export default Modules
