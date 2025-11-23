'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Controller, Parallax } from 'swiper/modules';
import { villas } from '@/data/villas';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function VillaSlider() {
  const [activeSlide, setActiveSlide] = useState(1);
  const swiperMainRef = useRef<Swiper | null>(null);
  const swiperFadeRef = useRef<Swiper | null>(null);
  const swiperTextRef = useRef<Swiper | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sliderContainerRef.current) return;

    const sliderElement = sliderContainerRef.current;

    // Init Swiper 1: Main (Cards)
    const swiperMain = new Swiper(
      sliderElement.querySelector('.swiper-carousel-main') as HTMLElement,
      {
        modules: [Navigation, Pagination, Controller, Parallax],
        slidesPerView: 1,
        spaceBetween: 0,
        simulateTouch: false,
        loop: true,
        grabCursor: false,
        speed: 1200,
        navigation: {
          nextEl: sliderElement.querySelector('[data-swiper-control="next"]') as HTMLElement,
          prevEl: sliderElement.querySelector('[data-swiper-control="prev"]') as HTMLElement,
        },
        pagination: {
          el: sliderElement.querySelector('.swiper-pagination') as HTMLElement,
          clickable: true,
          renderBullet: (_index, className) => {
            return `<span class="${className}"><div class="swiper-progress"></div></span>`;
          },
        },
        parallax: true,
        allowTouchMove: false,
        on: {
          slideChange: function (this: Swiper) {
            setActiveSlide(this.realIndex + 1);
          },
        },
      }
    );

    // Init Swiper 2: Fade (Background)
    const swiperFade = new Swiper(
      sliderElement.querySelector('.swiper-carousel-fade') as HTMLElement,
      {
        modules: [EffectFade, Controller, Parallax],
        slidesPerView: 1,
        simulateTouch: false,
        loop: true,
        grabCursor: false,
        parallax: true,
        effect: 'fade',
        allowTouchMove: false,
      }
    );

    // Init Swiper 3: Text
    const swiperText = new Swiper(
      sliderElement.querySelector('.swiper-carousel-text') as HTMLElement,
      {
        modules: [Navigation, Controller, Parallax],
        slidesPerView: 'auto',
        spaceBetween: 0,
        simulateTouch: false,
        loop: true,
        grabCursor: false,
        centeredSlides: true,
        speed: 1200,
        navigation: {
          nextEl: sliderElement.querySelector('[data-swiper-control="next"]') as HTMLElement,
          prevEl: sliderElement.querySelector('[data-swiper-control="prev"]') as HTMLElement,
        },
        parallax: true,
        allowTouchMove: false,
      }
    );

    // Connect Swiper Sliders
    swiperMain.controller.control = swiperFade;
    swiperFade.controller.control = swiperMain;

    swiperMainRef.current = swiperMain;
    swiperFadeRef.current = swiperFade;
    swiperTextRef.current = swiperText;

    // GSAP Animation Progress Bar (Will trigger slider to slide)
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    const singleSwiperSliderEnd = () => {
      swiperMain.slideNext();
      swiperText.slideNext();
      tl.restart();
    };

    tl.to(sliderElement.querySelectorAll('.swiper-progress'), {
      duration: 5,
      scaleX: 1,
      ease: 'power1.inOut',
      onComplete: singleSwiperSliderEnd,
    });

    // Reset Progress Bar On Slide Change
    swiperMain.on('slideChange', () => {
      tl.restart();
      // Add transition class
      sliderElement.querySelectorAll('.swiper-slide').forEach((slide) => {
        slide.classList.add('slide-is-transitioning');
      });
      sliderElement.querySelectorAll('.swiper-slide-visible').forEach((slide) => {
        slide.classList.remove('slide-is-transitioning');
      });
      setTimeout(() => {
        sliderElement.querySelectorAll('.swiper-slide').forEach((slide) => {
          slide.classList.remove('slide-is-transitioning');
        });
      }, 1200);
    });

    // Play/Pause Slider in viewport
    ScrollTrigger.create({
      trigger: sliderElement,
      start: '0% 100%',
      end: '100% 0%',
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeave: () => tl.pause(),
      onLeaveBack: () => tl.pause(),
    });

    // Cleanup
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (swiperMainRef.current) swiperMainRef.current.destroy();
      if (swiperFadeRef.current) swiperFadeRef.current.destroy();
      if (swiperTextRef.current) swiperTextRef.current.destroy();
    };
  }, []);

  return (
    <section
      className="section section-stay-slider"
      data-theme-section="dark"
      data-bg-section="light"
    >
      <div
        ref={sliderContainerRef}
        className="swiper-slider-group"
        data-swiper-slider-type="stay"
      >
        <div className="row row-back card-small">
          <div className="swiper-pagination"></div>
          <div className="swiper-controls">
            <div
              className="swiper-arrow-overlay"
              data-swiper-control="prev"
              data-cursor-bubble-text="Prev"
            >
              <div
                className="swiper-arrow"
                style={{
                  backdropFilter: 'blur(1em)',
                  WebkitBackdropFilter: 'blur(1em)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <polyline
                    points="14 19 21 12 14 5"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="2"
                    y2="12"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </div>
            <div
              className="swiper-arrow-overlay"
              data-swiper-control="next"
              data-cursor-bubble-text="Next"
            >
              <div
                className="swiper-arrow"
                style={{
                  backdropFilter: 'blur(1em)',
                  WebkitBackdropFilter: 'blur(1em)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <polyline
                    points="14 19 21 12 14 5"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="2"
                    y2="12"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Background Fade Carousel */}
          <div
            className="swiper-carousel swiper-carousel-fade card-small"
            data-parallax-target
          >
            <ul className="swiper-wrapper">
              {villas.map((villa) => (
                <li key={`bg-${villa.id}`} className="swiper-slide overlay">
                  <div className="swiper-slide-inner overlay">
                    <Image
                      className="overlay"
                      src={villa.bgImage}
                      alt={`${villa.name} Detail`}
                      fill
                      sizes="100vw"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="overlay overlay-dark"></div>
          </div>

          {/* Text Carousel */}
          <div className="swiper-carousel swiper-carousel-text">
            <ul className="swiper-wrapper">
              {villas.map((villa) => (
                <li key={`text-${villa.id}`} className="swiper-slide">
                  <div
                    className="swiper-slide-inner"
                    data-swiper-parallax="0%"
                  >
                    <p className="type-15 m-type-14 color-text-60">
                      {villa.description}
                    </p>
                    <h2>{villa.name}</h2>
                  </div>
                  <Link
                    href={villa.link}
                    className="overlay overlay-link"
                    data-cursor-bubble-text="View"
                  ></Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Counter */}
          <div className="swiper-count">
            <span className="swiper-active-slide">{activeSlide}</span>
            <div className="deco-line-x"></div>
            <span>{villas.length}</span>
          </div>
        </div>

        {/* Main Card Carousel */}
        <div className="row row-slider-card" style={{ opacity: 0 }}>
          <div className="swiper-carousel swiper-carousel-main card-small">
            <ul className="swiper-wrapper">
              {villas.map((villa) => (
                <li key={`card-${villa.id}`} className="swiper-slide">
                  <div
                    className="swiper-slide-inner overlay card-small"
                    data-swiper-parallax="12.5%"
                  >
                    <Image
                      className="overlay"
                      src={villa.cardImage}
                      alt={`${villa.name} Overview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <Link
                    href={villa.link}
                    className="overlay overlay-link"
                    data-cursor-bubble-text="View"
                  ></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
