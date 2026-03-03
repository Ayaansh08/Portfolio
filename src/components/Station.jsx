import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { NODE_LAYOUT, STATION_POSITION } from '../data/nodeLayout'

const PODS = NODE_LAYOUT

function StationModel({ stationRef }) {
  const { scene } = useGLTF('/models/station.glb')

  useEffect(() => {
    const fixMaterialForLighting = (material) => {
      if (!material) {
        return
      }

      if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
        if (material.metalness > 0.95) material.metalness = 0.7
        if (material.roughness < 0.05) material.roughness = 0.25
        material.needsUpdate = true
      }
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            fixMaterialForLighting(material)
          })
        } else {
          fixMaterialForLighting(child.material)
        }
      }
    })
  }, [scene])

  return (
    <group ref={stationRef} position={STATION_POSITION}>
      <group rotation={[0, Math.PI, 0]}>
        <primitive
          object={scene}
          scale={6}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

function PortalPod({
  index,
  position,
  sectionKey,
  onSelect,
  onHoverStateChange,
  isInteractingRef,
}) {
  const groupRef = useRef(null)
  const emissiveMaterialsRef = useRef([])
  const { scene: portalScene } = useGLTF('/models/portal.glb')
  const cloned = useMemo(() => portalScene.clone(true), [portalScene])
  const baseY = position[1]
  const phaseOffset = useMemo(() => index * 0.9, [index])

  useEffect(() => {
    const emissiveMaterials = []
    const group = groupRef.current

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        child.material.emissive = new THREE.Color('#CBD6FF')
        child.material.emissiveIntensity = 0.4
        child.material.needsUpdate = true
        emissiveMaterials.push(child.material)
      }
    })

    emissiveMaterialsRef.current = emissiveMaterials

    return () => {
      emissiveMaterials.forEach((material) => {
        gsap.killTweensOf(material)
        material.dispose?.()
      })
      if (group) {
        gsap.killTweensOf(group.scale)
      }
      emissiveMaterialsRef.current = []
    }
  }, [cloned])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.position.y =
      baseY + Math.sin(clock.elapsedTime * 0.8 + phaseOffset) * 0.2
  })

  const animateEmissive = (intensity) => {
    emissiveMaterialsRef.current.forEach((material) => {
      gsap.to(material, {
        emissiveIntensity: intensity,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }

  const handlePointerOver = (event) => {
    event.stopPropagation()
    onHoverStateChange(sectionKey, true)
    animateEmissive(1.2)
  }

  const handlePointerOut = (event) => {
    event.stopPropagation()
    onHoverStateChange(sectionKey, false)
    animateEmissive(0.4)
  }

  const handlePointerDown = (event) => {
    event.stopPropagation()
    if (isInteractingRef) {
      isInteractingRef.current = true
    }
    onSelect(sectionKey)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[1.6, 1.6, 1.6]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
    >
      <primitive object={cloned} />
    </group>
  )
}

function Station({ onSelect, onHoverSectionChange, isInteractingRef }) {
  const stationRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const currentRotationSpeed = useRef(1)
  const hoverCountRef = useRef(0)

  useFrame((state) => {
    if (!stationRef.current) return

    const targetSpeed = isHovered || isInteractingRef?.current ? 0 : 1

    // Lerp rotation speed smoothly to 0 on hover, back to full on leave
    currentRotationSpeed.current = THREE.MathUtils.lerp(
      currentRotationSpeed.current,
      targetSpeed,
      0.04,
    )

    const t = state.clock.elapsedTime
    const s = currentRotationSpeed.current

    // Dual axis rotation - Y is primary spin, X is slow tilt
    stationRef.current.rotation.y += 0.004 * s
    stationRef.current.rotation.x = Math.sin(t * 0.2) * 0.18 * s

    // Gentle float on Y position
    stationRef.current.position.y = STATION_POSITION[1] + Math.sin(t * 0.4) * 0.15
  })

  const handlePodHoverState = (sectionKey, entering) => {
    if (entering) {
      hoverCountRef.current += 1
      setIsHovered(true)
      onHoverSectionChange(sectionKey)
      return
    }

    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1)
    if (hoverCountRef.current === 0) {
      setIsHovered(false)
      onHoverSectionChange(null)
    }
  }

  return (
    <>
      <StationModel stationRef={stationRef} />
      {PODS.map((pod, index) => (
        <PortalPod
          key={pod.sectionKey}
          index={index}
          position={pod.position}
          sectionKey={pod.sectionKey}
          onSelect={onSelect}
          onHoverStateChange={handlePodHoverState}
          isInteractingRef={isInteractingRef}
        />
      ))}
    </>
  )
}

export default Station

useGLTF.preload('/models/station.glb')
useGLTF.preload('/models/portal.glb')
