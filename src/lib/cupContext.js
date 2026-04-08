'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { products } from '@/lib/products';

/**
 * CupContext — global state driving the persistent 3D cup.
 *
 * section: 'hero' | 'features' | 'models' | 'contact'
 * productIndex: 0-3 (which product's colors to show)
 * spinKick: MutableRefObject<number> — pulsed to trigger rotation burst
 */
const CupContext = createContext(null);

export function CupProvider({ children }) {
  const [section, setSection] = useState('hero');
  const [productIndex, setProductIndex] = useState(0);
  const spinKick = useRef(0);

  const triggerSpin = useCallback(() => {
    spinKick.current = 1.4;
  }, []);

  const setProduct = useCallback((idx) => {
    setProductIndex(idx);
    triggerSpin();
  }, [triggerSpin]);

  const value = useMemo(
    () => ({
      section,
      setSection,
      productIndex,
      setProduct,
      product: products[productIndex],
      spinKick,
      triggerSpin,
    }),
    [section, productIndex, setProduct, triggerSpin]
  );

  return <CupContext.Provider value={value}>{children}</CupContext.Provider>;
}

export function useCup() {
  const ctx = useContext(CupContext);
  if (!ctx) throw new Error('useCup must be used inside <CupProvider>');
  return ctx;
}

/**
 * useSectionCup — attach to a section's DOM ref.
 * When ≥35% of the section is visible, it becomes the "active" section
 * for the persistent cup.
 *
 * @param {string} sectionName  — one of 'hero' | 'features' | 'models' | 'contact'
 * @param {React.RefObject<HTMLElement>} ref  — ref to the section element
 */
export function useSectionCup(sectionName, ref) {
  const { setSection } = useCup();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSection(sectionName);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName, ref, setSection]);
}
