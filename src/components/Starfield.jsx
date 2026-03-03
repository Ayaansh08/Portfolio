import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DESKTOP_TOTAL_STARS = 4200
const MOBILE_TOTAL_STARS = 2100
const DESKTOP_LARGE_STARS = 1400
const MOBILE_LARGE_STARS = 700
const STARFIELD_RADIUS = 500
const TWINKLE_COUNT = 120
const MOVING_STAR_RATIO = 0.65
const WARP_XY_SPREAD = 560
const WARP_DEPTH = 900
const WARP_FORWARD_LIMIT = 140
const WARP_SPEED = 230
const WARP_STREAK_MIN = 5
const WARP_STREAK_MAX = 14

const PRIMARY_STAR = new THREE.Color('#F0F4FF')
const ACCENT_STAR = new THREE.Color('#CBD6FF')

function createSeededRng(seed) {
  let t = seed >>> 0

  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function randomPointInSphere(radius, rng) {
  const theta = rng() * Math.PI * 2
  const phi = Math.acos(2 * rng() - 1)
  const r = radius * Math.cbrt(rng())

  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
  }
}

function randomInRange(min, max, rng) {
  return min + (max - min) * rng()
}

function buildStarGeometry(count, rng, radius) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const point = randomPointInSphere(radius, rng)
    const color = rng() < 0.8 ? PRIMARY_STAR : ACCENT_STAR
    const i3 = i * 3

    positions[i3] = point.x
    positions[i3 + 1] = point.y
    positions[i3 + 2] = point.z

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
    sizes[i] = 1
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  return {
    geometry,
    sizeAttribute: geometry.getAttribute('aSize'),
  }
}

function buildWarpGeometry(count, rng) {
  const positions = new Float32Array(count * 6)
  const colors = new Float32Array(count * 6)
  const streakLengths = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const i6 = i * 6
    const x = randomInRange(-WARP_XY_SPREAD, WARP_XY_SPREAD, rng)
    const y = randomInRange(-WARP_XY_SPREAD, WARP_XY_SPREAD, rng)
    const headZ = randomInRange(-WARP_DEPTH, WARP_FORWARD_LIMIT, rng)
    const streakLength = randomInRange(WARP_STREAK_MIN, WARP_STREAK_MAX, rng)

    positions[i6] = x
    positions[i6 + 1] = y
    positions[i6 + 2] = headZ
    positions[i6 + 3] = x
    positions[i6 + 4] = y
    positions[i6 + 5] = headZ - streakLength
    streakLengths[i] = streakLength

    colors[i6] = 0.88
    colors[i6 + 1] = 0.93
    colors[i6 + 2] = 1
    colors[i6 + 3] = 0.28
    colors[i6 + 4] = 0.4
    colors[i6 + 5] = 0.68
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  return {
    geometry,
    positionAttribute: geometry.getAttribute('position'),
    streakLengths,
  }
}

function buildTwinkleData(rng, totalStars, smallStarCount) {
  const indexSet = new Set()

  while (indexSet.size < TWINKLE_COUNT) {
    indexSet.add(Math.floor(rng() * totalStars))
  }

  return Array.from(indexSet).map((globalIndex) => {
    const isSmall = globalIndex < smallStarCount

    return {
      group: isSmall ? 'small' : 'large',
      index: isSmall ? globalIndex : globalIndex - smallStarCount,
      speed: 0.4 + rng() * 0.8,
      offset: rng() * Math.PI * 2,
    }
  })
}

function patchPointShader(shader) {
  shader.vertexShader = `attribute float aSize;\n${shader.vertexShader}`
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    'gl_PointSize = size * aSize;',
  )
}

function Starfield() {
  const starfieldRef = useRef(null)
  const smallMaterialRef = useRef(null)
  const largeMaterialRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smallSizeAttributeRef = useRef(null)
  const largeSizeAttributeRef = useRef(null)
  const warpPositionAttributeRef = useRef(null)
  const warpLengthsRef = useRef(null)
  const warpMaterialRef = useRef(null)
  const warpResetRngRef = useRef(createSeededRng(0xa11492f3))
  const twinklesRef = useRef(null)

  const starData = useMemo(() => {
    const isMobile = window.innerWidth < 768
    const totalStars = isMobile ? MOBILE_TOTAL_STARS : DESKTOP_TOTAL_STARS
    const largeStarCount = isMobile ? MOBILE_LARGE_STARS : DESKTOP_LARGE_STARS
    const warpCount = Math.floor(totalStars * MOVING_STAR_RATIO)
    const smallStarCount = totalStars - largeStarCount
    const rng = createSeededRng(0x8f3a6d91)
    const small = buildStarGeometry(smallStarCount, rng, STARFIELD_RADIUS)
    const large = buildStarGeometry(largeStarCount, rng, STARFIELD_RADIUS)
    const warp = buildWarpGeometry(warpCount, rng)

    return {
      smallGeometry: small.geometry,
      largeGeometry: large.geometry,
      warpGeometry: warp.geometry,
      smallSizeAttribute: small.sizeAttribute,
      largeSizeAttribute: large.sizeAttribute,
      warpPositionAttribute: warp.positionAttribute,
      warpLengths: warp.streakLengths,
      twinkles: buildTwinkleData(rng, totalStars, smallStarCount),
    }
  }, [])

  if (smallSizeAttributeRef.current == null) {
    smallSizeAttributeRef.current = starData.smallSizeAttribute
  }
  if (largeSizeAttributeRef.current == null) {
    largeSizeAttributeRef.current = starData.largeSizeAttribute
  }
  if (twinklesRef.current == null) {
    twinklesRef.current = starData.twinkles
  }
  if (warpPositionAttributeRef.current == null) {
    warpPositionAttributeRef.current = starData.warpPositionAttribute
  }
  if (warpLengthsRef.current == null) {
    warpLengthsRef.current = starData.warpLengths
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX - window.innerWidth / 2
      mouseRef.current.y = event.clientY - window.innerHeight / 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(({ clock }, delta) => {
    if (
      !starfieldRef.current ||
      !smallSizeAttributeRef.current ||
      !largeSizeAttributeRef.current ||
      !warpPositionAttributeRef.current ||
      !warpLengthsRef.current ||
      !twinklesRef.current
    ) {
      return
    }

    starfieldRef.current.rotation.y += 0.00005

    const targetX = mouseRef.current.x * -0.002
    const targetY = mouseRef.current.y * 0.002

    starfieldRef.current.position.x = THREE.MathUtils.lerp(
      starfieldRef.current.position.x,
      targetX,
      0.03,
    )
    starfieldRef.current.position.y = THREE.MathUtils.lerp(
      starfieldRef.current.position.y,
      targetY,
      0.03,
    )

    const elapsed = clock.elapsedTime
    const smallSizes = smallSizeAttributeRef.current.array
    const largeSizes = largeSizeAttributeRef.current.array

    for (let i = 0; i < twinklesRef.current.length; i += 1) {
      const twinkle = twinklesRef.current[i]
      const phase = Math.sin(elapsed * twinkle.speed + twinkle.offset)
      const normalized = (phase + 1) * 0.5
      const twinkleSize = THREE.MathUtils.lerp(0.4, 1.8, normalized)

      if (twinkle.group === 'small') {
        smallSizes[twinkle.index] = twinkleSize
      } else {
        largeSizes[twinkle.index] = twinkleSize
      }
    }

    smallSizeAttributeRef.current.needsUpdate = true
    largeSizeAttributeRef.current.needsUpdate = true

    const warpPositions = warpPositionAttributeRef.current.array
    const warpLengths = warpLengthsRef.current
    const resetRng = warpResetRngRef.current

    for (let i = 0; i < warpLengths.length; i += 1) {
      const i6 = i * 6
      warpPositions[i6 + 2] += WARP_SPEED * delta
      warpPositions[i6 + 5] += WARP_SPEED * delta

      if (warpPositions[i6 + 2] > WARP_FORWARD_LIMIT) {
        const x = randomInRange(-WARP_XY_SPREAD, WARP_XY_SPREAD, resetRng)
        const y = randomInRange(-WARP_XY_SPREAD, WARP_XY_SPREAD, resetRng)
        const headZ = -WARP_DEPTH - randomInRange(0, 220, resetRng)
        const streakLength = randomInRange(WARP_STREAK_MIN, WARP_STREAK_MAX, resetRng)

        warpLengths[i] = streakLength
        warpPositions[i6] = x
        warpPositions[i6 + 1] = y
        warpPositions[i6 + 2] = headZ
        warpPositions[i6 + 3] = x
        warpPositions[i6 + 4] = y
        warpPositions[i6 + 5] = headZ - streakLength
      }
    }

    warpPositionAttributeRef.current.needsUpdate = true
  })

  useEffect(() => {
    const smallMaterial = smallMaterialRef.current
    const largeMaterial = largeMaterialRef.current
    const warpMaterial = warpMaterialRef.current

    return () => {
      starData.smallGeometry.dispose()
      starData.largeGeometry.dispose()
      starData.warpGeometry.dispose()
      smallMaterial?.dispose()
      largeMaterial?.dispose()
      warpMaterial?.dispose()
    }
  }, [starData])

  return (
    <group ref={starfieldRef}>
      <points frustumCulled={false}>
        <primitive object={starData.smallGeometry} attach="geometry" />
        <pointsMaterial
          ref={smallMaterialRef}
          size={0.6}
          vertexColors
          sizeAttenuation
          transparent
          opacity={1}
          onBeforeCompile={patchPointShader}
        />
      </points>

      <points frustumCulled={false}>
        <primitive object={starData.largeGeometry} attach="geometry" />
        <pointsMaterial
          ref={largeMaterialRef}
          size={1.4}
          vertexColors
          sizeAttenuation
          transparent
          opacity={1}
          onBeforeCompile={patchPointShader}
        />
      </points>

      <lineSegments frustumCulled={false}>
        <primitive object={starData.warpGeometry} attach="geometry" />
        <lineBasicMaterial
          ref={warpMaterialRef}
          vertexColors
          transparent
          opacity={0.56}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </lineSegments>
    </group>
  )
}

export default Starfield
