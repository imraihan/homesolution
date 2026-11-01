// Safe localStorage helpers. Never touch storage during render: read it after mount and
// hydrate Redux from an effect so server and first client render always match.
export const loadJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const saveJSON = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const KEYS = { cart: 'hs_cart', wishlist: 'hs_wishlist', addresses: 'hs_addresses', user: 'hs_user' };
