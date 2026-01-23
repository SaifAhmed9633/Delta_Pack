'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'DASHBOARD', href: '/admin', icon: '📊' },
    // { name: 'PRODUCTS', href: '/admin/products', icon: '📦' }, // Future use
    // { name: 'SETTINGS', href: '/admin/settings', icon: '⚙️' }, // Future use
  ];

  return (
    <aside className="w-64 bg-[#050505] border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-oswald font-bold text-white tracking-tight">
          DELTA<span className="text-green-500">ADMIN</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono tracking-wider transition-all ${
                isActive 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-white/10 transition-all text-gray-400 uppercase tracking-widest"
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
