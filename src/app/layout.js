import { Oswald, Inter } from 'next/font/google';
import "./globals.css";
// استيراد المكونات (تأكدنا من استخدام النقطتين .. لتجنب مشاكل المسارات)
import CursorSpotlight from "@/components/CursorSpotlight";
import Preloader from "@/components/Preloader";

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-oswald' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "DELTA PACK® | Advanced Manufacturing",
  description: "Premium paper cup manufacturing factory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.variable} ${oswald.variable} bg-[#050505] text-white overflow-x-hidden selection:bg-white selection:text-black`}>
        
        {/* 1. شاشة التحميل */}
        <Preloader />

        {/* 2. الخلفيات الثابتة (Layers) */}
        <div className="fixed inset-0 bg-[#050505] z-0" />
        
        {/* شبكة هندسية خفيفة */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
             style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px' 
             }}>
        </div>

        {/* الكشاف التفاعلي */}
        <CursorSpotlight />

        {/* 3. الهيكل الرئيسي */}
        <div className="relative z-20 flex flex-col min-h-screen">
          
          {/* Navbar */}
          <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-[#050505]/50 backdrop-blur-md border-b border-white/5">
             <span className="font-oswald text-2xl font-bold tracking-tighter">DELTA PACK®</span>
             <div className="hidden md:flex gap-8 text-xs font-mono text-gray-400">
               <a href="#" className="hover:text-white transition-colors">HOME</a>
               <a href="#" className="hover:text-white transition-colors">MODELS</a>
               <a href="#" className="hover:text-white transition-colors">CONTACT</a>
             </div>
             <button className="text-xs font-bold border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
               GET QUOTE
             </button>
          </nav>

          {/* محتوى الصفحة المتغير */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full py-8 text-center border-t border-white/5 bg-black/80 backdrop-blur z-20">
            <p className="text-[10px] font-mono text-gray-600 tracking-widest">
              INDUSTRIAL ZONE, CAIRO, EGYPT © 2026
            </p>
          </footer>

        </div>
      </body>
    </html>
  );
}