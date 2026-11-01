import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

export const metadata = {
  title: 'Checkout',
  description: 'Confirm your address, schedule and payment to book your home service.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="hs-page hs-page--checkout">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'Checkout' }]} />
        <CheckoutFlow />
      </div>
    </div>
  );
}
