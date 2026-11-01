'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheck, BsPlus, BsGeoAlt, BsCreditCard2Front, BsCashCoin, BsCheckCircleFill, BsLockFill, BsPhone, BsArrowLeft } from 'react-icons/bs';
import Field from '../ui/Field';
import PaymentLogo from '../ui/PaymentLogo';
import OrderSummary from './OrderSummary';
import { STEPS, setStep, selectAddress, addAddress, setNotes, setMethod, placeOrder, resetCheckout } from '@/store/slices/checkoutSlice';
import { updateItem, clearCart, cartTotals } from '@/store/slices/cartSlice';
import { TIME_SLOTS, AREAS } from '@/data/services';
import { formatDate, isoFromToday, money } from '@/lib/format';
import { collect, minLen, phoneBD, required } from '@/lib/validators';

const METHODS = [
  { id: 'bkash', name: 'bKash', wallet: true },
  { id: 'nagad', name: 'Nagad', wallet: true },
  { id: 'rocket', name: 'Rocket', wallet: true },
  { id: 'card', name: 'Credit / Debit Card' },
  { id: 'cash', name: 'Cash on Service' },
];
const methodName = (id) => METHODS.find((m) => m.id === id)?.name || id;

const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const fmtExp = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function expiryError(v) {
  const m = /^(\d{2})\/(\d{2})$/.exec(v);
  if (!m) return 'Use MM/YY';
  const mm = Number(m[1]);
  if (mm < 1 || mm > 12) return 'Invalid month';
  const now = new Date();
  const yy = now.getFullYear() % 100;
  const y = Number(m[2]);
  if (y < yy || (y === yy && mm < now.getMonth() + 1)) return 'Card has expired';
  return '';
}

function MethodIcon({ id }) {
  if (id === 'card') return <span className="hs-method__ico"><BsCreditCard2Front size={22} color="#1a1f71" aria-hidden="true" /></span>;
  if (id === 'cash') return <span className="hs-method__ico"><BsCashCoin size={22} color="#0a8f4d" aria-hidden="true" /></span>;
  return <PaymentLogo name={id} size="sm" />;
}

export default function CheckoutFlow() {
  const dispatch = useDispatch();
  const { items, hydrated } = useSelector((s) => s.cart);
  const { step, addresses, addressId, notes, method, order } = useSelector((s) => s.checkout);
  const totals = cartTotals(items);

  const [phone, setPhone] = useState('');
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ label: 'Home', line: '', area: AREAS[0] });
  const [wallet, setWallet] = useState('');
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [today, setToday] = useState('');
  const statusRef = useRef(order.status);
  statusRef.current = order.status;
  // Leaving the page after a finished order: don't show the old success screen next time.
  useEffect(() => () => {
    if (statusRef.current === 'success') dispatch(resetCheckout());
  }, [dispatch]);

  useEffect(() => {
    setToday(isoFromToday(0));
  }, []);

  const address = useMemo(() => addresses.find((a) => a.id === addressId), [addresses, addressId]);
  const go = (n) => {
    setErrors({});
    dispatch(setStep(n));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- validation per step ----------
  const validateAddress = () =>
    collect({
      address: () => (address ? '' : 'Please select a delivery address'),
      phone: () => phoneBD(phone),
      adding: () => (adding ? 'Save or cancel the new address first' : ''),
    });
  const validateSchedule = () => {
    const e = {};
    items.forEach((it) => {
      if (!it.date) e[it.id] = 'Choose a date';
      else if (today && it.date < today) e[it.id] = 'Date cannot be in the past';
      else if (!it.time) e[it.id] = 'Choose a time';
    });
    return e;
  };
  const validatePayment = () => {
    if (METHODS.find((m) => m.id === method)?.wallet) return collect({ wallet: () => phoneBD(wallet) });
    if (method === 'card') {
      return collect({
        number: () => (card.number.replace(/\s/g, '').length >= 15 ? '' : 'Enter a valid card number'),
        name: () => minLen(card.name, 3, 'Name on card'),
        exp: () => expiryError(card.exp),
        cvv: () => (/^\d{3,4}$/.test(card.cvv) ? '' : 'Invalid CVV'),
      });
    }
    return {};
  };
  const validators = [validateAddress, validateSchedule, validatePayment];

  const next = () => {
    const e = validators[step]();
    if (Object.keys(e).length) return setErrors(e);
    go(step + 1);
  };

  const saveAddress = () => {
    const e = collect({
      line: () => minLen(draft.line, 6, 'Address'),
      label: () => required(draft.label, 'Label'),
    });
    if (Object.keys(e).length) return setErrors({ draft: e });
    const line = `${draft.line.trim()}, ${draft.area}, Chattogram`;
    dispatch(addAddress({ id: `a${Date.now()}`, label: draft.label, line, phone: '' }));
    setAdding(false);
    setDraft({ label: 'Home', line: '', area: AREAS[0] });
    setErrors({});
  };

  const pay = async () => {
    if (!agree) return setErrors({ agree: 'Please accept the terms to continue' });
    const payload = {
      items: items.map(({ slug, price, date, time, area }) => ({ service: slug, price, date, time, area })),
      address: { label: address.label, line: address.line },
      phone,
      notes,
      payment: { method, wallet_number: METHODS.find((m) => m.id === method)?.wallet ? wallet : undefined }, // TODO: card -> tokenize with the payment gateway, never send raw PAN
      totals,
      summary: { items, address, total: totals.total, method, phone },
    };
    const res = await dispatch(placeOrder(payload));
    if (placeOrder.fulfilled.match(res)) dispatch(clearCart());
  };

  // ---------- render guards ----------
  if (!hydrated) {
    return <div className="hs-checkout__loading" aria-busy="true"><span className="hs-spinner" /> Loading your cart...</div>;
  }

  if (order.status === 'success') {
    const sm = order.summary;
    return (
      <div className="hs-success" role="status">
        <span className="hs-success__icon"><BsCheckCircleFill size={64} color="#10b981" aria-hidden="true" /></span>
        <h1>Order Confirmed!</h1>
        <p>Thank you. Your booking has been placed{order.id ? <> &mdash; reference <strong>{order.id}</strong></> : null}. A professional will be assigned shortly and you will get a confirmation call.</p>
        {order.simulated && <p className="hs-note">Demo mode: the order API is not connected yet, so this confirmation was simulated and no payment was taken.</p>}
        {sm && (
          <div className="hs-success__card">
            <ul>
              {sm.items.map((it) => (
                <li key={it.id}><span><strong>{it.name}</strong><small>{formatDate(it.date)}, {it.time}</small></span><b>{money(it.price)}</b></li>
              ))}
            </ul>
            <dl className="hs-cart__totals"><div className="is-total"><dt>Total ({methodName(sm.method)})</dt><dd>{money(sm.total)}</dd></div></dl>
            <p className="hs-success__addr"><BsGeoAlt aria-hidden="true" /> {sm.address.line}</p>
          </div>
        )}
        <div className="hs-success__actions">
          <Link href="/" className="btn hs-btn hs-btn--outline" onClick={() => dispatch(resetCheckout())}>Back to Home</Link>
          <Link href="/services" className="btn hs-btn hs-btn--primary" onClick={() => dispatch(resetCheckout())}>Book Another Service</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="hs-empty">
        <h1>Your cart is empty</h1>
        <p>Add a service to your cart before checking out.</p>
        <Link href="/services" className="btn hs-btn hs-btn--primary">Browse Services</Link>
      </div>
    );
  }

  const loading = order.status === 'loading';
  const isWallet = !!METHODS.find((m) => m.id === method)?.wallet;
  const payLabel = method === 'cash' ? `Confirm Order ${money(totals.total)}` : `Pay ${money(totals.total)}`;

  return (
    <div className="hs-checkout">
      <h1 className="hs-checkout__title">Checkout</h1>

      <ol className="hs-stepper" aria-label="Checkout progress">
        {STEPS.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'current' : 'todo';
          return (
            <li key={label} className={`is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <button type="button" disabled={i > step} onClick={() => i < step && go(i)} aria-label={`Step ${i + 1}: ${label}${state === 'done' ? ' (completed)' : ''}`}>
                <span className="hs-stepper__dot">{state === 'done' ? <BsCheck size={20} aria-hidden="true" /> : i + 1}</span>
                <span className="hs-stepper__label">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="hs-checkout__grid">
        <section className="hs-panel" aria-labelledby="step-title">
          <h2 id="step-title" className="hs-panel__title">
            {step === 0 && 'Select Address'}
            {step === 1 && 'Choose Schedule'}
            {step === 2 && 'Payment Method'}
            {step === 3 && 'Review & Confirm'}
          </h2>

          {/* ---- Step 1: address ---- */}
          {step === 0 && (
            <div>
              <div role="radiogroup" aria-label="Saved addresses" className="hs-addrs">
                {addresses.map((a) => (
                  <label key={a.id} className={`hs-addr ${a.id === addressId ? 'is-selected' : ''}`}>
                    <input type="radio" name="address" checked={a.id === addressId} onChange={() => dispatch(selectAddress(a.id))} />
                    <span className="hs-addr__radio" aria-hidden="true" />
                    <span>
                      <strong>{a.label}</strong>
                      <small>{a.line}</small>
                    </span>
                  </label>
                ))}
              </div>
              {errors.address && <p className="hs-fld__err" role="alert">{errors.address}</p>}

              {!adding ? (
                <button type="button" className="hs-link" onClick={() => setAdding(true)}><BsPlus size={20} aria-hidden="true" /> Add New Address</button>
              ) : (
                <fieldset className="hs-newaddr">
                  <legend>New address</legend>
                  <div className="row g-3">
                    <div className="col-sm-4"><Field label="Label" as="select" options={['Home', 'Office', 'Other']} value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} error={errors.draft?.label} /></div>
                    <div className="col-sm-8"><Field label="Area" as="select" options={AREAS} value={draft.area} onChange={(e) => setDraft({ ...draft, area: e.target.value })} /></div>
                    <div className="col-12"><Field label="House, road and landmark" placeholder="e.g. House 12, Road 6" value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} error={errors.draft?.line} autoComplete="street-address" /></div>
                  </div>
                  <div className="hs-newaddr__actions">
                    <button type="button" className="btn hs-btn hs-btn--primary hs-btn--sm" onClick={saveAddress}>Save Address</button>
                    <button type="button" className="btn hs-btn hs-btn--outline hs-btn--sm" onClick={() => { setAdding(false); setErrors({}); }}>Cancel</button>
                  </div>
                  {errors.adding && <p className="hs-fld__err" role="alert">{errors.adding}</p>}
                </fieldset>
              )}

              <Field className="mt-4" label="Contact phone" icon={<BsPhone />} type="tel" inputMode="tel" placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} autoComplete="tel" />
              {errors.adding && !adding && <p className="hs-fld__err" role="alert">{errors.adding}</p>}
            </div>
          )}

          {/* ---- Step 2: schedule ---- */}
          {step === 1 && (
            <div>
              <ul className="hs-sched">
                {items.map((it) => (
                  <li key={it.id}>
                    <strong>{it.name}</strong>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <Field label="Date" type="date" min={today || undefined} value={it.date} onChange={(e) => dispatch(updateItem({ id: it.id, date: e.target.value }))} error={errors[it.id]} />
                      </div>
                      <div className="col-sm-6">
                        <Field label="Time slot" as="select" options={TIME_SLOTS} value={it.time} onChange={(e) => dispatch(updateItem({ id: it.id, time: e.target.value }))} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Field label="Notes for the professional (optional)" as="textarea" placeholder="Gate code, parking, what needs fixing..." value={notes} onChange={(e) => dispatch(setNotes(e.target.value))} maxLength={300} />
            </div>
          )}

          {/* ---- Step 3: payment ---- */}
          {step === 2 && (
            <div>
              <div role="radiogroup" aria-label="Payment methods" className="hs-methods">
                {METHODS.map((m) => (
                  <label key={m.id} className={`hs-method ${m.id === method ? 'is-selected' : ''}`}>
                    <input type="radio" name="method" checked={m.id === method} onChange={() => { dispatch(setMethod(m.id)); setErrors({}); }} />
                    <MethodIcon id={m.id} />
                    <span>{m.name}</span>
                    <span className="hs-addr__radio" aria-hidden="true" />
                  </label>
                ))}
              </div>

              {isWallet && (
                <div className="hs-payfields">
                  <Field label={`${methodName(method)} account number`} type="tel" inputMode="tel" placeholder="01XXXXXXXXX" icon={<BsPhone />} value={wallet} onChange={(e) => setWallet(e.target.value)} error={errors.wallet} autoComplete="off" />
                  <p className="hs-note">You will receive a payment request on your {methodName(method)} app to approve.</p>
                </div>
              )}
              {method === 'card' && (
                <div className="hs-payfields row g-3">
                  <div className="col-12"><Field label="Card number" inputMode="numeric" placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => setCard({ ...card, number: fmtCard(e.target.value) })} error={errors.number} autoComplete="cc-number" /></div>
                  <div className="col-12"><Field label="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} error={errors.name} autoComplete="cc-name" /></div>
                  <div className="col-6"><Field label="Expiry (MM/YY)" inputMode="numeric" placeholder="MM/YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: fmtExp(e.target.value) })} error={errors.exp} autoComplete="cc-exp" /></div>
                  <div className="col-6"><Field label="CVV" inputMode="numeric" type="password" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })} error={errors.cvv} autoComplete="cc-csc" /></div>
                </div>
              )}
              {method === 'cash' && <p className="hs-note hs-payfields">Pay the professional in cash after the service is completed. No online payment is needed.</p>}
            </div>
          )}

          {/* ---- Step 4: confirm ---- */}
          {step === 3 && (
            <div className="hs-review">
              <div className="hs-review__row">
                <div><small>Address</small><strong>{address?.label}</strong><span>{address?.line}</span><span>{phone}</span></div>
                <button type="button" className="hs-link" onClick={() => go(0)}>Edit</button>
              </div>
              <div className="hs-review__row">
                <div>
                  <small>Schedule</small>
                  {items.map((it) => <span key={it.id}><strong>{it.name}</strong> &middot; {formatDate(it.date)}, {it.time}</span>)}
                  {notes && <span className="text-muted">Note: {notes}</span>}
                </div>
                <button type="button" className="hs-link" onClick={() => go(1)}>Edit</button>
              </div>
              <div className="hs-review__row">
                <div><small>Payment</small><strong>{methodName(method)}</strong>{isWallet && <span>{wallet}</span>}{method === 'card' && <span>**** {card.number.replace(/\s/g, '').slice(-4)}</span>}</div>
                <button type="button" className="hs-link" onClick={() => go(2)}>Edit</button>
              </div>
              <label className="hs-check hs-check--agree">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span className="hs-check__box" aria-hidden="true" />
                <span className="hs-check__label">I agree to the Terms &amp; Conditions and Refund Policy.</span>
              </label>
              {errors.agree && <p className="hs-fld__err" role="alert">{errors.agree}</p>}
              {order.status === 'error' && <p className="hs-error" role="alert">{order.error}</p>}
            </div>
          )}

          <div className="hs-panel__actions">
            {step > 0 ? (
              <button type="button" className="btn hs-btn hs-btn--outline" onClick={() => go(step - 1)} disabled={loading}><BsArrowLeft aria-hidden="true" /> Back</button>
            ) : <span />}
            {step < STEPS.length - 1 ? (
              <button type="button" className="btn hs-btn hs-btn--primary hs-btn--wide" onClick={next}>Next</button>
            ) : (
              <button type="button" className="btn hs-btn hs-btn--primary hs-btn--wide d-lg-none" onClick={pay} disabled={loading}>{loading ? 'Processing...' : payLabel}</button>
            )}
          </div>
        </section>

        <OrderSummary items={items} totals={totals}>
          <button type="button" className="btn hs-btn hs-btn--primary hs-btn--block hs-btn--lg" onClick={pay} disabled={step < STEPS.length - 1 || loading}>
            <BsLockFill aria-hidden="true" /> {loading ? 'Processing...' : payLabel}
          </button>
          {step < STEPS.length - 1 && <p className="hs-note hs-summary__hint">Complete all steps to pay.</p>}
          <p className="hs-summary__secure"><BsLockFill aria-hidden="true" /> Secure checkout. Your details are encrypted.</p>
        </OrderSummary>
      </div>
    </div>
  );
}
