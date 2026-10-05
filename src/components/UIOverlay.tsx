"use client"
import Button from './ui/Button'
import BentoCard from './ui/BentoCard'
import { Terminal } from 'lucide-react'

export function UIOverlay() {
  return (
    // We make this 500vh tall to represent 5 pages of scrolling
    <div className="w-full flex flex-col pointer-events-none" style={{ minHeight: '500vh' }}>
      
      {/* Scene 1: Hero (0% - 20%) */}
      <section className="w-full h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-3xl pointer-events-auto">
          <div className="mb-6 flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>&gt; ./hasbi.sh --profile</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-semibold tracking-tighter mb-6 text-white leading-[1.1]">
            Muhammad Hasbi <br/><span className="text-zinc-500">Takumi</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl font-body font-light leading-relaxed">
            Software Engineer | Robotics & AI Enthusiast. <br/> Building premium digital experiences and intelligent hardware systems.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Explore Journey</Button>
            <Button variant="secondary">Contact</Button>
          </div>
        </div>
      </section>

      {/* Scene 2: Embedded Systems (20% - 40%) */}
      <section className="w-full h-screen flex flex-col justify-center px-6 md:px-24 items-start md:items-end">
        <div className="max-w-xl w-full pointer-events-auto">
          <BentoCard>
            <div className="text-cyan-400 font-mono text-sm mb-4">01 // THE BRAIN</div>
            <h3 className="text-4xl font-heading font-medium text-white mb-6">Embedded Systems</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
              Merakit inti dari otomasi. Saya merancang arsitektur mikrokontroler presisi tinggi, 
              menerapkan kontrol PID untuk stabilisasi robot, dan meracik kinematika pergerakan Omnidirectional 
              yang mulus pada environment hardware nyata.
            </p>
            <div className="flex gap-2 font-mono text-xs text-zinc-500">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">ESP32</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">C++</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">PlatformIO</span>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Scene 3: AI & Computer Vision (40% - 60%) */}
      <section className="w-full h-screen flex flex-col justify-center px-6 md:px-24 items-start">
        <div className="max-w-xl w-full pointer-events-auto">
          <BentoCard>
            <div className="text-emerald-400 font-mono text-sm mb-4">02 // THE EYES</div>
            <h3 className="text-4xl font-heading font-medium text-white mb-6">AI & Vision</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
              Memberikan penglihatan pada mesin. Mengembangkan model deteksi objek realtime menggunakan arsitektur YOLOv8 
              dan pipeline pengenalan wajah biometrik (YuNet & SFace) untuk interaksi mesin tanpa sentuh.
            </p>
            <div className="space-y-3 mb-6">
               <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
                 <strong className="text-white block mb-1">HydroVision AI</strong>
                 <span className="text-sm text-zinc-500">Autonomous hydroponic monitoring with vision</span>
               </div>
               <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
                 <strong className="text-white block mb-1">AbsensiYolo</strong>
                 <span className="text-sm text-zinc-500">Contactless attendance system</span>
               </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Scene 4: Full-Stack Web (60% - 80%) */}
      <section className="w-full h-screen flex flex-col justify-center px-6 md:px-24 items-start md:items-end">
        <div className="max-w-xl w-full pointer-events-auto">
          <BentoCard>
            <div className="text-purple-400 font-mono text-sm mb-4">03 // THE NERVES</div>
            <h3 className="text-4xl font-heading font-medium text-white mb-6">Full-Stack Data</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-6">
              Membangun jembatan komunikasi antara hardware dan user. Merancang API server berkinerja tinggi, 
              arsitektur cloud terdistribusi, dan antarmuka web interaktif yang merespons data sensor dalam mili-detik.
            </p>
            <div className="flex gap-2 font-mono text-xs text-zinc-500 mb-6 flex-wrap">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">Next.js</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">FastAPI</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">Laravel</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">MongoDB</span>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Scene 5: Physical Manifestation (80% - 100%) */}
      <section className="w-full h-screen flex flex-col justify-end pb-24 px-6 md:px-24 items-center text-center">
        <div className="max-w-2xl w-full pointer-events-auto">
          <BentoCard>
            <div className="text-amber-400 font-mono text-sm mb-4">04 // THE BODY</div>
            <h3 className="text-4xl font-heading font-medium text-white mb-6">Industrial Design</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
              Mewujudkan kode menjadi bentuk fisik. Berpengalaman dalam merancang pergerakan kinematik Collaborative Robot (Cobot) 
              serta manufaktur part hardware presisi tinggi melalui CAD dan 3D Printing.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary">View CAD Models</Button>
              <Button variant="secondary">RoboDK Simulation</Button>
            </div>
          </BentoCard>
        </div>
      </section>

    </div>
  )
}
