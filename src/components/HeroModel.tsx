"use client"
import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows, PresentationControls, Text, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function StylizedMicrocontroller() {
  const group = useRef<THREE.Group>(null!)
  const ledRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [overclock, setOverclock] = useState(false) // Interactive mode!
  
  useFrame((state, delta) => {
    if (group.current) {
      // Rotasi dinamis: kalau overclock, dia muter kencang
      group.current.rotation.x += delta * (overclock ? 0.8 : 0.2)
      group.current.rotation.y += delta * (overclock ? 1.5 : 0.3)
      
      // Efek melayang ngikutin mouse
      const targetX = (state.pointer.x * state.viewport.width) / 20
      const targetY = (state.pointer.y * state.viewport.height) / 20
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX + 2, 0.05)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05)
    }

    // Logic untuk lampu LED yang berkedip
    if (ledRef.current) {
      const time = state.clock.elapsedTime
      const blinkSpeed = overclock ? 20 : (hovered ? 10 : 2)
      const material = ledRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = (Math.sin(time * blinkSpeed) + 1) * 1.5 // Kedip-kedip
    }

    // Animasi cincin hologram saat mode overclock aktif
    if (ringRef.current && overclock) {
      ringRef.current.rotation.z += delta * 2
      ringRef.current.rotation.x += delta * 3
    }
  })

  // Pre-generate Pin GPIO mikroprosesor biar memori nggak berat
  const pins = useMemo(() => {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(
        <mesh key={`L-${i}`} position={[-1.6, 0, -1.8 + i * 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
        </mesh>
      )
      arr.push(
        <mesh key={`R-${i}`} position={[1.6, 0, -1.8 + i * 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
        </mesh>
      )
    }
    return arr
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group 
        ref={group} 
        scale={hovered ? 1.1 : 0.9}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'none'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        onClick={(e) => { e.stopPropagation(); setOverclock(!overclock) }}
        rotation={[-Math.PI/4, 0, 0]}
      >
        {/* Papan PCB Hijau Gelap/Merah */}
        <mesh>
          <boxGeometry args={[3, 0.2, 4]} />
          <meshStandardMaterial color={overclock ? "#220000" : "#0A1F1C"} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Chip MCU Utama */}
        <mesh position={[0, 0.15, 0.5]}>
          <boxGeometry args={[1.5, 0.2, 1.5]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Teks Label Chip (ESP32) */}
        <Text 
          position={[0, 0.26, 0.5]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          fontSize={0.25} 
          color={overclock ? "#ff0000" : "#ffffff"}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
          anchorX="center"
          anchorY="middle"
        >
          ESP-32
        </Text>

        {/* Modul Antena WiFi Emas */}
        <mesh position={[0, 0.11, -1.2]}>
          <boxGeometry args={[1, 0.05, 0.8]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </mesh>

        {/* Elco/Kapasitor Silinder */}
        <mesh position={[-0.8, 0.15, -0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Lampu Status LED yang bisa berkedip */}
        <mesh ref={ledRef} position={[0.8, 0.15, -0.5]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={overclock ? "#ff0000" : "#00FFA3"} emissive={overclock ? "#ff0000" : "#00FFA3"} />
        </mesh>

        {/* Array Pin Konektor */}
        {pins}

        {/* Cincin Hologram Merah pas di-klik (Overclock mode) */}
        {overclock && (
          <mesh ref={ringRef} position={[0, 0, 0]}>
            <torusGeometry args={[2.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
          </mesh>
        )}
      </group>

      {/* Partikel Data Melayang di sekitar board */}
      <Sparkles 
        count={80} 
        scale={6} 
        size={3} 
        speed={0.4} 
        opacity={0.6} 
        color={overclock ? "#ff0055" : "#00F0FF"} 
      />
    </Float>
  )
}

export default function HeroModel() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} intensity={2} penumbra={1} color="#00F0FF" />
        
        <PresentationControls
          global={false}
          cursor={false}
          snap={true}
          speed={1.5}
          zoom={1}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <StylizedMicrocontroller />
        </PresentationControls>

        <Environment preset="city" resolution={256} />
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#000000" resolution={256} />
      </Canvas>
    </div>
  )
}
