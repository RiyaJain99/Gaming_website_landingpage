import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Characters', href: '#characters' },
  { label: 'Trailer', href: '#trailer' },
  { label: 'Pre-Register', href: '#preregister' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (label) => {
    setActive(label)
    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-neon-purple/20 shadow-neon-purple'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-neon-purple rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm" />
              <Zap className="w-6 h-6 text-neon-purple relative z-10 group-hover:text-neon-cyan transition-colors duration-300" />
            </div>
            <span className="font-display text-xl font-black tracking-widest text-white group-hover:neon-text-purple transition-all duration-300">
              AETHERON
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                className={`relative px-4 py-2 font-body font-semibold text-sm uppercase tracking-widest transition-all duration-300 group ${
                  active === link.label ? 'text-neon-purple' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300 ${
                    active === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
            <a
              href="#preregister"
              onClick={() => handleLinkClick('Pre-Register')}
              className="ml-4 px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-white rounded border border-neon-purple/50 bg-neon-purple/10 hover:bg-neon-purple/20 hover:shadow-neon-purple hover:border-neon-purple transition-all duration-300"
            >
              Pre-Register
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-neon-purple transition-colors duration-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-neon-purple/20"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleLinkClick(link.label)}
                  className="px-4 py-3 font-body font-semibold uppercase tracking-widest text-slate-300 hover:text-neon-purple hover:bg-neon-purple/10 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
