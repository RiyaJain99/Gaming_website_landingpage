import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const characters = [
  {
    id: 1,
    name: 'Kairo Vex',
    role: 'Arcane Berserker',
    element: 'Void',
    description:
      'A fallen god reborn through forbidden magic. Kairo channels void energy into devastating melee combos that shatter reality itself.',
    color: '#bf5fff',
    shadowColor: 'rgba(191,95,255,0.5)',
    bgGradient: 'from-purple-900/40 to-purple-500/5',
    image: 'https://api.dicebear.com/7.x/bottts/svg?seed=kairo&backgroundColor=1a0033&eyeType=eva&mouthType=smile01&texture=circuits',
    stats: { ATK: 95, DEF: 60, SPD: 75, MAG: 88 },
    rarity: 'SSR',
  },
  {
    id: 2,
    name: 'Sera Luminex',
    role: 'Celestial Healer',
    element: 'Light',
    description:
      'Guardian of the last sacred temple, Sera wields ancient healing arts and blinding holy spears forged from starlight.',
    color: '#00d4ff',
    shadowColor: 'rgba(0,212,255,0.5)',
    bgGradient: 'from-cyan-900/40 to-cyan-500/5',
    image: 'https://api.dicebear.com/7.x/bottts/svg?seed=sera&backgroundColor=001a33&eyeType=happy&mouthType=smile02',
    stats: { ATK: 65, DEF: 80, SPD: 85, MAG: 98 },
    rarity: 'SSR',
  },
  {
    id: 3,
    name: 'Ryoku Blaze',
    role: 'Inferno Swordsman',
    element: 'Fire',
    description:
      'Once a disgraced samurai, Ryoku fused his soul with an ancient fire dragon granting him catastrophic sword techniques.',
    color: '#ff2d78',
    shadowColor: 'rgba(255,45,120,0.5)',
    bgGradient: 'from-pink-900/40 to-pink-500/5',
    image: 'https://api.dicebear.com/7.x/bottts/svg?seed=ryoku&backgroundColor=330010&eyeType=robocop&mouthType=bite',
    stats: { ATK: 99, DEF: 55, SPD: 90, MAG: 70 },
    rarity: 'UR',
  },
  {
    id: 4,
    name: 'Nyx Phantom',
    role: 'Shadow Assassin',
    element: 'Dark',
    description:
      'Born from the abyss between worlds, Nyx moves unseen between dimensions, striking with phantom blades that ignore armor.',
    color: '#00ffe7',
    shadowColor: 'rgba(0,255,231,0.5)',
    bgGradient: 'from-teal-900/40 to-teal-500/5',
    image: 'https://api.dicebear.com/7.x/bottts/svg?seed=nyx&backgroundColor=001a1a&eyeType=eva&mouthType=diagram',
    stats: { ATK: 88, DEF: 45, SPD: 99, MAG: 82 },
    rarity: 'SSR',
  },
]

function StatBar({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-[10px] uppercase tracking-widest text-slate-500 w-7">{label}</span>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-display text-[10px] font-bold text-white w-6 text-right">{value}</span>
    </div>
  )
}

function CharacterCard({ char, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${char.shadowColor}, 0 0 80px ${char.shadowColor}`,
          border: `1px solid ${char.color}60`,
        }}
      />

      {/* Rarity badge */}
      <div
        className="absolute top-3 right-3 z-20 font-display text-[10px] font-black px-2 py-1 rounded-full"
        style={{
          background: char.rarity === 'UR' ? 'linear-gradient(135deg, #ffd700, #ff8c00)' : `${char.color}22`,
          border: `1px solid ${char.rarity === 'UR' ? '#ffd70080' : char.color + '60'}`,
          color: char.rarity === 'UR' ? '#ffd700' : char.color,
        }}
      >
        {char.rarity}
      </div>

      {/* Character image area */}
      <div
        className={`relative h-52 flex items-center justify-center bg-gradient-to-b ${char.bgGradient} overflow-hidden`}
      >
        {/* Background rings */}
        <div
          className="absolute w-40 h-40 rounded-full opacity-10 border-2"
          style={{ borderColor: char.color }}
        />
        <div
          className="absolute w-56 h-56 rounded-full opacity-5 border"
          style={{ borderColor: char.color }}
        />

        {/* Character image */}
        <motion.img
          src={char.image}
          alt={char.name}
          className="relative z-10 w-36 h-36 object-contain"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4 + index * 0.5, ease: 'easeInOut' }}
          style={{ filter: `drop-shadow(0 0 20px ${char.color}88)` }}
        />

        {/* Element badge */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: `${char.color}22`,
            border: `1px solid ${char.color}60`,
            color: char.color,
          }}
        >
          ◆ {char.element}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3
            className="font-display font-black text-xl text-white mb-0.5"
            style={{ textShadow: `0 0 15px ${char.color}66` }}
          >
            {char.name}
          </h3>
          <p className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: char.color }}>
            {char.role}
          </p>
        </div>
        <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">{char.description}</p>

        {/* Stats */}
        <div className="space-y-1.5">
          {Object.entries(char.stats).map(([key, val]) => (
            <StatBar key={key} label={key} value={val} color={char.color} />
          ))}
        </div>

        {/* Select button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 w-full py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest transition-all duration-300"
          style={{
            background: `${char.color}15`,
            border: `1px solid ${char.color}40`,
            color: char.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${char.color}25`
            e.currentTarget.style.boxShadow = `0 0 20px ${char.color}40`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${char.color}15`
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Select Character →
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Characters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="characters" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-purple/6 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-neon-blue/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-pink/60" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-neon-pink">
              Meet the Warriors
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-pink/60" />
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Choose Your{' '}
            <span className="neon-text-pink">Champion</span>
          </h2>
          <p className="font-body text-slate-400 max-w-xl mx-auto">
            Each warrior carries a legendary story. Unlock their true power and forge an unbreakable bond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((char, i) => (
            <CharacterCard key={char.id} char={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
