import PaymentLogo from '../ui/PaymentLogo';

export default function PaymentMethods() {
  return (
    <div className="hs-card hs-pay" role="region" aria-labelledby="pay-title">
      <h2 id="pay-title" className="hs-label">Payment Methods</h2>
      <div className="hs-pay__row">
        {['bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'cash'].map((p) => (
          <PaymentLogo key={p} name={p} />
        ))}
      </div>
    </div>
  );
}
