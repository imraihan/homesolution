import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'wishlist',
  initialState: { slugs: [], hydrated: false },
  reducers: {
    hydrateWishlist: (s, a) => {
      s.slugs = Array.isArray(a.payload) ? a.payload.filter((x) => typeof x === 'string') : [];
      s.hydrated = true;
    },
    toggleWish: (s, a) => {
      s.slugs = s.slugs.includes(a.payload) ? s.slugs.filter((x) => x !== a.payload) : [...s.slugs, a.payload];
    },
  },
});
export const { hydrateWishlist, toggleWish } = slice.actions;
export default slice.reducer;
