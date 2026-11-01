import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, errorMessage } from '@/lib/api';

const persist = (token) => {
  try {
    window.localStorage.setItem('hs_token', token);
  } catch {}
};

const wrap = (type, fn) =>
  createAsyncThunk(type, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await fn(arg);
      return data;
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  });

export const sendOtp = wrap('auth/sendOtp', ({ phone }) => authApi.sendOtp(phone));
export const verifyOtp = wrap('auth/verifyOtp', ({ phone, code }) => authApi.verifyOtp(phone, code));
export const socialLogin = wrap('auth/socialLogin', ({ provider, payload }) => authApi.social(provider, payload));
export const verify2fa = createAsyncThunk('auth/verify2fa', async ({ code }, { getState, rejectWithValue }) => {
  try {
    const { data } = await authApi.verify2fa(code, getState().auth.tempToken);
    return data;
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

// step: 'phone' | 'otp' | '2fa' | 'done'
// `ready` flips true once the persisted user was read after mount; route guards wait for it (no SSR/localStorage mismatch).
const initialState = { step: 'phone', phone: '', user: null, token: null, tempToken: null, status: 'idle', error: null, ready: false };

const finish = (state, { payload }) => {
  state.status = 'idle';
  if (payload?.requires_2fa) {
    state.step = '2fa';
    state.tempToken = payload.temp_token || null;
    return;
  }
  state.user = payload?.user ? { role: 'user', ...payload.user } : null;
  state.token = payload?.token || null;
  if (state.token) persist(state.token);
  state.step = 'done';
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhone: (s, a) => {
      s.phone = a.payload;
    },
    resetFlow: (s) => {
      s.step = 'phone';
      s.error = null;
      s.status = 'idle';
    },
    hydrateAuth: (s, a) => {
      s.user = a.payload || null;
      s.ready = true;
    },
    // TODO(backend): DEV-ONLY demo sign-in (see components/auth/DemoRoleSwitcher). Remove with the switcher.
    demoLogin: (s, a) => {
      s.user = a.payload;
      s.step = 'done';
      s.error = null;
    },
    logout: (s) => {
      Object.assign(s, initialState, { ready: true });
      try {
        window.localStorage.removeItem('hs_token');
      } catch {}
    },
  },
  extraReducers: (b) => {
    const pending = (s) => {
      s.status = 'loading';
      s.error = null;
    };
    const rejected = (s, a) => {
      s.status = 'idle';
      s.error = a.payload || 'Request failed';
    };
    b.addCase(sendOtp.pending, pending)
      .addCase(sendOtp.rejected, rejected)
      .addCase(sendOtp.fulfilled, (s) => {
        s.status = 'idle';
        s.step = 'otp';
      });
    [verifyOtp, verify2fa, socialLogin].forEach((t) => {
      b.addCase(t.pending, pending).addCase(t.rejected, rejected).addCase(t.fulfilled, finish);
    });
  },
});

export const { setPhone, resetFlow, logout, hydrateAuth, demoLogin } = slice.actions;
export default slice.reducer;
