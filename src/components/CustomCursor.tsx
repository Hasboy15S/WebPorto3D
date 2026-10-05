"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  
  // Use framer-motion values instead of React state to skip re-renders!
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.2 }
  const ringXSpring = useSpring(cursorX, ringSpringConfig)
  const ringYSpring = useSpring(cursorY, ringSpringConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      const target = e.target as HTMLElement
      // Only set React state for hover events, drastically reducing renders
      const isPointer = window.getComputedStyle(target).cursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON"
      setIsHovering(isPointer)
    }
    
    // Use passive listener for better scroll performance
    window.addEventListener("mousemove", moveCursor, { passive: true })
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 0 : 1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
        }}
      />
    </>
  )
}
