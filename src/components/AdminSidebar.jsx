'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'DASHBOARD', href: '/admin', icon: '📊' },
    // { name: 'PRODUCTS', href: '/admin/products', icon: '📦' },
    // { name: 'SETTINGS', href: '/admin/settings', icon: '⚙️' }, 
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Overlay for Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#050505] border-r border-white/10 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h1 className="text-2xl font-oswald font-bold text-white tracking-tight">
            DELTA<span className="text-delta-green">ADMIN</span>
          </h1>
          {/* Close Button Mobile */}
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono tracking-wider transition-all duration-300 group ${
                  isActive 
                    ? 'bg-delta-green/10 text-delta-green border border-delta-green/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`transform transition-transform group-hover:scale-110 ${isActive ? 'text-delta-green' : 'text-gray-500'}`}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-[#050505]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-white/10 transition-all text-gray-400 uppercase tracking-widest group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">🚪</span>
            LOGOUT
          </button>
        </div>
      </motion.aside>
    </>
  );
}
