import { useEffect, useState } from 'react'

const links = [
  {
    id: 'email',
    label: 'EMAIL',
    href: 'mailto:ayaanshrawat892@gmail.com',
    tag: 'SIGNAL: STRONG',
  },
  {
    id: 'github',
    label: 'GITHUB',
    href: 'https://github.com/Ayaansh08',
    tag: 'CHANNEL: OPEN',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/ayaansh-rawat',
    tag: 'CHANNEL: OPEN',
  },
]

function Contact() {
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const styleId = 'orbitengine-contact-pulse-style'
    if (document.getElementById(styleId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleId
    styleTag.textContent = `
      @keyframes orbitengineBroadcastPulse {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 0.3; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'var(--color-accent)',
          opacity: 0.82,
        }}
      >
        COMMS TERMINAL
      </p>

      <div>
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '20px',
            color: 'var(--color-text)',
            marginBottom: '6px',
          }}
        >
          ESTABLISH COMMS LINK
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'rgba(240,244,255,0.58)',
          }}
        >
          TRANSMISSION READY - AWAITING RESPONSE
        </p>
        <p
          style={{
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: '#8FFFB8',
            animation: 'orbitengineBroadcastPulse 2.4s ease-in-out infinite',
          }}
        >
          {'\u25c9'} BROADCASTING
        </p>
      </div>

      <div style={{ borderTop: '1px solid rgba(203,214,255,0.2)' }}>
        {links.map((item) => {
          const isHovered = hovered === item.id
          return (
            <a
              key={item.id}
              className="interactive"
              href={item.href}
              target={item.id === 'email' ? '_self' : '_blank'}
              rel={item.id === 'email' ? undefined : 'noreferrer'}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                padding: '10px 8px',
                borderBottom: '1px solid rgba(203,214,255,0.2)',
                background: isHovered ? 'rgba(203,214,255,0.04)' : 'transparent',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: 'var(--color-text)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.12em',
                  color: 'rgba(240,244,255,0.46)',
                }}
              >
                {item.tag}
              </span>
            </a>
          )
        })}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: 'rgba(240,244,255,0.25)',
          marginTop: '8px',
          textAlign: 'center',
        }}
      >
        ORBITENGINE — {new Date().getFullYear()}
      </p>
    </section>
  )
}

export default Contact