'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './index';
import { loadJSON, saveJSON, KEYS } from './persist';
import { hydrateCart } from './slices/cartSlice';
import { hydrateWishlist } from './slices/wishlistSlice';
import { hydrateAddresses } from './slices/checkoutSlice';
import { hydrateAuth } from './slices/authSlice';

export default function StoreProvider({ children }) {
  const ref = useRef(null);
  if (!ref.current) ref.current = makeStore();

  // Read persisted state only after mount (hydration-safe), then mirror changes back to storage.
  useEffect(() => {
    const store = ref.current;
    store.dispatch(hydrateCart(loadJSON(KEYS.cart, [])));
    store.dispatch(hydrateWishlist(loadJSON(KEYS.wishlist, [])));
    store.dispatch(hydrateAddresses(loadJSON(KEYS.addresses, null)));
    store.dispatch(hydrateAuth(loadJSON(KEYS.user, null)));

    let prev = store.getState();
    const unsub = store.subscribe(() => {
      const s = store.getState();
      if (s.cart.hydrated && s.cart.items !== prev.cart.items) saveJSON(KEYS.cart, s.cart.items);
      if (s.wishlist.hydrated && s.wishlist.slugs !== prev.wishlist.slugs) saveJSON(KEYS.wishlist, s.wishlist.slugs);
      if (s.checkout.addresses !== prev.checkout.addresses) saveJSON(KEYS.addresses, s.checkout.addresses);
      if (s.auth.ready && s.auth.user !== prev.auth.user) {
        if (s.auth.user) saveJSON(KEYS.user, s.auth.user);
        else {
          try { window.localStorage.removeItem(KEYS.user); } catch {}
        }
      }
      prev = s;
    });

    // Keep tabs in sync.
    const onStorage = (e) => {
      if (e.key === KEYS.cart) store.dispatch(hydrateCart(loadJSON(KEYS.cart, [])));
      if (e.key === KEYS.wishlist) store.dispatch(hydrateWishlist(loadJSON(KEYS.wishlist, [])));
      if (e.key === KEYS.user) store.dispatch(hydrateAuth(loadJSON(KEYS.user, null)));
    };
    window.addEventListener('storage', onStorage);
    return () => {
      unsub();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return <Provider store={ref.current}>{children}</Provider>;
}
