import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-heading' })
const inter = Inter({ subsets: ["latin"], variable: '--font-body' })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' })

export const metadata: Metadata = {
  title: "Hasbi Takumi | Software Engineer",
  description: "Software Engineer | Robotics & AI Enthusiast",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-[#09090b] text-zinc-100 selection:bg-cyan-500/30`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
