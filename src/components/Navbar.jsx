'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'MODELS', href: '#models' },
  { name: 'TECHNOLOGY', href: '#features' }, // ربطناها بقسم المميزات
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تغيير لون النافبار عند السكرول
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-md border-white/10 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* 1. Logo */}
          <Link href="/" className="z-50 relative group">
            <span className="font-oswald text-2xl md:text-3xl font-bold tracking-tighter text-white group-hover:text-green-500 transition-colors">
              DELTA PACK®
            </span>
          </Link>

          {/* 2. Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-mono text-gray-400 hover:text-white tracking-widest transition-colors relative group"
              >
                {link.name}
                {/* خط يظهر تحت الكلمة عند الهوفر */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <button className="bg-white text-black px-6 py-2 font-oswald font-bold text-sm tracking-wide hover:bg-green-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              GET QUOTE
            </button>
          </div>

          {/* 3. Mobile Toggle Button (Hamburger) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden z-50 text-white focus:outline-none"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }} 
                className="w-full h-0.5 bg-white origin-left transition-all"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-full h-0.5 bg-white transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }} 
                className="w-full h-0.5 bg-white origin-left transition-all"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* 4. Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="font-oswald text-3xl text-white hover:text-green-500 tracking-wider"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
             
            <motion.button 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
              className="mt-8 border border-white/20 px-10 py-4 text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
            >
              REQUEST A QUOTE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}