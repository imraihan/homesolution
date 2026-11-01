'use client';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsFunnel, BsX, BsSearch, BsChevronDown } from 'react-icons/bs';
import FilterPanel from './FilterPanel';
import ServiceCard from './ServiceCard';
import { SERVICES, SORT_OPTIONS, getCategory } from '@/data/services';
import { parseFilters, buildQuery, filterServices } from '@/lib/serviceFilters';

/**
 * The URL query string is the single source of truth for filters:
 *   /services?category=plumbing&search=pipe&location=Chattogram&price=0-500&rating=4&avail=today&sort=rating
 * so deep links from the home page / header / footer / search bar always tick exactly the right boxes,
 * and unticking everything (or "Clear All") shows every service.
 */
export default function ServicesExplorer({ images = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => filterServices(filters, SERVICES), [filters]);
  const [drawer, setDrawer] = useState(false);

  const go = (next) => {
    const qs = buildQuery(next);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const change = (patch) => go({ ...filters, ...patch });
  const clearAll = () => go({ ...filters, category: [], price: [], rating: 0, avail: [], search: '', location: '' });

  const activeCount = filters.category.length + filters.price.length + (filters.rating ? 1 : 0) + filters.avail.length;
  const anything = activeCount > 0 || !!filters.search;

  // Off-canvas: lock scroll + Escape to close.
  useEffect(() => {
    if (!drawer) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  const singleCat = filters.category.length === 1 ? getCategory(filters.category[0]) : null;
  const heading = filters.search ? 'Search Results' : singleCat ? `${singleCat.name} Services` : 'All Services';

  return (
    <>
      <div className="hs-listhead">
        <div>
          <h1>{heading}</h1>
          <p>Find the perfect service for your home</p>
        </div>
        <div className="hs-listhead__tools">
          <button type="button" className="hs-filterbtn" onClick={() => setDrawer(true)} aria-haspopup="dialog">
            <BsFunnel aria-hidden="true" /> Filters {activeCount > 0 && <span className="hs-filterbtn__n">{activeCount}</span>}
          </button>
          <label className="hs-sort">
            <span>Sort by</span>
            <span className="hs-sort__select">
              <select value={filters.sort} onChange={(e) => change({ sort: e.target.value })} aria-label="Sort services">
                {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
              <BsChevronDown size={12} aria-hidden="true" />
            </span>
          </label>
        </div>
      </div>

      <div className="hs-listing">
        <aside className="hs-listing__side" aria-label="Filters">
          <FilterPanel filters={filters} onChange={change} onClear={clearAll} idPrefix="d" />
        </aside>

        <section className="hs-listing__main" aria-live="polite">
          <div className="hs-resultbar">
            {filters.search && (
              <p className="hs-resultbar__search">
                <BsSearch aria-hidden="true" /> Showing results for <strong>&ldquo;{filters.search}&rdquo;</strong>
                {filters.location ? <> in <strong>{filters.location}</strong></> : null}
                <button type="button" onClick={() => change({ search: '', location: '' })} aria-label="Clear search"><BsX size={18} /></button>
              </p>
            )}
            <p className="hs-resultbar__count">{results.length} {results.length === 1 ? 'service' : 'services'} found</p>
          </div>

          {results.length === 0 ? (
            <div className="hs-empty">
              <BsSearch size={36} aria-hidden="true" />
              <h2>No services match your filters</h2>
              <p>Try removing a filter or searching for something else.</p>
              <button type="button" className="btn hs-btn hs-btn--primary" onClick={clearAll}>Clear All Filters</button>
            </div>
          ) : (
            <div className="hs-grid">
              {results.map((s, i) => (
                <ServiceCard key={s.slug} service={s} image={images[s.slug]} index={i} priority={i < 3} />
              ))}
            </div>
          )}
        </section>
      </div>

      {drawer && (
        <div className="hs-drawer" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setDrawer(false)}>
          <div className="hs-drawer__panel" role="dialog" aria-modal="true" aria-label="Filter services">
            <div className="hs-drawer__head">
              <strong>Filters</strong>
              <button type="button" className="hs-iconbtn" aria-label="Close filters" onClick={() => setDrawer(false)}><BsX size={26} /></button>
            </div>
            <div className="hs-drawer__body">
              <FilterPanel filters={filters} onChange={change} onClear={clearAll} idPrefix="m" />
            </div>
            <div className="hs-drawer__foot">
              <button type="button" className="btn hs-btn hs-btn--primary w-100" onClick={() => setDrawer(false)}>Show {results.length} {results.length === 1 ? 'service' : 'services'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
