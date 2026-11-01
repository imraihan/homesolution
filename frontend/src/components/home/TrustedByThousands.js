import Stars from '../ui/Stars';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import PaymentMethods from './PaymentMethods';

export default function TrustedByThousands() {
  return (
    <section className="hs-section hs-section--tight" aria-label="Customer trust and payment methods">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <h2 className="hs-label">Trusted by Thousands</h2>
            <div className="hs-card hs-trust">
              <div>
                <div className="hs-trust__score">
                  <Stars value={4.5} size={22} />
                  <span>4.8 / 5</span>
                </div>
                <p>Based on 2,500+ reviews</p>
              </div>
              <div className="hs-trust__faces">
                <div className="hs-faces" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <ImagePlaceholder key={i} kind="avatar" variant={i === 1 ? 'female' : 'male'} index={i} file={`customers/customer-${i + 1}.jpg`} width={44} height={44} />
                  ))}
                  <span className="hs-faces__count">2.5K+</span>
                </div>
                <small>Happy Customers</small>
              </div>
            </div>
          </div>
          <div className="col-lg-6"><PaymentMethods /></div>
        </div>
      </div>
    </section>
  );
}
