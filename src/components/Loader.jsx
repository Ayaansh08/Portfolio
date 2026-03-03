import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Loader({ onComplete }) {
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const barFillRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (hasCompletedRef.current) {
            return
          }
          hasCompletedRef.current = true
          if (typeof onCompleteRef.current === 'function') {
            onCompleteRef.current()
          }
        },
      })

      tl.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      tl.to(barFillRef.current, { width: '100%', duration: 2, ease: 'none' })
      tl.to({}, { duration: 0.3 })
      tl.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' })
    }, overlayRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '28px',
          letterSpacing: '0.35em',
          color: 'var(--color-text)',
          opacity: 0,
        }}
      >
        OrbitEngine.exe
      </h1>

      <div
        style={{
          width: '220px',
          height: '1px',
          background: 'var(--color-border)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barFillRef}
          style={{ width: '0%', height: '1px', background: 'var(--color-accent)' }}
        />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          opacity: 0.4,
        }}
      >
        INITIALIZING SYSTEMS...
      </p>
    </div>
  )
}

export default Loader
