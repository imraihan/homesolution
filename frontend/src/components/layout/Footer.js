import Link from 'next/link';
import { BsTelephoneFill, BsEnvelopeFill, BsClockFill, BsGeoAltFill, BsFacebook, BsInstagram, BsWhatsapp, BsYoutube } from 'react-icons/bs';
import Logo from '../ui/Logo';
import PaymentLogo from '../ui/PaymentLogo';
import { CONTACT, SERVICES } from '@/lib/site';

// href '#' entries are pages that do not exist yet (legal / careers).
const COLS = [
  {
    title: 'Quick Links',
    links: [
      ['Home', '/'],
      ['Services', '/services'],
      ['Offers', '/offers'],
      ['About Us', '/about'],
      ['Contact Us', '/contact'],
      ['FAQs', '/contact#faq'],
    ],
  },
  { title: 'Services', links: [...SERVICES.map((s) => [s.name, `/services?category=${s.slug}`]), ['All Services', '/services']] },
  {
    title: 'Company',
    links: [
      ['Become a Partner', '/become-a-partner'],
      ['Terms & Conditions', '#'],
      ['Privacy Policy', '#'],
      ['Refund Policy', '#'],
      ['Career', '#'],
    ],
  },
];
const SOCIAL = [
  [BsFacebook, 'Facebook'],
  [BsInstagram, 'Instagram'],
  [BsWhatsapp, 'WhatsApp'],
  [BsYoutube, 'YouTube'],
];

export default function Footer() {
  return (
    <footer className="hs-footer">
      <div className="container">
        <div className="row g-4 hs-footer__top">
          <div className="col-lg-3 col-md-6">
            <Logo light />
            <p className="hs-footer__about">Home Solution is your trusted partner for home services. We connect you with verified professionals to make your life easier.</p>
            <div className="hs-social">
              {SOCIAL.map(([Icon, label]) => (
                <a key={label} href="#" aria-label={label}><Icon aria-hidden="true" /></a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="col-lg-2 col-6 col-md-3">
              <h3>{c.title}</h3>
              <ul>
                {c.links.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-lg-3 col-md-6">
            <h3>Support</h3>
            <ul className="hs-footer__contact">
              <li><BsTelephoneFill aria-hidden="true" /> <a href={`tel:${CONTACT.phone.replace('-', '')}`}>{CONTACT.phone}</a></li>
              <li><BsEnvelopeFill aria-hidden="true" /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><BsClockFill aria-hidden="true" /> {CONTACT.hours}</li>
              <li><BsGeoAltFill aria-hidden="true" /> {CONTACT.address}</li>
            </ul>
          </div>
        </div>
        <div className="hs-footer__bottom">
          <small>&copy; {new Date().getFullYear()} Home Solution. All rights reserved.</small>
          <div className="hs-footer__pay">
            {['bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'cash'].map((p) => (
              <PaymentLogo key={p} name={p} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
