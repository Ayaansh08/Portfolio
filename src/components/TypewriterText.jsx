import { useEffect, useState } from 'react'

function TypewriterText({ text, speed = 28, onComplete }) {
  const [charIndex, setCharIndex] = useState(0)
  const isComplete = charIndex >= text.length
  const displayedText = text.slice(0, charIndex)

  useEffect(() => {
    let hasCompleted = false

    if (!text.length) {
      onComplete?.()
      return undefined
    }

    const interval = setInterval(() => {
      setCharIndex((current) => {
        const next = current + 1
        if (next >= text.length) {
          clearInterval(interval)
          if (!hasCompleted) {
            hasCompleted = true
            onComplete?.()
          }
          return text.length
        }
        return next
      })
    }, speed)

    return () => {
      clearInterval(interval)
    }
  }, [onComplete, speed, text])

  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--color-accent)',
        letterSpacing: '0.1em',
        margin: 0,
      }}
    >
      {displayedText}
      {!isComplete && (
        <span
          style={{
            marginLeft: '4px',
            animation: 'orbitengineTypeCursorBlink 0.8s steps(1, end) infinite',
          }}
        >
          {'\u2588'}
        </span>
      )}
    </p>
  )
}

export default TypewriterText
