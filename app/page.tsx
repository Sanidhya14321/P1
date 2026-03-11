"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const themes = [
  {
    id: 'parallax',
    label: '3D Parallax',
    tagline: 'Kinetic depth & fluid motion',
    description:
      'Immersive scroll-driven parallax with layered depth, GSAP animations, and a dark indigo palette.',
    href: '/parallax',
    bg: 'linear-gradient(135deg, #0B0C10 0%, #0f0c29 50%, #09090B 100%)',
    accentGlow: 'rgba(99,102,241,0.35)',
    badge: { text: '3D', color: '#6366F1' },
    accent: '#6366F1',
    accent2: '#22D3EE',
    tags: ['GSAP', 'Framer Motion', 'Depth Layers'],
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-6 opacity-90">
        <rect x="10" y="10" width="60" height="60" rx="4" 
          stroke="#6366F1" strokeWidth="2" strokeDasharray="4 2"
          style={{ transform: 'perspective(200px) rotateX(20deg) rotateY(-15deg)', transformOrigin: 'center' }} />
        <rect x="20" y="20" width="40" height="40" rx="4"
          stroke="#22D3EE" strokeWidth="2" />
        <rect x="30" y="30" width="20" height="20" rx="4"
          fill="#6366F1" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'nb-brutalism',
    label: 'Neo-Brutalism',
    tagline: 'Bold, stark, unapologetic',
    description:
      'A cinematic 3D camera journey through bold typography, raw geometry, and stark neon accents.',
    href: '/nb-brutalism',
    bg: 'linear-gradient(135deg, #F4F4F0 0%, #e8e8e4 50%, #F4F4F0 100%)',
    accentGlow: 'rgba(255,0,255,0.2)',
    badge: { text: 'NB', color: '#FF00FF' },
    accent: '#FF00FF',
    accent2: '#00FFFF',
    tags: ['Hard Shadows', 'Camera GSAP', 'Raw Type'],
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-6">
        <rect x="8" y="8" width="64" height="64" fill="none" stroke="#0E0E0E" strokeWidth="6" />
        <rect x="12" y="12" width="64" height="64" fill="none" stroke="#FF00FF" strokeWidth="6" />
        <text x="22" y="55" fontSize="36" fontWeight="900" fill="#0E0E0E" fontFamily="sans-serif" letterSpacing="-2">NB</text>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function ThemeSelector() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(34,211,238,0.06) 0%, transparent 60%), #07070A',
      }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-32 -left-32 opacity-20"
        style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -bottom-24 -right-24 opacity-15"
        style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block text-xs tracking-[0.3em] uppercase mb-6 px-5 py-2 rounded-full border"
            style={{
              color: '#A1A1AA',
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            Sanidhya Vats · Portfolio
          </motion.span>
          <h1
            className="font-black leading-none mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              background: 'linear-gradient(135deg, #FAFAFA 0%, #A1A1AA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}
          >
            Choose Your Experience
          </h1>
          <p className="text-lg max-w-lg mx-auto" style={{ color: '#71717A' }}>
            Two distinct design philosophies. One portfolio. Pick the one that speaks to you.
          </p>
        </motion.div>

        {/* Theme Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {themes.map((theme) => {
            const isDark = theme.id === 'parallax';

            return (
              <motion.button
                key={theme.id}
                variants={cardVariants}
                onClick={() => router.push(theme.href)}
                className="group relative rounded-2xl overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-4 transition-all duration-500"
                style={{
                  background: theme.bg,
                  border: isDark
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '6px solid #0E0E0E',
                  boxShadow: isDark
                    ? `0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${theme.accentGlow}`
                    : `12px 12px 0 0 #0E0E0E`,
                }}
                whileHover={{ y: isDark ? -8 : -4, scale: isDark ? 1.01 : 1.005 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover glow overlay for dark card */}
                {isDark && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${theme.accentGlow} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                <div className="relative p-10 md:p-14 flex flex-col h-full min-h-[480px]">
                  {/* Badge */}
                  <div className="flex items-start justify-between mb-auto">
                    <span
                      className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
                      style={{
                        background: isDark
                          ? `rgba(99,102,241,0.15)`
                          : theme.badge.color,
                        color: isDark ? theme.accent : '#0E0E0E',
                        border: isDark
                          ? `1px solid ${theme.accent}40`
                          : '3px solid #0E0E0E',
                        fontWeight: 900,
                      }}
                    >
                      {theme.badge.text}
                    </span>
                    <motion.span
                      className="text-2xl font-black tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                      style={{ color: theme.accent }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Icon */}
                  <div className="my-8">{theme.icon}</div>

                  {/* Label & tagline */}
                  <h2
                    className="font-black leading-none mb-3"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      color: isDark ? '#FAFAFA' : '#0E0E0E',
                      letterSpacing: isDark ? '-0.02em' : '-0.04em',
                      textTransform: isDark ? 'none' : 'uppercase',
                    }}
                  >
                    {theme.label}
                  </h2>
                  <p
                    className="text-base font-semibold tracking-widest uppercase mb-4"
                    style={{ color: theme.accent }}
                  >
                    {theme.tagline}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ color: isDark ? '#71717A' : '#555' }}
                  >
                    {theme.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {theme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 font-bold tracking-widest uppercase"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.05)' : 'transparent',
                          color: isDark ? '#A1A1AA' : '#0E0E0E',
                          border: isDark
                            ? '1px solid rgba(255,255,255,0.08)'
                            : '3px solid #0E0E0E',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-8 w-full py-4 flex items-center justify-center gap-3 font-bold text-base tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent2} 100%)`
                        : '#0E0E0E',
                      color: isDark ? '#FFF' : '#F4F4F0',
                      boxShadow: isDark
                        ? `0 0 30px ${theme.accentGlow}`
                        : `6px 6px 0 ${theme.accent}`,
                    }}
                  >
                    Enter Experience
                    <span className="text-xl leading-none">→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 text-xs tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Both experiences exist independently · no cross-rendering
        </motion.p>
      </div>
    </div>
  );
}
