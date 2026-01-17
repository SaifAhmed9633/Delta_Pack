'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import FeaturesGrid from "@/components/FeaturesGrid";
import ModelsSection from "@/components/ModelsSection"; // <--- استدعاء الجديد
import Marquee from "@/components/Marquee";

const CupScene = dynamic(() => import('@/components/CupScene'), {
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center text-gray-800 font-mono text-xs">LOADING ENGINE...</div>
});

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (الكوب والنصوص) - كما هو تماماً */}
      <section className="relative min-h-[90vh] w-full flex flex-col md:flex-row items-center overflow-hidden">
        {/* ... (نفس كود الـ Hero السابق لا تغير فيه شيء) ... */}
         {/* ... تأكد أن الـ Hero ينتهي هنا ... */}
          {/* خلفية إضاءة خافتة خلف النص */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#111] to-transparent z-0 pointer-events-none" />

        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 p-6 md:pl-24 z-30 order-2 md:order-1 flex flex-col justify-center h-full pt-10 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             {/* شارة الحالة */}
             <div className="inline-flex items-center gap-2 mb-6 border border-green-900/50 bg-green-900/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-[10px] font-mono text-green-400 tracking-widest">SYSTEM ONLINE v2.0</span>
             </div>
             
             {/* العنوان الرئيسي */}
             <h1 className="font-oswald text-5xl md:text-8xl font-bold leading-[0.9] mb-6 tracking-tight">
               PRECISION <br/> 
               <span className="stroke-text opacity-40 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800" style={{WebkitTextStroke: '1px rgba(255,255,255,0.5)'}}>
                 CONTAINERS
               </span>
             </h1>
             
             {/* الوصف */}
             <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-8 border-l-2 border-green-500/50 pl-4">
               تكنولوجيا تصنيع ألمانية بأيادٍ مصرية. 
               نقدم عبوات ورقية بمواصفات عالمية (16oz Bowl) تضمن المتانة وعدم التسريب لمنتجك.
             </p>

             {/* الأزرار */}
             <div className="flex flex-wrap gap-4">
                <a href="#contact" className="bg-white text-black px-8 py-3 font-oswald font-bold text-sm tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
                  START PROJECT
                </a>
                <a href="#models" className="group border border-white/20 px-8 py-3 font-oswald font-bold text-sm tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2">
                  VIEW SPECS
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
             </div>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[100vh] relative z-20 order-1 md:order-2 bg-gradient-to-b from-transparent via-transparent to-black/20">
           
           <div className="w-full h-full cursor-grab active:cursor-grabbing">
             <CupScene />
           </div>
           
           {/* Floating Specs Card - Live Data from Diagram */}
           <motion.div 
             initial={{ opacity: 0, x: 50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ delay: 1 }}
             className="absolute top-[20%] right-6 md:right-12 hidden md:block bg-black/40 backdrop-blur-md p-5 border border-white/10 rounded-xl w-56 shadow-2xl"
           >
              <div className="flex justify-between items-center text-[10px] font-mono text-green-500 mb-4 tracking-widest">
                <span>● LIVE SPECS</span>
                <span className="border border-green-500/30 px-1 rounded">ISO 9001</span>
              </div>
              
              <div className="space-y-3 border-t border-white/10 pt-3 text-xs font-mono">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">TYPE</span>
                   <span className="text-white font-bold">16oz BOWL</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">TOP DIA</span>
                   <span className="text-white">114 MM</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">HEIGHT</span>
                   <span className="text-white">72 MM</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">VOLUME</span>
                   <span className="text-white">440 ML</span>
                 </div>
              </div>

              {/* Decorative Bar */}
              <div className="w-full h-0.5 bg-gray-800 mt-4 overflow-hidden rounded-full">
                <div className="w-2/3 h-full bg-green-500/50 animate-pulse"></div>
              </div>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 mix-blend-difference"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-gray-400">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent opacity-50"></div>
        </motion.div>
      </section>

      {/* 2. Marquee (شريط العملاء/الكلمات) */}
      <div className="relative z-20 bg-[#0a0a0a] border-y border-white/5 py-2">
         <Marquee />
      </div>

      {/* 3. Features Grid (المميزات) */}
      <FeaturesGrid />

      {/* 4. Models Section (جدول المنتجات) - جديد */}
      <ModelsSection />
    </>
  );
}