import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import IntroOverlay from './IntroOverlay'
import Modules from './Modules'
import Overlay from './Overlay'
import Starfield from './Starfield'
import Station from './Station'
import TypewriterText from './TypewriterText'

const CAMERA_VIEWS = {
  about: {
    position: { x: -21, y: 5.6, z: -42 },
    target: { x: -18, y: 2.1, z: -34 },
  },
  projects: {
    position: { x: 18, y: 5.2, z: -31 },
    target: { x: 13, y: 1.4, z: -24 },
  },
  skills: {
    position: { x: -12, y: 4.4, z: -22 },
    target: { x: -9, y: 0.9, z: -15 },
  },
  contact: {
    position: { x: 9, y: 3.8, z: -14 },
    target: { x: 6, y: 0.5, z: -8 },
  },
}
const DEFAULT_SECTION = 'about'
const REST_CAMERA = CAMERA_VIEWS[DEFAULT_SECTION].position
const LOOK_AT_TARGET = CAMERA_VIEWS[DEFAULT_SECTION].target
const INTRO_CAMERA = {
  x: REST_CAMERA.x,
  y: REST_CAMERA.y + 2.4,
  z: REST_CAMERA.z - 22,
}

function ShipNavPrompt({ section, onEnter, onDismiss }) {
  if (!section) {
    return null
  }

  return (
    <aside
      style={{
        position: 'fixed',
        left: '28px',
        top: '138px',
        zIndex: 130,
        width: '260px',
        border: '1px solid rgba(203,214,255,0.2)',
        background: 'rgba(5, 10, 24, 0.72)',
        backdropFilter: 'blur(8px)',
        padding: '14px',
        boxShadow: '0 0 22px rgba(0,0,0,0.45)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          letterSpacing: '0.18em',
          color: 'rgba(203,214,255,0.7)',
          marginBottom: '8px',
        }}
      >
        <span>NAV PROMPT</span>
        <span>READY</span>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <TypewriterText text={`> DO YOU WANT TO ENTER ${section.toUpperCase()}?`} speed={14} />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          className="interactive"
          onClick={onEnter}
          style={{
            flex: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: '#CBD6FF',
            border: '1px solid rgba(203,214,255,0.35)',
            background: 'rgba(14, 22, 40, 0.72)',
            padding: '8px 10px',
          }}
        >
          [ ENTER NODE ]
        </button>
        <button
          type="button"
          className="interactive"
          onClick={onDismiss}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(203,214,255,0.7)',
            border: '1px solid rgba(203,214,255,0.22)',
            background: 'transparent',
            padding: '8px 10px',
          }}
        >
          SKIP
        </button>
      </div>
    </aside>
  )
}

function IntroDirector({
  runIntro,
  onComplete,
  hudRef,
  controlsRef,
  overlayRef,
  textWrapRef,
  nameRef,
  titleRef,
}) {
  const { camera } = useThree()
  const timelineRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    if (runIntro || hasPlayedRef.current) {
      return
    }

    camera.position.set(REST_CAMERA.x, REST_CAMERA.y, REST_CAMERA.z)
    if (controlsRef.current) {
      controlsRef.current.target.set(LOOK_AT_TARGET.x, LOOK_AT_TARGET.y, LOOK_AT_TARGET.z)
      controlsRef.current.update()
    } else {
      camera.lookAt(LOOK_AT_TARGET.x, LOOK_AT_TARGET.y, LOOK_AT_TARGET.z)
    }
  }, [camera, controlsRef, runIntro])

  useEffect(() => {
    if (!runIntro || hasPlayedRef.current) {
      return
    }

    const controls = controlsRef.current
    hasPlayedRef.current = true
    camera.position.set(INTRO_CAMERA.x, INTRO_CAMERA.y, INTRO_CAMERA.z)

    if (controls) {
      controls.enabled = false
      controls.target.set(LOOK_AT_TARGET.x, LOOK_AT_TARGET.y, LOOK_AT_TARGET.z)
      controls.update()
    } else {
      camera.lookAt(LOOK_AT_TARGET.x, LOOK_AT_TARGET.y, LOOK_AT_TARGET.z)
    }

    gsap.set(overlayRef.current, { opacity: 1 })
    gsap.set(nameRef.current, { opacity: 0, y: 20 })
    gsap.set(titleRef.current, { opacity: 0, y: 20 })
    gsap.set(textWrapRef.current, { x: 0, y: 0, scale: 1, opacity: 1 })

    if (hudRef?.current) {
      gsap.set(hudRef.current, { opacity: 0 })
    }

    const moveX = -window.innerWidth / 2 + 168
    const moveY = -window.innerHeight / 2 + 82

    const tl = gsap.timeline({
      onComplete: () => {
        if (controls) {
          controls.enabled = true
          controls.update()
        }
        onComplete?.()
      },
    })

    tl.to(overlayRef.current, { opacity: 0.0, duration: 0.8, ease: 'power2.in' })
    tl.to(
      camera.position,
      {
        z: REST_CAMERA.z,
        y: REST_CAMERA.y,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (controls) {
            controls.update()
          } else {
            camera.lookAt(LOOK_AT_TARGET.x, LOOK_AT_TARGET.y, LOOK_AT_TARGET.z)
          }
        },
      },
      '-=0.2',
    )
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=2.0')
    tl.to(titleRef.current, { opacity: 0.8, y: 0, duration: 0.7, ease: 'power2.out' }, '-=1.4')

    if (hudRef?.current) {
      tl.to(hudRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    }

    tl.to(textWrapRef.current, {
      x: moveX,
      y: moveY,
      scale: 0.38,
      duration: 0.8,
      ease: 'power2.inOut',
    })
    tl.to(textWrapRef.current, { opacity: 0, duration: 0.22, ease: 'power2.out' }, '-=0.1')

    timelineRef.current = tl

    return () => {
      timelineRef.current?.kill()
      timelineRef.current = null
      if (controls) {
        controls.enabled = true
      }
    }
  }, [
    camera,
    controlsRef,
    hudRef,
    nameRef,
    onComplete,
    overlayRef,
    runIntro,
    textWrapRef,
    titleRef,
  ])

  return null
}

function CameraNavigator({ focusedSection, runIntro, controlsRef }) {
  const { camera } = useThree()

  useEffect(() => {
    if (runIntro) {
      return undefined
    }

    const sectionKey = CAMERA_VIEWS[focusedSection] ? focusedSection : DEFAULT_SECTION
    const view = CAMERA_VIEWS[sectionKey]
    const controls = controlsRef.current

    const tl = gsap.timeline({
      onUpdate: () => {
        if (controls) {
          controls.update()
        } else {
          camera.lookAt(view.target.x, view.target.y, view.target.z)
        }
      },
    })

    tl.to(
      camera.position,
      {
        x: view.position.x,
        y: view.position.y,
        z: view.position.z,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      0,
    )

    if (controls) {
      tl.to(
        controls.target,
        {
          x: view.target.x,
          y: view.target.y,
          z: view.target.z,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0,
      )
    }

    return () => {
      tl.kill()
    }
  }, [camera, controlsRef, focusedSection, runIntro])

  return null
}

function Scene({
  activeSection,
  onSectionChange,
  focusedSection,
  onFocusSectionChange,
  runIntro,
  onIntroComplete,
  hudRef,
}) {
  const [hoveredSection, setHoveredSection] = useState(null)
  const [dismissedForSection, setDismissedForSection] = useState(null)
  const isInteractingRef = useRef(false)
  const controlsRef = useRef(null)
  const overlayRef = useRef(null)
  const textWrapRef = useRef(null)
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const shouldShowPrompt =
    !runIntro &&
    activeSection === null &&
    Boolean(focusedSection) &&
    dismissedForSection !== focusedSection

  useEffect(() => {
    isInteractingRef.current = activeSection !== null
  }, [activeSection])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls || typeof controls.listenToKeyEvents !== 'function') {
      return undefined
    }

    controls.listenToKeyEvents(window)
    return () => {
      if (typeof controls.stopListenToKeyEvents === 'function') {
        controls.stopListenToKeyEvents()
      }
    }
  }, [])

  const handleIntroComplete = useCallback(() => {
    onIntroComplete?.()
  }, [onIntroComplete])

  const handleSelectSection = useCallback(
    (sectionKey) => {
      setHoveredSection(null)
      onFocusSectionChange?.(sectionKey)
      onSectionChange(sectionKey)
    },
    [onFocusSectionChange, onSectionChange],
  )

  const handleCloseOverlay = () => {
    onSectionChange(null)
  }

  const handlePromptEnter = useCallback(() => {
    if (!focusedSection) {
      return
    }
    onSectionChange(focusedSection)
  }, [focusedSection, onSectionChange])

  useEffect(() => {
    if (!shouldShowPrompt) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handlePromptEnter()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePromptEnter, shouldShowPrompt])

  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Canvas
        camera={{ position: [REST_CAMERA.x, REST_CAMERA.y, REST_CAMERA.z], fov: 48 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{ position: 'fixed', inset: 0, background: '#000005' }}
      >
        <IntroDirector
          runIntro={runIntro}
          onComplete={handleIntroComplete}
          hudRef={hudRef}
          controlsRef={controlsRef}
          overlayRef={overlayRef}
          textWrapRef={textWrapRef}
          nameRef={nameRef}
          titleRef={titleRef}
        />
        <CameraNavigator
          focusedSection={focusedSection}
          runIntro={runIntro}
          controlsRef={controlsRef}
        />

        <directionalLight position={[12, 18, 10]} intensity={3.5} color="#fff5e0" />
        <directionalLight position={[-8, -4, -10]} intensity={0.15} color="#1a2040" />
        <directionalLight position={[-22, 10, 18]} intensity={0.35} color="#bcd3ff" />
        <ambientLight intensity={0.08} color="#000010" />
        <hemisphereLight intensity={0.2} color="#a0bcff" groundColor="#060a16" />

        <pointLight position={[0, -1.5, 0]} color="#CBD6FF" intensity={2.3} distance={120} decay={2} />
        <pointLight position={[16, 10, -18]} color="#9bbdff" intensity={1.2} distance={130} decay={2} />
        <pointLight position={[-22, 8, 24]} color="#7ea7ff" intensity={1.0} distance={120} decay={2} />
        <spotLight
          position={[0, 40, -12]}
          angle={0.42}
          penumbra={0.55}
          intensity={1.0}
          distance={180}
          color="#d9e7ff"
        />

        <Starfield />
        <Station
          onSelect={handleSelectSection}
          onHoverSectionChange={setHoveredSection}
          isInteractingRef={isInteractingRef}
        />
        <Modules hoveredSection={hoveredSection} focusedSection={activeSection} />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          enablePan
          keyPanSpeed={14}
          minDistance={6}
          maxDistance={40}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.88}
        />
      </Canvas>

      {activeSection !== null && <Overlay section={activeSection} onClose={handleCloseOverlay} />}

      {shouldShowPrompt && (
        <ShipNavPrompt
          section={focusedSection}
          onEnter={handlePromptEnter}
          onDismiss={() => setDismissedForSection(focusedSection)}
        />
      )}

      {runIntro && (
        <IntroOverlay
          overlayRef={overlayRef}
          textWrapRef={textWrapRef}
          nameRef={nameRef}
          titleRef={titleRef}
        />
      )}
    </div>
  )
}

export default Scene
