'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionCup, useCup } from '@/lib/cupContext';
import { products } from '@/lib/products';

const models = [
  {
    size: '4 oz',
    name: 'ESPRESSO',
    top: '62 mm',
    height: '60 mm',
    vol: '110 ml',
    accent: '#f97316',
    desc: 'Perfect for espresso shots and small beverages. Ideal for cafés.',
    badge: null,
    scaleH: 0.35,
  },
  {
    size: '8 oz',
    name: 'STANDARD',
    top: '80 mm',
    height: '90 mm',
    vol: '220 ml',
    accent: '#38bdf8',
    desc: 'The most popular size worldwide. Fits all standard cup holders.',
    badge: 'BESTSELLER',
    scaleH: 0.55,
  },
  {
    size: '12 oz',
    name: 'LARGE',
    top: '90 mm',
    height: '110 mm',
    vol: '360 ml',
    accent: '#a855f7',
    desc: 'For large coffees and cold drinks. Great for premium brands.',
    badge: null,
    scaleH: 0.72,
  },
  {
    size: '16 oz',
    name: 'BOWL',
    top: '114 mm',
    height: '72 mm',
    vol: '440 ml',
    accent: '#22c55e',
    desc: 'Wide-mouth bowl design. Ideal for noodles, acai, and more.',
    badge: 'NEW',
    scaleH: 0.88,
  },
];

export default function ModelsSection() {
  const [active, setActive] = useState(3);
  const sectionRef = useRef(null);
  const { setProduct } = useCup();

  // Register section for cup positioning
  useSectionCup('models', sectionRef);

  // Sync active model → persistent cup color
  useEffect(() => {
    setProduct(active);
  }, [active, setProduct]);

  return (
    <section
      ref={sectionRef}
      id="models"
      className="relative bg-[#030303] py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${models[active].accent}09, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-green-400" />
              <span className="text-[10px] font-mono text-green-400 tracking-[0.35em]">TECHNICAL SPECS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-bold text-white leading-[0.9]">
              AVAILABLE<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                MODELS
              </span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-white/15 rounded-full px-6 py-3 text-[11px] font-mono text-gray-400 hover:border-white/40 hover:text-white transition-all"
          >
            DOWNLOAD CATALOG
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all text-xs">
              ↓
            </span>
          </a>
        </motion.div>

        {/* Cards + Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 md:gap-10">
          {/* Left — model selector cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {models.map((m, i) => (
              <motion.button
                key={m.size}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => setActive(i)}
                className={`text-left p-6 rounded-2xl border transition-all duration-400 relative overflow-hidden group ${
                  active === i
                    ? 'border-white/20 bg-white/[0.05]'
                    : 'border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.10]'
                }`}
              >
                {/* Accent background on active */}
                {active === i && (
                  <motion.div
                    layoutId="activeCardBg"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${m.accent}18, transparent 65%)`,
                    }}
                  />
                )}

                {/* Badge */}
                {m.badge && (
                  <div
                    className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-[0.2em] px-2 py-0.5 rounded-full"
                    style={{ background: `${m.accent}25`, color: m.accent }}
                  >
                    {m.badge}
                  </div>
                )}

                {/* Size display */}
                <div className="relative">
                  <div
                    className="font-oswald text-4xl md:text-5xl font-bold leading-none mb-1 transition-colors duration-300"
                    style={{ color: active === i ? m.accent : 'rgba(255,255,255,0.2)' }}
                  >
                    {m.size}
                  </div>
                  <div className="font-oswald text-sm font-bold tracking-[0.2em] text-white/70 mb-4">
                    {m.name}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                    {[['TOP', m.top], ['HEIGHT', m.height], ['VOLUME', m.vol]].map(([k, v]) => (
                      <div key={k}>
                        <div className="text-gray-600 mb-0.5">{k}</div>
                        <div className="text-gray-300">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active indicator */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{
                    width: active === i ? '100%' : '0%',
                    background: `linear-gradient(to right, ${m.accent}, transparent)`,
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right — animated cup silhouette + specs */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 w-full"
              >
                {/* SVG Cup silhouette */}
                <div className="relative">
                  <svg
                    viewBox="0 0 120 160"
                    className="w-40 drop-shadow-2xl"
                    style={{ filter: `drop-shadow(0 0 30px ${models[active].accent}55)` }}
                  >
                    <defs>
                      <linearGradient id={`cupGrad-${active}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={models[active].accent} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={models[active].accent} stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    {/* Cup body */}
                    <path
                      d={`M 24 20 L 96 20 L 84 ${20 + models[active].scaleH * 120} L 36 ${20 + models[active].scaleH * 120} Z`}
                      fill={`url(#cupGrad-${active})`}
                      opacity="0.85"
                    />
                    {/* Rim */}
                    <ellipse cx="60" cy="20" rx="36" ry="6" fill={models[active].accent} opacity="0.9" />
                    {/* Base */}
                    <ellipse
                      cx="60"
                      cy={20 + models[active].scaleH * 120}
                      rx="24"
                      ry="4"
                      fill={models[active].accent}
                      opacity="0.6"
                    />
                    {/* Shine */}
                    <path
                      d={`M 34 28 L 42 ${20 + models[active].scaleH * 100} L 38 ${20 + models[active].scaleH * 100} L 30 28 Z`}
                      fill="white"
                      opacity="0.12"
                    />
                  </svg>

                  {/* Size label floating */}
                  <div
                    className="absolute -top-2 -right-4 font-oswald text-4xl font-bold"
                    style={{ color: models[active].accent }}
                  >
                    {models[active].size}
                  </div>
                </div>

                {/* Specs list */}
                <div className="w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 space-y-3">
                  <div className="text-[9px] font-mono tracking-[0.3em] text-gray-500 mb-3">FULL SPECS</div>
                  {[
                    ['MODEL', models[active].name],
                    ['TOP DIAMETER', models[active].top],
                    ['HEIGHT', models[active].height],
                    ['VOLUME', models[active].vol],
                    ['STANDARD', 'ISO 9001'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-xs font-mono border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-600 tracking-wider">{k}</span>
                      <span className="text-white font-bold" style={{ color: k === 'MODEL' ? models[active].accent : undefined }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-[9px] font-mono text-gray-700 tracking-[0.25em]"
        >
          * CUSTOM SIZES AVAILABLE ON REQUEST · ALL SPECS PER ISO 9001 STANDARDS
        </motion.p>
      </div>
    </section>
  );
}
