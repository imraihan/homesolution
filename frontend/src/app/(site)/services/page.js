import { Suspense } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ServicesExplorer from '@/components/services/ServicesExplorer';
import { serviceImageMap } from '@/lib/serviceImages';
import { SERVICES } from '@/data/services';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'All Services',
  description: 'Browse plumbing, electrician, carpenter and cleaning services in Chattogram. Compare prices and ratings, then book a verified professional.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'All Services | Home Solution', description: 'Browse and book trusted home services in Chattogram.', url: '/services' },
};

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/services/${s.slug}`, name: s.name })),
};

function ListSkeleton() {
  return (
    <div className="hs-listhead"><div><h1>All Services</h1><p>Find the perfect service for your home</p></div></div>
  );
}

export default function ServicesPage() {
  const images = serviceImageMap();
  return (
    <div className="hs-page hs-page--services">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, '\\u003c') }} />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Services' }]} />
        {/* useSearchParams requires a Suspense boundary so the rest of the page can stay static. */}
        <Suspense fallback={<ListSkeleton />}>
          <ServicesExplorer images={images} />
        </Suspense>
      </div>
    </div>
  );
}
