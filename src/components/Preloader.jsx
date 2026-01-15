'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 200);
          return 100;
        }
        return prev + 2; 
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white flex flex-col justify-center items-center overflow-hidden"
        >
          <h1 className="font-oswald text-[20vw] leading-none font-bold text-transparent stroke-text opacity-50">
            {count}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <motion.h1 
                initial={{ height: "0%" }} animate={{ height: `${count}%` }}
                className="font-oswald text-[20vw] leading-none font-bold text-white overflow-hidden"
             >
               {count}
             </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}