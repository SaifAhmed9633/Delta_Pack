'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة عملية التحميل (Simulate Loading)
    const timer = setInterval(() => {
      setProgress((prev) => {
        // زيادة عشوائية لتبدو طبيعية
        const next = prev + Math.floor(Math.random() * 5) + 1;
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800); // انتظر قليلاً بعد الاكتمال
          return 100;
        }
        return next;
      });
    }, 40); // سرعة التعبئة

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
        >
          {/* حاوية اللوجو والأنيميشن */}
          <div className="relative">
            
            {/* 1. النص "الفارغ" (Outline) - يظهر دائماً */}
            <h1 className="font-oswald text-6xl md:text-9xl font-bold text-transparent stroke-text opacity-30 select-none"
                style={{ WebkitTextStroke: '1px #555' }}>
              DELTA PACK
            </h1>

            {/* 2. النص "المملوء" (Filled) - يظهر فوق الفارغ ويتم قصه */}
            <div 
              className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-linear"
              style={{ height: `${progress}%` }} // الارتفاع يتغير حسب النسبة
            >
              <h1 className="font-oswald text-6xl md:text-9xl font-bold text-white select-none absolute bottom-0 left-0 w-full">
                DELTA PACK
              </h1>
            </div>

          </div>

          {/* 3. عداد النسبة المئوية */}
          <div className="mt-8 font-mono text-sm md:text-base tracking-widest text-gray-400 flex items-center gap-3">
            <span className="w-12 text-right">{progress}%</span>
            
            {/* خط تحميل صغير بجانب الرقم */}
            <div className="w-32 h-px bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
            </div>
            
            <span className="text-[10px] text-green-500 animate-pulse">SYSTEM LOADING</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}