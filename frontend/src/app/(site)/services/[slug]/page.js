import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ServiceGallery from '@/components/services/ServiceGallery';
import ServiceTabs from '@/components/services/ServiceTabs';
import BookingCard from '@/components/services/BookingCard';
import ServiceCard from '@/components/services/ServiceCard';
import { SERVICES, REVIEWS, getService, getCategory, relatedServices } from '@/data/services';
import { serviceGallery, serviceImageMap } from '@/lib/serviceImages';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.name} in Chattogram from ৳${s.price}`;
  const description = `${s.desc} Starting from ৳${s.price}. Rated ${s.rating}/5 by ${s.reviews} customers. Book a verified professional online.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} | Home Solution`, description, url: `/services/${s.slug}`, type: 'website', images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: s.name }] },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cat = getCategory(service.category);
  const gallery = serviceGallery(service.slug);
  const images = serviceImageMap();
  const related = relatedServices(service, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.desc,
    url: `${SITE_URL}/services/${service.slug}`,
    serviceType: cat.name,
    areaServed: { '@type': 'City', name: 'Chattogram' },
    provider: { '@type': 'LocalBusiness', name: 'Home Solution', url: SITE_URL },
    offers: { '@type': 'Offer', price: service.price, priceCurrency: 'BDT', availability: 'https://schema.org/InStock', url: `${SITE_URL}/services/${service.slug}` },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: service.rating, reviewCount: service.reviews },
  };

  return (
    <div className="hs-page hs-page--detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.name }]} />

        <div className="hs-detail">
          <div className="hs-detail__gallery">
            <ServiceGallery category={service.category} name={service.name} images={gallery} />
          </div>

          <div className="hs-detail__book">
            <BookingCard service={service} image={gallery[0]} />
          </div>

          <div className="hs-detail__info">
            <ServiceTabs service={service} reviews={REVIEWS} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="hs-related" aria-labelledby="rel-title">
            <h2 id="rel-title" className="hs-h2">More {cat.name} Services</h2>
            <div className="hs-grid hs-grid--3">
              {related.map((s, i) => <ServiceCard key={s.slug} service={s} image={images[s.slug]} index={i + 1} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
