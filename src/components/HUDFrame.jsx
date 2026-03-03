const CORNER_STYLE = {
  position: 'fixed',
  width: '24px',
  height: '24px',
  zIndex: 50,
  pointerEvents: 'none',
}

function HUDFrame() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(203,214,255,0.06)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: '56px',
          height: '1px',
          background: 'rgba(203,214,255,0.06)',
        }}
      />

      <div
        style={{
          ...CORNER_STYLE,
          top: 16,
          left: 16,
          borderTop: '1px solid rgba(203,214,255,0.25)',
          borderLeft: '1px solid rgba(203,214,255,0.25)',
        }}
      />
      <div
        style={{
          ...CORNER_STYLE,
          top: 16,
          right: 16,
          borderTop: '1px solid rgba(203,214,255,0.25)',
          borderRight: '1px solid rgba(203,214,255,0.25)',
        }}
      />
      <div
        style={{
          ...CORNER_STYLE,
          bottom: 70,
          left: 16,
          borderBottom: '1px solid rgba(203,214,255,0.25)',
          borderLeft: '1px solid rgba(203,214,255,0.25)',
        }}
      />
      <div
        style={{
          ...CORNER_STYLE,
          bottom: 70,
          right: 16,
          borderBottom: '1px solid rgba(203,214,255,0.25)',
          borderRight: '1px solid rgba(203,214,255,0.25)',
        }}
      />
    </div>
  )
}

export default HUDFrame
