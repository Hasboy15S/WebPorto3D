"use client"
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, RoundedBox, Edges, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '@/store/scrollState'

function MCU() {
  const group = useRef<THREE.Group>(null!)
  const ledRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [overclock, setOverclock] = useState(false)
  
  useFrame((state, delta) => {
    if (!group.current) return
    const s = scrollState.offset
    
    let targetX = 0, targetY = 0, targetZ = 0, rotX = -Math.PI / 4, rotY = 0, targetScale = 0
    
    // Mapping: 0.0 (Hero) -> 0.25 (Embedded) -> 0.5 (AI)
    if (s < 0.15) {
      targetX = 3.5; targetY = -0.5; targetZ = -2
      rotX = Math.PI / 5; rotY = -0.2
      targetScale = hovered ? 0.9 : 0.75
    } else if (s >= 0.15 && s < 0.35) {
      targetX = -1.8; targetY = 0; targetZ = 1.5
      rotX = 0.2; rotY = Math.PI / 6
      targetScale = hovered ? 1.0 : 0.85
    } else {
      targetX = -10 // Hilang meluncur ke kiri
      targetScale = 0
    }

    if (s < 0.1) {
      targetX += (state.pointer.x * state.viewport.width) / 25
      targetY += (state.pointer.y * state.viewport.height) / 25
    }

    rotX += (overclock ? 0.8 : 0) * state.clock.elapsedTime
    rotY += (overclock ? 2 : 0) * state.clock.elapsedTime

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5, delta)
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 5, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, rotX, 5, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, rotY + state.clock.elapsedTime * 0.2, 5, delta)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta))
    
    if (ledRef.current) {
      const time = state.clock.elapsedTime
      const blinkSpeed = overclock ? 20 : (hovered ? 10 : 2)
      const material = ledRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = (Math.sin(time * blinkSpeed) + 1) * 2 
    }

    if (ringRef.current && overclock) {
      ringRef.current.rotation.z += delta * 2
      ringRef.current.rotation.x += delta * 3
    }
  })

  const pins = useMemo(() => {
    const arr = []
    for (let i = 0; i < 15; i++) {
      arr.push(
        <group key={`L-${i}`} position={[-1.45, 0, -1.8 + i * 0.25]}>
          <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.4, 8]} rotation={[0, 0, Math.PI/2]}/><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} /></mesh>
          <mesh position={[0.2, 0.12, 0]}><sphereGeometry args={[0.06, 8, 8]}/><meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.2} /></mesh>
        </group>
      )
      arr.push(
        <group key={`R-${i}`} position={[1.45, 0, -1.8 + i * 0.25]}>
          <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.4, 8]} rotation={[0, 0, Math.PI/2]}/><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} /></mesh>
          <mesh position={[-0.2, 0.12, 0]}><sphereGeometry args={[0.06, 8, 8]}/><meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.2} /></mesh>
        </group>
      )
    }
    return arr
  }, [])

  return (
    <group 
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'none'; }}
      onClick={(e) => { e.stopPropagation(); setOverclock(!overclock); }}
    >
      <RoundedBox args={[3.2, 0.15, 4.2]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial color={overclock ? "#2a0000" : "#06140e"} roughness={0.4} metalness={0.6} clearcoat={1} clearcoatRoughness={0.1} />
      </RoundedBox>

      <RoundedBox args={[1.5, 0.2, 1.8]} position={[0, 0.1, 0.5]} radius={0.05} smoothness={2}>
        <meshPhysicalMaterial color="#111" roughness={0.8} metalness={0.2} clearcoat={0.1} />
      </RoundedBox>

      <group position={[0, 0.08, -1.5]}>
         <mesh position={[0, 0, 0]}><boxGeometry args={[1.2, 0.02, 0.05]} /><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} /></mesh>
         <mesh position={[0.575, 0, 0.2]}><boxGeometry args={[0.05, 0.02, 0.4]} /><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} /></mesh>
         <mesh position={[-0.575, 0, 0.2]}><boxGeometry args={[0.05, 0.02, 0.4]} /><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} /></mesh>
         <mesh position={[0.3, 0, 0.4]}><boxGeometry args={[0.6, 0.02, 0.05]} /><meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} /></mesh>
      </group>

      <mesh position={[-0.5, 0.1, -0.6]}><boxGeometry args={[0.1, 0.05, 0.2]} /><meshStandardMaterial color="#a08050" metalness={0.3} roughness={0.8} /></mesh>
      <mesh position={[-0.5, 0.1, -0.3]}><boxGeometry args={[0.1, 0.05, 0.2]} /><meshStandardMaterial color="#333" metalness={0.5} roughness={0.8} /></mesh>
      <mesh position={[-0.2, 0.1, -0.7]} rotation={[0, Math.PI/2, 0]}><boxGeometry args={[0.1, 0.05, 0.2]} /><meshStandardMaterial color="#a08050" metalness={0.3} roughness={0.8} /></mesh>

      <RoundedBox args={[0.4, 0.1, 0.2]} position={[0.5, 0.1, -0.6]} radius={0.02}>
         <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      <mesh ref={ledRef} position={[0.8, 0.1, -1]}>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color={overclock ? "#ff0000" : "#00FFA3"} emissive={overclock ? "#ff0000" : "#00FFA3"} />
      </mesh>

      {pins}

      {overclock && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
        </mesh>
      )}
    </group>
  )
}

function AICamera() {
  const group = useRef<THREE.Group>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const scanConeRef = useRef<THREE.Mesh>(null!)
  const laserBoxesRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (!group.current) return
    const s = scrollState.offset
    let targetX = 3.5, targetScale = 0
    
    // Mapping: AI Vision is around 0.50
    if (s > 0.35 && s < 0.65) {
       targetScale = 0.8
       targetX = 2.0 // Geser agak ke tengah
    } else {
       targetScale = 0
    }
    
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5, delta)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta))
    
    // CCTV looking around slowly
    const time = state.clock.elapsedTime
    group.current.rotation.y = -0.3 + Math.sin(time * 0.5) * 0.5
    group.current.rotation.x = Math.sin(time * 0.7) * 0.2

    if (ringRef.current) {
        ringRef.current.rotation.z -= delta * 2
    }
    

  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Wall Mount */}
      <mesh position={[0, 0, -1.8]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshPhysicalMaterial color="#09090b" roughness={0.8} metalness={0.5} />
      </mesh>
      
      {/* Articulated Arm */}
      <mesh position={[0, 0, -1.4]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshPhysicalMaterial color="#333" roughness={0.5} metalness={0.8} />
      </mesh>
      
      {/* Main CCTV Housing */}
      <RoundedBox args={[1.2, 1.2, 2]} position={[0, 0, -0.2]} radius={0.15} smoothness={4}>
         <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.1} />
      </RoundedBox>
      
      {/* Dark Front Bezel */}
      <RoundedBox args={[1.1, 1.1, 0.2]} position={[0, 0, 0.85]} radius={0.1}>
         <meshPhysicalMaterial color="#050505" roughness={0.6} metalness={0.8} />
      </RoundedBox>

      {/* The Lens Glass */}
      <mesh position={[0, 0, 0.9]}>
         <sphereGeometry args={[0.4, 32, 32]} />
         <meshPhysicalMaterial color="#000510" metalness={0.9} roughness={0.0} clearcoat={1} transmission={0.5} ior={1.5} />
      </mesh>
      
      {/* Inner Lens Element */}
      <mesh position={[0, 0, 0.8]}>
         <sphereGeometry args={[0.3, 32, 32]} />
         <meshPhysicalMaterial color="#001133" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* AI Glowing Ring */}
      <mesh ref={ringRef} position={[0, 0, 0.95]}>
         <torusGeometry args={[0.45, 0.015, 16, 64]} />
         <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
      </mesh>
      
      {/* Status LED */}
      <mesh position={[0.4, 0.4, 0.95]}>
         <sphereGeometry args={[0.05, 16, 16]} />
         <meshStandardMaterial color="#FF0033" emissive="#FF0033" emissiveIntensity={2} />
      </mesh>

    </group>
  )
}

function ServerRack() {
  const group = useRef<THREE.Group>(null!)
  
  useFrame((state, delta) => {
    if (!group.current) return
    const s = scrollState.offset
    let targetScale = 0, targetX = -3.5
    
    // Mapping: Full Stack is around 0.75
    if (s > 0.60 && s < 0.90) {
      targetScale = 0.6
    }
    
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta))
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 5, delta)
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 0.3
  })

  const blades = useMemo(() => {
    const arr = []
    for(let i=0; i<8; i++) {
        const yOffset = -1.4 + (i * 0.4)
        arr.push(
            <group key={`blade-${i}`} position={[0, yOffset, 0]}>
                <mesh><boxGeometry args={[1.8, 0.35, 1.8]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.7} metalness={0.5} /></mesh>
                <mesh position={[-0.7, 0, 0.9]}>
                   <boxGeometry args={[0.1, 0.05, 0.05]} />
                   <meshStandardMaterial color="#00FFA3" emissive="#00FFA3" emissiveIntensity={Math.random() > 0.5 ? 2 : 0.5} />
                </mesh>
                <mesh position={[-0.5, 0, 0.9]}>
                   <boxGeometry args={[0.1, 0.05, 0.05]} />
                   <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={Math.random() > 0.5 ? 2 : 0} />
                </mesh>
                <mesh position={[-0.3, 0, 0.9]}>
                   <boxGeometry args={[0.1, 0.05, 0.05]} />
                   <meshStandardMaterial color="#FF0055" emissive="#FF0055" emissiveIntensity={Math.random() > 0.9 ? 2 : 0} />
                </mesh>
            </group>
        )
    }
    return arr
  }, [])

  return (
    <group ref={group} position={[0, 0, 0]} scale={0}>
      <mesh position={[0, 0, 0]}>
         <boxGeometry args={[2.2, 3.6, 2.2]} />
         <meshPhysicalMaterial color="#0a0a0a" roughness={0.5} metalness={0.8} clearcoat={0.2} />
         <Edges scale={1} color="#333" />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
         <boxGeometry args={[2, 3.4, 2]} />
         <meshBasicMaterial color="#000" />
      </mesh>
      {blades}
      <mesh position={[0, 0, 1.1]}>
         <boxGeometry args={[2.1, 3.5, 0.05]} />
         <MeshTransmissionMaterial transmission={0.9} thickness={0.1} roughness={0.1} color="#001122" />
      </mesh>
    </group>
  )
}

function RoboticArm() {
  const group = useRef<THREE.Group>(null!)
  const joint1 = useRef<THREE.Group>(null!)
  const joint2 = useRef<THREE.Group>(null!)
  const joint3 = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (!group.current) return
    const s = scrollState.offset
    let targetY = -10, targetScale = 0
    
    // Mapping: Industrial is at 1.00
    if (s > 0.85) {
      targetY = -1.5 
      targetScale = 0.4
    }
    
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta))
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 5, delta)
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4
    
    if (joint1.current && joint2.current && joint3.current) {
        joint1.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
        joint2.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.4 - 0.5
        joint3.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5
    }
  })
  
  return (
    <group ref={group} position={[0, -10, 0]} scale={0}>
      <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.6} metalness={0.8} />
      </mesh>
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[1, 1, 1, 32]} /><meshPhysicalMaterial color="#ff5500" roughness={0.4} metalness={0.4} clearcoat={0.5} /></mesh>
        <group ref={joint1} position={[0, 1, 0]}>
            <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.8, 0.8, 1.2, 32]} /><meshPhysicalMaterial color="#333" roughness={0.5} metalness={0.7} /></mesh>
            <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.4, 0.6, 3, 16]} /><meshPhysicalMaterial color="#ff5500" roughness={0.4} metalness={0.4} clearcoat={0.5} /></mesh>
            <group ref={joint2} position={[0, 3, 0]}>
                <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.6, 0.6, 1, 32]} /><meshPhysicalMaterial color="#333" roughness={0.5} metalness={0.7} /></mesh>
                <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.3, 0.4, 2, 16]} /><meshPhysicalMaterial color="#ff5500" roughness={0.4} metalness={0.4} clearcoat={0.5} /></mesh>
                <group ref={joint3} position={[0, 2, 0]}>
                    <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.8, 32]} /><meshPhysicalMaterial color="#333" roughness={0.5} metalness={0.7} /></mesh>
                    <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.2, 0.3, 1, 16]} /><meshPhysicalMaterial color="#ccc" roughness={0.3} metalness={0.9} /></mesh>
                    <mesh position={[0, 1.2, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.15, 0.5, 16]} />
                        <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={1} />
                    </mesh>
                </group>
            </group>
        </group>
      </group>
    </group>
  )
}

export default function StoryEngine() {
  return (
    <group>
      <MCU />
      <AICamera />
      <ServerRack />
      <RoboticArm />
      <Sparkles count={200} scale={20} size={2.5} speed={0.2} opacity={0.3} color="#ffffff" />
    </group>
  )
}
