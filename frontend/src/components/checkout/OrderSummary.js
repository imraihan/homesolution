import ServiceThumb from '../ui/ServiceThumb';
import { formatDate, money } from '@/lib/format';

export default function OrderSummary({ items, totals, children, compact = false }) {
  return (
    <aside className="hs-summary" aria-label="Order summary">
      <h2>Order Summary</h2>
      {!compact && (
        <ul className="hs-summary__items">
          {items.map((it) => (
            <li key={it.id}>
              <span className="hs-summary__thumb"><ServiceThumb category={it.category} src={it.img} alt="" sizes="48px" /></span>
              <span className="hs-summary__info">
                <strong>{it.name}</strong>
                <small>{formatDate(it.date)}, {it.time}</small>
              </span>
              <b>{money(it.price)}</b>
            </li>
          ))}
        </ul>
      )}
      <dl className="hs-cart__totals">
        <div><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
        <div><dt>Service Charge</dt><dd>{money(totals.charge)}</dd></div>
        <div className="is-total"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
      </dl>
      {children}
    </aside>
  );
}
