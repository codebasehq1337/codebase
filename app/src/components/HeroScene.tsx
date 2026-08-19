import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      state.pointer.y * 0.12,
      0.05
    )
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Core() {
  const group = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.25,
        0.04
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        state.pointer.x * -0.15,
        0.04
      )
    }
    if (ring.current) ring.current.rotation.z -= delta * 0.4
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#e4e4e7" wireframe transparent opacity={0.85} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 8, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[3, 0.008, 8, 120]} />
        <meshBasicMaterial color="#334155" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function Satellite({ radius, speed, size, color, offset }: {
  radius: number
  speed: number
  size: number
  color: string
  offset: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * 0.9, Math.sin(t) * radius)
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.015
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }} dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }}>
        <Core />
        <Particles />
        <Satellite radius={3.2} speed={0.5} size={0.22} color="#38bdf8" offset={0} />
        <Satellite radius={3.8} speed={0.34} size={0.3} color="#a78bfa" offset={2.2} />
        <Satellite radius={2.8} speed={0.62} size={0.16} color="#f472b6" offset={4.1} />
        <Satellite radius={4.3} speed={0.27} size={0.24} color="#34d399" offset={5.4} />
      </Canvas>
    </div>
  )
}
