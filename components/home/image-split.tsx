'use client';

import Button from '@/components/ui/button';

interface ImageSplitProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonStyle?: 'default' | 'grey';
  flipped?: boolean;
  bgColor?: 'light' | 'white';
  imageOverlay?: boolean;
  titleSmall?: boolean;
}

export default function ImageSplit({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  titleAccent,
  description,
  buttonText,
  buttonHref,
  buttonStyle = 'default',
  flipped = false,
  bgColor = 'light',
  imageOverlay = false,
  titleSmall = false,
}: ImageSplitProps) {
  return (
    <section
      className="section section-image-split"
      data-theme-section="light"
      data-bg-section={bgColor}
    >
      <div className="container">
        <div className={`row grid ${flipped ? 'flipped' : ''}`}>
          <div className="col col-image">
            <figure className="styled-figure default card-small">
              <picture className="overlay">
                <img
                  alt={imageAlt}
                  data-parallax-target
                  className={imageOverlay ? 'lazy overlay' : 'lazy'}
                  src={imageSrc}
                  data-src={imageSrc}
                  width="1080"
                  height="1440"
                  loading="lazy"
                />
              </picture>
            </figure>
          </div>
          <div className="col col-content styled-col">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <div
              className={
                titleSmall ? 'col-row col-row-title small' : 'col-row col-row-title'
              }
            >
              <h2>
                {title} <span className="color-text-40">{titleAccent}</span>
              </h2>
            </div>
            <div className="col-row col-row-text medium styled-content">
              <p className="type-15 m-type-14 color-text-60">{description}</p>
            </div>
            <div className="col-row col-row-btn">
              <Button
                href={buttonHref}
                variant={buttonStyle === 'default' ? 'primary' : buttonStyle}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
