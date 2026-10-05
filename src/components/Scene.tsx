"use client"
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import StoryEngine from './StoryEngine'

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#09090b]">
      {/* 3D Canvas rendering behind the UI layer */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={2} penumbra={1} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} intensity={2} penumbra={1} color="#00F0FF" />
        
        {/* StoryEngine orchestrates models based on native scroll state */}
        <StoryEngine />
        
        <Environment preset="city" resolution={256} />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#000000" resolution={256} />
      </Canvas>
      
      {/* Background radial gradients for ambient glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] pointer-events-none z-[-1] mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0) 60%)' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[800px] h-[800px] pointer-events-none z-[-1] mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(0,0,0,0) 60%)' }} />
    </div>
  )
}
