'use client';

import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export function useLenisScroll() {
  return useContext(LenisContext);
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      console.log('📱 Lenis: Disabled on mobile for optimal performance');
      return;
    }

    // Initialize Lenis smooth scroll (desktop only)
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Make Lenis globally accessible for scroll control
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
      console.log('✅ Lenis: Initialized and available on window.__lenis');
    }

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for smooth animation
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return lenisRef;
}

export { LenisContext };
