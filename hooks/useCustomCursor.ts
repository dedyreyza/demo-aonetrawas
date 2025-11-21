'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Hook to create custom cursor with smooth follow and bubble text
 * Based on original initCustomCursor() function
 */
export function useCustomCursor() {
  const posXRef = useRef(0);
  const posYRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      console.log('📱 CustomCursor: Disabled on mobile (touch devices)');
      return;
    }

    const cursorElement = document.querySelector('.custom-cursor') as HTMLElement;
    if (!cursorElement) {
      console.error('CustomCursor: .custom-cursor element not found in DOM');
      return;
    }

    console.log('✅ CustomCursor: Initialized successfully');

    // Smooth cursor follow with GSAP ticker
    const ticker = gsap.to(
      {},
      {
        duration: 0.0083333333, // ~120fps
        repeat: -1,
        onRepeat: () => {
          posXRef.current += (mouseXRef.current - posXRef.current) / 5;
          posYRef.current += (mouseYRef.current - posYRef.current) / 5;

          gsap.set(cursorElement, {
            left: posXRef.current,
            top: posYRef.current,
          });
        },
      }
    );

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
    };

    // Init cursor on first move
    const handleBodyMouseMove = () => {
      const cursorInit = document.querySelector('[data-cursor-init]');
      if (cursorInit && cursorInit.getAttribute('data-cursor-init') === 'false') {
        cursorInit.setAttribute('data-cursor-init', 'true');
      }
    };

    // Bubble text on hover
    const handleBubbleEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const bubbleText = target.getAttribute('data-cursor-bubble-text');
      const bubble = document.querySelector('[data-cursor-bubble]');
      const textElement = cursorElement.querySelector('.cursor-bubble .cursor-text');

      if (bubble && textElement && bubbleText) {
        bubble.setAttribute('data-cursor-bubble', 'active');
        textElement.textContent = bubbleText;
      }
    };

    const handleBubbleLeave = () => {
      const bubble = document.querySelector('[data-cursor-bubble]');
      if (bubble) {
        bubble.setAttribute('data-cursor-bubble', 'not-active');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mousemove', handleBodyMouseMove);

    const bubbleElements = document.querySelectorAll('[data-cursor-bubble-text]');
    console.log(`CustomCursor: Found ${bubbleElements.length} elements with [data-cursor-bubble-text]`);
    bubbleElements.forEach((el) => {
      el.addEventListener('mouseenter', handleBubbleEnter);
      el.addEventListener('mouseleave', handleBubbleLeave);
    });

    // Cleanup
    return () => {
      ticker.kill();
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mousemove', handleBodyMouseMove);
      bubbleElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleBubbleEnter);
        el.removeEventListener('mouseleave', handleBubbleLeave);
      });
    };
  }, []);
}
