'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="w-full border-t border-white/5 bg-black z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-oswald text-xl font-bold text-white tracking-tighter">DELTA PACK®</span>
          <p className="text-[10px] font-mono text-gray-600 tracking-widest mt-1">
            MANUFACTURING EGYPT · EST. 2010
          </p>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500 tracking-widest">
          <Link href="/#features" className="hover:text-green-400 transition-colors">TECHNOLOGY</Link>
          <Link href="/models" className="hover:text-green-400 transition-colors">PORTFOLIO</Link>
          <Link href="/#contact" className="hover:text-green-400 transition-colors">CONTACT</Link>
        </div>

        <p className="text-[10px] font-mono text-gray-700 tracking-widest">
          © 2026 ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}
