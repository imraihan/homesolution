export const money = (n) => `৳${Number(n || 0).toLocaleString('en-US')}`;

// Always format from the ISO string parts so server/client output is identical.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (iso) => {
  const [y, m, d] = String(iso || '').split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

const pad = (n) => String(n).padStart(2, '0');
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const isoFromToday = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toISO(d);
};

export const SERVICE_CHARGE = 50;
