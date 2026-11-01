import { BsShieldFillCheck, BsShieldCheck, BsWallet2, BsPatchCheck, BsHeadset } from 'react-icons/bs';

const FEATURES = [
  { icon: BsShieldFillCheck, color: '#2563eb', title: 'Verified Professionals', text: 'Background checked & trusted experts' },
  { icon: BsShieldCheck, color: '#10b981', title: 'Same Day Service', text: 'Quick response within hours' },
  { icon: BsWallet2, color: '#f97316', title: 'Secure Payment', text: '100% secure payment options' },
  { icon: BsPatchCheck, color: '#6f42c1', title: 'Satisfaction Guarantee', text: "Not satisfied? We'll make it right" },
  { icon: BsHeadset, color: '#2563eb', title: '24/7 Support', text: 'We are here to help anytime' },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="hs-section" aria-labelledby="why-title">
      <div className="container">
        <h2 id="why-title" className="hs-title">Why Choose Us</h2>
        <ul className="hs-features">
          {FEATURES.map(({ icon: Icon, color, title, text }) => (
            <li key={title}>
              <Icon size={44} color={color} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
