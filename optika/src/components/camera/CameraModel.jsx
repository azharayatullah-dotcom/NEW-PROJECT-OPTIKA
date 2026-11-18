import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, Line, useCursor } from '@react-three/drei'
import { MathUtils, Shape, Vector2 } from 'three'
import { cameraParts } from '../../data/cameraParts'

// Lookup: part id -> how far it moves when exploded
const explodeById = Object.fromEntries(
  cameraParts.map((part) => [part.id, part.explode])
)

// The pentaprism side profile, written as [z, y] points. We convert to the
// Shape's own x/y with x = -z, because the shape is later turned sideways.
const prismShape = new Shape(
  [
    [0.55, 0.8],
    [-0.6, 0.8],
    [-0.6, 1.12],
    [-0.3, 1.34],
    [0.05, 1.34],
    [0.55, 0.98],
  ].map(([z, y]) => new Vector2(-z, y))
)

// A "context" lets a Part share its state (selected, hovered, colour) with
// every Piece inside it, without passing props down by hand.
const PartContext = createContext(null)

// A Part = one selectable thing (one name, one explanation, one move in the
// exploded view). It can contain several Pieces (meshes).
// shell = see-through housing. Shells have no click handlers, so clicks pass
// through to the parts inside. They are chosen from the list instead.
function Part({
  id,
  selectedId,
  onSelect,
  progress,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#B6C9D5',
  opacity = 1,
  shell = false,
  children,
}) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)
  const selected = selectedId === id
  const explode = explodeById[id] ?? [0, 0, 0]

  useCursor(hovered)

  // Runs every frame: place the part between assembled (0) and exploded (1).
  useFrame(() => {
    const t = progress.current
    group.current.position.set(
      position[0] + explode[0] * t,
      position[1] + explode[1] * t,
      position[2] + explode[2] * t
    )
  })

  const handlers = shell
    ? {}
    : {
        onClick: (event) => {
          event.stopPropagation()
          onSelect(id)
        },
        onPointerOver: (event) => {
          event.stopPropagation()
          setHovered(true)
        },
        onPointerOut: () => setHovered(false),
      }

  return (
    <group
      ref={group}
      name={id}
      position={position}
      rotation={rotation}
      {...handlers}
    >
      <PartContext.Provider value={{ selected, hovered, shell, color, opacity }}>
        {children}
      </PartContext.Provider>
    </group>
  )
}

// A Piece = one 3D shape inside a Part. Put a geometry tag inside it.
function Piece({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color,
  opacity,
  children,
}) {
  const ctx = useContext(PartContext)
  const base = opacity ?? ctx.opacity
  const shown = ctx.shell && ctx.selected ? 0.35 : base

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {children}
      <meshStandardMaterial
        color={color ?? ctx.color}
        roughness={0.45}
        metalness={0.3}
        emissive={ctx.selected ? '#E7A957' : ctx.hovered ? '#65D5E8' : '#000000'}
        emissiveIntensity={ctx.selected ? 0.6 : 0.35}
        transparent={shown < 1}
        opacity={shown}
        depthWrite={shown >= 1}
      />
      {ctx.shell && <Edges color={ctx.selected ? '#E7A957' : '#65D5E8'} />}
    </mesh>
  )
}

// The lens points toward +z (toward the viewer). Light travels from the lens
// toward -z, through the mirror, shutter and sensor.
// explode: 0 = assembled, 1 = fully exploded (the target the animation chases)
function CameraModel({ selectedId, onSelect, explode }) {
  const progress = useRef(0)
  const quarterTurn = Math.PI / 2

  // Respect the visitor's "reduce motion" system setting: jump, don't glide.
  const reduceMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useFrame((_, delta) => {
    progress.current = reduceMotion
      ? explode
      : MathUtils.damp(progress.current, explode, 4, delta)
  })

  const shared = { selectedId, onSelect, progress }

  return (
    <group position={[0, -0.2, -0.6]}>
      {/* ---------- Body ---------- */}
      <Part id="body" shell color="#192A36" opacity={0.16} {...shared}>
        <Piece>
          <boxGeometry args={[3, 1.6, 1.4]} />
        </Piece>
      </Part>

      <Part id="grip" position={[-1.2, -0.05, 0.95]} color="#2A3A45" {...shared}>
        <Piece>
          <boxGeometry args={[0.7, 1.5, 0.5]} />
        </Piece>
      </Part>

      <Part id="battery" position={[-1.15, -0.15, 0]} color="#3B5568" {...shared}>
        <Piece>
          <boxGeometry args={[0.5, 1.0, 0.6]} />
        </Piece>
        <Piece position={[0, 0.2, 0]} color="#E7A957">
          <boxGeometry args={[0.52, 0.14, 0.4]} />
        </Piece>
      </Part>

      <Part id="rearScreen" position={[0, -0.1, -0.73]} color="#0E1A22" {...shared}>
        <Piece>
          <boxGeometry args={[2.1, 1.2, 0.06]} />
        </Piece>
        <Piece position={[0, 0, -0.035]} color="#1D4F5C">
          <boxGeometry args={[1.85, 1.0, 0.02]} />
        </Piece>
      </Part>

      <Part id="controls" position={[0, 0.8, 0]} color="#7D8F99" {...shared}>
        {/* mode dial */}
        <Piece position={[1.05, 0.07, -0.1]}>
          <cylinderGeometry args={[0.28, 0.28, 0.14, 32]} />
        </Piece>
        {/* shutter button */}
        <Piece position={[-1.0, 0.05, 0.2]} color="#E7A957">
          <cylinderGeometry args={[0.12, 0.12, 0.1, 24]} />
        </Piece>
      </Part>

      {/* ---------- Lens ---------- */}
      <Part id="lensMount" position={[0, 0, 0.77]} color="#8FA3AE" {...shared}>
        <Piece rotation={[quarterTurn, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.14, 48]} />
        </Piece>
        <Piece position={[0, 0, 0.1]} color="#B6C9D5">
          <torusGeometry args={[0.6, 0.05, 12, 48]} />
        </Piece>
      </Part>

      <Part
        id="lensBarrel"
        shell
        position={[0, 0, 1.5]}
        color="#192A36"
        opacity={0.16}
        {...shared}
      >
        <Piece rotation={[quarterTurn, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.4, 48]} />
        </Piece>
      </Part>

      <Part id="focusRing" position={[0, 0, 1.9]} color="#2A3A45" {...shared}>
        <Piece rotation={[quarterTurn, 0, 0]} opacity={0.45}>
          <cylinderGeometry args={[0.86, 0.86, 0.4, 48]} />
        </Piece>
        {/* 24 grip ridges placed around the ring */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2
          return (
            <Piece
              key={i}
              position={[Math.cos(angle) * 0.87, Math.sin(angle) * 0.87, 0]}
              rotation={[0, 0, angle]}
              color="#101820"
              opacity={1}
            >
              <boxGeometry args={[0.07, 0.06, 0.34]} />
            </Piece>
          )
        })}
      </Part>

      <Part id="lensElements" {...shared}>
        {/* A sphere squashed along z looks like a convex lens element */}
        <Piece position={[0, 0, 2.0]} scale={[1, 1, 0.28]} color="#65D5E8" opacity={0.55}>
          <sphereGeometry args={[0.62, 32, 16]} />
        </Piece>
        <Piece position={[0, 0, 1.7]} scale={[1, 1, 0.28]} color="#8FD9E6" opacity={0.55}>
          <sphereGeometry args={[0.52, 32, 16]} />
        </Piece>
        <Piece position={[0, 0, 1.0]} scale={[1, 1, 0.28]} color="#B6C9D5" opacity={0.55}>
          <sphereGeometry args={[0.46, 32, 16]} />
        </Piece>
      </Part>

      <Part id="aperture" position={[0, 0, 1.3]} color="#B6C9D5" {...shared}>
        <Piece>
          <torusGeometry args={[0.55, 0.05, 12, 48]} />
        </Piece>
        {/* 7 blades, each turned slightly so they overlap like an iris */}
        {Array.from({ length: 7 }, (_, i) => {
          const angle = (i / 7) * Math.PI * 2
          return (
            <Piece
              key={i}
              position={[Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0]}
              rotation={[0, 0, angle + 0.5]}
              color="#7D8F99"
            >
              <boxGeometry args={[0.32, 0.18, 0.012]} />
            </Piece>
          )
        })}
      </Part>

      {/* ---------- Viewfinder (DSLR) ---------- */}
      {/* Tilted 45 degrees so it reflects light upward */}
      <Part id="mirror" position={[0, 0, 0.15]} rotation={[Math.PI / 4, 0, 0]} color="#DFEAF0" {...shared}>
        <Piece>
          <boxGeometry args={[1.3, 0.04, 0.9]} />
        </Piece>
        <Piece position={[0, -0.03, 0]} color="#5B7585">
          <boxGeometry args={[1.34, 0.02, 0.94]} />
        </Piece>
      </Part>

      <Part id="focusingScreen" position={[0, 0.62, 0.15]} color="#B6C9D5" {...shared}>
        <Piece opacity={0.6}>
          <boxGeometry args={[1.1, 0.02, 0.8]} />
        </Piece>
      </Part>

      <Part id="pentaprism" color="#8FB3C2" {...shared}>
        {/* The shape is extruded (stretched into 3D), then turned 90 degrees
            so it runs left to right. x = -0.55 centres it. */}
        <Piece position={[-0.55, 0, 0]} rotation={[0, quarterTurn, 0]}>
          <extrudeGeometry args={[prismShape, { depth: 1.1, bevelEnabled: false }]} />
        </Piece>
      </Part>

      <Part id="eyepiece" position={[0, 0.96, -0.72]} color="#2A3A45" {...shared}>
        <Piece>
          <boxGeometry args={[0.55, 0.42, 0.2]} />
        </Piece>
        <Piece position={[0, 0, -0.11]} rotation={[quarterTurn, 0, 0]} color="#65D5E8">
          <cylinderGeometry args={[0.13, 0.13, 0.03, 24]} />
        </Piece>
      </Part>

      {/* ---------- Imaging ---------- */}
      <Part id="shutter" position={[0, 0, -0.35]} color="#7D8F99" {...shared}>
        {/* frame: four thin bars */}
        <Piece position={[0, 0.55, 0]}>
          <boxGeometry args={[1.6, 0.1, 0.06]} />
        </Piece>
        <Piece position={[0, -0.55, 0]}>
          <boxGeometry args={[1.6, 0.1, 0.06]} />
        </Piece>
        <Piece position={[-0.78, 0, 0]}>
          <boxGeometry args={[0.1, 1.0, 0.06]} />
        </Piece>
        <Piece position={[0.78, 0, 0]}>
          <boxGeometry args={[0.1, 1.0, 0.06]} />
        </Piece>
        {/* two curtains, shown closed */}
        <Piece position={[0, 0.255, 0]} color="#B6C9D5">
          <boxGeometry args={[1.46, 0.5, 0.015]} />
        </Piece>
        <Piece position={[0, -0.255, 0]} color="#B6C9D5">
          <boxGeometry args={[1.46, 0.5, 0.015]} />
        </Piece>
      </Part>

      <Part id="sensor" position={[0, 0, -0.48]} color="#243845" {...shared}>
        <Piece>
          <boxGeometry args={[1.55, 1.1, 0.05]} />
        </Piece>
        <Piece position={[0, 0, 0.035]} color="#1D4F5C">
          <boxGeometry args={[1.3, 0.87, 0.02]} />
        </Piece>
      </Part>

      <Part id="processor" position={[0, 0, -0.62]} color="#2B4A52" {...shared}>
        <Piece>
          <boxGeometry args={[1.8, 1.25, 0.04]} />
        </Piece>
        <Piece position={[0.2, 0.15, 0.045]} color="#101820">
          <boxGeometry args={[0.5, 0.4, 0.05]} />
        </Piece>
        <Piece position={[-0.5, 0.2, 0.04]} color="#101820">
          <boxGeometry args={[0.3, 0.3, 0.04]} />
        </Piece>
        <Piece position={[-0.45, -0.3, 0.04]} color="#101820">
          <boxGeometry args={[0.35, 0.2, 0.04]} />
        </Piece>
        <Piece position={[0.55, -0.25, 0.04]} color="#101820">
          <boxGeometry args={[0.25, 0.25, 0.04]} />
        </Piece>
        <Piece position={[0.2, -0.5, 0.05]} color="#E7A957">
          <boxGeometry args={[0.6, 0.1, 0.06]} />
        </Piece>
      </Part>

      {/* The optical axis, shown only while exploded */}
      {explode > 0.02 && (
        <Line
          points={[
            [0, 0, -4],
            [0, 0, 6.2],
          ]}
          color="#65D5E8"
          lineWidth={1}
          dashed
          dashSize={0.15}
          gapSize={0.12}
          transparent
          opacity={0.5}
        />
      )}
    </group>
  )
}

export default CameraModel