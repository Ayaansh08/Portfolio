import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import TypewriterText from './TypewriterText'

const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const Contact = lazy(() => import('./sections/Contact'))

const sectionMap = {
  about: About,
  projects: Projects,
  skills: Skills,
  contact: Contact,
}

const statusMap = {
  about: '// PERSONNEL FILE - CLEARED',
  projects: '// MISSION LOGS - ACCESSIBLE',
  skills: '// CAPABILITY MATRIX - LOADED',
  contact: '// COMMS CHANNEL - OPEN',
}

function Overlay({ section, onClose }) {
  const panelRef = useRef(null)
  const [completionBySection, setCompletionBySection] = useState({})

  const isHeaderComplete = Boolean(completionBySection[section]?.header)
  const isStatusComplete = Boolean(completionBySection[section]?.status)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      )
    }, panelRef)

    return () => {
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const styleId = 'orbitengine-typewriter-cursor-style'
    if (document.getElementById(styleId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleId
    styleTag.textContent = `
      @keyframes orbitengineTypeCursorBlink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[500] flex items-start justify-center overflow-y-auto"
      style={{
        backgroundColor: 'rgba(2, 2, 8, 0.58)',
        padding: '20px 0 88px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className="relative w-[92%] max-w-[760px]"
        style={{
          padding: 'clamp(16px, 2.2vw, 30px)',
          maxHeight: 'calc(100vh - 112px)',
          display: 'grid',
          gridTemplateRows: 'auto auto minmax(0, 1fr)',
          rowGap: '12px',
          overflow: 'hidden',
          background:
            'linear-gradient(rgba(12,12,24,0.9), rgba(8,8,20,0.94)), repeating-linear-gradient(180deg, rgba(203,214,255,0.02) 0px, rgba(203,214,255,0.02) 1px, transparent 1px, transparent 3px)',
          border: '1px solid rgba(203, 214, 255, 0.18)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '16px',
            height: '16px',
            borderTop: '1px solid rgba(203,214,255,0.4)',
            borderLeft: '1px solid rgba(203,214,255,0.4)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '16px',
            height: '16px',
            borderTop: '1px solid rgba(203,214,255,0.4)',
            borderRight: '1px solid rgba(203,214,255,0.4)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            width: '16px',
            height: '16px',
            borderBottom: '1px solid rgba(203,214,255,0.4)',
            borderLeft: '1px solid rgba(203,214,255,0.4)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '16px',
            height: '16px',
            borderBottom: '1px solid rgba(203,214,255,0.4)',
            borderRight: '1px solid rgba(203,214,255,0.4)',
            pointerEvents: 'none',
          }}
        />

        <div className="flex justify-between gap-6">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              opacity: 0.35,
              color: 'var(--color-text)',
              textTransform: 'uppercase',
            }}
          >
            SYSTEM: ONLINE | ACCESS: GRANTED | NODE: {section.toUpperCase()}
          </p>

          <button
            type="button"
            className="interactive"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
            onClick={onClose}
          >
            [ x BACK ]
          </button>
        </div>

        <div
          style={{
            border: '1px solid var(--color-border)',
            padding: '10px 16px',
            background: 'rgba(0,0,0,0.26)',
          }}
        >
          <TypewriterText
            key={`header-${section}`}
            text={`> ORBITENGINE // ${section.toUpperCase()}`}
            speed={35}
            onComplete={() =>
              setCompletionBySection((current) => ({
                ...current,
                [section]: {
                  ...current[section],
                  header: true,
                },
              }))
            }
          />

          {isHeaderComplete && (
            <div style={{ marginTop: '8px' }}>
              <TypewriterText
                key={`status-${section}`}
                text={statusMap[section] || '// LINK ESTABLISHED'}
                speed={30}
                onComplete={() =>
                  setCompletionBySection((current) => ({
                    ...current,
                    [section]: {
                      ...current[section],
                      status: true,
                    },
                  }))
                }
              />
            </div>
          )}
        </div>

        <div style={{ minHeight: 0, overflowY: 'auto', paddingRight: '4px' }}>
          {isStatusComplete && (
            <Suspense
              fallback={
                <p
                  style={{
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                  }}
                >
                  LOADING...
                </p>
              }
            >
              {(() => {
                const SectionComponent = sectionMap[section]
                return SectionComponent ? <SectionComponent /> : null
              })()}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}

export default Overlay
