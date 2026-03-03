function About() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.28em',
            color: 'var(--color-accent)',
            opacity: 0.82,
          }}
        >
          PERSONNEL DOSSIER
        </p>

        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: 'rgba(240,244,255,0.55)',
              marginBottom: '4px',
            }}
          >
            CLEARANCE LEVEL: {'\u2588\u2588\u2588\u2588\u2588\u2588'}
          </p>
          <div
            style={{
              width: '100px',
              height: '2px',
              background: 'rgba(203,214,255,0.25)',
            }}
          />
        </div>
      </div>

      <div>
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '6px',
          }}
        >
          ID: AYAANSH RAWAT
        </h2>
        <div
          style={{ height: '1px', background: 'rgba(203,214,255,0.25)', width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            border: '1px solid rgba(203,214,255,0.18)',
            padding: '10px 12px',
            background: 'rgba(3,3,8,0.26)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              marginBottom: '5px',
            }}
          >
            ROLE //
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(240,244,255,0.88)',
            }}
          >
            Full Stack & Backend Engineer
          </p>
        </div>

        <div
          style={{
            border: '1px solid rgba(203,214,255,0.18)',
            padding: '10px 12px',
            background: 'rgba(3,3,8,0.26)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              marginBottom: '5px',
            }}
          >
            DIRECTIVE //
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              lineHeight: 1.55,
              color: 'rgba(240,244,255,0.78)',
            }}
          >
            I turn complex problems into clean, efficient solutions. From full-stack
            applications to machine learning experiments, I write code that is practical
            and scalable. Every project is a launch toward something better.
          </p>
        </div>
      </div>

      {/* Data Table */}
      <div
        style={{
          border: '1px solid rgba(203,214,255,0.18)',
          background: 'rgba(3,3,8,0.22)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(203,214,255,0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.13em',
            color: 'rgba(240,244,255,0.52)',
          }}
        >
          <span>FIELD</span>
          <span>VALUE</span>
        </div>

        {[
          ['EDUCATION', 'B.TECH CS — JIIT NOIDA'],
          ['STACK', 'NODE.JS · FASTAPI · REACT'],
          ['STATUS', 'AVAILABLE FOR WORK'],
        ].map(([field, value]) => (
          <div
            key={field}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '8px 12px',
              borderBottom: '1px solid rgba(203,214,255,0.12)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.11em',
                color: 'rgba(240,244,255,0.72)',
              }}
            >
              {field}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.11em',
                color: 'var(--color-accent)',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div
        style={{
          border: '1px solid rgba(203,214,255,0.18)',
          background: 'rgba(3,3,8,0.22)',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'var(--color-accent)',
            marginBottom: '4px',
          }}
        >
          MISSION ACHIEVEMENTS //
        </p>
        {[
          ['2ND PLACE', 'HackoverFlow 9.0 — NIT Durgapur (500+ participants)'],
          ['FINALIST', 'HackVision\'25 — NSUT Delhi (Top 20 / 300+ teams)'],
          ['2ND PLACE', 'JIIT Intra-College CP Contest'],
          ['190+ SOLVED', 'LeetCode — Easy · Medium · Hard'],
        ].map(([badge, desc]) => (
          <div
            key={badge}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.1em',
                color: '#00ff88',
                border: '1px solid rgba(0,255,136,0.3)',
                padding: '2px 6px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {badge}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.08em',
                color: 'rgba(240,244,255,0.6)',
                lineHeight: 1.5,
              }}
            >
              {desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About