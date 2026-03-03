import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import TypewriterText from './TypewriterText'

const SECTIONS = ['about', 'projects', 'skills', 'contact']

function CockpitNav({ focusedSection, onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const panelRef = useRef(null)
  const scanlineRef = useRef(null)
  const leftArrowRef = useRef(null)
  const rightArrowRef = useRef(null)

  useEffect(() => {
    const styleId = 'orbitengine-cockpit-blink-style'
    if (document.getElementById(styleId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleId
    styleTag.textContent = `
      @keyframes orbitengineCockpitBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  const syncedIndex = useMemo(() => {
    if (!focusedSection) {
      return currentIndex
    }

    const index = SECTIONS.indexOf(focusedSection)
    return index >= 0 ? index : currentIndex
  }, [focusedSection, currentIndex])

  const labelText = useMemo(() => `[ ${SECTIONS[syncedIndex].toUpperCase()} ]`, [syncedIndex])

  const flashArrow = (arrowRef) => {
    if (!arrowRef.current) {
      return
    }

    gsap.fromTo(
      arrowRef.current,
      { opacity: 1 },
      { opacity: 0.2, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.out' },
    )
  }

  const sweepScanline = () => {
    if (!scanlineRef.current) {
      return
    }

    gsap.killTweensOf(scanlineRef.current)
    gsap.fromTo(
      scanlineRef.current,
      { left: '-100%', opacity: 0.8 },
      { left: '100%', opacity: 0.2, duration: 0.6, ease: 'power2.out' },
    )
  }

  const navigate = useCallback((direction, arrowRef) => {
    const nextIndex = (syncedIndex + direction + SECTIONS.length) % SECTIONS.length
    const section = SECTIONS[nextIndex]

    setCurrentIndex(nextIndex)
    flashArrow(arrowRef)
    sweepScanline()
    onNavigate?.(section)
  }, [onNavigate, syncedIndex])

  return (
    <nav
      ref={panelRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 8, 0.75)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(203, 214, 255, 0.1)',
        padding: '14px 32px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(180deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div
        ref={scanlineRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '-100%',
          width: '100%',
          height: '1px',
          background: 'rgba(0,255,136,0.3)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              color: '#7DFFAE',
              animation: 'orbitengineCockpitBlink 2s infinite',
              fontSize: '11px',
            }}
          >
            {'\u25cf'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.3em',
              color: 'var(--color-accent)',
              whiteSpace: 'nowrap',
            }}
          >
            {'\u25c8'} ORBITENGINE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            ref={leftArrowRef}
            type="button"
            className="interactive"
            onClick={() => navigate(-1, leftArrowRef)}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '18px',
              color: '#00ff88',
              background: 'transparent',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              padding: '6px 14px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)'
              event.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
              event.currentTarget.style.textShadow = '0 0 8px #00ff88'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = 'transparent'
              event.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.25)'
              event.currentTarget.style.textShadow = 'none'
            }}
          >
            {'\u25c4'}
          </button>

          <div
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#00ff88',
              minWidth: '140px',
              textAlign: 'center',
              padding: '6px 16px',
              border: '1px solid rgba(0, 255, 136, 0.15)',
              textShadow: '0 0 6px rgba(0, 255, 136, 0.5)',
              ['--color-accent']: '#00ff88',
            }}
          >
            <TypewriterText key={labelText} text={labelText} speed={60} />
          </div>

          <button
            ref={rightArrowRef}
            type="button"
            className="interactive"
            onClick={() => navigate(1, rightArrowRef)}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '18px',
              color: '#00ff88',
              background: 'transparent',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              padding: '6px 14px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)'
              event.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
              event.currentTarget.style.textShadow = '0 0 8px #00ff88'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = 'transparent'
              event.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.25)'
              event.currentTarget.style.textShadow = 'none'
            }}
          >
            {'\u25ba'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default CockpitNav
