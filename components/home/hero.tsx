'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './hero.module.css';

interface Slide {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: 'EVERYDAY PIECES, CONSIDERED',
    heading: 'OBJECTS FOR THOUGHTFUL LIVING',
    description: 'Each object is made in small numbers, shaped to serve daily life without excess.',
    image: '/media/home/hero/slide-1.webp',
    link: '/objects',
  },
  {
    id: 2,
    eyebrow: 'ROOTED IN KYOTO',
    heading: 'CRAFTED WITH INTENTION',
    description: 'Drawing from centuries of Japanese craft traditions, reimagined for modern spaces.',
    image: '/media/home/hero/slide-2.webp',
    link: '/craft',
  },
  {
    id: 3,
    eyebrow: 'TIMELESS DESIGN',
    heading: 'MADE TO LAST',
    description: 'Furniture and objects designed to age gracefully, becoming part of your story.',
    image: '/media/home/hero/slide-3.webp',
    link: '/collection',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      {/* Fullscreen Image Slider */}
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              className={styles.image}
              fill
              sizes="100vw"
              quality={90}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Text Overlay - Bottom Left */}
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{slides[currentSlide].eyebrow}</p>
          <h1 className={styles.heading}>{slides[currentSlide].heading}</h1>
          <p className={styles.description}>{slides[currentSlide].description}</p>
          <Link href={slides[currentSlide].link} className={styles.cta}>
            <span>Discover Our Objects</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <polyline
                points="14 19 21 12 14 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <line
                x1="21"
                y1="12"
                x2="2"
                y2="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
          </Link>

          <div className={styles.pagination}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
