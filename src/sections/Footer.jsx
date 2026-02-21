import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Twitter, Youtube, Instagram, Twitch } from 'lucide-react'

const socials = [
  {
    name: 'Twitter / X',
    href: 'https://twitter.com',
    icon: Twitter,
    color: '#00d4ff',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: Youtube,
    color: '#ff2d78',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
    color: '#ff2d78',
  },
  {
    name: 'Twitch',
    href: 'https://twitch.tv',
    icon: Twitch,
    color: '#bf5fff',
  },
]

const footerLinks = {
  Game: ['About', 'Features', 'Characters', 'World Map', 'Lore'],
  Support: ['FAQ', 'Contact Us', 'Bug Reports', 'Community'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'EULA'],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Neon divider */}
      <div className="relative h-px">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #bf5fff 20%, #00d4ff 50%, #ff2d78 80%, transparent 100%)',
            boxShadow: '0 0 20px rgba(191,95,255,0.6)',
          }}
        />
      </div>

      <div
        className="relative"
        style={{ background: 'linear-gradient(180deg, #0a0520 0%, #050816 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(191,95,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(191,95,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
          {/* Top grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="#home" className="inline-flex items-center gap-2 mb-4 group">
                <Zap className="w-6 h-6 text-neon-purple group-hover:text-neon-cyan transition-colors duration-300" />
                <span className="font-display text-xl font-black tracking-widest text-white">
                  AETHERON
                </span>
              </a>

              <p className="font-body text-sm text-slate-500 leading-relaxed mb-6">
                The next generation anime RPG. Forge your legend in an infinite open world.
              </p>

              {/* Socials */}
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = s.icon
                  return (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      whileHover={{
                        scale: 1.15,
                        color: s.color,
                        boxShadow: `0 0 15px ${s.color}60`,
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-500 transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-display text-xs font-black uppercase tracking-[0.3em] text-neon-purple/80 mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body text-sm text-slate-500 hover:text-white hover:tracking-wider transition-all duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-4 mb-10 py-6 border-y border-white/5">
            {[
              { badge: 'ESRB', rating: 'T for Teen', color: '#00d4ff' },
              { badge: 'PEGI', rating: '12+', color: '#bf5fff' },
              { badge: 'MDA', rating: 'Advisory', color: '#ff2d78' },
            ].map((r) => (
              <div
                key={r.badge}
                className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg"
              >
                <span
                  className="font-display text-xs font-black px-1.5 py-0.5 rounded"
                  style={{
                    background: r.color + '22',
                    color: r.color,
                    border: `1px solid ${r.color}40`,
                  }}
                >
                  {r.badge}
                </span>
                <span className="font-body text-xs text-slate-500">
                  {r.rating}
                </span>
              </div>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="font-body text-xs text-slate-500">
                Servers:{' '}
                <span className="text-neon-cyan font-semibold">
                  All Systems Online
                </span>
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-slate-600 text-center sm:text-left">
              © {new Date().getFullYear()} AETHERON Studios. All rights reserved.
              <br className="sm:hidden" /> All trademarks are property of their
              respective owners.
            </p>

            <div className="flex items-center gap-1.5">
              <span className="font-body text-xs text-slate-600">
                Made with
              </span>
              <span className="text-neon-pink text-sm animate-pulse-glow">
                ♥
              </span>
              <span className="font-body text-xs text-slate-600">
                by AETHERON Studios
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
