import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ---------- TIME CALCULATION ---------- */
function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target) - new Date())

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/* ---------- CUSTOM HOOK ---------- */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))
  const prevRef = useRef(timeLeft)

  const [flipped, setFlipped] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft(targetDate)
      const prev = prevRef.current

      const newFlipped = {
        days: next.days !== prev.days,
        hours: next.hours !== prev.hours,
        minutes: next.minutes !== prev.minutes,
        seconds: next.seconds !== prev.seconds,
      }

      setFlipped(newFlipped)
      prevRef.current = next
      setTimeLeft(next)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return { timeLeft, flipped }
}

/* ---------- DIGIT BLOCK ---------- */
function DigitBlock({ value, label, flipped }) {
  const displayVal = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      {/* Card */}
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-neon-purple/20 blur-xl rounded-2xl" />

        <div
          className="glass-card relative rounded-2xl px-4 py-3 md:px-8 md:py-5 min-w-[72px] md:min-w-[110px] text-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(191,95,255,0.12) 0%, rgba(0,212,255,0.06) 100%)',
          }}
        >
          {/* Top split */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 border-b border-white/5"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          />

          <motion.span
            key={displayVal}
            initial={flipped ? { rotateX: -90, opacity: 0 } : false}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-display text-3xl md:text-5xl font-black text-white block"
            style={{
              textShadow:
                '0 0 20px rgba(191,95,255,0.8), 0 0 40px rgba(0,212,255,0.4)',
            }}
          >
            {displayVal}
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <span className="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
        {label}
      </span>
    </div>
  )
}

/* ---------- SEPARATOR ---------- */
function Separator() {
  return (
    <div className="flex flex-col gap-2 mb-8 md:mb-10">
      <span
        className="w-1.5 h-1.5 rounded-full bg-neon-purple"
        style={{ boxShadow: '0 0 8px #bf5fff' }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full bg-neon-purple"
        style={{ boxShadow: '0 0 8px #bf5fff' }}
      />
    </div>
  )
}

/* ---------- MAIN COMPONENT ---------- */
export default function CountdownTimer({ targetDate }) {
  const { timeLeft, flipped } = useCountdown(targetDate)

  return (
    <div className="flex items-end justify-center gap-3 md:gap-6">
      <DigitBlock value={timeLeft.days} label="Days" flipped={flipped.days} />
      <Separator />
      <DigitBlock value={timeLeft.hours} label="Hours" flipped={flipped.hours} />
      <Separator />
      <DigitBlock value={timeLeft.minutes} label="Minutes" flipped={flipped.minutes} />
      <Separator />
      <DigitBlock value={timeLeft.seconds} label="Seconds" flipped={flipped.seconds} />
    </div>
  )
}
