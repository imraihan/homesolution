import { createSlice } from '@reduxjs/toolkit';
import { SERVICES } from '@/lib/site';

const slice = createSlice({
  name: 'services',
  initialState: { items: SERVICES, query: '', selected: null },
  reducers: {
    setQuery: (s, a) => {
      s.query = a.payload;
    },
    selectService: (s, a) => {
      s.selected = a.payload;
    },
    setItems: (s, a) => {
      s.items = a.payload; // for future API-loaded data
    },
  },
});
export const { setQuery, selectService, setItems } = slice.actions;
export default slice.reducer;
