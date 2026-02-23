import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* ================= BACKGROUND LAYER ================= */}
      {/* ✅ Added z-0 */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full z-0"
      >

        {/* 🎬 VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-75 contrast-110"
        >
          <source src="/videos/trailer.mp4" type="video/mp4" />
        </video>

        {/* 🌌 Gradient glow overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 70% 40%, rgba(191,95,255,0.25) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 20% 70%, rgba(0,212,255,0.2) 0%, transparent 60%)
            `,
          }}
        />

        {/* 🌆 Anime city silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a0a2e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#050816" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bf5fff" stopOpacity="0" />
              <stop offset="30%" stopColor="#bf5fff" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0,400 L0,280 L60,280 L60,240 L90,240 L90,200 L130,200 L130,260 L200,260 L200,220 L240,180 L280,220 L320,200 L350,150 L390,100 L430,80 L470,200 L500,170 L560,110 L620,160 L690,100 L740,50 L780,110 L820,140 L880,130 L940,100 L1000,180 L1060,110 L1120,200 L1190,140 L1260,220 L1340,280 L1440,300 L1440,400 Z"
            fill="url(#cityGrad)"
          />

          <line
            x1="0"
            y1="280"
            x2="1440"
            y2="280"
            stroke="url(#glowLine)"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* ===== DARK OVERLAYS (Reduced opacity) ===== */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/40 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10" />

      {/* ===== PARTICLES ===== */}
      <div className="absolute inset-0 z-20">
        <ParticleField count={70} />
      </div>

      {/* ===== HERO CONTENT ===== */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 text-center px-4 sm:px-8 max-w-5xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-4"
        >
          <span className="shimmer-text">AETHERON</span>
        </motion.h1>

        <p className="font-display text-lg tracking-[0.4em] text-neon-blue/80 mb-6 uppercase">
          Rise of the Infinite Realm
        </p>

        <a
          href="#preregister"
          className="inline-block px-8 py-4 font-display text-sm font-black uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 hover:scale-105 transition"
        >
          ⚡ Pre-Register Now
        </a>
      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Scroll
        </span>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>

    </section>
  )
}