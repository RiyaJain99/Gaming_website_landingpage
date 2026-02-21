import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CountdownTimer from '../components/CountdownTimer'
import { getPreRegisterCount } from '../lib/supabase'

// Set your actual launch date here
const LAUNCH_DATE = '2026-12-31T00:00:00'

// Goal for progress bar
const GOAL = 2000000

export default function Countdown() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [count, setCount] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    async function fetchCount() {
      const { count: total } = await getPreRegisterCount()

      if (total !== null) {
        setCount(total)
        const calculatedPercent = Math.min((total / GOAL) * 100, 100)
        setPercentage(calculatedPercent)
      }
    }

    fetchCount()

    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #050816 0%, #0d0621 50%, #050816 100%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(191,95,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,95,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />

      {/* 🔥 Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-gold/60" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-neon-gold">
              Global Launch
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-gold/60" />
          </div>

          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            The Realm Opens In
          </h2>

          <p className="font-body text-slate-400 mb-14 max-w-md mx-auto">
            Pre-register now and receive exclusive launch rewards worth 10,000 Aether Crystals.
          </p>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={LAUNCH_DATE} />

          {/* Platform Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {['iOS', 'Android', 'PC', 'PS5', 'Xbox'].map((platform) => (
              <div
                key={platform}
                className="glass-card px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-neon-purple/50 transition-all duration-300 cursor-default"
              >
                {platform}
              </div>
            ))}
          </motion.div>

          {/* 🔴 LIVE Badge */}
          <div className="flex justify-center mt-10">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
              🔴 LIVE REGISTRATIONS
            </span>
          </div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-w-md mx-auto"
          >
            <div className="flex justify-between mb-2">
              <span className="font-body text-xs text-slate-500 uppercase tracking-widest">
                Pre-registration
              </span>
              <span className="font-body text-xs font-bold text-neon-purple">
                {percentage.toFixed(1)}% of goal
              </span>
            </div>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                key={percentage}
                initial={{ width: 0 }}
                animate={{
                  width: `${percentage}%`,
                  boxShadow: [
                    '0 0 12px rgba(191,95,255,0.6)',
                    '0 0 25px rgba(191,95,255,1)',
                    '0 0 12px rgba(191,95,255,0.6)'
                  ]
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeOut',
                }}
                className="h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #bf5fff, #00d4ff)',
                }}
              />
            </div>

            <p className="text-center font-body text-xs text-slate-500 mt-2">
              <motion.span
                key={count}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {count.toLocaleString()}
              </motion.span>
              {' / '}
              {GOAL.toLocaleString()} pre-registrations
            </p>

            {/* 🎁 Milestone Unlock */}
            {count >= 100 && (
              <p className="text-neon-cyan mt-3 font-display">
                🎁 Early Milestone Unlocked!
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
