'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, formatPrice } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import { useCup, useSectionCup } from '@/lib/cupContext';

const FeaturesGrid  = dynamic(() => import('@/components/FeaturesGrid'),  { loading: () => <div className="h-96 bg-[#050505]" /> });
const ModelsSection = dynamic(() => import('@/components/ModelsSection'),  { loading: () => <div className="h-64 bg-black" /> });
const Marquee       = dynamic(() => import('@/components/Marquee'),        { loading: () => <div className="h-16 bg-[#0a0a0a]" /> });
const ContactSection= dynamic(() => import('@/components/ContactSection'), { loading: () => <div className="h-64 bg-[#050505]" /> });

// PersistentCup is SSR-disabled (Three.js)
const PersistentCup = dynamic(() => import('@/components/PersistentCup'), { ssr: false });

export default function Home() {
  const [index, setIndex]   = useState(0);
  const [scrollPct, setScrollPct] = useState(0);   // 0-1 hero scroll progress
  const heroRef = useRef(null);
  const { addItem }           = useCart();
  const { setProduct, product, section } = useCup();

  // Keep cup context in sync with hero product index
  useEffect(() => { setProduct(index); }, [index, setProduct]);

  // Register hero section for cup positioning
  useSectionCup('hero', heroRef);

  // Keyboard nav
  useEffect(() => {
    const go = (dir) => setIndex((i) => (i + dir + products.length) % products.length);
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft')  go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Hero scroll progress for typography + scroll hint
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw  = Math.min(1, Math.max(0, -rect.top / (el.offsetHeight * 0.75)));
      setScrollPct(raw);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (dir) => setIndex((i) => (i + dir + products.length) % products.length);

  return (
    <>
      {/* Single persistent 3D cup — fixed, spans entire page scroll */}
      <PersistentCup />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[100vh] w-full overflow-hidden bg-[#050505]"
      >
        {/* Ambient tint that follows product */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at 60% 50%, ${product.accent}14 0%, transparent 55%)`,
          }}
        />

        {/* Grid dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(circle at 30% 50%, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 30% 50%, black 40%, transparent 75%)',
          }}
        />

        {/* ── Giant background product name typography ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[16]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={product.id}
              initial={{ opacity: 0, y: 60, letterSpacing: '0.3em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '-0.03em' }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-oswald font-bold text-transparent whitespace-nowrap text-center leading-none"
              style={{
                fontSize: 'clamp(7rem, 22vw, 26rem)',
                WebkitTextStroke: `1.5px ${product.accent}50`,
                textShadow: `0 0 100px ${product.accent}1a`,
                opacity: Math.max(0, 0.9 - scrollPct * 1.6),
                transform: `scale(${1 + scrollPct * 0.06})`,
                transition: 'opacity 0.05s linear, transform 0.05s linear',
              }}
            >
              {product.name}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* ── Left: Hero Text (z above cup at z-18) ── */}
        <div className="absolute left-0 top-0 h-full w-full md:w-[52%] flex flex-col justify-center px-6 md:pl-12 lg:pl-20 z-[22] pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + '-text'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
            >
              {/* Series badge */}
              <div className="inline-flex items-center gap-2 mb-5 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: product.accent, boxShadow: `0 0 8px ${product.accent}` }}
                />
                <span className="text-[9px] font-mono tracking-[0.35em] text-gray-300">
                  DELTA PACK / {product.tagline}
                </span>
              </div>

              {/* Product name + stroke outline */}
              <h2 className="font-oswald font-bold leading-[0.88] mb-5"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                {product.name}
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: `1px ${product.accent}80` }}
                >
                  {product.tagline}
                </span>
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8 border-l-2 pl-4"
                style={{ borderColor: `${product.accent}60` }}>
                {product.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pointer-events-auto">
                <button
                  onClick={() => addItem(product)}
                  className="group relative overflow-hidden px-7 py-3 rounded-full font-oswald font-bold text-sm tracking-wider text-black transition-all"
                  style={{ background: product.accent }}
                >
                  <span className="relative z-10">ADD TO BAG</span>
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <a
                  href="#contact"
                  className="group px-7 py-3 rounded-full border border-white/20 font-oswald font-bold text-sm tracking-wider text-white hover:border-white/50 transition-colors flex items-center gap-2"
                >
                  CONTACT US
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Scroll-triggered spec card (appears when user scrolls) ── */}
        <motion.div
          className="absolute top-1/2 right-5 md:right-10 -translate-y-1/2 z-[22] w-[240px] hidden md:block pointer-events-none"
          animate={{ opacity: scrollPct > 0.2 ? 1 : 0, x: scrollPct > 0.2 ? 0 : 28 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="flex justify-between items-center text-[9px] font-mono mb-4 tracking-[0.25em]">
              <span className="flex items-center gap-2" style={{ color: product.accent }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: product.accent }} />
                LIVE SPECS
              </span>
              <span className="border border-white/10 px-1.5 py-0.5 rounded text-gray-500">ISO 9001</span>
            </div>
            <div className="space-y-3 border-t border-white/[0.07] pt-3">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-gray-600 uppercase tracking-widest text-[9px]">
                    {k.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-white font-bold">{v}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-white/10 mt-4 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, scrollPct * 200)}%`,
                  background: product.accent,
                  boxShadow: `0 0 10px ${product.accent}`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CONTROLS BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[22] px-6 md:px-10 pb-6 md:pb-8">
          <div className="flex items-end justify-between gap-4">

            {/* Price — left */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-mono tracking-[0.35em] text-gray-600 mb-1">UNIT PRICE</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id + '-price'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                  className="font-oswald font-bold leading-none text-white"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
                >
                  {formatPrice(product.price)}
                  <span className="text-gray-600 text-sm font-sans ml-2 font-normal">/pc</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Contact + Add — center */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <a
                href="#contact"
                className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/15 hover:border-white/40 transition-colors overflow-hidden"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  style={{ background: `radial-gradient(circle, ${product.accent}22, transparent)` }}
                />
                <span className="relative font-oswald text-sm tracking-[0.22em]">CONTACT US</span>
                <span
                  className="relative w-2 h-2 rounded-full animate-pulse"
                  style={{ background: product.accent }}
                />
              </a>
              <button
                onClick={() => addItem(product)}
                className="text-[9px] font-mono tracking-[0.3em] text-gray-600 hover:text-white transition-colors"
              >
                + ADD TO BAG
              </button>
            </div>

            {/* Dots + Arrows — right */}
            <div className="flex-1 flex items-end justify-end gap-3">
              <div className="hidden sm:flex flex-col items-end gap-2 mr-2">
                <span className="text-[9px] font-mono tracking-[0.3em] text-gray-600">
                  {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1.5">
                  {products.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to ${p.name}`}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? 22 : 8,
                        background: i === index ? product.accent : 'rgba(255,255,255,0.2)',
                        boxShadow: i === index ? `0 0 10px ${product.accent}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <ArrowBtn dir={-1} onClick={() => go(-1)} />
              <ArrowBtn dir={1}  onClick={() => go(1)}  accent={product.accent} />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: scrollPct < 0.08 ? 0.5 : 0 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[22] flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[8px] font-mono tracking-[0.5em] text-gray-600">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────── */}
      <div className="relative z-[22] bg-[#0a0a0a]">
        <Marquee />
      </div>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <FeaturesGrid />

      {/* ─── MODELS ───────────────────────────────────────────── */}
      <ModelsSection />

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <ContactSection />
    </>
  );
}

// ─── Arrow button ─────────────────────────────────────────────
function ArrowBtn({ dir, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir < 0 ? 'Previous product' : 'Next product'}
      className="group relative w-13 h-13 md:w-[54px] md:h-[54px] rounded-full border border-white/12 flex items-center justify-center hover:border-white/50 transition-all overflow-hidden"
    >
      <span
        className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"
        style={{ background: accent ? `radial-gradient(circle, ${accent}35, transparent 70%)` : undefined }}
      />
      <svg
        width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.6"
        className="relative text-white"
        style={{ transform: dir < 0 ? 'rotate(180deg)' : 'none' }}
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </button>
  );
}
