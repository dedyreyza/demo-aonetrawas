'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Create custom easing from original
  CustomEase.create('animation-nav', '.3, 0, .3, 1');
}

export { gsap, ScrollTrigger, CustomEase };
