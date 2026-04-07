'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const menuItems = [
  {
    name: 'DASHBOARD', href: '/admin',
    icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>),
  },
];

const LogoutIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>);
const MenuIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
const CloseIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const NavItem = ({ item, onClick }) => {
    const isActive = pathname === item.href;
    return (
      <Link href={item.href} onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono tracking-widest transition-all duration-200 group ${isActive ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_12px_rgba(34,197,94,0.08)]' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>
        <span className={isActive ? 'text-green-400' : 'text-gray-600 group-hover:text-white transition-colors'}>{item.icon}</span>
        {item.name}
        {isActive && <span className="ml-auto w-1 h-4 bg-green-500 rounded-full" />}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#050505] border-r border-white/10 shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-[9px] font-mono text-green-400 tracking-widest">ONLINE</span>
          </div>
          <h1 className="font-oswald text-2xl font-bold text-white tracking-tight">DELTA<span className="text-green-500">ADMIN</span></h1>
          <p className="text-[10px] font-mono text-gray-600 mt-0.5">Management Portal</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map(item => <NavItem key={item.name} item={item} />)}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all tracking-widest group">
            <span className="group-hover:-translate-x-0.5 transition-transform"><LogoutIcon /></span>LOGOUT
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <h1 className="font-oswald text-xl font-bold text-white tracking-tight">DELTA<span className="text-green-500">ADMIN</span></h1>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <button onClick={() => setIsMobileOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors"><MenuIcon /></button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }} className="fixed left-0 top-0 h-full w-72 bg-[#050505] border-r border-white/10 z-50 flex flex-col lg:hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <h1 className="font-oswald text-2xl font-bold text-white">DELTA<span className="text-green-500">ADMIN</span></h1>
                  <p className="text-[10px] font-mono text-gray-600 mt-0.5">Management Portal</p>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1.5 text-gray-500 hover:text-white transition-colors"><CloseIcon /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {menuItems.map(item => <NavItem key={item.name} item={item} onClick={() => setIsMobileOpen(false)} />)}
              </nav>
              <div className="p-3 border-t border-white/10">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-mono text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all tracking-widest">
                  <LogoutIcon />LOGOUT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
