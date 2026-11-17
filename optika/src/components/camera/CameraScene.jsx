import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// A temporary test object. Later this becomes the camera model.
function TestBox() {
  return (
    <mesh>
      <boxGeometry args={[2, 1.2, 1]} />
      <meshStandardMaterial color="#65D5E8" roughness={0.5} metalness={0.2} />
    </mesh>
  )
}

function CameraScene() {
  return (
    // Canvas fills its parent element, so the parent needs a set height.
    <Canvas camera={{ position: [4, 2.5, 5], fov: 45 }}>
      {/* Lights: soft light everywhere, plus a directional "sun" */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.8} />

      <TestBox />

      {/* Drag to rotate, scroll or pinch to zoom. Distance limits stop
          the visitor from zooming inside the object or too far away. */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        enableDamping
      />
    </Canvas>
  )
}

export default CameraScene