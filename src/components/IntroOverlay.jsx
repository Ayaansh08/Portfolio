function IntroOverlay({ overlayRef, textWrapRef, nameRef, titleRef }) {
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000005',
          opacity: 1,
        }}
      />

      <div
        ref={textWrapRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 1,
          willChange: 'transform, opacity',
        }}
      >
        <h1
          ref={nameRef}
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '48px',
            fontWeight: 700,
            color: '#F0F4FF',
            letterSpacing: '0.1em',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          AYAANSH
        </h1>
        <p
          ref={titleRef}
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: '#CBD6FF',
            letterSpacing: '0.35em',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          FULL STACK &amp; BACKEND ENGINEER
        </p>
      </div>
    </div>
  )
}

export default IntroOverlay
