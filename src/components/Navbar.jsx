'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartStore';

const navLinks = [
  { name: 'SHOP', href: '/' },
  { name: 'PORTFOLIO', href: '/models' },
  { name: 'TECHNOLOGY', href: '/#features' },
  { name: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURN ──
  const pathname = usePathname();
  const { open: openCart, totals } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on admin (AFTER all hooks)
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.07] py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* LEFT — Logo */}
          <Link href="/" className="group flex items-center gap-2.5 w-fit">
            <div className="w-7 h-7 rounded-md bg-green-400/10 border border-green-400/30 flex items-center justify-center group-hover:bg-green-400/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-400" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              </svg>
            </div>
            <span className="font-oswald text-[22px] font-bold tracking-tight text-white group-hover:text-green-400 transition-colors">
              DELTA<span className="text-green-400">PACK</span>
              <sup className="text-[10px] align-super ml-0.5 text-white/40">®</sup>
            </span>
          </Link>

          {/* CENTER — Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[11px] font-mono text-gray-400 hover:text-white tracking-[0.18em] transition-colors px-4 py-1.5 rounded-full hover:bg-white/[0.06]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT — Cart + Menu */}
          <div className="flex items-center justify-end gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative group flex items-center gap-2 border border-white/10 rounded-full pl-3 pr-4 py-2 text-white hover:border-white/30 hover:bg-white/[0.05] transition-all"
            >
              <CartIcon className="w-4 h-4" />
              <span className="hidden sm:block text-[11px] font-mono tracking-widest text-gray-400 group-hover:text-white transition-colors">
                BAG
              </span>
              <AnimatePresence>
                {totals.count > 0 && (
                  <motion.span
                    key={totals.count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-green-400 text-black text-[9px] font-bold font-mono flex items-center justify-center leading-none shadow-[0_0_12px_rgba(74,222,128,0.6)]"
                  >
                    {totals.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                className="w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-white rounded-full origin-center"
              />
            </button>
          </div>
        </div>

        {/* Progress line on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-green-400/50"
          animate={{ width: scrolled ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-500/05 rounded-full" />
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-oswald text-4xl text-white hover:text-green-400 tracking-wide transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => { openCart(); setIsOpen(false); }}
              className="mt-4 flex items-center gap-3 border border-white/20 rounded-full px-8 py-3 text-white hover:bg-white hover:text-black transition-colors"
            >
              <CartIcon className="w-4 h-4" />
              <span className="font-mono text-sm tracking-widest">VIEW BAG</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h8.7a2 2 0 0 0 2-1.6L22 7H6" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}
