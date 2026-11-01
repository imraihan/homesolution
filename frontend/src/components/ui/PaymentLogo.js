import { BsCashCoin } from 'react-icons/bs';

// CSS/SVG stand-ins for payment brand marks. Replace with official artwork in public/images/payments/.
export default function PaymentLogo({ name, size = 'md' }) {
  const cls = `pay pay--${name} pay--${size}`;
  switch (name) {
    case 'bkash':
      return (
        <span className={cls} role="img" aria-label="bKash">
          <svg viewBox="0 0 32 28" width="26" height="22" aria-hidden="true"><path d="M3 4 L18 1 L29 12 L16 26 Z" fill="#e2136e" /><path d="M12 11 L19 8 L22 14 L15 19Z" fill="#fff" /></svg>
          <b>bKash</b>
        </span>
      );
    case 'nagad':
      return (
        <span className={cls} role="img" aria-label="Nagad">
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#f6921e" /><circle cx="16" cy="16" r="7" fill="#fff" /><circle cx="16" cy="16" r="3.5" fill="#ed1c24" /></svg>
          <b>Nagad</b>
        </span>
      );
    case 'rocket':
      return (
        <span className={cls} role="img" aria-label="Rocket">
          <b>Rocket</b>
        </span>
      );
    case 'visa':
      return (
        <span className={cls} role="img" aria-label="Visa">
          <b>VISA</b>
        </span>
      );
    case 'mastercard':
      return (
        <span className={cls} role="img" aria-label="Mastercard">
          <i className="mc1" />
          <i className="mc2" />
        </span>
      );
    default:
      return (
        <span className={cls} role="img" aria-label="Cash on Service">
          <BsCashCoin size={24} color="#0a8f4d" />
          <b>Cash on Service</b>
        </span>
      );
  }
}
