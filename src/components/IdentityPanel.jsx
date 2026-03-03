import { useEffect } from 'react'

function IdentityPanel() {
  useEffect(() => {
    const styleId = 'orbitengine-identity-panel-style'
    if (document.getElementById(styleId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleId
    styleTag.textContent = `
      @keyframes orbitengineIdentityPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.25; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        left: '28px',
        zIndex: 100,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: '#00ff88',
          opacity: 0.8,
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '999px',
            background: '#00ff88',
            animation: 'orbitengineIdentityPulse 2s infinite',
          }}
        />
        <span>ONLINE</span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '18px',
          fontWeight: 700,
          color: '#F0F4FF',
          letterSpacing: '0.08em',
        }}
      >
        AYAANSH
      </div>

      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          color: '#CBD6FF',
          opacity: 0.7,
          letterSpacing: '0.05em',
        }}
      >
        Full Stack &amp; Backend Engineer
      </div>

      <div
        style={{
          width: '120px',
          height: '1px',
          background: 'var(--color-border)',
          margin: '4px 0',
        }}
      />

      <div
        style={{
          display: 'inline-flex',
          border: '1px solid rgba(0,255,136,0.2)',
          padding: '4px 8px',
          width: 'fit-content',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: '#00ff88',
          opacity: 0.6,
        }}
      >
        AVAILABLE FOR WORK
      </div>
    </div>
  )
}

export default IdentityPanel
