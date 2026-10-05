"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function BentoCard({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={`relative rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-white/[0.05] p-8 overflow-hidden group hover:border-white/[0.1] transition-colors duration-500 ${className}`}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}
