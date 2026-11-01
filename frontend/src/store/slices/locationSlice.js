import { createSlice } from '@reduxjs/toolkit';
import { CITIES } from '@/lib/site';

const slice = createSlice({
  name: 'location',
  initialState: { city: 'Chattogram', cities: CITIES },
  reducers: {
    setCity: (s, a) => {
      s.city = a.payload;
    },
  },
});
export const { setCity } = slice.actions;
export default slice.reducer;
