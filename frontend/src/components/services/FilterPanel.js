'use client';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { CATEGORIES, PRICE_RANGES, RATING_OPTIONS, AVAILABILITY } from '@/data/services';

const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Check({ id, checked, onChange, children }) {
  return (
    <label className="hs-check" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="hs-check__box" aria-hidden="true" />
      <span className="hs-check__label">{children}</span>
    </label>
  );
}

export default function FilterPanel({ filters, onChange, onClear, idPrefix = 'f' }) {
  return (
    <div className="hs-filter">
      <h2 className="hs-filter__title">Filter Services</h2>

      <fieldset className="hs-filter__group">
        <legend>Category</legend>
        {CATEGORIES.map((c) => (
          <Check key={c.slug} id={`${idPrefix}-cat-${c.slug}`} checked={filters.category.includes(c.slug)} onChange={() => onChange({ category: toggleIn(filters.category, c.slug) })}>
            {c.name}
          </Check>
        ))}
      </fieldset>

      <fieldset className="hs-filter__group">
        <legend>Price Range</legend>
        {PRICE_RANGES.map((r) => (
          <Check key={r.id} id={`${idPrefix}-price-${r.id}`} checked={filters.price.includes(r.id)} onChange={() => onChange({ price: toggleIn(filters.price, r.id) })}>
            {r.label}
          </Check>
        ))}
      </fieldset>

      <fieldset className="hs-filter__group">
        <legend>Rating</legend>
        {RATING_OPTIONS.map((r) => (
          <Check key={r} id={`${idPrefix}-rate-${r}`} checked={filters.rating === r} onChange={() => onChange({ rating: filters.rating === r ? 0 : r })}>
            <span className="hs-filter__stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (n <= r ? <BsStarFill key={n} size={12} color="#f5a623" /> : <BsStar key={n} size={12} color="#c8d3ee" />))}
            </span>
            {r.toFixed(1)} &amp; above
          </Check>
        ))}
      </fieldset>

      <fieldset className="hs-filter__group">
        <legend>Availability</legend>
        {AVAILABILITY.map((a) => (
          <Check key={a.id} id={`${idPrefix}-av-${a.id}`} checked={filters.avail.includes(a.id)} onChange={() => onChange({ avail: toggleIn(filters.avail, a.id) })}>
            {a.label}
          </Check>
        ))}
      </fieldset>

      <button type="button" className="hs-filter__clear" onClick={onClear}>Clear All</button>
    </div>
  );
}
