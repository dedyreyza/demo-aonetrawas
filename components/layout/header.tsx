'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LenisInstance {
  stop: () => void;
  start: () => void;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll detection for blur effect
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Get Lenis instance from window
    const lenis = typeof window !== 'undefined' ? (window as { __lenis?: LenisInstance }).__lenis : null;

    // Toggle Navigation (Hamburger)
    const handleToggleNav = () => {
      const body = document.body;
      const currentStatus = body.getAttribute('data-navigation-status');

      if (currentStatus === 'not-active') {
        body.setAttribute('data-navigation-status', 'active');
        if (lenis) lenis.stop();
      } else {
        body.setAttribute('data-navigation-status', 'not-active');
        if (lenis) lenis.start();
      }
    };

    // Close Navigation
    const handleCloseNav = () => {
      const body = document.body;
      body.setAttribute('data-navigation-status', 'not-active');
      if (lenis) lenis.start();
    };

    // ESC Key Handler
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        const body = document.body;
        const currentStatus = body.getAttribute('data-navigation-status');

        if (currentStatus === 'active') {
          body.setAttribute('data-navigation-status', 'not-active');
          if (lenis) lenis.start();
        }
      }
    };

    // Add event listeners
    const hamburger = document.querySelector('[data-navigation-toggle="toggle"]');
    const closeButtons = document.querySelectorAll(
      '[data-navigation-toggle="close"]'
    );

    if (hamburger) {
      hamburger.addEventListener('click', handleToggleNav);
    }

    closeButtons.forEach((btn) => {
      btn.addEventListener('click', handleCloseNav);
    });

    document.addEventListener('keydown', handleEscKey);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hamburger) {
        hamburger.removeEventListener('click', handleToggleNav);
      }
      closeButtons.forEach((btn) => {
        btn.removeEventListener('click', handleCloseNav);
      });
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <header>
      {/* Transition Screen */}
      <div className="transition-screen"></div>

      {/* Loading Circle */}
      <div className="loading-circle">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="19.5" stroke="black" />
        </svg>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-nav-bar">
        <div
          className="overlay overlay-background"
          style={{
            backdropFilter: isScrolled ? 'blur(8px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(8px)' : 'none',
            backgroundColor: isScrolled
              ? 'rgba(0, 0, 0, 0.2)'
              : 'transparent',
            transition: 'backdrop-filter 0.6s ease, background-color 0.6s ease',
          }}
        ></div>
        <div className="overlay overlay-alt-background"></div>
        <div className="border-bottom"></div>
        <div className="row nav-bar-scrolled-height">
          {/* Logo */}
          <div className="logo">
            <Link href="/" className="logo-click">
              <svg
                width="125"
                height="39"
                viewBox="0 0 125 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1641 24.4395H14.9668V21.9053C14.1855 22.96 14.1562 23.1113 14.8789 22.3594C13.2188 24.0195 11.2168 24.8496 8.87305 24.8496C6.53906 24.8496 4.54199 24.0195 2.88184 22.3594C1.22168 20.6992 0.391602 18.7021 0.391602 16.3682C0.391602 14.0244 1.22168 12.0225 2.88184 10.3623C4.54199 8.70215 6.53906 7.87207 8.87305 7.87207C11.2168 7.87207 13.2188 8.70215 14.8789 10.3623C14.1562 9.61035 14.1855 9.76172 14.9668 10.8164V9.17578H17.1641V24.4395ZM14.9668 17.6279V15.1084C14.7422 13.9365 14.1758 12.8916 13.2676 11.9736C12.0566 10.7627 10.5918 10.1572 8.87305 10.1572C7.1543 10.1572 5.68945 10.7627 4.47852 11.9736C3.26758 13.1846 2.66211 14.6494 2.66211 16.3682C2.66211 18.0869 3.26758 19.5518 4.47852 20.7627C5.68945 21.9639 7.1543 22.5645 8.87305 22.5645C10.5918 22.5645 12.0566 21.959 13.2676 20.748C14.1758 19.8301 14.7422 18.79 14.9668 17.6279Z"
                  fill="black"
                />
                <path
                  d="M22.877 0.123047V24.4395H20.6797V0.123047H22.877Z"
                  fill="black"
                />
                <path
                  d="M28.5898 0.123047V24.4395H26.3926V0.123047H28.5898Z"
                  fill="black"
                />
                <path
                  d="M32.1055 9.17578H34.0098V9.20508C34.6152 8.61914 35.5479 8.32617 36.8076 8.32617C38.1064 8.32617 39.2148 8.78516 40.1328 9.70312C40.3867 9.94727 40.4795 10.0205 40.4111 9.92285C40.3525 10.0303 40.4502 9.95703 40.7041 9.70312C41.6221 8.78516 42.7305 8.32617 44.0293 8.32617C45.3281 8.32617 46.4365 8.78516 47.3545 9.70312C48.2334 10.582 48.6924 11.6416 48.7314 12.8818V24.4395H46.5342V12.75C46.5146 12.2129 46.2754 11.7148 45.8164 11.2559C45.3184 10.7676 44.7227 10.5234 44.0293 10.5234C43.3359 10.5234 42.7402 10.7725 42.2422 11.2705C41.7539 11.7588 41.5098 12.3691 41.5098 13.1016V24.4395H39.3125V12.75C39.293 12.2129 39.0537 11.7148 38.5947 11.2559C38.0967 10.7676 37.501 10.5234 36.8076 10.5234C36.1143 10.5234 35.5234 10.7676 35.0352 11.2559C34.6055 11.6855 34.3613 12.1982 34.3027 12.7939V24.4395H32.1055V9.17578Z"
                  fill="black"
                />
                <path
                  d="M68.668 24.4395H66.4707V21.9053C65.6895 22.96 65.6602 23.1113 66.3828 22.3594C64.7227 24.0195 62.7207 24.8496 60.377 24.8496C58.043 24.8496 56.0459 24.0195 54.3857 22.3594C52.7256 20.6992 51.8955 18.7021 51.8955 16.3682C51.8955 14.0244 52.7256 12.0225 54.3857 10.3623C56.0459 8.70215 58.043 7.87207 60.377 7.87207C62.7207 7.87207 64.7227 8.70215 66.3828 10.3623C65.6602 9.61035 65.6895 9.76172 66.4707 10.8164V9.17578H68.668V24.4395ZM66.4707 17.6279V15.1084C66.2461 13.9365 65.6797 12.8916 64.7715 11.9736C63.5605 10.7627 62.0957 10.1572 60.377 10.1572C58.6582 10.1572 57.1934 10.7627 55.9824 11.9736C54.7715 13.1846 54.166 14.6494 54.166 16.3682C54.166 18.0869 54.7715 19.5518 55.9824 20.7627C57.1934 21.9639 58.6582 22.5645 60.377 22.5645C62.0957 22.5645 63.5605 21.959 64.7715 20.748C65.6797 19.8301 66.2461 18.79 66.4707 17.6279Z"
                  fill="black"
                />
                <path
                  d="M74.3809 12.9111V24.4395H72.1836V9.17578H74.3809V9.4834C75.1719 8.70215 76.4219 8.31152 78.1309 8.31152C79.9473 8.31152 81.4316 8.8877 82.584 10.04C83.7363 11.1826 84.3271 12.6279 84.3564 14.376V24.4395H82.1592V14.4932C82.1592 13.3994 81.7588 12.4619 80.958 11.6807C80.167 10.8994 79.2246 10.5088 78.1309 10.5088C77.0371 10.5088 76.0947 10.8896 75.3037 11.6514C74.8643 12.0908 74.5566 12.5107 74.3809 12.9111Z"
                  fill="black"
                />
                <path
                  d="M104.293 24.4395H102.096V21.9053C101.314 22.96 101.285 23.1113 102.008 22.3594C100.348 24.0195 98.3457 24.8496 96.002 24.8496C93.668 24.8496 91.6709 24.0195 90.0107 22.3594C88.3506 20.6992 87.5205 18.7021 87.5205 16.3682C87.5205 14.0244 88.3506 12.0225 90.0107 10.3623C91.6709 8.70215 93.668 7.87207 96.002 7.87207C98.3457 7.87207 100.348 8.70215 102.008 10.3623C101.285 9.61035 101.314 9.76172 102.096 10.8164V0.123047H104.293V24.4395ZM102.096 17.6279V15.1084C101.871 13.9365 101.305 12.8916 100.396 11.9736C99.1855 10.7627 97.7207 10.1572 96.002 10.1572C94.2832 10.1572 92.8184 10.7627 91.6074 11.9736C90.3965 13.1846 89.791 14.6494 89.791 16.3682C89.791 18.0869 90.3965 19.5518 91.6074 20.7627C92.8184 21.9639 94.2832 22.5645 96.002 22.5645C97.7207 22.5645 99.1855 21.959 100.396 20.748C101.305 19.8301 101.871 18.79 102.096 17.6279Z"
                  fill="black"
                />
                <path
                  d="M124.215 24.4395H122.018V21.9053C121.236 22.96 121.207 23.1113 121.93 22.3594C120.27 24.0195 118.268 24.8496 115.924 24.8496C113.59 24.8496 111.593 24.0195 109.933 22.3594C108.272 20.6992 107.442 18.7021 107.442 16.3682C107.442 14.0244 108.272 12.0225 109.933 10.3623C111.593 8.70215 113.59 7.87207 115.924 7.87207C118.268 7.87207 120.27 8.70215 121.93 10.3623C121.207 9.61035 121.236 9.76172 122.018 10.8164V9.17578H124.215V24.4395ZM122.018 17.6279V15.1084C121.793 13.9365 121.227 12.8916 120.318 11.9736C119.107 10.7627 117.643 10.1572 115.924 10.1572C114.205 10.1572 112.74 10.7627 111.529 11.9736C110.318 13.1846 109.713 14.6494 109.713 16.3682C109.713 18.0869 110.318 19.5518 111.529 20.7627C112.74 21.9639 114.205 22.5645 115.924 22.5645C117.643 22.5645 119.107 21.959 120.318 20.748C121.227 19.8301 121.793 18.79 122.018 17.6279Z"
                  fill="black"
                />
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Navigation Desktop">
            <div className="cheeseburger" data-navigation-toggle="toggle">
              <div className="cheeseburger-inner">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
            <div className="deco-line"></div>
            <ul
              className="nav-link-ul"
              data-barba-update
              data-link-status="dropdown-not-active"
            >
              {/* Dropdown: Other Villas */}
              <div className="nav-link nav-link-absolute nav-link-absolute-stay">
                <div className="nav-link-click">
                  <div className="nav-link-content">
                    <span>Other villas</span>
                    <div className="dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
                <div className="nav-link-dropdown">
                  <ul className="nav-link-dropdown-inner">
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Hibiscus</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Oleander</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Bougainvillea</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Frangipani</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Allamanda House</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Beach House</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dropdown: Discover */}
              <div className="nav-link nav-link-absolute nav-link-absolute-discover">
                <div className="nav-link-click">
                  <div className="nav-link-content">
                    <span>Discover</span>
                    <div className="dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
                <div className="nav-link-dropdown">
                  <ul className="nav-link-dropdown-inner">
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Scuba Diving</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Snorkeling</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Deep Sea Fishing</span>
                      </a>
                    </li>
                    <li className="link" data-link-status="not-active">
                      <a className="link-click" href="#">
                        <span>Kitesurfing</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Regular Nav Links */}
              <li className="nav-link nav-link-relative" data-link-status="not-active">
                <Link className="nav-link-click" href="/stay">
                  <div className="nav-link-content">
                    <span>Stay</span>
                  </div>
                </Link>
              </li>
              <li className="nav-link nav-link-relative" data-link-status="not-active">
                <Link className="nav-link-click" href="/relax">
                  <div className="nav-link-content">
                    <span>Relax</span>
                  </div>
                </Link>
              </li>
              <li className="nav-link nav-link-relative" data-link-status="not-active">
                <Link className="nav-link-click" href="/dining">
                  <div className="nav-link-content">
                    <span>Enjoy</span>
                  </div>
                </Link>
              </li>
              <li className="nav-link nav-link-relative" data-link-status="not-active">
                <Link className="nav-link-click" href="/discover">
                  <div className="nav-link-content">
                    <span>Discover</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Book Button */}
          <div className="btn btn-nav primary small">
            <div className="btn-click">
              <div className="btn-content">
                <span className="text-desktop">Book</span>
                <span className="text-mobile">Book</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Navigation Overlay */}
      <div
        className="overlay overlay-dark side-nav-back"
        data-navigation-toggle="close"
      ></div>

      {/* Side Navigation Box */}
      <div className="side-nav-box">
        {/* Background Images for Nav Hover */}
        <ul className="side-nav-images" data-nav-image-group>
          <li
            className="single-nav-image overlay"
            data-nav-image-status="not-active"
            data-nav-image-id="stay"
          >
            <figure className="overlay">
              <picture className="styled-image overlay">
                <img
                  alt="Edge of studio pool"
                  className="overlay"
                  src="/media/layout/navigation/91a2e0e5d5-1703335783/navigation-image-stay-720x1440-crop-q72.jpg"
                  width="720"
                  height="1440"
                  loading="lazy"
                />
              </picture>
            </figure>
          </li>
          <li
            className="single-nav-image overlay"
            data-nav-image-status="not-active"
            data-nav-image-id="dining"
          >
            <figure className="overlay">
              <picture className="styled-image overlay">
                <img
                  alt="Female having drinks at the bar"
                  className="overlay"
                  src="/media/layout/navigation/217f1cbc5b-1703335787/blacktable-720x1440-crop-q72.jpg"
                  width="720"
                  height="1440"
                  loading="lazy"
                />
              </picture>
            </figure>
          </li>
          <li
            className="single-nav-image overlay"
            data-nav-image-status="not-active"
            data-nav-image-id="relax"
          >
            <figure className="overlay">
              <picture className="styled-image overlay">
                <img
                  alt="Wooden pattern on wall with shadow and light"
                  className="overlay"
                  src="/media/layout/navigation/6c056bd40a-1703335823/singingbowl-720x1440-crop-q72.jpg"
                  width="720"
                  height="1440"
                  loading="lazy"
                />
              </picture>
            </figure>
          </li>
          <li
            className="single-nav-image overlay"
            data-nav-image-status="not-active"
            data-nav-image-id="discover"
          >
            <figure className="overlay">
              <picture className="styled-image overlay">
                <img
                  alt="Nerves of leave"
                  className="overlay"
                  src="/media/layout/navigation/7a4f925c5b-1703335878/navigation-image-discover-720x1440-crop-q72.jpg"
                  width="720"
                  height="1440"
                  loading="lazy"
                />
              </picture>
            </figure>
          </li>
        </ul>

        <div className="side-nav" data-lenis-prevent>
          {/* Close Button */}
          <div className="close" data-navigation-toggle="close">
            <div className="close-inner">
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>

          {/* Primary Mobile Navigation */}
          <div className="row row-links-primary">
            <nav className="col" aria-label="Navigation Mobile">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Menu</span>
              </div>
              <ul className="col-row col-row-mobile-nav">
                <li
                  className="nav-link"
                  data-link-status="not-active"
                  data-nav-image-id="stay"
                >
                  <a className="nav-link-click" href="#">
                    <div className="nav-link-content">
                      <span>Stay</span>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-link"
                  data-link-status="not-active"
                  data-nav-image-id="dining"
                >
                  <a className="nav-link-click" href="#">
                    <div className="nav-link-content">
                      <span>Relax</span>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-link"
                  data-link-status="not-active"
                  data-nav-image-id="relax"
                >
                  <a className="nav-link-click" href="#">
                    <div className="nav-link-content">
                      <span>Enjoy</span>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-link"
                  data-link-status="not-active"
                  data-nav-image-id="discover"
                >
                  <a className="nav-link-click" href="#">
                    <div className="nav-link-content">
                      <span>Discover</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Secondary Links */}
          <div className="row row-links-secondary">
            <div className="border-top"></div>
            <div className="col col-link-stay">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Stay</span>
              </div>
              <ul className="col-row col-row-links">
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Hibiscus</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Oleander</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Bougainvillea</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Frangipani</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Allamanda House</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Beach House</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-link-discover">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Discover</span>
              </div>
              <ul className="col-row col-row-links">
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Scuba Diving</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Snorkeling</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Deep Sea Fishing</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Kitesurfing</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* WhatsApp/Rating Row */}
          <div className="row row-rating">
            <div className="border-top"></div>
            <div className="col">
              <div className="col-row col-row-rating">
                <li className="link small inactive">
                  <div className="link-click">
                    <span>WhatsApp</span>
                    <div
                      className="overlay whatsapp-link-desktop"
                      data-whatsapp-toggle="toggle"
                    ></div>
                    <a href="https://wa.me/" className="overlay whatsapp-link-mobile"></a>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
