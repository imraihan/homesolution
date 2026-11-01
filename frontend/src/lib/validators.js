// Small shared validators. Each returns an error string or '' when valid.
export const required = (v, label = 'This field') => (String(v ?? '').trim() ? '' : `${label} is required`);

export const phoneBD = (v) => {
  const s = String(v || '').replace(/[\s-]/g, '');
  if (!s) return 'Phone number is required';
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(s) ? '' : 'Enter a valid Bangladeshi mobile number (e.g. 01812345678)';
};

export const email = (v) => {
  const s = String(v || '').trim();
  if (!s) return 'Email is required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? '' : 'Enter a valid email address';
};

export const minLen = (v, n, label = 'This field') => {
  const s = String(v || '').trim();
  if (!s) return `${label} is required`;
  return s.length >= n ? '' : `${label} must be at least ${n} characters`;
};

/** Run a map of { field: () => error } and return only the failing ones. */
export const collect = (checks) => {
  const out = {};
  for (const [k, fn] of Object.entries(checks)) {
    const e = fn();
    if (e) out[k] = e;
  }
  return out;
};
