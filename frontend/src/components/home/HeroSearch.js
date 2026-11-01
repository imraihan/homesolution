'use client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { BsGeoAlt, BsChevronDown } from 'react-icons/bs';
import { setQuery } from '@/store/slices/servicesSlice';
import { setCity } from '@/store/slices/locationSlice';

export default function HeroSearch() {
  const dispatch = useDispatch();
  const router = useRouter();
  const query = useSelector((s) => s.services.query);
  const { city, cities } = useSelector((s) => s.location);

  const onSubmit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query.trim()) p.set('search', query.trim());
    if (city) p.set('location', city);
    router.push(`/services?${p.toString()}`);
  };

  return (
    <form className="hs-search" onSubmit={onSubmit} role="search" aria-label="Find a service">
      <label className="visually-hidden" htmlFor="hs-q">Search for services</label>
      <input id="hs-q" type="search" placeholder="Search for services..." value={query} onChange={(e) => dispatch(setQuery(e.target.value))} />
      <div className="hs-search__loc">
        <BsGeoAlt aria-hidden="true" />
        <label className="visually-hidden" htmlFor="hs-city">City</label>
        <select id="hs-city" value={city} onChange={(e) => dispatch(setCity(e.target.value))}>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <BsChevronDown size={12} aria-hidden="true" />
      </div>
      <button type="submit" className="btn hs-btn hs-btn--primary">Book Now</button>
    </form>
  );
}
