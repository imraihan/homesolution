import { BsShieldCheck, BsLightningCharge, BsCreditCard2Front, BsGear } from 'react-icons/bs';
import { FaFaucetDrip, FaHammer, FaPlugCircleBolt, FaSprayCan } from 'react-icons/fa6';
import HeroSearch from './HeroSearch';
import ImagePlaceholder from '../ui/ImagePlaceholder';

const CHIPS = [
  { icon: BsShieldCheck, label: 'Verified Professionals', color: '#10b981' },
  { icon: BsLightningCharge, label: 'Same Day Service', color: '#10b981' },
  { icon: BsCreditCard2Front, label: 'Secure Payment', color: '#2563eb' },
  { icon: BsGear, label: 'Satisfaction Guarantee', color: '#2563eb' },
];

export default function Hero() {
  return (
    <section className="hs-hero" aria-labelledby="hero-title">
      <div className="container hs-hero__inner">
        <div className="hs-hero__copy">
          <span className="hs-pill">Trusted Home Services</span>
          <h1 id="hero-title">We Make Your <br className="d-none d-md-block" />Home Better</h1>
          <p>Book trusted professionals for plumbing, electrician, carpentry, cleaning and more.</p>
          <HeroSearch />
          <ul className="hs-chips">
            {CHIPS.map(({ icon: Icon, label, color }) => (
              <li key={label}><Icon color={color} aria-hidden="true" /> {label}</li>
            ))}
          </ul>
        </div>

        <div className="hs-hero__visual" aria-hidden="false">
          <ImagePlaceholder file="hero/hero-worker.png" variant="hero" alt="Smiling professional with home service team cleaning and fixing a living room" priority width={1400} height={788} className="hs-hero__worker" />
          <span className="hs-float hs-float--tap"><FaFaucetDrip size={30} color="#2563eb" /></span>
          <span className="hs-float hs-float--hammer"><FaHammer size={30} color="#f97316" /></span>
          <span className="hs-float hs-float--plug"><FaPlugCircleBolt size={30} color="#f97316" /></span>
          <span className="hs-float hs-float--spray"><FaSprayCan size={30} color="#10b981" /></span>
        </div>
      </div>
    </section>
  );
}
