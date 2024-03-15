import Model from '@/components/models/File'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export const Tmp = () => {
  return (
    <Canvas style={{ width: 500, height: 500 }}>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <OrbitControls makeDefault />
      <ambientLight intensity={1} />
      <hemisphereLight intensity={1} />
      <spotLight
        position={[0, 0, 1.5]}
        intensity={1}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
    </Canvas>
  )
}
