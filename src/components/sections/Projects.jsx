import { useState } from 'react'
import projects from '../../data/projects.js'

function Projects() {
  const [hoveredMission, setHoveredMission] = useState(null)

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
        MISSION ARCHIVE
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '10px',
        }}
      >
        {projects.map((project, index) => {
          const isHovered = hoveredMission === project.id
          const status = project.status || (index % 2 === 0 ? 'DEPLOYED' : 'ACTIVE')
          const statusColor =
            status === 'ACTIVE' ? '#9fd6ff' : status === 'DEPLOYED' ? '#9AEAC6' : '#ffd37d'

          return (
            <article
              key={project.id}
              className="interactive"
              onMouseEnter={() => setHoveredMission(project.id)}
              onMouseLeave={() => setHoveredMission(null)}
              style={{
                border: isHovered
                  ? '1px solid rgba(203,214,255,0.34)'
                  : '1px solid rgba(203,214,255,0.18)',
                background: 'rgba(6,6,16,0.62)',
                padding: '12px',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '7px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    color: 'rgba(240,244,255,0.45)',
                  }}
                >
                  MISSION {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    color: statusColor,
                    border: `1px solid ${statusColor}55`,
                    padding: '2px 6px',
                  }}
                >
                  [ {status} ]
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--color-text)',
                  marginBottom: '7px',
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: 'rgba(240,244,255,0.7)',
                  lineHeight: 1.45,
                  marginBottom: '9px',
                }}
              >
                {project.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '10px',
                }}
              >
                {project.stack.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--color-accent)',
                      border: '1px solid rgba(203,214,255,0.18)',
                      padding: '2px 6px',
                    }}
                  >
                    {`<SYS: ${tech}>`}
                  </span>
                ))}
              </div>

              {project.note && (
                <p
                  style={{
                    marginBottom: '10px',
                    border: '1px solid rgba(255,211,125,0.35)',
                    background: 'rgba(255,211,125,0.08)',
                    padding: '6px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.08em',
                    color: '#ffd37d',
                    lineHeight: 1.45,
                  }}
                >
                  [ CAUTION ] {project.note}
                </p>
              )}

              {project.link ? (
                <a
                  className="interactive"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-accent)',
                    letterSpacing: '0.11em',
                    textDecoration: 'none',
                  }}
                >
                  [ LAUNCH MISSION {'\u2192'} ]
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(203,214,255,0.55)',
                    letterSpacing: '0.11em',
                  }}
                >
                  [ ACCESS RESTRICTED ]
                </span>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
