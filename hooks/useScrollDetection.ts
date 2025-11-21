'use client';

import { useEffect } from 'react';

/**
 * Hook to detect scroll direction and scroll start
 * Updates body data attributes:
 * - data-scrolling-direction: "up" | "down"
 * - data-scrolling-started: "true" | "false"
 *
 * Based on original initLenisCheckScrollUpDown() function
 */
export function useScrollDetection() {
  useEffect(() => {
    let lastScrollTop = 0;
    const threshold = 50;
    const thresholdTop = 50;
    let cleanupFn: (() => void) | null = null;

    // Wait for Lenis to be available
    const checkLenis = () => {
      const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null;

      if (!lenis) {
        return false;
      }

      console.log('✅ ScrollDetection: Initialized successfully');

    let scrollEventCount = 0;
    const handleScroll = (e: any) => {
      const nowScrollTop = e.targetScroll;

      if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
        const body = document.body;
        scrollEventCount++;

        // Check Scroll Direction
        if (nowScrollTop > lastScrollTop) {
          body.setAttribute('data-scrolling-direction', 'down');
        } else {
          body.setAttribute('data-scrolling-direction', 'up');
        }
        lastScrollTop = nowScrollTop;

        // Check if Scroll Started
        if (nowScrollTop > thresholdTop) {
          body.setAttribute('data-scrolling-started', 'true');
        } else {
          body.setAttribute('data-scrolling-started', 'false');
        }

        // Log first few events
        if (scrollEventCount <= 3) {
          console.log(`ScrollDetection: Scroll event #${scrollEventCount} - position: ${nowScrollTop}, started: ${nowScrollTop > thresholdTop}`);
        }
      }
    };

      lenis.on('scroll', handleScroll);

      cleanupFn = () => {
        lenis.off('scroll', handleScroll);
      };

      return true;
    };

    // Try immediately
    if (!checkLenis()) {
      // Retry after small delay
      const timer = setTimeout(() => {
        if (!checkLenis()) {
          console.warn('ScrollDetection: Lenis still not available after 100ms');
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (cleanupFn) cleanupFn();
      };
    }

    // Cleanup
    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);
}
