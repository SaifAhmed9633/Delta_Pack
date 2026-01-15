'use client';
import { motion } from 'framer-motion';

const ITEMS = ["PREMIUM QUALITY", "FDA APPROVED", "CUSTOM PRINTING", "ECO FRIENDLY"];

export default function Marquee() {
  return (
    <div className="w-full py-10 overflow-hidden relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="flex whitespace-nowrap opacity-50">
        <motion.div 
          className="flex gap-16 md:gap-32 items-center"
          animate={{ x: '-50%' }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 md:gap-32 items-center">
              {ITEMS.map((item, index) => (
                <span key={index} className="font-oswald text-4xl md:text-6xl font-bold tracking-tight stroke-text select-none">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}