"use client"
import dynamic from 'next/dynamic'
import { UIOverlay } from '@/components/UIOverlay'
import { scrollState } from '@/store/scrollState'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      // Calculate scroll progress from 0 to 1 and save it to the global state
      scrollState.offset = scrollTop / (scrollHeight - clientHeight)
    }
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-[#09090b] relative">
      <Scene />
      
      {/* Native Scroll Container (overlaid on top of Canvas, catches events perfectly) */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden z-10"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        <UIOverlay />
      </div>
    </main>
  )
}
