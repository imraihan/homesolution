import Image from 'next/image';
import { BsTelephoneFill, BsEnvelopeFill, BsGeoAltFill, BsHeadset, BsChatDots } from 'react-icons/bs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Accordion from '@/components/ui/Accordion';
import ContactForm from '@/components/pages/ContactForm';
import { CONTACT, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Home Solution in Chattogram: call 01812-345678, email support@homesolution.com or send us a message. Support is available 24/7.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Us | Home Solution', description: 'We are here to help you. Call, email or message our team.', url: '/contact' },
};

const FAQS = [
  { q: 'How can I book a service?', a: 'Choose a service, pick your area, date and time, then add it to your cart and check out. You can pay online or with cash on service.' },
  { q: 'What are your working hours?', a: 'Our professionals work Saturday to Thursday, 9:00 AM to 10:00 PM. The support team is available 24/7 by phone and chat.' },
  { q: 'How can I make a payment?', a: 'We accept bKash, Nagad, Rocket, Visa and Mastercard cards, and cash on service once the job is done.' },
  { q: 'Can I reschedule or cancel a booking?', a: 'Yes. Contact support at least 3 hours before your slot and we will move or cancel it free of charge.' },
];

// Map is centred on Agrabad, Chattogram (OpenStreetMap embed, no API key needed).
const MAP_SRC = 'https://www.openstreetmap.org/export/embed.html?bbox=91.7900%2C22.3050%2C91.8360%2C22.3420&layer=mapnik&marker=22.3249%2C91.8130';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Home Solution',
  url: `${SITE_URL}/contact`,
  mainEntity: { '@type': 'LocalBusiness', name: 'Home Solution', telephone: CONTACT.phone, email: CONTACT.email, address: { '@type': 'PostalAddress', streetAddress: 'House #12, Road #6, Agrabad', addressLocality: 'Chattogram', addressCountry: 'BD' } },
};
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function ContactPage() {
  return (
    <div className="hs-page hs-page--contact">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqLd]).replace(/</g, '\\u003c') }} />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="hs-contact">
          <div>
            <h1>Contact Us</h1>
            <p className="hs-contact__tag">We&rsquo;re here to help you!</p>
            <p className="hs-contact__lead">Have a question, need support or want to book a service? Get in touch with us. Our team is ready to assist you.</p>

            <ul className="hs-infocards">
              <li className="hs-card">
                <span className="hs-infocards__ico"><BsTelephoneFill aria-hidden="true" /></span>
                <div><small>Call Us</small><a href={`tel:${CONTACT.phone.replace('-', '')}`}><strong>{CONTACT.phone}</strong></a><em>{CONTACT.hours}</em></div>
              </li>
              <li className="hs-card">
                <span className="hs-infocards__ico"><BsEnvelopeFill aria-hidden="true" /></span>
                <div><small>Email Us</small><a href={`mailto:${CONTACT.email}`}><strong>{CONTACT.email}</strong></a><em>We reply within 24 hours</em></div>
              </li>
              <li className="hs-card">
                <span className="hs-infocards__ico"><BsGeoAltFill aria-hidden="true" /></span>
                <div><small>Our Location</small><strong>{CONTACT.address}</strong><em>House #12, Road #6, Agrabad, Chattogram</em></div>
              </li>
              <li className="hs-card">
                <span className="hs-infocards__ico"><BsHeadset aria-hidden="true" /></span>
                <div><small>Customer Support</small><strong>24/7 Live Support</strong><em>We are always here to help you</em></div>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>

        <section className="hs-find" aria-labelledby="find-title">
          <h2 id="find-title" className="hs-h2 hs-h2--bar">Find Us</h2>
          <div className="hs-map">
            <iframe title="Home Solution office location on OpenStreetMap: Agrabad, Chattogram" src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a className="hs-map__link" href="https://www.openstreetmap.org/?mlat=22.3249&mlon=91.8130#map=15/22.3249/91.8130" target="_blank" rel="noopener noreferrer">View larger map</a>
        </section>

        <div className="hs-contact2">
          <section id="faq" aria-labelledby="faq-title" className="hs-card hs-faqcard">
            <h2 id="faq-title" className="hs-h2 hs-h2--bar">Frequently Asked Questions</h2>
            <Accordion items={FAQS} />
          </section>

          <aside className="hs-help" aria-labelledby="help-title">
            <div className="hs-help__copy">
              <h2 id="help-title">Need Immediate Help?</h2>
              <p>Chat with our support team for quick assistance.</p>
              <a className="btn hs-btn hs-btn--white" href="https://wa.me/8801812345678?text=Hello%20Home%20Solution" target="_blank" rel="noopener noreferrer"><BsChatDots aria-hidden="true" /> Start Live Chat</a>
            </div>
            <Image className="hs-help__img" src="/images/support/support-agent.png" alt="Smiling Home Solution customer support agent wearing a headset" width={900} height={429} sizes="(max-width: 768px) 80vw, 340px" />
          </aside>
        </div>
      </div>
    </div>
  );
}
