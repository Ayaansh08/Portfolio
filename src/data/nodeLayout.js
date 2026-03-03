export const NODE_LAYOUT = [
  { label: 'ABOUT', sectionKey: 'about', position: [-18, 2.1, -34] },
  { label: 'PROJECTS', sectionKey: 'projects', position: [13, 1.4, -24] },
  { label: 'SKILLS', sectionKey: 'skills', position: [-9, 0.9, -15] },
  { label: 'CONTACT', sectionKey: 'contact', position: [6, 0.5, -8] },
]

export const STATION_POSITION = [0, -6, 28]

export const SECTION_ROTATIONS = NODE_LAYOUT.reduce((acc, node) => {
  const [x, , z] = node.position
  acc[node.sectionKey] = Math.atan2(-x, z)
  return acc
}, {})

export const ROUTE_POINTS = [
  NODE_LAYOUT[0].position,
  NODE_LAYOUT[1].position,
  NODE_LAYOUT[2].position,
  NODE_LAYOUT[3].position,
  STATION_POSITION,
]
