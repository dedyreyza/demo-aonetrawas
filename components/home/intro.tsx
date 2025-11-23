import Image from 'next/image';

export default function IntroSection() {
  return (
    <section
      className="section section-home-intro"
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="container wide">
        <div className="row grid centered">
          <div className="col col-images-left">
            <div className="col-row">
              <figure className="styled-figure default">
                <picture className="overlay">
                  <Image
                    alt="Campfire at sunset"
                    data-parallax-target
                    className="lazy overlay"
                    src="/media/home/intro/intro_amenities.jpg"
                    width={540}
                    height={720}
                  />
                </picture>
              </figure>
            </div>
            <div className="col-row">
              <figure className="styled-figure default">
                <picture className="overlay">
                  <Image
                    alt="Wall pattern made of wood"
                    data-parallax-target
                    className="lazy overlay"
                    src="/media/home/intro/intro_dining.jpg"
                    width={540}
                    height={720}
                  />
                </picture>
              </figure>
            </div>
          </div>
          <div className="col styled-col">
            <div className="col-row col-row-ornament"></div>
            <div className="col-row col-row-title small">
              <h1 className="type-60 m-type-36">
                Not hard to find.
                <br />
                <span className="color-text-40">Hard to leave.</span>
              </h1>
            </div>
            <div className="col-row col-row-text styled-content">
              <p className="type-15 m-type-14 color-text-60">
                Located minutes from Malindi airport, Allamanda is easy to reach
                for guests from Kenya, or abroad. However, you may very well end
                up wishing you never had to go home.
              </p>
            </div>
            <div className="col-row col-row-btn">
              <div className="btn primary">
                <a href="#" className="btn-click">
                  Explore Allamanda
                </a>
              </div>
            </div>
          </div>
          <div className="col col-images-right">
            <div className="col-row">
              <figure
                className="styled-figure default"
                data-parallax-strength="0.5"
                data-parallax-height="0.2"
              >
                <picture className="overlay">
                  <Image
                    alt="Lampion loop birds sunset"
                    data-parallax-target
                    className="lazy overlay"
                    src="/media/home/intro/intro_pool.jpg"
                    width={540}
                    height={720}
                  />
                </picture>
              </figure>
            </div>
            <div className="col-row">
              <figure
                className="styled-figure default"
                data-parallax-strength="0.5"
                data-parallax-height="0.2"
              >
                <picture className="overlay">
                  <Image
                    alt="Leaves fern"
                    data-parallax-target
                    className="lazy overlay"
                    src="/media/home/intro/intro_decor.jpg"
                    width={540}
                    height={720}
                  />
                </picture>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
