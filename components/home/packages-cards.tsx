'use client';

import Link from 'next/link';

interface Package {
  id: number;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  link: string;
}

const packages: Package[] = [
  {
    id: 1,
    title: 'Scuba Diving',
    eyebrow: '2 nights or more',
    description: 'Experience our most popular package',
    image: '/media/home/packages/diving.jpg',
    alt: 'Scuba diving',
    link: '#',
  },
  {
    id: 2,
    title: 'Deep Sea Fishing',
    eyebrow: '2 nights or more',
    description: 'Malindis coast is a fishermans paradise',
    image: '/media/home/packages/fishing.jpg',
    alt: 'Deep sea fishing',
    link: '#',
  },
  {
    id: 3,
    title: 'Kitesurfing',
    eyebrow: '2 nights or more',
    description: 'Thrilling fun for newcomers or pros alike',
    image: '/media/home/packages/kitesurfing.jpg',
    alt: 'Kitesurfing',
    link: '#',
  },
];

export default function PackagesCards() {
  return (
    <section
      className="section section-packages-cards"
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="container wide">
        <ul className="row grid">
          {packages.map((pkg) => (
            <li key={pkg.id} className="col">
              <div className="single-packages-card">
                <div className="card-image card-small">
                  <img
                    className="overlay lazy"
                    src={pkg.image}
                    data-src={pkg.image}
                    alt={pkg.alt}
                    loading="lazy"
                  />
                  <div className="overlay overlay-gradient"></div>
                  <div className="overlay overlay-dark"></div>
                </div>
                <div className="card-content">
                  <div className="card-row card-row-eyebrow">
                    <span className="eyebrow small">{pkg.eyebrow}</span>
                  </div>
                  <div className="card-row card-row-info">
                    <div className="card-row card-row-title">
                      <h3 className="small">{pkg.title}</h3>
                    </div>
                    <div className="card-row card-row-text">
                      <p className="type-15 m-type-14 color-text-60">
                        {pkg.description}
                      </p>
                    </div>
                  </div>
                  <div className="card-row card-row-btn">
                    <Link href={pkg.link}>
                      <div className="btn blur small">
                        <div
                          className="btn-click"
                          style={{
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                          }}
                        >
                          <div className="btn-content">
                            <span>More info</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
