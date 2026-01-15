'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import FeaturesGrid from "@/components/FeaturesGrid";
import Marquee from "@/components/Marquee";

// Loading the 3D Model dynamically (Best for performance)
// تحميل الكوب بشكل منفصل عشان الصفحة تفتح بسرعة
const CupScene = dynamic(() => import('@/components/CupScene'), {
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center text-gray-800 font-mono text-xs">LOADING 3D...</div>
});

export default function Home() {
  return (
    <>
      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] w-full flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 p-6 md:pl-20 z-30 order-2 md:order-1 flex flex-col justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <div className="inline-flex items-center gap-2 mb-6 border border-green-900/50 bg-green-900/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-green-400 tracking-widest">SYSTEM ONLINE v2.0</span>
             </div>
             
             <h1 className="font-oswald text-5xl md:text-8xl font-bold leading-none mb-6">
               PRECISION <br/> 
               <span className="stroke-text opacity-50" style={{WebkitTextStroke: '1px white'}}>PAPER CUPS</span>
             </h1>
             
             <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-8 border-l-2 border-white/20 pl-4">
               تكنولوجيا تصنيع ألمانية بأيادٍ مصرية. 
               نقدم أعلى معايير الجودة في الطباعة والتصنيع لتعزيز علامتك التجارية.
             </p>

             <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-3 font-oswald font-bold text-sm tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                START PROJECT
            </button>
               <button className="border border-white/20 px-8 py-3 font-oswald font-bold text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                 VIEW CATALOG
               </button>
             </div>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] relative z-20 order-1 md:order-2">
           <div className="w-full h-full cursor-grab active:cursor-grabbing">
             <CupScene />
           </div>
           
           {/* Floating Specs Card */}
           <motion.div 
             initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
             className="absolute top-1/3 right-8 hidden md:block bg-black/60 backdrop-blur-md p-4 border border-white/10 rounded-lg w-48"
           >
              <div className="flex justify-between text-xs font-mono text-gray-500 mb-2">
                <span>SPECS</span>
                <span>ISO 9001</span>
              </div>
              <div className="space-y-2 border-t border-white/10 pt-2 text-xs font-mono">
                 <div className="flex justify-between"><span>HEIGHT</span><span className="text-white">130 MM</span></div>
                 <div className="flex justify-between"><span>TOP</span><span className="text-white">89 MM</span></div>
              </div>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>

      </section>

      {/* --- Marquee Strip --- */}
      <div className="relative z-20 bg-black/50 backdrop-blur-sm border-t border-white/5">
         <Marquee />
      </div>

      {/* --- Features Grid --- */}
      <FeaturesGrid />
    </>
  );
}
