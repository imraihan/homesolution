import { SERVICES, CATEGORIES, PRICE_RANGES } from '@/data/services';

const list = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);

/** Parse URLSearchParams-like (has .get) into a normalised filter object. */
export function parseFilters(params) {
  const get = (k) => params.get(k) || '';
  const catSlugs = CATEGORIES.map((c) => c.slug);
  const rating = Number(get('rating'));
  return {
    category: list(get('category')).filter((c) => catSlugs.includes(c)),
    price: list(get('price')).filter((p) => PRICE_RANGES.some((r) => r.id === p)),
    rating: [4, 3, 2].includes(rating) ? rating : 0,
    avail: list(get('avail')).filter((a) => ['today', 'tomorrow', 'week'].includes(a)),
    sort: get('sort') || 'popularity',
    search: get('search').trim(),
    location: get('location').trim(),
  };
}

/** Serialise a filter object back to a query string (omits defaults so URLs stay clean). */
export function buildQuery(f) {
  const p = new URLSearchParams();
  if (f.search) p.set('search', f.search);
  if (f.location) p.set('location', f.location);
  if (f.category.length) p.set('category', f.category.join(','));
  if (f.price.length) p.set('price', f.price.join(','));
  if (f.rating) p.set('rating', String(f.rating));
  if (f.avail.length) p.set('avail', f.avail.join(','));
  if (f.sort && f.sort !== 'popularity') p.set('sort', f.sort);
  return p.toString();
}

export const hasActiveFilters = (f) => !!(f.category.length || f.price.length || f.rating || f.avail.length);

const matchesSearch = (s, term) => {
  const words = term.toLowerCase().split(/\s+/).filter(Boolean);
  const cat = CATEGORIES.find((c) => c.slug === s.category)?.name || '';
  const hay = [s.name, cat, s.desc, s.long, ...s.keywords, ...s.included].join(' ').toLowerCase();
  return words.every((w) => hay.includes(w));
};

const SORTERS = {
  popularity: (a, b) => b.popularity - a.popularity,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

/** Empty filter groups mean "no restriction", so clearing everything shows all services. */
export function filterServices(f, items = SERVICES) {
  const ranges = PRICE_RANGES.filter((r) => f.price.includes(r.id));
  const out = items.filter((s) => {
    if (f.search && !matchesSearch(s, f.search)) return false;
    if (f.category.length && !f.category.includes(s.category)) return false;
    if (ranges.length && !ranges.some((r) => s.price >= r.min && s.price < r.max)) return false;
    if (f.rating && s.rating < f.rating) return false;
    if (f.avail.length && !f.avail.some((a) => s.availability.includes(a))) return false;
    return true;
  });
  return out.sort(SORTERS[f.sort] || SORTERS.popularity);
}
