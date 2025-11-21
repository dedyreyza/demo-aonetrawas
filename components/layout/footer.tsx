'use client';

export default function Footer() {
  return (
    <footer
      className="section section-footer"
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="container full">
        <div className="row row-links">
          <div className="border-top"></div>
          <nav
            className="col col-links-primary"
            aria-label="Navigation Footer Primary"
          >
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Menu</span>
            </div>
            <ul className="col-row col-row-links-primary">
              <li className="nav-link" data-link-status="not-active">
                <a className="nav-link-click" href="#">
                  <div className="nav-link-content">
                    <span>Stay</span>
                  </div>
                </a>
              </li>
              <li className="nav-link" data-link-status="not-active">
                <a className="nav-link-click" href="#">
                  <div className="nav-link-content">
                    <span>Relax</span>
                  </div>
                </a>
              </li>
              <li className="nav-link" data-link-status="not-active">
                <a className="nav-link-click" href="#">
                  <div className="nav-link-content">
                    <span>Enjoy</span>
                  </div>
                </a>
              </li>
              <li className="nav-link" data-link-status="not-active">
                <a className="nav-link-click" href="#">
                  <div className="nav-link-content">
                    <span>Discover</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <div className="col col-links-secondary">
            <div className="border-left"></div>
            <div className="col-split col-split-link-stay">
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
              <div className="col-row-more-link">
                <div className="icon-link">
                  <a href="#" className="icon-link-click">
                    <div className="icon-link-content">
                      <span>Overview</span>
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-split col-split-link-discover">
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
                    <span>Deep Sea Fishing</span>
                  </a>
                </li>
                <li className="link" data-link-status="not-active">
                  <a className="link-click" href="#">
                    <span>Kitesurfing</span>
                  </a>
                </li>

              </ul>
              <div className="col-row-more-link">
                <div className="icon-link">
                  <a href="#" className="icon-link-click">
                    <div className="icon-link-content">
                      <span>Show more</span>
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-credentials">
            <div className="border-left"></div>
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Contact</span>
            </div>
            <div className="col-row col-row-address">
              <p className="medium">Allamanda Malindi</p>
              <p className="medium">Ngowe Road, Malindi, Kenya</p>
            </div>
            <ul className="col-row col-row-external-links">
              <li className="link">
                <a className="link-click" href="tel:+25477777777">
                  <span>T: +254 777 777 777</span>
                </a>
              </li>
              <li className="link">
                <a className="link-click" href="mailto:jambo@allamanda.ke">
                  <span>E: jambo@allamanda.ke</span>
                </a>
              </li>
              <li className="link">
                <div className="link-click">
                  <span>Reception: WhatsApp</span>
                  <div className="overlay whatsapp-link-desktop" data-whatsapp-toggle="toggle"></div>
                  <a href="https://wa.me/" className="overlay whatsapp-link-mobile"></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row row-credits">
          <div className="border-top"></div>
          <div className="col col-reviews">
            <div className="col-row col-row-reviews">
            </div>
          </div>
          <div className="col col-socials">
            <div className="border-left"></div>
            <ul className="col-row col-row-socials">
              <li className="link small inactive">
                <a className="link-click" href="https://www.instagram.com/" target="_blank">
                  <span>Instagram</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="col col-copyright">
            <div className="border-left"></div>
            <div className="col-split">
              <p className="small inactive">© 2024 Allamanda</p>
            </div>
            <div className="col-split">
              <div className="icon-link built-in">
                <a
                  href="https://instagram.com/dedyreyza"
                  className="icon-link-click"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-link-content">
                    <span>Site by dedyreyza.</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
