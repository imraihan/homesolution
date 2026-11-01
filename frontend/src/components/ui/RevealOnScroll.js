'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Elements that fade/slide up the first time they scroll into view. Only elements that start BELOW the fold are
// hidden (after mount), so nothing is hidden during SSR/hydration and above-the-fold content never flickers.
const SELECTOR = [
  '[data-reveal]', '.hs-section .hs-title', '.hs-svc', '.hs-step', '.hs-scard', '.hs-features', '.hs-urgent', '.hs-trust', '.hs-pay',
  '.hs-offer', '.hs-values > *', '.hs-testi', '.hs-ptesti', '.hs-ctaband', '.hs-cta', '.hs-news', '.hs-infocards > *', '.hs-faqcard', '.hs-iconcard', '.hs-story', '.hs-formcard',
].join(',');

export default function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    const vh = window.innerHeight;
    const targets = [...document.querySelectorAll(SELECTOR)].filter((el) => {
      if (el.closest('.hs-modal, .hs-header')) return false;
      if (el.parentElement?.closest(SELECTOR)) return false; // animate the outermost only
      return el.getBoundingClientRect().top > vh * 0.95;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove('rv-hide');
          e.target.classList.add('rv-in');
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    targets.forEach((el) => {
      el.classList.add('rv-hide');
      io.observe(el);
    });
    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove('rv-hide'));
    };
  }, [pathname]);
  return null;
}
