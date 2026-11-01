import { createSlice } from '@reduxjs/toolkit';
import { SERVICE_CHARGE } from '@/lib/format';

// Item: { id, slug, name, category, price, date (YYYY-MM-DD), time, area }
// `hydrated` flips to true once localStorage has been read on the client; UI that depends on
// the persisted cart (badge, modal, checkout) must wait for it to avoid hydration mismatches.
const slice = createSlice({
  name: 'cart',
  initialState: { items: [], open: false, hydrated: false },
  reducers: {
    hydrateCart: (s, a) => {
      s.items = Array.isArray(a.payload) ? a.payload.filter((i) => i && i.id && i.slug) : [];
      s.hydrated = true;
    },
    addItem: (s, a) => {
      const item = a.payload;
      const i = s.items.findIndex((x) => x.id === item.id);
      if (i >= 0) s.items[i] = item;
      else s.items.push(item);
    },
    removeItem: (s, a) => {
      s.items = s.items.filter((x) => x.id !== a.payload);
    },
    updateItem: (s, a) => {
      const { id, ...patch } = a.payload;
      const it = s.items.find((x) => x.id === id);
      if (it) Object.assign(it, patch);
    },
    clearCart: (s) => {
      s.items = [];
    },
    openCart: (s) => {
      s.open = true;
    },
    closeCart: (s) => {
      s.open = false;
    },
  },
});

export const { hydrateCart, addItem, removeItem, updateItem, clearCart, openCart, closeCart } = slice.actions;

export const cartTotals = (items) => {
  const subtotal = items.reduce((n, i) => n + i.price, 0);
  const charge = items.length ? SERVICE_CHARGE : 0;
  return { subtotal, charge, total: subtotal + charge, count: items.length };
};

export default slice.reducer;
