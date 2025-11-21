'use client';

export default function PackagesIntro() {
  return (
    <section
      className="section section-packages-intro"
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="border-top-ornament"></div>
      <div className="container">
        <ul className="row centered">
          <div className="col col-content styled-col">
            <div className="col-row col-row-title">
              <h1>
                allamand<span className="color-text-40">and</span>
                <span className="color-blue">+</span>
              </h1>
            </div>
            <div className="col-row col-row-text medium styled-content">
              <p className="type-15 m-type-14 color-text-60">
                Upgrade your stay with one of our package offers to let you
                enjoy a vacation free of stress or hassles.
              </p>
            </div>
          </div>
        </ul>
      </div>
    </section>
  );
}
