'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { BsX, BsGeoAlt, BsCart3 } from 'react-icons/bs';
import ServiceThumb from '../ui/ServiceThumb';
import { closeCart, removeItem, cartTotals } from '@/store/slices/cartSlice';
import { formatDate, money } from '@/lib/format';

export default function CartModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { open, items, hydrated } = useSelector((s) => s.cart);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const t = cartTotals(items);
  const close = () => dispatch(closeCart());

  useEffect(() => {
    if (!open) return undefined;
    const prevFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') dispatch(closeCart());
      if (e.key === 'Tab' && dialogRef.current) {
        // simple focus trap
        const f = dialogRef.current.querySelectorAll('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [open, dispatch]);

  if (!open || !hydrated) return null;

  const checkout = () => {
    close();
    router.push('/checkout');
  };

  return (
    <div className="hs-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="hs-modal__panel hs-cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={dialogRef}>
        <div className="hs-cart__head">
          <h2 id="cart-title">Cart</h2>
          <button type="button" ref={closeRef} className="hs-iconbtn" aria-label="Close cart" onClick={close}><BsX size={26} /></button>
        </div>

        {items.length === 0 ? (
          <div className="hs-cart__empty">
            <BsCart3 size={42} aria-hidden="true" />
            <strong>Your cart is empty</strong>
            <p>Add a service to get started.</p>
            <Link href="/services" className="btn hs-btn hs-btn--primary" onClick={close}>Browse Services</Link>
          </div>
        ) : (
          <>
            <ul className="hs-cart__items">
              {items.map((it) => (
                <li key={it.id} className="hs-cart__item">
                  <Link href={`/services/${it.slug}`} onClick={close} className="hs-cart__thumb" aria-label={it.name}>
                    <ServiceThumb category={it.category} src={it.img} alt="" sizes="64px" />
                  </Link>
                  <div className="hs-cart__info">
                    <strong>{it.name}</strong>
                    <small>{formatDate(it.date)}, {it.time}</small>
                    <small><BsGeoAlt aria-hidden="true" /> {it.area}, Chattogram</small>
                  </div>
                  <div className="hs-cart__price">
                    <b>{money(it.price)}</b>
                    <button type="button" className="hs-iconbtn" aria-label={`Remove ${it.name}`} onClick={() => dispatch(removeItem(it.id))}><BsX size={20} /></button>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="hs-cart__totals">
              <div><dt>Subtotal</dt><dd>{money(t.subtotal)}</dd></div>
              <div><dt>Service Charge</dt><dd>{money(t.charge)}</dd></div>
              <div className="is-total"><dt>Total</dt><dd>{money(t.total)}</dd></div>
            </dl>

            <div className="hs-cart__actions">
              <button type="button" className="btn hs-btn hs-btn--outline" onClick={() => { close(); router.push('/services'); }}>Continue Shopping</button>
              <button type="button" className="btn hs-btn hs-btn--primary" onClick={checkout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
