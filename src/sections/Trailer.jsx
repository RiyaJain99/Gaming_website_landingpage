import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-purple/60" />
      <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-neon-purple">
        {text}
      </span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-purple/60" />
    </div>
  )
}

function CornerAccent({ pos }) {
  return (
    <div className={`absolute ${pos} z-20 w-6 h-6 pointer-events-none`}>
      <div className="w-6 h-0.5 bg-neon-purple" />
      <div className="w-0.5 h-6 bg-neon-purple" />
    </div>
  )
}

export default function Trailer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="trailer" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-neon-purple/8 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Section heading */}
          <SectionLabel text="Official Reveal" />

          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl text-center text-white mb-4">
            Watch the <span className="neon-text-purple">Trailer</span>
          </h2>

          <p className="text-center font-body text-slate-400 mb-12 max-w-xl mx-auto">
            Experience the epic saga that will redefine anime gaming forever.
            Sound on for full immersion.
          </p>

          {/* ================= VIDEO CONTAINER ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                '0 0 60px rgba(191,95,255,0.2), 0 0 120px rgba(0,212,255,0.1), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Corner accents */}
            <CornerAccent pos="top-0 left-0" />
            <CornerAccent pos="top-0 right-0 rotate-90" />
            <CornerAccent pos="bottom-0 left-0 -rotate-90" />
            <CornerAccent pos="bottom-0 right-0 rotate-180" />

            {/* Glow border */}
            <div className="absolute inset-0 rounded-2xl border border-neon-purple/30 z-10 pointer-events-none" />

            {/* 🎬 LOCAL VIDEO PLAYER */}
            <div className="w-full aspect-video bg-black">
             <video
  src="/videos/trailer.mp4"
  controls
  autoPlay
  muted
  loop
  className="w-full rounded-xl"
/>
                <source src="/videos/trailer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* ================= STATS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { value: '50M+', label: 'Views' },
              { value: '4.9★', label: 'Rating' },
              { value: '180+', label: 'Countries' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center glass-card rounded-xl py-4 px-2"
              >
                <div className="font-display font-black text-xl text-white">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-slate-500 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
