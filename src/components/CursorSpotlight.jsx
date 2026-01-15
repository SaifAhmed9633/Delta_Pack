'use client';
import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-500); // إخفاء مبدئي
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      style={{
        // تدرج لوني ناعم يكشف الخلفية
        background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
      }}
    />
  );
}