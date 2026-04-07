'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Must be called unconditionally — before any early return
  const background = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), transparent 80%)`;

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasPointer);
    if (!hasPointer) return;

    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10"
      style={{ background }}
    />
  );
}
