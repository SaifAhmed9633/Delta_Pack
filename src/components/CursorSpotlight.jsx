'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const dotRef = useRef(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Must be before any conditional return
  const spotlightBg = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.05), transparent 80%)`;

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasPointer);
    if (!hasPointer) return;

    let raf;
    let curX = -500, curY = -500;
    let targetX = -500, targetY = -500;

    const onMove = ({ clientX, clientY }) => {
      targetX = clientX;
      targetY = clientY;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const tick = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${curX - 4}px, ${curY - 4}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea')) {
        setIsHovering(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Large ambient spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10"
        style={{ background: spotlightBg }}
      />

      {/* Crisp cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full transition-all duration-150"
          style={{
            width: isHovering ? 20 : 8,
            height: isHovering ? 20 : 8,
            background: isHovering ? 'transparent' : '#22c55e',
            border: isHovering ? '1.5px solid #22c55e' : 'none',
            boxShadow: isHovering ? '0 0 16px #22c55e80' : '0 0 8px #22c55eaa',
            transform: isHovering ? 'translate(-6px, -6px)' : 'translate(0,0)',
          }}
        />
      </div>
    </>
  );
}
