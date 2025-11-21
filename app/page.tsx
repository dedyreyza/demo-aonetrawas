'use client';

import LoadingScreen from '@/components/layout/loading-screen';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/home/hero';
import Intro from '@/components/home/intro';
import IntroAfter from '@/components/home/intro-after';
import VillaSlider from '@/components/home/villa-slider';
import ImageSplit from '@/components/home/image-split';
import PackagesIntro from '@/components/home/packages-intro';
import PackagesCards from '@/components/home/packages-cards';
import { useParallax } from '@/hooks/useParallax';
import { useScrollDetection } from '@/hooks/useScrollDetection';

export default function HomePage() {
  // Initialize parallax effects
  useParallax();

  // Initialize scroll direction detection for navbar
  useScrollDetection();

  return (
    <>
      <LoadingScreen />
      <Header />

      <main className="main" id="main" data-barba="container">
        <div className="main-wrap" id="main-wrap">
          <Hero />
          <Intro />
          <IntroAfter />
          <VillaSlider />

          <ImageSplit
            imageSrc="/media/home/sections/outside.jpg"
            imageAlt="Allamanda outside"
            eyebrow="The property"
            title="A pool, massages and more."
            titleAccent="All in a tropical nursery."
            description="Located just minutes away from Malindi's world famous beaches, Allamanda is built inside a gorgeous tropical nursery, centered around a lovely swimming pool."
            buttonText="Explore"
            buttonHref="#"
          />

          <ImageSplit
            imageSrc="/media/home/sections/dining.jpg"
            imageAlt="Dining at Allamanda"
            eyebrow="Our spa"
            title="Be pampered in paradise."
            titleAccent="Or take the holiday by the horns."
            description="If a relaxing and fully-serviced holiday is what you are looking for, we have it. From our enjoy packages below, to massage treatments or a stellar chef for catering. However, for those who wish to do things themselves, we have everything you need."
            buttonText="Learn more"
            buttonHref="#"
            buttonStyle="grey"
            flipped={true}
            bgColor="white"
            imageOverlay={true}
            titleSmall={true}
          />

          <PackagesIntro />
          <PackagesCards />

          <Footer />
        </div>
      </main>
    </>
  );
}
