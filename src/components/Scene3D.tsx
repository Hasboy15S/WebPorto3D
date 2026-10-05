"use client"
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, PresentationControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CoreShape() {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.3
      
      // Follow mouse gently, centered
      const targetX = (state.pointer.x * state.viewport.width) / 8
      const targetY = (state.pointer.y * state.viewport.height) / 8
      
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.05)
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.05)
    }
  })

  return (
    <PresentationControls
      global={false}
      cursor={true}
      snap={true}
      speed={2}
      zoom={1.5}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <mesh 
          ref={mesh} 
          scale={1.5} 
          onPointerOver={() => setHover(true)} 
          onPointerOut={() => setHover(false)}
        >
          {/* TorusKnot is much more futuristic and complex than Icosahedron */}
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <MeshDistortMaterial 
            color={hovered ? "#00ffff" : "#111111"}
            wireframe={!hovered}
            emissive={hovered ? "#00ffff" : "#004444"}
            emissiveIntensity={hovered ? 2 : 0.8}
            roughness={0.1}
            metalness={0.9}
            distort={hovered ? 0.6 : 0.2}
            speed={hovered ? 5 : 2}
          />
        </mesh>
      </Float>
    </PresentationControls>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-auto" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
        <CoreShape />
      </Canvas>
    </div>
  )
}
