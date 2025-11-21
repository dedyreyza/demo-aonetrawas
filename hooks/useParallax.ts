'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Hook to setup parallax scroll effects on elements with [data-parallax-strength]
 * Based on original initScrollTriggerParallaxScroll() function
 */
export function useParallax() {
  useEffect(() => {
    // Only run on desktop (min-width: 1025px)
    const mediaQuery = window.matchMedia('(min-width: 1025px)');

    const initParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax-strength]');

      if (parallaxElements.length === 0) return;

      const scrollTriggers: ScrollTrigger[] = [];

      parallaxElements.forEach((element) => {
        const triggerElement = element as HTMLElement;
        const targetElement = element.querySelector('[data-parallax-target]') as HTMLElement;

        if (!targetElement) return;

        const triggerElementID = triggerElement.getAttribute('data-parallax-trigger');
        const strengthValue = parseFloat(triggerElement.getAttribute('data-parallax-strength') || '1');
        const heightValue = parseFloat(triggerElement.getAttribute('data-parallax-height') || '1');

        const targetElementParallax = strengthValue * 20;
        const heightElementParallax = heightValue * 20;

        // Set CSS variables
        triggerElement.style.setProperty('--parallax-strength', `${targetElementParallax}%`);
        triggerElement.style.setProperty('--parallax-height', `${heightElementParallax}%`);

        // Check if custom trigger exists
        let finalTrigger: HTMLElement | Element = triggerElement;
        if (triggerElementID) {
          const customTrigger = document.querySelector(triggerElementID);
          if (customTrigger) {
            finalTrigger = customTrigger;
          }
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: finalTrigger,
            start: '0% 100%',
            end: '100% 0%',
            scrub: true,
            markers: false,
          },
        });

        tl.set(targetElement, {
          rotate: 0.001, // Force GPU acceleration
        });

        tl.fromTo(
          targetElement,
          {
            yPercent: targetElementParallax * -0.5,
          },
          {
            yPercent: targetElementParallax * 0.5,
            ease: 'none',
          }
        );

        if (tl.scrollTrigger) {
          scrollTriggers.push(tl.scrollTrigger);
        }
      });

      return scrollTriggers;
    };

    let scrollTriggers: ScrollTrigger[] = [];

    const handleMediaChange = () => {
      // Kill existing triggers
      scrollTriggers.forEach((st) => st.kill());
      scrollTriggers = [];

      // Reinit if desktop
      if (mediaQuery.matches) {
        scrollTriggers = initParallax() || [];
      }
    };

    // Init on mount
    handleMediaChange();

    // Listen for media query changes
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup
    return () => {
      scrollTriggers.forEach((st) => st.kill());
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);
}
