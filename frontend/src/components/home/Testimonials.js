import { BsQuote } from 'react-icons/bs';
import Stars from '../ui/Stars';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import TestimonialsCarousel from './TestimonialsCarousel';

const ITEMS = [
  { name: 'Rashed Ahmed', text: 'Very fast and professional plumbing service. The technician was friendly and fixed the issue perfectly.', f: false },
  { name: 'Sadia Islam', text: 'Booked an electrician and he came within 30 minutes. Very good experience with Home Solution.', f: true },
  { name: 'Fahim Uddin', text: 'Amazing cleaning service! My house looks brand new. Highly recommended.', f: false },
];

export default function Testimonials() {
  return (
    <section className="hs-section" aria-labelledby="testi-title">
      <div className="container">
        <h2 id="testi-title" className="hs-title">What Our Customers Say</h2>
        <TestimonialsCarousel>
          {ITEMS.map((t, i) => (
            <figure key={t.name} className="hs-card hs-testi__card">
              <div className="hs-testi__top">
                <BsQuote size={34} color="#2563eb" aria-hidden="true" />
                <Stars value={5} size={15} />
              </div>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <ImagePlaceholder kind="avatar" variant={t.f ? 'female' : 'male'} index={i} file={`customers/testimonial-${i + 1}.jpg`} width={40} height={40} />
                <span><strong>{t.name}</strong><small>Chattogram</small></span>
              </figcaption>
            </figure>
          ))}
        </TestimonialsCarousel>
      </div>
    </section>
  );
}
