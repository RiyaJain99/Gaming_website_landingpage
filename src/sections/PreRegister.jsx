import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { supabase, submitPreRegistration, getPreRegisterCount } from '../lib/supabase'
import { CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'

const REWARDS = [
  { icon: '⚔️', label: '5,000 Aether Crystals', desc: 'Early backer bonus' },
  { icon: '🌟', label: 'Exclusive Skin "Void Weaver"', desc: 'Limited cosmetic' },
  { icon: '👑', label: 'Founder Title', desc: 'Permanent account badge' },
  { icon: '🎴', label: 'SSR Summon Tickets ×10', desc: 'Guaranteed rate-up' },
]

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function PreRegister() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [inputError, setInputError] = useState('')
  const [count, setCount] = useState(0)

  const inputRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    async function fetchCount() {
      const { count } = await getPreRegisterCount()
      if (count !== null) setCount(count)
    }

    fetchCount()
    const interval = setInterval(fetchCount, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
  e.preventDefault()
  setInputError('')

  if (!email.trim()) {
    setInputError('Please enter your email address.')
    inputRef.current?.focus()
    return
  }

  if (!validateEmail(email)) {
    setInputError('Please enter a valid email address.')
    inputRef.current?.focus()
    return
  }

  setStatus('loading')

  try {
    const { error } = await submitPreRegistration(email)

    // ❌ Ignore duplicate error
    if (error && error.code !== '23505') {
      throw error
    }

    // ✅ Always show success
    setStatus('success')
    setMessage(`Welcome to the Realm, ${email.split('@')[0]}! Check your inbox.`)

    // ✅ ALWAYS send email
    const { error: fnError } =
      await supabase.functions.invoke('send-welcome-email', {
        body: { email }
      })

    if (fnError) {
      console.error("Edge function error:", fnError)
    }

    setEmail('')

    const { count } = await getPreRegisterCount()
    if (count !== null) setCount(count)

  } catch (err) {
    console.error('Pre-registration error:', err)
    setStatus('error')
    setMessage('Something went wrong. Please try again.')
  }
}

  return (
    <section id="preregister" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0f0520 0%, #050816 80%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
              Join Before <br />
              <span className="neon-text-purple">The Portal Opens</span>
            </h2>

            <div className="space-y-3">
              {REWARDS.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <div className="font-display text-sm font-bold text-white">{r.label}</div>
                    <div className="font-body text-xs text-slate-500">{r.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">

              <h3 className="font-display font-black text-2xl text-white mb-6">
                Pre-Register Free
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 text-neon-cyan" size={42} />
                    <p className="text-white font-bold text-lg mb-2">You're In!</p>
                    <p className="text-slate-400 text-sm">{message}</p>

                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-xs text-slate-500 hover:text-neon-purple underline"
                    >
                      Register another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate>

                    {status === 'error' && (
                      <div className="text-neon-pink text-sm mb-3">{message}</div>
                    )}

                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-lg bg-black/40 text-white mb-4 outline-none"
                      disabled={status === 'loading'}
                    />

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold"
                    >
                      {status === 'loading' ? 'Loading…' : 'Claim My Rewards'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="text-center text-sm text-slate-400 mt-6">
                <span className="text-white font-semibold">
                  +<CountUp end={count} duration={2} />
                </span> warriors joined
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
