import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const token = window.localStorage.getItem('hs_token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

export const errorMessage = (err) =>
  err?.response?.data?.message ||
  (err?.code === 'ERR_NETWORK' ? 'Cannot reach the server. Is the API running?' : err?.message) ||
  'Something went wrong';

// Auth endpoints (Laravel)
export const authApi = {
  sendOtp: (phone) => api.post('/auth/otp/send', { phone }),
  verifyOtp: (phone, code) => api.post('/auth/otp/verify', { phone, code }),
  verify2fa: (code, temp_token) => api.post('/auth/2fa/verify', { code, temp_token }),
  social: (provider, payload = {}) => api.post(`/auth/social/${provider}`, payload),
};

// Orders (Laravel, not built yet). See checkoutSlice.placeOrder for the temporary fallback.
export const ordersApi = {
  create: (payload) => api.post('/orders', payload),
};

// Generic form submit. TODO(backend): drop the simulation once the endpoints exist.
// Network errors / 404 / 405 (API not built yet) resolve as { simulated: true } so the UI flow can be demonstrated.
export async function submitOrSimulate(path, payload) {
  try {
    await api.post(path, payload);
    return { simulated: false };
  } catch (e) {
    const status = e?.response?.status;
    if (e?.code === 'ERR_NETWORK' || e?.code === 'ECONNABORTED' || status === 404 || status === 405) return { simulated: true };
    throw e;
  }
}

export default api;
