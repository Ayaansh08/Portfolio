const backendSkills = [
  { name: 'Node.js', level: 90 },
  { name: 'Python', level: 80 },
  { name: 'PostgreSQL', level: 85 },
  { name: 'Redis', level: 75 },
  { name: 'Docker', level: 80 },
  { name: 'REST/GraphQL APIs', level: 90 },
]

const frontendSkills = [
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 75 },
  { name: 'Git', level: 90 },
  { name: 'Linux', level: 80 },
  { name: 'CI/CD', level: 70 },
]

function SegmentedBar({ percentage }) {
  const filledBlocks = Math.round(percentage / 10)
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          style={{
            width: '7px',
            height: '8px',
            display: 'inline-block',
            background:
              index < filledBlocks
                ? 'var(--color-accent)'
                : 'rgba(203,214,255,0.1)',
          }}
        />
      ))}
    </div>
  )
}

function SkillColumn({ title, skills }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'var(--color-accent)',
          marginBottom: '10px',
        }}
      >
        {title}
      </p>

      {skills.map((skill) => (
        <div
          key={skill.name}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(120px, 1fr) auto',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '9px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'rgba(240,244,255,0.82)',
            }}
          >
            {skill.name}
          </span>
          <SegmentedBar percentage={skill.level} />
        </div>
      ))}
    </div>
  )
}

function Skills() {
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
        CAPABILITY MATRIX
      </p>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: 'rgba(240,244,255,0.5)',
        }}
      >
        PROFICIENCY
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          border: '1px solid rgba(203,214,255,0.18)',
          padding: '12px',
          background: 'rgba(5,5,14,0.35)',
        }}
      >
        <SkillColumn title="BACKEND" skills={backendSkills} />
        <SkillColumn title="FRONTEND / OTHER" skills={frontendSkills} />
      </div>
    </section>
  )
}

export default Skills
