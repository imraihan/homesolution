import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import CartModal from '@/components/cart/CartModal';

// Shared shell for every public page: one Header, one Footer, and the cart modal.
export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main" className="hs-skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartModal />
      <RevealOnScroll />
    </>
  );
}
