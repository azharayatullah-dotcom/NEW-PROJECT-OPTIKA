import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CameraModel from './CameraModel'

function CameraScene({ selectedId, onSelect, explode }) {
  return (
    // The camera sits farther back now, so the exploded view fits.
    <Canvas camera={{ position: [7, 4, 9], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#B6C9D5', '#101820', 0.5]} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} />
      <directionalLight position={[-6, 3, -5]} intensity={0.6} />

      <CameraModel
        selectedId={selectedId}
        onSelect={onSelect}
        explode={explode}
      />

      <OrbitControls
        enablePan={false}
        target={[0, 0, 0.5]}
        minDistance={3}
        maxDistance={22}
        enableDamping
      />
    </Canvas>
  )
}

export default CameraScene