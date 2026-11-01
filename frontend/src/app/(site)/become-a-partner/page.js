import Image from 'next/image';
import Link from 'next/link';
import {
  BsPeople, BsCalendarCheck, BsShieldCheck, BsGraphUpArrow, BsHeadset, BsPencilSquare, BsPersonCheck, BsBriefcase,
  BsCheckCircleFill, BsArrowRight, BsChevronRight, BsPersonVcard, BsWallet2,
} from 'react-icons/bs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PartnerForm from '@/components/pages/PartnerForm';
import Stars from '@/components/ui/Stars';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export const metadata = {
  title: 'Become a Partner',
  description: 'Join Home Solution as a service partner in Chattogram. Get regular job requests, flexible work, secure on-time payments and dedicated support.',
  alternates: { canonical: '/become-a-partner' },
  openGraph: { title: 'Become a Partner | Home Solution', description: 'Grow your home service business with more customers and secure payments.', url: '/become-a-partner' },
};

const QUICK = [
  { icon: BsPeople, label: 'More Job Opportunities' },
  { icon: BsCalendarCheck, label: 'Flexible Work Schedule' },
  { icon: BsWallet2, label: 'Secure & Timely Payments' },
  { icon: BsHeadset, label: 'Dedicated Support' },
];
const WHY = [
  { icon: BsPeople, title: 'More Customers', text: 'Get regular job requests from real customers in your area.' },
  { icon: BsCalendarCheck, title: 'Flexible Work', text: 'Work on your own schedule and choose jobs that suit you.' },
  { icon: BsShieldCheck, title: 'Secure Payments', text: 'Enjoy secure and on-time payments for every job.' },
  { icon: BsGraphUpArrow, title: 'Business Growth', text: 'Build your reputation and grow your business with us.' },
  { icon: BsHeadset, title: 'Dedicated Support', text: 'Our support team is always here to help you.' },
];
const STEPS = [
  { icon: BsPencilSquare, title: 'Apply Online', text: 'Fill out the partner application form with your basic details.' },
  { icon: BsPersonCheck, title: 'Verification', text: 'Our team will verify your details and experience.' },
  { icon: BsPersonVcard, title: 'Get Approved', text: "Once approved, you'll get access to the partner dashboard." },
  { icon: BsBriefcase, title: 'Start Getting Jobs', text: 'Receive job requests and start earning with us.' },
];
const BENEFITS = [
  { title: 'Priority Job Access', text: 'Get priority access to high paying jobs in your area.' },
  { title: 'Verified Partner Badge', text: 'Show your verified badge and build trust with customers.' },
  { title: 'Performance Rewards', text: 'Earn bonuses and rewards for your excellent performance.' },
  { title: 'Marketing Support', text: 'We help you grow with marketing and visibility support.' },
];
const TESTI = [
  { name: 'Rashid Khan', role: 'Plumber', text: 'Great platform! I get regular jobs and payments are always on time.' },
  { name: 'Md. Hasan', role: 'Electrician', text: 'Being a partner with Home Solution has really grown my business.' },
];

export default function PartnerPage() {
  return (
    <div className="hs-page hs-page--partner">
      <section className="hs-phero" aria-labelledby="partner-title">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Become a Partner' }]} />
          <div className="hs-phero__grid">
            <div className="hs-phero__copy">
              <h1 id="partner-title">Become a Partner <span>Grow Together</span></h1>
              <p>Join our trusted network of professionals and grow your business with more customers and opportunities.</p>
              <ul className="hs-phero__feats">
                {QUICK.map(({ icon: Icon, label }) => (
                  <li key={label}><span><Icon size={22} aria-hidden="true" /></span>{label}</li>
                ))}
              </ul>
            </div>
            <div className="hs-phero__visual">
              <Image src="/images/partner/partner-handshake.jpg" alt="Two Home Solution professionals shaking hands" width={1100} height={733} priority sizes="(max-width: 992px) 90vw, 420px" />
            </div>
            <div className="hs-phero__form"><PartnerForm /></div>
          </div>
        </div>
      </section>

      <section className="hs-section" aria-labelledby="why-p">
        <div className="container">
          <h2 id="why-p" className="hs-h2 text-center">Why Partner With Us?</h2>
          <p className="hs-lead text-center">We provide everything you need to succeed and grow your business.</p>
          <ul className="hs-cards5">
            {WHY.map(({ icon: Icon, title, text }) => (
              <li key={title} className="hs-card hs-iconcard">
                <span className="hs-iconcard__ico"><Icon size={28} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hs-section hs-section--soft" aria-labelledby="how-p">
        <div className="container">
          <h2 id="how-p" className="hs-h2 text-center">How It Works</h2>
          <p className="hs-lead text-center">Simple steps to start your journey as our partner.</p>
          <ol className="hs-psteps">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="hs-card hs-pstep">
                <span className="hs-pstep__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="hs-iconcard__ico"><Icon size={28} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                {i < STEPS.length - 1 && <BsChevronRight className="hs-pstep__arrow" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hs-section" aria-labelledby="ben-p">
        <div className="container">
          <h2 id="ben-p" className="hs-h2 text-center">Partner Benefits</h2>
          <p className="hs-lead text-center">Exclusive benefits and features for our trusted partners.</p>
          <div className="hs-benefits">
            <ul className="hs-card hs-benefits__list">
              {BENEFITS.map((b) => (
                <li key={b.title}>
                  <BsCheckCircleFill size={20} color="#2563eb" aria-hidden="true" />
                  <div><strong>{b.title}</strong><p>{b.text}</p></div>
                </li>
              ))}
            </ul>

            <div className="hs-appphone" role="img" aria-label="Partner app dashboard preview showing earnings and upcoming jobs">
              <div className="hs-appphone__screen">
                <small>11:01</small>
                <b>Dashboard</b>
                <div className="hs-appphone__earn"><small>Earnings</small><strong>&#2547; 24,560</strong><span>This Month <em>+12%</em></span></div>
                <b className="hs-appphone__h">Upcoming Jobs</b>
                <div className="hs-appphone__job"><strong>Bathroom Installation</strong><small>Today, 10:00 AM</small></div>
                <div className="hs-appphone__job"><strong>Electrical Wiring</strong><small>Tomorrow, 2:00 PM</small></div>
                <span className="hs-appphone__btn">View All Jobs</span>
              </div>
            </div>

            <div className="hs-benefits__testi">
              {TESTI.map((t, i) => (
                <figure key={t.name} className="hs-card hs-ptesti">
                  <Stars value={5} size={16} color="#ff9f1a" />
                  <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
                  <figcaption>
                    <ImagePlaceholder kind="avatar" variant="male" index={i + 1} file={`customers/partner-${i + 1}.jpg`} width={44} height={44} />
                    <span><strong>{t.name}</strong><small>{t.role}</small></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hs-ctaband" aria-labelledby="cta-p">
        <div className="container hs-ctaband__inner">
          <div>
            <h2 id="cta-p">Ready to Grow Your Business?</h2>
            <p>Join thousands of professionals who are already growing with us.</p>
          </div>
          <div className="hs-ctaband__btns">
            <Link href="/about" className="btn hs-btn hs-btn--white">Learn More</Link>
            <a href="#apply" className="btn hs-btn hs-btn--ghost">Apply Now <BsArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
