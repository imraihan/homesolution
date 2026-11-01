import Hero from '@/components/home/Hero';
import PopularServices from '@/components/home/PopularServices';
import HowItWorks from '@/components/home/HowItWorks';
import UrgentHelp from '@/components/home/UrgentHelp';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TrustedByThousands from '@/components/home/TrustedByThousands';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import { SITE_URL, CONTACT } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Home Solution - Trusted Home Services in Chattogram' },
  description: 'Book trusted professionals for plumbing, electrician, carpentry, cleaning and more in Chattogram. Verified experts, same day service.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Home Solution - We Make Your Home Better',
    description: 'Book trusted professionals for plumbing, electrician, carpentry, cleaning and more.',
    url: '/',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Home Solution' }],
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Home Solution',
  description: 'On-demand home services: plumbing, electrician, carpentry and cleaning.',
  url: SITE_URL,
  image: `${SITE_URL}/images/og.jpg`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Chattogram', addressCountry: 'BD' },
  areaServed: 'Chattogram',
  openingHours: 'Sa-Th 09:00-22:00',
  priceRange: '$$',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '2500' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Hero />
      <PopularServices />
      <section className="hs-section hs-section--tight" aria-label="How it works">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6"><HowItWorks /></div>
            <div className="col-lg-6"><UrgentHelp /></div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <TrustedByThousands />
      <Testimonials />
      <Newsletter />
    </>
  );
}
