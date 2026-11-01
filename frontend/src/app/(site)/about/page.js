import Image from 'next/image';
import Link from 'next/link';
import { BsPeople, BsBriefcase, BsShieldCheck, BsClock, BsShieldFillCheck, BsAward, BsHeartFill, BsHandThumbsUp, BsLightbulb, BsHouseHeart, BsArrowRight } from 'react-icons/bs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'About Us',
  description: 'Home Solution connects Chattogram households with skilled, verified professionals for simple, reliable and hassle-free home care.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Us | Home Solution', description: 'Simple, reliable and hassle-free home care in Chattogram.', url: '/about' },
};

const STATS = [
  { icon: BsPeople, value: '12K+', label: 'Happy Customers' },
  { icon: BsBriefcase, value: '2.5K+', label: 'Verified Professionals' },
  { icon: BsShieldCheck, value: '98%', label: 'Satisfaction Rate' },
  { icon: BsClock, value: '24/7', label: 'Support Available' },
];
const VALUES = [
  { icon: BsShieldFillCheck, color: '#ff9f1a', bg: '#fff1dc', title: 'Trust & Safety', text: 'We verify every professional to ensure your safety and peace of mind.' },
  { icon: BsAward, color: '#10b981', bg: '#dff5e9', title: 'Quality First', text: 'We are committed to delivering the highest quality services.' },
  { icon: BsHeartFill, color: '#f97316', bg: '#ffe6d3', title: 'Customer Focused', text: 'Your satisfaction is our priority. We listen, care and improve.' },
  { icon: BsHandThumbsUp, color: '#2563eb', bg: '#e1ecff', title: 'Integrity', text: 'We believe in honest pricing, transparency and fair practices.' },
  { icon: BsLightbulb, color: '#6f42c1', bg: '#ece3fa', title: 'Innovation', text: 'We continuously improve our platform to serve you better every day.' },
];

export default function AboutPage() {
  return (
    <div className="hs-page hs-page--about">
      <section className="hs-ahero" aria-labelledby="about-title">
        <div className="container">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
          <div className="hs-ahero__grid">
            <div className="hs-ahero__copy">
              <h1 id="about-title">About Us</h1>
              <p className="hs-ahero__tag">We make your home care simple, reliable &amp; hassle-free.</p>
              <p>Home Solution is a trusted platform that connects you with skilled and verified professionals for all your home service needs.</p>
            </div>
            <div className="hs-ahero__visual">
              <Image src="/images/about/about-hero.png" alt="A smiling Home Solution professional with colleagues cleaning and fixing a living room" width={900} height={755} priority sizes="(max-width: 992px) 100vw, 560px" />
            </div>
          </div>
        </div>
      </section>

      <section className="container hs-stats-wrap" aria-label="Home Solution in numbers">
        <ul className="hs-stats">
          {STATS.map(({ icon: Icon, value, label }) => (
            <li key={label} className="hs-card">
              <span className="hs-stats__ico"><Icon size={26} aria-hidden="true" /></span>
              <div><strong>{value}</strong><small>{label}</small></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="hs-section" aria-labelledby="story-title">
        <div className="container">
          <div className="hs-story">
            <div className="hs-story__img" role="img" aria-label="Illustration of a cosy home">
              <BsHouseHeart size={72} aria-hidden="true" />
            </div>
            <div>
              <h2 id="story-title" className="hs-h2 hs-h2--bar">Our Story</h2>
              <p>Home Solution was founded with a simple mission &ndash; to make quality home services accessible to everyone. We understood the challenges people face in finding reliable professionals, managing time, and ensuring quality work.</p>
              <p>That&rsquo;s why we built a platform that brings transparency, convenience, and trust to your doorstep. From a small idea to a growing community &ndash; we are proud to be your home service partner.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hs-section hs-section--tight" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="hs-h2 hs-h2--bar">Our Values</h2>
          <ul className="hs-cards5 hs-values">
            {VALUES.map(({ icon: Icon, color, bg, title, text }) => (
              <li key={title} className="hs-card hs-iconcard">
                <span className="hs-iconcard__ico" style={{ background: bg, color }}><Icon size={26} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container hs-cta-wrap" aria-label="Book a service">
        <div className="hs-cta">
          <span className="hs-cta__ico"><BsHouseHeart size={44} aria-hidden="true" /></span>
          <p>We&rsquo;re here to make<br />home services better for everyone.</p>
          <Link href="/services" className="btn hs-btn hs-btn--orange hs-btn--lg">Book a Service <BsArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
