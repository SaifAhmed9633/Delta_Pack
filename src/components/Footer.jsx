'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const links = {
  PRODUCTS: [
    { name: '4oz Espresso', href: '#models' },
    { name: '8oz Standard', href: '#models' },
    { name: '12oz Large', href: '#models' },
    { name: '16oz Bowl', href: '#models' },
    { name: 'Custom Sizes', href: '#contact' },
  ],
  COMPANY: [
    { name: 'Technology', href: '/#features' },
    { name: 'Portfolio', href: '/models' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Admin', href: '/admin' },
  ],
  CERTIFICATIONS: [
    { name: 'ISO 9001:2015', href: '#' },
    { name: 'PEFC Certified', href: '#' },
    { name: 'Food Grade', href: '#' },
    { name: 'FDA Compliant', href: '#' },
  ],
};

const socials = [
  { name: 'FB', href: '#', label: 'Facebook' },
  { name: 'IG', href: '#', label: 'Instagram' },
  { name: 'LI', href: '#', label: 'LinkedIn' },
  { name: 'WA', href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="relative w-full border-t border-white/[0.05] bg-[#020202] overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8">

          {/* Brand col */}
          <div>
            <Link href="/" className="group flex items-center gap-2.5 mb-5 w-fit">
              <div className="w-7 h-7 rounded-md bg-green-400/10 border border-green-400/25 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-400" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                </svg>
              </div>
              <span className="font-oswald text-[22px] font-bold tracking-tight text-white">
                DELTA<span className="text-green-400">PACK</span>
                <sup className="text-[10px] align-super text-white/30">®</sup>
              </span>
            </Link>
            <p className="text-gray-600 text-xs leading-relaxed max-w-[240px] mb-6">
              German precision manufacturing technology — powered by Egyptian expertise since 2010.
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[10px] font-bold font-mono text-gray-500 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div className="text-[9px] font-mono tracking-[0.3em] text-gray-600 mb-5">{group}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-500 hover:text-white transition-colors font-mono"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-mono text-gray-700 tracking-[0.2em]">
            © 2026 DELTA PACK® — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4 text-[9px] font-mono text-gray-700 tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SYSTEMS ONLINE
            </span>
            <span>·</span>
            <span>10TH OF RAMADAN, EGYPT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
