import { Oswald, Inter } from 'next/font/google';
import "./globals.css";
// استيراد النافبار الجديد
import Navbar from "@/components/Navbar"; 
import CursorSpotlight from "@/components/CursorSpotlight";
import Preloader from "@/components/Preloader";

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-oswald' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "DELTA PACK® | Advanced Paper Cup Manufacturing",
  description: "German technology, Egyptian hands. Precision paper cups manufacturing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${inter.variable} ${oswald.variable} bg-[#050505] text-white overflow-x-hidden selection:bg-green-500 selection:text-black`}>
        
        <Preloader />
        <CursorSpotlight />

        {/* الخلفية الشبكية الثابتة */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
             style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
               backgroundSize: '50px 50px' 
             }}>
        </div>

        <div className="relative z-20 flex flex-col min-h-screen">
          
          {/* 🔥 استخدام النافبار الجديد هنا 🔥 */}
          <Navbar />

          <main className="flex-grow">
            {children}
          </main>

          <footer className="w-full py-8 text-center border-t border-white/5 bg-black z-20">
            <p className="text-[10px] font-mono text-gray-600 tracking-widest">
              DELTA PACK® MANUFACTURING EGYPT © 2026
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}