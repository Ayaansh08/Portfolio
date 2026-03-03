import { useEffect, useMemo, useState } from 'react'
import TypewriterText from './TypewriterText'

const SYSTEMS = [
  { key: 'NAV', label: 'NAVIGATION MATRIX', cycle: ['OK', 'CALIBRATING', 'OK', 'TRACKING'] },
  { key: 'PWR', label: 'POWER DISTRIBUTION', cycle: ['NOMINAL', 'OK', 'NOMINAL', 'BALANCING'] },
  { key: 'COM', label: 'COMMS ARRAY', cycle: ['SYNCED', 'CHECK', 'SYNCED', 'ONLINE'] },
  { key: 'ENV', label: 'ENVIRONMENT', cycle: ['STABLE', 'OK', 'STABLE', 'OPTIMAL'] },
  { key: 'DEF', label: 'DEFENSE GRID', cycle: ['ACTIVE', 'CHECK', 'ACTIVE', 'STANDBY'] },
  { key: 'AI', label: 'CORE AI LINK', cycle: ['ONLINE', 'QUERY', 'ONLINE', 'READY'] },
  { key: 'SEN', label: 'SENSOR BUS', cycle: ['LOCKED', 'OK', 'LOCKED', 'TRACKING'] },
  { key: 'HUL', label: 'HULL INTEGRITY', cycle: ['97.4%', '97.3%', '97.4%', '97.2%'] },
  { key: 'THR', label: 'THRUSTER ARRAY', cycle: ['ARMED', 'CHECK', 'ARMED', 'SYNCED'] },
]

const FEED_LINES = [
  '> LINK ESTABLISHED // DEEP SPACE UPLINK ONLINE',
  '> TELEMETRY FRAME RECEIVED // PACKET STABLE',
  '> CORE VECTOR SOLUTION UPDATED // DRIFT NOMINAL',
  '> DOCKING CORRIDOR CLEAR // PATH GREEN',
  '> LONG RANGE RADAR SWEEP // NO THREAT DETECTED',
]

function statusColor(status) {
  if (status === 'CHECK' || status === 'QUERY') {
    return '#ffd37d'
  }
  return '#8dffbf'
}

function SystemMonitor() {
  const [tick, setTick] = useState(0)
  const [clock, setClock] = useState(() => new Date())
  const [feedIndex, setFeedIndex] = useState(0)

  useEffect(() => {
    const styleId = 'orbitengine-system-monitor-style'
    if (document.getElementById(styleId)) {
      return undefined
    }

    const styleTag = document.createElement('style')
    styleTag.id = styleId
    styleTag.textContent = `
      @keyframes orbitengineMonitorBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.25; }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      styleTag.remove()
    }
  }, [])

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setTick((value) => value + 1)
    }, 1700)

    const clockTimer = setInterval(() => {
      setClock(new Date())
    }, 1000)

    const feedTimer = setInterval(() => {
      setFeedIndex((value) => (value + 1) % FEED_LINES.length)
    }, 3400)

    return () => {
      clearInterval(statusTimer)
      clearInterval(clockTimer)
      clearInterval(feedTimer)
    }
  }, [])

  const rows = useMemo(
    () =>
      SYSTEMS.map((system, index) => ({
        ...system,
        status: system.cycle[(tick + index) % system.cycle.length],
      })),
    [tick],
  )

  return (
    <aside
      style={{
        position: 'fixed',
        top: '84px',
        right: '24px',
        width: '276px',
        minHeight: '450px',
        zIndex: 85,
        pointerEvents: 'none',
        border: '1px solid rgba(141, 255, 191, 0.22)',
        background: 'rgba(2, 9, 24, 0.62)',
        boxShadow: '0 0 28px rgba(77, 139, 255, 0.22)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(180deg, rgba(141,255,191,0.04) 0px, rgba(141,255,191,0.04) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', padding: '10px 12px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '0.2em',
            color: 'rgba(203,214,255,0.72)',
          }}
        >
          <span>SHIP SYSTEMS</span>
          <span>{clock.toLocaleTimeString()}</span>
        </div>

        <div
          style={{
            marginBottom: '8px',
            padding: '7px 8px',
            border: '1px solid rgba(141,255,191,0.15)',
            background: 'rgba(7, 16, 36, 0.55)',
          }}
        >
          <TypewriterText
            key={`status-head-${feedIndex}`}
            text="> SYSTEM HEALTH CHECK // LIVE"
            speed={12}
          />
        </div>

        {rows.map((row) => (
          <div
            key={row.key}
            style={{
              display: 'grid',
              gridTemplateColumns: '34px 1fr auto',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 0',
              borderBottom: '1px solid rgba(203,214,255,0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.12em',
              color: 'rgba(203,214,255,0.8)',
            }}
          >
            <span style={{ color: 'rgba(141,255,191,0.68)' }}>{row.key}</span>
            <span>{row.label}</span>
            <span
              style={{
                color: statusColor(row.status),
                animation: 'orbitengineMonitorBlink 1.3s infinite',
              }}
            >
              {row.status}
            </span>
          </div>
        ))}

        <div
          style={{
            marginTop: '10px',
            padding: '7px 8px',
            border: '1px solid rgba(141,255,191,0.12)',
            background: 'rgba(7, 16, 36, 0.48)',
          }}
        >
          <div
            style={{
              marginBottom: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.16em',
              color: 'rgba(141,255,191,0.55)',
            }}
          >
            LIVE FEED
          </div>
          <TypewriterText key={`feed-line-${feedIndex}`} text={FEED_LINES[feedIndex]} speed={14} />
        </div>

        <div
          style={{
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '0.16em',
            color: 'rgba(141,255,191,0.5)',
          }}
        >
          ALL CORE SYSTEMS REPORTING
        </div>
      </div>
    </aside>
  )
}

export default SystemMonitor
