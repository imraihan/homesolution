'use client';
import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { BsStarFill, BsCalendar3, BsChevronDown } from 'react-icons/bs';
import { addItem, openCart } from '@/store/slices/cartSlice';
import { AREAS, TIME_SLOTS } from '@/data/services';
import { isoFromToday, money } from '@/lib/format';

/** Booking card (sticky sidebar on desktop) + fixed bottom action bar on mobile. Both share one state. */
export default function BookingCard({ service, image = null }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const uid = useId();
  const [area, setArea] = useState(AREAS[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [min, setMin] = useState('');
  const [error, setError] = useState('');

  // Dates depend on "today", so they are filled after mount to keep server and client markup identical.
  useEffect(() => {
    setMin(isoFromToday(0));
    setDate(isoFromToday(1));
  }, []);

  const build = () => {
    if (!area || !date || !time) {
      setError('Please choose an area, date and time.');
      return null;
    }
    if (date < min) {
      setError('Please choose today or a future date.');
      return null;
    }
    setError('');
    return { id: `${service.slug}|${date}|${time}`, slug: service.slug, name: service.name, category: service.category, price: service.price, date, time, area, img: image };
  };

  const addToCart = () => {
    const item = build();
    if (!item) return;
    dispatch(addItem(item));
    dispatch(openCart());
  };
  const bookNow = () => {
    const item = build();
    if (!item) return;
    dispatch(addItem(item));
    router.push('/checkout');
  };

  return (
    <>
      <aside className="hs-book" aria-label="Book this service">
        <h1>{service.name}</h1>
        <p className="hs-book__rating"><BsStarFill color="#f5a623" aria-hidden="true" /> <b>{service.rating.toFixed(1)}</b> <span>({service.reviews} Reviews)</span></p>
        <p className="hs-book__from">Starting from</p>
        <p className="hs-book__price">{money(service.price)}</p>

        <div className="hs-field">
          <label htmlFor={`${uid}-area`}>Select Area</label>
          <span className="hs-select">
            <select id={`${uid}-area`} value={area} onChange={(e) => setArea(e.target.value)}>
              {AREAS.map((a) => <option key={a} value={a}>{a}, Chattogram</option>)}
            </select>
            <BsChevronDown size={13} aria-hidden="true" />
          </span>
        </div>
        <div className="hs-field">
          <label htmlFor={`${uid}-date`}>Select Date</label>
          <span className="hs-select hs-select--date">
            <input id={`${uid}-date`} type="date" value={date} min={min || undefined} onChange={(e) => setDate(e.target.value)} />
            <BsCalendar3 size={14} aria-hidden="true" />
          </span>
        </div>
        <div className="hs-field">
          <label htmlFor={`${uid}-time`}>Select Time</label>
          <span className="hs-select">
            <select id={`${uid}-time`} value={time} onChange={(e) => setTime(e.target.value)}>
              {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <BsChevronDown size={13} aria-hidden="true" />
          </span>
        </div>

        {error && <p className="hs-error" role="alert">{error}</p>}
        <button type="button" className="btn hs-btn hs-btn--primary hs-btn--block hs-btn--lg" onClick={addToCart}>Add to Cart</button>
        <button type="button" className="btn hs-btn hs-btn--orange hs-btn--block hs-btn--lg" onClick={bookNow}>Book Now</button>
      </aside>

      <div className="hs-stickybar">
        <div>
          <small>Starting from</small>
          <b>{money(service.price)}</b>
        </div>
        <button type="button" className="btn hs-btn hs-btn--outline" onClick={addToCart}>Add to Cart</button>
        <button type="button" className="btn hs-btn hs-btn--orange" onClick={bookNow}>Book Now</button>
      </div>
    </>
  );
}
