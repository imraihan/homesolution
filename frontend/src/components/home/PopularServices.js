import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { FaFaucetDrip, FaBolt, FaRuler, FaSprayCan } from 'react-icons/fa6';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import { SERVICES } from '@/lib/site';

const ICONS = { plumbing: FaFaucetDrip, electrician: FaBolt, carpenter: FaRuler, cleaning: FaSprayCan };

export default function PopularServices() {
  return (
    <section id="services" className="hs-section" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title" className="hs-title">Popular Services</h2>
        <div className="hs-scroll hs-services">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.slug];
            return (
              <article key={s.slug} className={`hs-svc hs-svc--${s.theme}`}>
                <div className="hs-svc__body">
                  <span className="hs-svc__icon"><Icon size={22} aria-hidden="true" /></span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <Link href={`/services?category=${s.slug}`} className="hs-svc__btn">Book Now <BsArrowRight aria-hidden="true" /></Link>
                </div>
                <ImagePlaceholder file={`workers/${s.slug}.png`} variant={s.worker} alt={`${s.name} professional`} index={i} width={220} height={280} className="hs-svc__img" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
