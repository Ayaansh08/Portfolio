import { useThree } from '@react-three/fiber'

export function useCamera() {
  const { camera } = useThree()
  return { camera }
}
