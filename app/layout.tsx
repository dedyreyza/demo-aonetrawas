import type { Metadata } from 'next';
import Script from 'next/script';
import LenisProvider from '@/components/providers/LenisProvider';
import CustomCursor from '@/components/ui/cursor';
// Base styles (variables, reset, typography)
import './globals.css';
import '../styles/fonts.css';

// Utilities and layout helpers
import '../styles/utilities.css';

// Third-party libraries
import '../styles/libraries.css';

// Reusable components
import '../styles/components.css';
import '../styles/cards.css';

// Layout (header, footer, navigation)
import '../styles/layout.css';

// Page-specific sections
import '../styles/sections/home.css';
import '../styles/sections/stay.css';
import '../styles/sections/packages.css';
import '../styles/sections/discover.css';
import '../styles/sections/dining.css';
import '../styles/sections/shared.css';
import '../styles/sections/misc.css';

export const metadata: Metadata = {
  title: 'Allamanda — Beach life.',
  description:
    'Allamanda: beach life so good, you will never want to leave.',
  openGraph: {
    title: 'Allamanda — Beach life.',
    description:
      'Allamanda: beach life so good, you will never want to leave.',
    siteName: 'The Damai',
    locale: 'en',
    type: 'website',
  },
  other: {
    google: 'notranslate',
  },
  icons: {
    icon: '/assets/img/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-barba="wrapper"
        data-page-transition="not-active"
        data-links-no-hover="not-active"
        data-navigation-status="not-active"
        data-credits-status="not-active"
        data-whatsapp-status="not-active"
        data-scrolling-started="false"
        data-scrolling-direction="down"
        data-bg-nav="transparent"
      >
        <LenisProvider>{children}</LenisProvider>
        <CustomCursor />

        <Script
          src="https://api.mews.com/distributor/distributor.min.js"
          strategy="lazyOnload"
        />
        <Script id="analytics-init" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function () {
              console.log('Analytics Accepted');
            });
          `}
        </Script>
      </body>
    </html>
  );
}
