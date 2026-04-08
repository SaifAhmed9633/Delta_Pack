'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'done' | 'exit'

  useEffect(() => {
    // Fast early burst, then slows down, then snaps to 100
    const steps = [
      { target: 30, duration: 300 },
      { target: 65, duration: 500 },
      { target: 85, duration: 400 },
      { target: 97, duration: 600 },
      { target: 100, duration: 200 },
    ];

    let current = 0;
    let raf;

    const runStep = (stepIdx) => {
      if (stepIdx >= steps.length) {
        setPhase('done');
        setTimeout(() => setPhase('exit'), 600);
        return;
      }
      const { target, duration } = steps[stepIdx];
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        setProgress(Math.round(current + (target - current) * ease));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          current = target;
          runStep(stepIdx + 1);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    runStep(0);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none"
        >
          {/* Ambient ring */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="absolute w-[500px] h-[500px] rounded-full border border-green-500/10 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.1, 1.06, 1.1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.4 }}
            className="absolute w-[700px] h-[700px] rounded-full border border-green-500/05 pointer-events-none"
          />

          {/* Glow */}
          <div className="absolute w-64 h-64 rounded-full bg-green-500/8 blur-[100px] pointer-events-none" />

          {/* Main wordmark — fill reveal */}
          <div className="relative mb-10">
            {/* Outline */}
            <h1
              className="font-oswald text-[clamp(3rem,12vw,9rem)] font-bold select-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.12)',
              }}
            >
              DELTA PACK
            </h1>

            {/* Filled clip — grows from bottom to top */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(${100 - progress}% 0 0 0)`,
                transition: 'clip-path 0.08s linear',
              }}
            >
              <h1
                className="font-oswald text-[clamp(3rem,12vw,9rem)] font-bold select-none text-white"
              >
                DELTA PACK
              </h1>
            </div>
          </div>

          {/* Counter + bar */}
          <div className="flex flex-col items-center gap-3 w-56">
            <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-[0.25em]">
              <span className="text-gray-600">INITIALIZING</span>
              <span
                className="tabular-nums transition-colors"
                style={{ color: progress === 100 ? '#22c55e' : '#9ca3af' }}
              >
                {progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #22c55e, #38bdf8)',
                  boxShadow: '0 0 12px #22c55e88',
                  transition: 'width 0.08s linear',
                }}
              />
            </div>

            {/* Status text */}
            <div
              className="text-[9px] font-mono tracking-[0.3em] transition-colors"
              style={{ color: progress === 100 ? '#22c55e' : '#374151' }}
            >
              {progress < 40 ? 'LOADING ASSETS…' : progress < 80 ? 'BUILDING SCENE…' : progress < 100 ? 'FINALIZING…' : '● READY'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
