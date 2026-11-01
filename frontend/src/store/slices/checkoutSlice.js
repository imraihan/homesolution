import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi, errorMessage } from '@/lib/api';

export const STEPS = ['Address', 'Schedule', 'Payment', 'Confirm'];

const DEFAULT_ADDRESSES = [
  { id: 'home', label: 'Home', line: '123, Agrabad, Chattogram', phone: '' },
  { id: 'office', label: 'Office', line: 'ABC Tower, OEC, Chattogram', phone: '' },
];

// Card numbers / mobile wallet numbers are NOT kept in Redux or storage: they live in component state.
export const placeOrder = createAsyncThunk('checkout/placeOrder', async (payload, { rejectWithValue }) => {
  try {
    const { summary, ...body } = payload; // summary is UI-only
    void summary;
    const { data } = await ordersApi.create(body);
    return { orderId: data?.order_id || data?.id || null, simulated: false };
  } catch (e) {
    // TODO(backend): remove this fallback once POST /orders exists. Until then an unreachable API
    // (network error / 404) resolves as a simulated success so the whole flow can be demonstrated.
    const status = e?.response?.status;
    if (e?.code === 'ERR_NETWORK' || e?.code === 'ECONNABORTED' || status === 404 || status === 405) {
      const orderId = `HS-${Date.now().toString().slice(-7)}`;
      return { orderId, simulated: true };
    }
    return rejectWithValue(errorMessage(e));
  }
});

const emptyOrder = { status: 'idle', id: null, simulated: false, error: null, summary: null };

const initialState = {
  step: 0,
  addresses: DEFAULT_ADDRESSES,
  addressId: 'home',
  notes: '',
  method: 'bkash',
  order: emptyOrder,
};

const slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    hydrateAddresses: (s, a) => {
      if (Array.isArray(a.payload) && a.payload.length) {
        s.addresses = a.payload;
        if (!s.addresses.some((x) => x.id === s.addressId)) s.addressId = s.addresses[0].id;
      }
    },
    setStep: (s, a) => {
      s.step = Math.max(0, Math.min(STEPS.length - 1, a.payload));
    },
    selectAddress: (s, a) => {
      s.addressId = a.payload;
    },
    addAddress: (s, a) => {
      s.addresses.push(a.payload);
      s.addressId = a.payload.id;
    },
    setNotes: (s, a) => {
      s.notes = a.payload;
    },
    setMethod: (s, a) => {
      s.method = a.payload;
    },
    resetCheckout: (s) => {
      s.step = 0;
      s.notes = '';
      s.order = emptyOrder;
    },
  },
  extraReducers: (b) => {
    b.addCase(placeOrder.pending, (s) => {
      s.order = { ...emptyOrder, status: 'loading' };
    })
      .addCase(placeOrder.fulfilled, (s, a) => {
        s.order = { status: 'success', id: a.payload.orderId, simulated: a.payload.simulated, error: null, summary: a.meta.arg.summary || null };
      })
      .addCase(placeOrder.rejected, (s, a) => {
        s.order = { ...emptyOrder, status: 'error', error: a.payload || 'Could not place your order. Please try again.' };
      });
  },
});

export const { hydrateAddresses, setStep, selectAddress, addAddress, setNotes, setMethod, resetCheckout } = slice.actions;
export default slice.reducer;
