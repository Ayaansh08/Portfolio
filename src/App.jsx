import { useRef, useState } from 'react'
import CockpitNav from './components/CockpitNav'
import CoordinatesReadout from './components/CoordinatesReadout'
import Cursor from './components/Cursor'
import HUDFrame from './components/HUDFrame'
import IdentityPanel from './components/IdentityPanel'
import Loader from './components/Loader'
import Scene from './components/Scene'
import SystemMonitor from './components/SystemMonitor'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [focusedSection, setFocusedSection] = useState('about')
  const sceneGroupRef = useRef(null)
  const hudRef = useRef(null)

  const handleSectionChange = (section) => {
    setActiveSection(section)
    if (section) {
      setFocusedSection(section)
    }
  }

  const handleNavigate = (section) => {
    setActiveSection(null)
    setFocusedSection(section)
  }

  return (
    <main className="relative h-screen w-screen">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Cursor />

      <Scene
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        focusedSection={focusedSection}
        onFocusSectionChange={setFocusedSection}
        sceneGroupRef={sceneGroupRef}
        runIntro={!isLoading && !isIntroComplete}
        onIntroComplete={() => setIsIntroComplete(true)}
        hudRef={hudRef}
      />

      <div
        ref={hudRef}
        style={{
          opacity: 0,
          pointerEvents: isIntroComplete ? 'auto' : 'none',
          transition: 'opacity 0.2s linear',
        }}
      >
        <HUDFrame />
        <IdentityPanel />
        <CoordinatesReadout focusedSection={focusedSection} />
        {activeSection === null && <SystemMonitor />}
        <CockpitNav
          focusedSection={focusedSection}
          onNavigate={handleNavigate}
          sceneGroupRef={sceneGroupRef}
        />
      </div>
    </main>
  )
}

export default App
