"use client"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}

export default function Button({ children, variant = "primary", href }: ButtonProps) {
  const base = "relative inline-flex items-center justify-center px-8 py-3 font-medium text-sm rounded-full transition-all duration-300"
  
  const variants = {
    primary: "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    secondary: "bg-zinc-950 text-white border border-white/10 hover:border-white/30 hover:bg-white/5"
  }

  const Tag = href ? motion.a : motion.button
  
  return (
    <Tag 
      href={href} 
      className={`${base} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </Tag>
  )
}
