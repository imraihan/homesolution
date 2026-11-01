import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CouponCard from '@/components/pages/CouponCard';

export const metadata = {
  title: 'Offers & Coupons',
  description: 'Save on plumbing, electrician, carpenter and cleaning services in Chattogram with Home Solution coupon codes and seasonal offers.',
  alternates: { canonical: '/offers' },
  openGraph: { title: 'Offers & Coupons | Home Solution', description: 'Coupon codes and seasonal discounts on home services.', url: '/offers' },
};

// Sample offers. Codes are display-only: coupon validation needs the backend (not applied at checkout yet).
const OFFERS = [
  { title: 'First Booking Discount', text: 'New to Home Solution? Get 20% off your first service booking of any category.', badge: '20%', badgeSub: 'OFF', code: 'WELCOME20', valid: 'Valid till 31 Dec 2026', theme: 'blue', href: '/services' },
  { title: 'Deep Cleaning Special', text: 'Get ৳150 off a full deep cleaning for your apartment or house.', badge: '৳150', badgeSub: 'OFF', code: 'CLEAN150', valid: 'Valid till 30 Nov 2026', theme: 'purple', href: '/services?category=cleaning' },
  { title: 'Plumbing Fix Week', text: 'Leaking tap or pipe? Flat 15% off on all plumbing services this month.', badge: '15%', badgeSub: 'OFF', code: 'PIPE15', valid: 'Valid till 30 Nov 2026', theme: 'blue', href: '/services?category=plumbing' },
  { title: 'Electrician Express', text: 'Same day electrician booking with ৳100 off on orders above ৳500.', badge: '৳100', badgeSub: 'OFF', code: 'SPARK100', valid: 'Valid till 15 Dec 2026', theme: 'orange', href: '/services?category=electrician' },
  { title: 'Furniture Fix Combo', text: 'Book two carpenter services together and save 10% on the total.', badge: '10%', badgeSub: 'OFF', code: 'WOOD10', valid: 'Valid till 31 Dec 2026', theme: 'green', href: '/services?category=carpenter' },
  { title: 'Pay with bKash', text: 'Pay online with bKash and get ৳50 cashback on your next booking.', badge: '৳50', badgeSub: 'CASHBACK', code: 'BKASH50', valid: 'Valid till 31 Jan 2027', theme: 'pink', href: '/services' },
];

export default function OffersPage() {
  return (
    <div className="hs-page hs-page--offers">
      <section className="hs-offershead">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Offers' }]} />
          <h1>Offers &amp; Coupons</h1>
          <p>Save more on every home service. Copy a code and use it when you book.</p>
        </div>
      </section>
      <section className="hs-section" aria-label="Available offers">
        <div className="container">
          <div className="hs-offers">
            {OFFERS.map((o) => <CouponCard key={o.code} offer={o} />)}
          </div>
          <p className="hs-note hs-offers__note">Coupon codes are shown for preview and are not applied at checkout yet.</p>
        </div>
      </section>
    </div>
  );
}
