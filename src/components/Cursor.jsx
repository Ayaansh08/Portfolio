import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const INTERACTIVE_SELECTOR = 'button, a, .interactive'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.set(dot, { xPercent: -50, yPercent: -50 })
      gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    })

    const isInteractive = (element) => element?.closest?.(INTERACTIVE_SELECTOR)

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event

      dot.style.left = `${clientX}px`
      dot.style.top = `${clientY}px`

      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseOver = (event) => {
      if (!isInteractive(event.target)) {
        return
      }

      gsap.to(ring, {
        scale: 2,
        opacity: 0.5,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handleMouseOut = (event) => {
      if (!isInteractive(event.target) || isInteractive(event.relatedTarget)) {
        return
      }

      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const handleMouseDown = () => {
      gsap.fromTo(dot, { scale: 2 }, { scale: 1, duration: 0.15, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      gsap.killTweensOf([dot, ring])
      ctx.revert()
    }
  }, [])

  if (window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: '-100px',
          top: '-100px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--color-text)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

export default Cursor
