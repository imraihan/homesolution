import { Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import '@/styles/pages.scss';
import '@/styles/polish.scss';
import StoreProvider from '@/store/StoreProvider';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-poppins' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Home Solution - Trusted Home Services in Chattogram', template: '%s | Home Solution' },
  description: 'Book verified plumbers, electricians, carpenters and cleaners in Chattogram, Bangladesh. Same day service, secure payment, satisfaction guarantee.',
  applicationName: SITE_NAME,
  openGraph: { siteName: SITE_NAME, locale: 'en_BD', type: 'website' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0b1f4b' };

export default function RootLayout({ children }) {
  // suppressHydrationWarning: browser extensions (e.g. Grammarly/ColorZilla adding cz-shortcut-listen)
  // inject attributes into <html>/<body> before React hydrates. Only silences attribute diffs on these two nodes.
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
